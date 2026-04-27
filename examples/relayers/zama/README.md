# Zama FHE Examples

This directory contains two end-to-end examples of using the OpenZeppelin Relayer SDK with a Zama FHE-enabled EVM contract. Both examples interact with the same counter contract deployed from Zama's [`fhevm-hardhat-template`](https://github.com/zama-ai/fhevm-hardhat-template), and both share a single `.env` (placed at this directory level) so you only configure your relayer once.

| Subdirectory                    | Zama package                          | Style                                                                                                                                            |
| ------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`relayer-sdk/`](./relayer-sdk) | `@zama-fhe/relayer-sdk@0.4.x`         | Legacy / minimal. All glue lives in user code: hand-roll EIP-712 hashing, call `relayersApi.signTypedData` / `sendTransaction`, poll for status. |
| [`zama-sdk/`](./zama-sdk)       | `@zama-fhe/sdk@3.x` + `GenericSigner` | Recommended for new integrations. The relayer is plugged in as a `GenericSigner`; application code uses the high-level `ZamaSDK` API.            |

## Which one should I use?

- **Starting a new integration?** Use [`zama-sdk/`](./zama-sdk). The adapter pattern is reusable across the entire Zama SDK — once the relayer is wrapped as a `GenericSigner`, you get `ZamaSDK`, the ERC-7984 `Token` wrapper, the wrappers registry, decrypt session caching, and event hooks for free.
- **Already on `@zama-fhe/relayer-sdk@0.4.x`?** [`relayer-sdk/`](./relayer-sdk) is the closest reference and stays around for parity. It is also useful if you want to see exactly which raw relayer API calls a Zama FHE flow needs — there is no abstraction in the way.

The two examples can run side-by-side from the same `.env` and produce equivalent results on the counter contract.

## Shared configuration

Copy [`.env.example`](./.env.example) to `.env` in this directory:

```bash
cp examples/relayers/zama/.env.example examples/relayers/zama/.env
```

Required values (used by both examples):

- `RELAYER_API_KEY`
- `RELAYER_ID`
- `ZAMA_CONTRACT_ADDRESS`
- `RPC_URL` (defaults to a public Sepolia RPC)
- `RELAYER_BASE_PATH` (defaults to `http://localhost:8080`)

Optional, only used by the user-decryption flow:

- `ZAMA_PUBLIC_KEY`, `ZAMA_PRIVATE_KEY` — reuse a previously generated decryption keypair across runs. The legacy example ships a [`generate-keypair.ts`](./relayer-sdk/generate-keypair.ts) helper that prints values you can paste back into `.env`.

Each subdirectory's `README.md` has the full quickstart, architecture notes, and troubleshooting for that path.
