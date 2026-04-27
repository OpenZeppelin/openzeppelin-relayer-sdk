# Zama FHE Example (`@zama-fhe/sdk` + `GenericSigner`)

This directory shows how to integrate the OpenZeppelin Relayer SDK with the new top-level Zama SDK (`@zama-fhe/sdk@3.x`) by implementing Zama's `GenericSigner` interface on top of the relayer.

If you are looking for the legacy integration that uses `@zama-fhe/relayer-sdk@0.4.x` directly (no signer abstraction, all wiring done in user code), see [`../relayer-sdk/`](../relayer-sdk/).

## Why a `GenericSigner`

`@zama-fhe/sdk` ships a framework-agnostic [`GenericSigner`](https://www.npmjs.com/package/@zama-fhe/sdk) interface — wallet-style operations (`getAddress`, `signTypedData`, `readContract`, `writeContract`, `waitForTransactionReceipt`, `getChainId`, `getBlockTimestamp`). The SDK comes with `EthersSigner` and a viem adapter, and any other backend — including a remote relayer — can plug in by implementing the same interface.

Because the OpenZeppelin Relayer naturally fits this contract — it signs typed data and submits transactions on behalf of an address — the integration reduces to a single adapter class. From there, every other piece of the Zama SDK (decrypt sessions, the `Token` ERC-7984 wrapper, the wrappers registry, etc.) works without any relayer-specific code.

## Files

- [openzeppelin-relayer-signer.ts](./openzeppelin-relayer-signer.ts) — `OpenZeppelinRelayerSigner implements GenericSigner`. Hashes EIP-712 payloads with viem, calls `relayersApi.signTypedData` for signatures, encodes calldata + calls `relayersApi.sendTransaction` for writes, then polls `getTransactionById` until the relayer assigns an on-chain hash. Read-only ops (`readContract`, `getChainId`, `getBlockTimestamp`, `waitForTransactionReceipt`) go through a viem `PublicClient`, never through the relayer.
- [counter.ts](./counter.ts) — end-to-end demo that mirrors the legacy example but uses `ZamaSDK` + the adapter.
- [abi.json](./abi.json) — ABI of the example counter contract.

## Quickstart

1. Install dependencies from the repository root:

   ```bash
   pnpm install
   ```

2. Copy [`../.env.example`](../.env.example) to `../.env` (the parent `examples/relayers/zama/.env` is shared with the legacy example) and fill in:
   - `RELAYER_API_KEY`
   - `RELAYER_ID`
   - `ZAMA_CONTRACT_ADDRESS`
   - `RPC_URL`
   - `RELAYER_BASE_PATH` if not running against `http://localhost:8080`

3. Run the example from the repository root:

   ```bash
   npx ts-node examples/relayers/zama/zama-sdk/counter.ts
   ```

The script reads the encrypted counter, decrypts it (public path first, falling back to user decrypt), submits an encrypted `increment()` through the relayer, waits for confirmation, and decrypts the new value.

## Architecture

Four objects are wired together:

```
┌─────────────────────────┐    encrypts/decrypts    ┌──────────────────┐
│ RelayerNode             │  ◄────────────────────► │ Zama gateway     │
│ (FHE worker pool, WASM) │                         └──────────────────┘
└────────────┬────────────┘
             │
             ▼ composed by
┌─────────────────────────┐
│ ZamaSDK                 │  high-level API:
│  - signer               │   sdk.publicDecrypt(...)
│  - relayer              │   sdk.userDecrypt(...)
│  - storage              │   sdk.token(addr).balanceOf(...)
└────────────┬────────────┘   sdk.token(addr).transfer(...)
             │
             ▼ delegates signTypedData / writeContract / ...
┌─────────────────────────┐    REST API     ┌──────────────────┐
│ OpenZeppelinRelayer     │ ◄────────────► │ OZ Relayer        │
│ Signer (this dir)       │                │ (your deployment) │
└─────────────────────────┘                └──────────────────┘
```

- **Encryption / decryption** stays inside the Zama SDK and never touches the OZ relayer.
- **Signing and submission** flow through the adapter to the OZ relayer.
- **Read-only RPC calls** (chain id, block timestamps, contract reads, receipt confirmation) bypass the relayer entirely and go straight to `RPC_URL`.

## Mapping `GenericSigner` to OZ Relayer

| `GenericSigner` method        | Backed by                                                                                      |
| ----------------------------- | ---------------------------------------------------------------------------------------------- |
| `getChainId()`                | `publicClient.getChainId()` (RPC)                                                              |
| `getBlockTimestamp()`         | `publicClient.getBlock().timestamp` (RPC)                                                      |
| `getAddress()`                | `relayersApi.getRelayer(id).address` (cached)                                                  |
| `signTypedData(td)`           | `viem.hashDomain(td)` + `viem.hashStruct(td)` → `relayersApi.signTypedData({ ... })`           |
| `readContract(cfg)`           | `publicClient.readContract(cfg)` (RPC)                                                         |
| `writeContract(cfg)`          | `viem.encodeFunctionData(cfg)` → `relayersApi.sendTransaction(...)` → poll until hash assigned |
| `waitForTransactionReceipt()` | `publicClient.waitForTransactionReceipt({ hash })` (RPC)                                       |
| `subscribe()`                 | omitted (server-side signer; the SDK guards this method as optional)                           |

## Notable implementation details

- **`writeContract` returns the on-chain hash, not the relayer's transaction id.** The OZ relayer initially returns a transaction id; the on-chain hash is populated only once the relayer broadcasts the transaction. The adapter polls `getTransactionById` until `tx.hash` is set (or a terminal status — `failed`, `canceled`, `expired` — is reached) before returning. This matches the `Promise<Hex>` contract that `GenericSigner.writeContract` requires, so consumers can pass the result straight into `signer.waitForTransactionReceipt(...)`.
- **EIP-712 hashing happens locally.** The OZ relayer's `signTypedData` endpoint takes a pre-computed `(domain_separator, hash_struct_message)` pair, not the full typed data. The adapter strips the synthetic `EIP712Domain` entry from `types` and runs `hashDomain` / `hashStruct` from viem before posting to the relayer.
- **`value` is currently passed as a JS number.** The OZ relayer's `EvmTransactionRequest.value` schema is `number`. The adapter throws if a `bigint` value larger than `Number.MAX_SAFE_INTEGER` is passed in — for FHE confidential flows the value is virtually always `0`, so this is a non-issue in practice.
- **Storage is in-memory.** `MemoryStorage` is fine for examples but loses cached FHE artifacts and decrypt session signatures across restarts. For a long-running server, swap in a Redis-backed `GenericStorage` to avoid re-fetching the FHE public material and re-prompting the relayer for session signatures on every restart.
- **`subscribe` is intentionally omitted.** The Zama SDK only invokes it when defined (`if (this.signer.subscribe)`), so a server-side adapter can leave it out without breaking lifecycle handling.

## Using on Mainnet

The example targets Sepolia by default (`SepoliaConfig` + a Sepolia RPC URL). To run against Ethereum mainnet:

1. In `counter.ts`, swap the import and config:

   ```ts
   import { MainnetConfig, RelayerNode } from '@zama-fhe/sdk/node';

   const relayer = new RelayerNode({
     transports: {
       [chainId]: {
         ...MainnetConfig,
         network: rpcUrl,
         auth: { __type: 'ApiKeyHeader', value: process.env.ZAMA_FHEVM_API_KEY! },
       },
     },
     getChainId: () => Promise.resolve(chainId),
   });
   ```

2. Add `ZAMA_FHEVM_API_KEY` and a mainnet `RPC_URL` to your `.env`. Mainnet decryption requires an API key with Zama's gateway — see the [mainnet API key guide](https://github.com/zama-ai/relayer-sdk/blob/main/docs/mainnet-api-key.md).

3. Make sure the OZ relayer (`RELAYER_ID`) is configured for Ethereum mainnet.

## Comparison with the legacy example

| Concern                               | `relayer-sdk/` (legacy)                                  | `zama-sdk/` (this example)                                |
| ------------------------------------- | -------------------------------------------------------- | --------------------------------------------------------- |
| Zama package                          | `@zama-fhe/relayer-sdk@0.4.x`                            | `@zama-fhe/sdk@3.x`                                       |
| EIP-712 hashing                       | hand-rolled in the script with `ethers.TypedDataEncoder` | inside the adapter, reusable                              |
| Calling `relayersApi.signTypedData`   | hand-rolled in the script                                | inside the adapter                                        |
| Calling `relayersApi.sendTransaction` | hand-rolled in the script                                | inside the adapter                                        |
| Confirmation polling                  | hand-rolled in the script                                | `signer.waitForTransactionReceipt(hash)` (RPC)            |
| Deciding public vs. user decryption   | manual fallback chain in the script                      | `sdk.publicDecrypt` / `sdk.userDecrypt` (cached sessions) |
| Reuse across other Zama integrations  | none — every integration repeats the glue                | one adapter, plugs into every Zama SDK API                |

## Troubleshooting

- `Missing required environment variable` — fill in the parent `.env`.
- `Relayer "..." did not return an address` — the relayer id is valid but the API response had no `address` field; check the relayer's signer wiring.
- `Timed out waiting for relayer to assign a transaction hash` — only thrown when `maxSubmitPollAttempts` is set (otherwise the submit phase polls indefinitely). The relayer accepted the transaction but did not broadcast it within the cap; check relayer health, gas funding, and quotas. The confirmation phase inside `waitForTransactionReceipt` is _always_ uncapped — wrap with `Promise.race` if you need a deadline at the call site.
- `Public decryption failed` — expected when the handle is not publicly decryptable. The script then attempts user decryption.
- `User decryption failed` — verify that the relayer can sign typed data, the contract is on the configured chain, and the SDK's `storage` is actually persisting decrypt session signatures across runs (use Redis-backed storage in production).

## References

- [Zama SDK docs](https://github.com/zama-ai/sdk) — main repository for `@zama-fhe/sdk`.
- [Zama Relayer SDK guides](https://docs.zama.org/protocol/relayer-sdk-guides) — encryption and decryption flows.
- [OpenZeppelin Relayer docs](https://docs.openzeppelin.com/relayer) — relayer setup and API reference.
