/**
 * Zama FHE Counter Example — `@zama-fhe/sdk` integration
 *
 * Demonstrates using the OpenZeppelin Relayer SDK with Zama's top-level FHE SDK
 * (`@zama-fhe/sdk`, v3.x). The relayer is plugged in as a `GenericSigner` via
 * `OpenZeppelinRelayerSigner`, so application code only deals with the
 * high-level `ZamaSDK` API. Reads go through the SDK's built-in `ViemProvider`
 * (a viem `PublicClient`); signing and submission flow through the relayer.
 * EIP-712 hashing, signature requests, transaction submission, and confirmation
 * polling are all handled inside the adapter or the SDK.
 *
 * Counter contract is deployed with the template at
 * https://github.com/zama-ai/fhevm-hardhat-template
 *
 * Usage:
 *   ts-node examples/relayers/zama/zama-sdk/counter.ts
 */
import { config as loadEnv } from 'dotenv';
import { join } from 'node:path';
import { type Abi, type Hex, createPublicClient, getAddress, http } from 'viem';

import { MemoryStorage, ZamaSDK, createConfig } from '@zama-fhe/sdk';
import { sepolia } from '@zama-fhe/sdk/chains';
import { node } from '@zama-fhe/sdk/node';
import { ViemProvider } from '@zama-fhe/sdk/viem';

import { Configuration, RelayersApi } from '../../../../src';
import counterAbi from './abi.json';
import { OpenZeppelinRelayerSigner } from './openzeppelin-relayer-signer';

const typedCounterAbi = counterAbi as Abi;

loadEnv({ path: join(__dirname, '..', '.env'), quiet: true });

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

async function main() {
  console.log('🚀 Zama FHE Counter Example (zama-sdk)\n');

  const apiKey = getRequiredEnv('RELAYER_API_KEY');
  const relayerId = getRequiredEnv('RELAYER_ID');
  const contractAddress = getAddress(getRequiredEnv('ZAMA_CONTRACT_ADDRESS'));
  const rpcUrl = process.env.RPC_URL ?? 'https://ethereum-sepolia-rpc.publicnode.com';
  const basePath = process.env.RELAYER_BASE_PATH ?? 'http://localhost:8080';

  console.log(`Relayer:  ${relayerId}`);
  console.log(`Contract: ${contractAddress}\n`);

  // 1. OZ relayer client
  const relayersApi = new RelayersApi(new Configuration({ basePath, accessToken: apiKey }));

  // 2. GenericProvider — all read-only RPC (chain id, reads, receipts) via viem.
  const publicClient = createPublicClient({ transport: http(rpcUrl) });
  const provider = new ViemProvider({ publicClient });
  const chainId = await provider.getChainId();

  // 3. GenericSigner — signing + submission via the OZ relayer.
  const signer = await OpenZeppelinRelayerSigner.create({ relayersApi, relayerId, chainId });
  const relayerAddress = signer.address;
  console.log(`🔑 Relayer address: ${relayerAddress}`);
  console.log(`⛓  Chain id:       ${chainId}\n`);

  // 4. Compose ZamaSDK — chain, relayer transport, signer, provider, storage.
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

  try {
    const readCount = async (): Promise<Hex> => {
      const encrypted = await provider.readContract({
        address: contractAddress,
        abi: typedCounterAbi,
        functionName: 'getCount',
        args: [],
      });
      return encrypted as Hex;
    };

    const decrypt = async (handle: Hex): Promise<bigint | null> => {
      // Public decryption — no signature required. Works when the handle is
      // marked publicly decryptable on-chain.
      try {
        const pub = await sdk.decryption.decryptPublicValues([handle]);
        const value = pub.clearValues[handle];
        if (typeof value === 'bigint') {
          console.log(`✅ Decrypted (public): ${value}`);
          return value;
        }
      } catch (err) {
        console.warn('Public decryption failed:', err instanceof Error ? err.message : err);
      }
      // User decryption — the SDK creates the EIP-712 request, has the relayer
      // (our signer) authorize it, and caches the decrypt session in storage.
      try {
        const result = await sdk.decryption.decryptValues([{ encryptedValue: handle, contractAddress }]);
        const value = result[handle];
        if (typeof value === 'bigint') {
          console.log(`✅ Decrypted (user): ${value}`);
          return value;
        }
      } catch (err) {
        console.warn('User decryption failed:', err instanceof Error ? err.message : err);
      }
      console.log('❌ Decryption failed');
      return null;
    };

    // STEP 1: read & decrypt initial count
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 STEP 1: initial count');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    let handle = await readCount();
    console.log(`Encrypted handle: ${handle}`);
    await decrypt(handle);

    // STEP 2: encrypt input + submit increment via the relayer
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 STEP 2: increment counter');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    const { encryptedValues, inputProof } = await sdk.encrypt({
      values: [{ value: 1n, type: 'euint32' }],
      contractAddress,
      userAddress: relayerAddress,
    });
    const txHash = await signer.writeContract({
      address: contractAddress,
      abi: typedCounterAbi,
      functionName: 'increment',
      args: [encryptedValues[0], inputProof],
    });
    console.log(`📝 Submitted tx: ${txHash}`);
    await provider.waitForTransactionReceipt(txHash);
    console.log('✅ Confirmed on chain');

    // STEP 3: read & decrypt final count
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 STEP 3: final count');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    handle = await readCount();
    console.log(`Encrypted handle: ${handle}`);
    await decrypt(handle);

    console.log('\n✨ Script completed successfully');
  } finally {
    // Tear down the FHE worker pool so the process can exit.
    sdk.terminate();
  }
}

main().catch((err) => {
  console.error('\n❌ Error:', err);
  if (err instanceof Error) {
    console.error('Message:', err.message);
  }
  process.exit(1);
});
