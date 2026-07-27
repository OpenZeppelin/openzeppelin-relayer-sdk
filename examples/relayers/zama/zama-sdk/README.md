# Zama FHE Example (`@zama-fhe/sdk` + `GenericSigner`)

This directory shows how to integrate the OpenZeppelin Relayer SDK with Zama's officially released top-level FHE SDK ([`@zama-fhe/sdk`](https://www.npmjs.com/package/@zama-fhe/sdk), v3.x) by implementing Zama's `GenericSigner` interface on top of the relayer.

If you are looking for the legacy integration that uses [`@zama-fhe/relayer-sdk`](https://www.npmjs.com/package/@zama-fhe/relayer-sdk) (v0.4.x) directly — no signer abstraction, all wiring done in user code — see [`../relayer-sdk/`](../relayer-sdk/).

## Why a `GenericSigner`

`@zama-fhe/sdk` splits the wallet contract in two framework-agnostic interfaces:

- **`GenericSigner`** — write authority: `signTypedData` (decrypt authorization) and `writeContract` (on-chain submission), plus an observable `walletAccount` store.
- **`GenericProvider`** — read-only RPC: `getChainId`, `readContract`, `getBlockTimestamp`, `waitForTransactionReceipt`.

The SDK ships built-in adapters (`@zama-fhe/sdk/viem`, `@zama-fhe/sdk/ethers`, `@zama-fhe/react-sdk/wagmi`), and any other backend can plug in by implementing the same interfaces. Because the OpenZeppelin Relayer naturally fits the **signer** contract — it signs typed data and submits transactions on behalf of an address — the integration reduces to a single adapter class. Reads never touch the relayer, so the example wires the SDK's built-in `ViemProvider` (a viem `PublicClient`) for the **provider** half.

From there, every other piece of the Zama SDK (decrypt sessions, the `Token` ERC-7984 wrapper, the wrappers registry, etc.) works without any relayer-specific code.

## Files

- [openzeppelin-relayer-signer.ts](./openzeppelin-relayer-signer.ts) — `OpenZeppelinRelayerSigner extends BaseSigner`. Hashes EIP-712 payloads with viem, calls `relayersApi.signTypedData` for signatures, encodes calldata + calls `relayersApi.sendTransaction` for writes, then polls `getTransactionById` until the relayer mines the transaction and returns the final on-chain hash. Extending `BaseSigner` provides the `walletAccount` store and `requireWalletAccount` boilerplate.
- [counter.ts](./counter.ts) — end-to-end demo that mirrors the legacy example but uses `createConfig` + `ZamaSDK` + the adapter.
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

   > The `ZAMA_PUBLIC_KEY` / `ZAMA_PRIVATE_KEY` values in `.env.example` are only used by the legacy example — `@zama-fhe/sdk` manages decrypt keypairs and sessions for you.

3. Run the example from the repository root:

   ```bash
   npx ts-node examples/relayers/zama/zama-sdk/counter.ts
   ```

The script reads the encrypted counter, decrypts it (public path first, falling back to user decrypt), submits an encrypted `increment()` through the relayer, waits for confirmation, and decrypts the new value.

## Architecture

Four objects are wired together with `createConfig`:

```
┌─────────────────────────┐    encrypts/decrypts    ┌──────────────────┐
│ node() transport        │  ◄────────────────────► │ Zama gateway     │
│ (FHE worker pool, WASM) │                         └──────────────────┘
└────────────┬────────────┘
             │
             ▼ composed by createConfig()
┌─────────────────────────┐
│ ZamaSDK                 │  high-level API:
│  - signer   (writes)    │   sdk.encrypt(...)
│  - provider (reads)     │   sdk.decryption.decryptPublicValues(...)
│  - storage              │   sdk.decryption.decryptValues(...)
└──────┬───────────┬──────┘   sdk.createToken(addr).balanceOf(...)
       │           │
       │           ▼ reads via viem PublicClient (RPC)
       │      ┌──────────────────┐
       │      │ ViemProvider     │ ──► RPC_URL
       │      └──────────────────┘
       ▼ delegates signTypedData / writeContract
┌─────────────────────────┐    REST API     ┌──────────────────┐
│ OpenZeppelinRelayer     │ ◄────────────► │ OZ Relayer        │
│ Signer (this dir)       │                │ (your deployment) │
└─────────────────────────┘                └──────────────────┘
```

- **Encryption / decryption** stays inside the Zama SDK (the `node()` transport) and never touches the OZ relayer.
- **Signing and submission** flow through the adapter to the OZ relayer.
- **Read-only RPC calls** (chain id, block timestamps, contract reads, receipt confirmation) go through `ViemProvider` straight to `RPC_URL`, bypassing the relayer entirely.

## Composing the SDK

```ts
import { MemoryStorage, ZamaSDK, createConfig } from '@zama-fhe/sdk';
import { sepolia } from '@zama-fhe/sdk/chains';
import { node } from '@zama-fhe/sdk/node';
import { ViemProvider } from '@zama-fhe/sdk/viem';

const provider = new ViemProvider({ publicClient });
const chainId = await provider.getChainId();
const signer = await OpenZeppelinRelayerSigner.create({ relayersApi, relayerId, chainId });

const chain = { ...sepolia, network: rpcUrl };
const sdk = new ZamaSDK(
  createConfig({
    chains: [chain],
    signer,
    provider,
    storage: new MemoryStorage(),
    relayers: { [chain.id]: node() },
  }),
);
```

## Mapping the interfaces to the OZ Relayer

| Interface method                              | Backed by                                                                              |
| --------------------------------------------- | -------------------------------------------------------------------------------------- |
| `GenericProvider.getChainId()`                | `publicClient.getChainId()` (RPC, via `ViemProvider`)                                  |
| `GenericProvider.getBlockTimestamp()`         | `publicClient.getBlock().timestamp` (RPC, via `ViemProvider`)                          |
| `GenericProvider.readContract(cfg)`           | `publicClient.readContract(cfg)` (RPC, via `ViemProvider`)                             |
| `GenericProvider.waitForTransactionReceipt()` | `publicClient.waitForTransactionReceipt({ hash })` (RPC, via `ViemProvider`)           |
| `GenericSigner.walletAccount`                 | seeded with `{ address, chainId }` at `OpenZeppelinRelayerSigner.create()`             |
| `GenericSigner.signTypedData(td)`             | `viem.hashDomain(td)` + `viem.hashStruct(td)` → `relayersApi.signTypedData({ ... })`   |
| `GenericSigner.writeContract(cfg)`            | `viem.encodeFunctionData(cfg)` → `relayersApi.sendTransaction(...)` → poll until mined |

## Notable implementation details

- **`writeContract` waits until the transaction is mined and returns the final on-chain hash.** The OZ relayer broadcasts asynchronously and may re-broadcast a fee-bumped replacement under a new hash. The adapter polls `getTransactionById` until the relayer reports `mined`/`confirmed` (or a terminal status — `failed`, `canceled`, `expired`) and returns the final hash. This means the hash handed back is one that `GenericProvider.waitForTransactionReceipt` can resolve directly against the RPC — no relayer-specific bookkeeping leaks into the read path. Polling is uncapped by default (fee-escalation cycles can outlast any default); pass `maxPollAttempts` to bound it, or wrap `writeContract` in `Promise.race` for a deadline at the call site.
- **EIP-712 hashing happens locally.** The OZ relayer's `signTypedData` endpoint takes a pre-computed `(domain_separator, hash_struct_message)` pair, not the full typed data. The adapter strips the synthetic `EIP712Domain` entry from `types` and runs `hashDomain` / `hashStruct` from viem before posting to the relayer.
- **The wallet account is seeded once.** `GenericSigner` no longer exposes `getAddress()`; instead the SDK reads a `walletAccount` snapshot (`{ address, chainId }`). Because the relayer resolves its address asynchronously, construct the signer through the static `OpenZeppelinRelayerSigner.create(...)` factory (which fetches the relayer address) rather than `new`.
- **No manual decrypt keypair.** Unlike the legacy example, the SDK generates and caches the decrypt keypair and user-decrypt session signatures in `storage` for you. `MemoryStorage` is fine for examples but loses those artifacts across restarts; for a long-running server, swap in a Redis-backed `GenericStorage` to avoid re-fetching FHE public material and re-prompting the relayer for session signatures on every restart.
- **`value` is passed as a JS number.** The OZ relayer's `EvmTransactionRequest.value` schema is `number`. The adapter throws if a `bigint` value larger than `Number.MAX_SAFE_INTEGER` is passed — for FHE confidential flows the value is virtually always `0`, so this is a non-issue in practice.
- **Tear down the worker pool.** `node()` spawns WASM worker threads that keep the process alive. Call `sdk.terminate()` when done (the example does this in a `finally` block).

## Using on Mainnet

The example targets Sepolia by default (`sepolia` chain + a Sepolia RPC URL). To run against Ethereum mainnet:

1. In `counter.ts`, swap the chain import and add API-key auth:

   ```ts
   import { mainnet } from '@zama-fhe/sdk/chains';

   const chain = {
     ...mainnet,
     network: rpcUrl,
     auth: { __type: 'ApiKeyHeader', value: process.env.ZAMA_FHEVM_API_KEY! },
   };
   // relayers: { [chain.id]: node() }
   ```

2. Add `ZAMA_FHEVM_API_KEY` and a mainnet `RPC_URL` to your `.env`. Mainnet decryption requires an API key with Zama's gateway — see the [mainnet API key guide](https://github.com/zama-ai/relayer-sdk/blob/main/docs/mainnet-api-key.md).

3. Make sure the OZ relayer (`RELAYER_ID`) is configured for Ethereum mainnet.

## Comparison with the legacy example

| Concern                               | `relayer-sdk/` (legacy)                                  | `zama-sdk/` (this example)                                      |
| ------------------------------------- | -------------------------------------------------------- | --------------------------------------------------------------- |
| Zama package                          | `@zama-fhe/relayer-sdk@0.4.x`                            | `@zama-fhe/sdk@3.x`                                             |
| EIP-712 hashing                       | hand-rolled in the script with `ethers.TypedDataEncoder` | inside the adapter, reusable                                    |
| Calling `relayersApi.signTypedData`   | hand-rolled in the script                                | inside the adapter                                              |
| Calling `relayersApi.sendTransaction` | hand-rolled in the script                                | inside the adapter                                              |
| Confirmation polling                  | hand-rolled in the script                                | inside the adapter (`writeContract` returns a mined hash)       |
| Decrypt keypair / sessions            | generated and passed manually in the script              | managed by the SDK in `storage`                                 |
| Deciding public vs. user decryption   | manual fallback chain in the script                      | `sdk.decryption.decryptPublicValues` / `decryptValues` (cached) |
| Reuse across other Zama integrations  | none — every integration repeats the glue                | one adapter, plugs into every Zama SDK API                      |

## Troubleshooting

- `Missing required environment variable` — fill in the parent `.env`.
- `Relayer "..." did not return an address` — the relayer id is valid but the API response had no `address` field; check the relayer's signer wiring.
- `Timed out waiting for relayer to mine the transaction` — only thrown when `maxPollAttempts` is set (otherwise `writeContract` polls indefinitely). The relayer accepted the transaction but did not mine it within the cap; check relayer health, gas funding, and quotas.
- `Public decryption failed` — expected when the handle is not publicly decryptable. The script then attempts user decryption.
- `User decryption failed` — verify that the relayer can sign typed data, the contract is on the configured chain, and the SDK's `storage` is actually persisting decrypt session signatures across runs (use Redis-backed storage in production).

## References

- [Zama Protocol SDK docs](https://docs.zama.org/protocol/sdk) — official documentation for `@zama-fhe/sdk`.
- [Zama Relayer SDK guides](https://docs.zama.org/protocol/relayer-sdk-guides) — encryption and decryption flows.
- [OpenZeppelin Relayer docs](https://docs.openzeppelin.com/relayer) — relayer setup and API reference.
