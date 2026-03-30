# Zama Relayer Example

This directory contains a first end-to-end example of using the OpenZeppelin Relayer SDK with a Zama FHE-enabled EVM contract.

## Objective

This example shows the minimum viable integration path:

1. Configure a relayer and a deployed FHE contract.
2. Read encrypted state from the contract.
3. Decrypt the state, first via public decryption when possible.
4. Fall back to user decryption authorized with an EIP-712 signature produced by the relayer.
5. Send an encrypted transaction through the relayer.
6. Poll the relayer until the transaction is mined or confirmed.

## Quickstart

1. Install dependencies from the repository root:

```bash
pnpm install
```

2. Copy [`.env.example`](./.env.example) to `.env` in this directory.

3. Fill in:

- `RELAYER_API_KEY`
- `RELAYER_ID`
- `ZAMA_CONTRACT_ADDRESS`
- `RPC_URL`
- `RELAYER_BASE_PATH` if you are not using the default

4. (Optional) Generate a reusable decryption keypair:

```bash
npx ts-node examples/relayers/zama/generate-keypair.ts
```

Copy the output `ZAMA_PUBLIC_KEY` and `ZAMA_PRIVATE_KEY` values into your `.env` file. If you skip this step, the counter script will generate a fresh keypair on each run.

5. Run the example from the repository root:

```bash
npx ts-node examples/relayers/zama/counter.ts
```

6. Check that the script:

- reads the encrypted counter value
- decrypts it
- sends an encrypted increment through the relayer
- waits for confirmation
- reads and decrypts the updated value

## What The Example Does

The main script is [counter.ts](./counter.ts). It interacts with a counter contract deployed from Zama's `fhevm-hardhat-template`.

The flow is:

1. Load configuration from `.env`.
2. Create a Zama FHE instance for Sepolia.
3. Fetch the relayer address from the OpenZeppelin Relayer API.
4. Read the encrypted counter value with `getCount()`.
5. Try to decrypt it.
6. Encrypt an increment input and submit `increment()` through the relayer.
7. Wait for confirmation.
8. Read and decrypt the updated counter again.

This makes the example useful as both:

- A functional demo.
- A reference for the relayer-specific parts of an FHE flow.

## Architecture

There are four moving parts in this example:

- Your script: orchestrates the flow and prints progress.
- The OpenZeppelin relayer: signs typed data and submits transactions.
- The Zama FHE SDK instance: encrypts inputs and manages decryption flows.
- The deployed counter contract: stores the encrypted state on-chain.

The important boundary is that the relayer is not doing the encryption itself. The Zama SDK handles encryption and decryption primitives, while the relayer provides transaction execution and signature authorization.

## Files

- [counter.ts](./counter.ts): main end-to-end example.
- [generate-keypair.ts](./generate-keypair.ts): generates a Zama decryption keypair for reuse across runs.
- [types.ts](./types.ts): local typings for the decryption keypair and EIP-712 payload.
- [abi.json](./abi.json): ABI for the example counter contract.
- [.env.example](./.env.example): required environment variables.

## Prerequisites

- Node.js `>= 22.14.0`
- Project dependencies installed with `pnpm install`
- Access to an OpenZeppelin relayer with:
  - a valid `RELAYER_API_KEY`
  - a `RELAYER_ID`
  - an EVM address returned by the relayer API
- A Zama FHE counter contract deployed on Sepolia

## Configuration

Copy [`.env.example`](./.env.example) to `.env` in this directory and fill in the values:

```bash
RELAYER_API_KEY=
RELAYER_ID=
ZAMA_CONTRACT_ADDRESS=
RPC_URL=https://ethereum-sepolia-rpc.publicnode.com
RELAYER_BASE_PATH=http://localhost:8080

# Optional: reuse an existing keypair for user decryption
# ZAMA_PUBLIC_KEY=
# ZAMA_PRIVATE_KEY=
```

Notes:

- `RELAYER_BASE_PATH` defaults to `http://localhost:8080` in the script.
- `RPC_URL` defaults to `https://ethereum-sepolia-rpc.publicnode.com` in the script. Point it to the RPC for the network you are targeting.
- If `ZAMA_PUBLIC_KEY` and `ZAMA_PRIVATE_KEY` are not set, the script generates a fresh decryption keypair.
- Reusing the same decryption keypair is useful if you want consistent user decryption behavior across runs.

## Expected Output

At a high level, the script should:

- Print the relayer id, contract address, generated or loaded public key, and relayer address.
- Read the encrypted counter handle.
- Attempt decryption and print the clear value if successful.
- Submit an increment transaction through the relayer.
- Poll until the transaction reaches `mined` or `confirmed`.
- Read and decrypt the new counter value.

## Decryption Model

The script uses two decryption paths:

1. Public decryption.
If the encrypted handle can be decrypted publicly, the script uses that result directly.

2. User decryption.
If public decryption is not available, the script creates an EIP-712 payload through the Zama SDK and asks the relayer to sign it with `signTypedData`. That signature is then used to authorize `userDecrypt`.

This fallback structure is useful because it shows both the simple path and the relayer-authorized path in one example.

## Why The Relayer Matters Here

In this example, the relayer is responsible for two separate concerns:

- Transaction submission: it sends the encrypted `increment()` call on-chain.
- Authorization: it signs the EIP-712 payload used in the user decryption flow.

That is the main integration point this example should teach.

## Current Limitations

- The example is hardcoded for Sepolia via `SepoliaConfig`, plus an explicit Sepolia RPC URL.
- It assumes a counter contract shape compatible with the included ABI.
- It is a demo script, so logging and error handling are intentionally simple.
- It does not cover relayer creation or contract deployment.

## Troubleshooting

- `Missing required environment variable`: one of the required values in `.env` is unset.
- `did not return an address`: the configured relayer id is valid for the API, but the response did not include an EVM address.
- `Public decryption failed`: this can be expected depending on the contract and permissions. The script should then try user decryption.
- `User decryption failed`: check that the relayer can sign typed data correctly and that the contract address and decryption keypair are the ones you expect.
- Transaction polling timeout: the transaction may still be pending, the relayer may be unhealthy, or the target chain may be slow.
