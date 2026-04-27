/**
 * Zama FHE Counter Example — `@zama-fhe/sdk` integration
 *
 * Demonstrates using the OpenZeppelin Relayer SDK with the new top-level Zama
 * SDK (`@zama-fhe/sdk`, v3.x). The relayer is plugged in as a `GenericSigner`
 * via `OpenZeppelinRelayerSigner`, so the application code only deals with the
 * high-level `ZamaSDK` API. EIP-712 hashing, signature requests, transaction
 * submission, and confirmation polling are all handled inside the adapter.
 *
 * Counter contract is deployed with the template at
 * https://github.com/zama-ai/fhevm-hardhat-template
 *
 * Usage:
 *   ts-node examples/relayers/zama/zama-sdk/counter.ts
 */
import { config as loadEnv } from 'dotenv';
import { join } from 'node:path';
import { type Hex, bytesToHex, getAddress } from 'viem';

import { MemoryStorage, ZamaSDK } from '@zama-fhe/sdk';
import { RelayerNode, SepoliaConfig } from '@zama-fhe/sdk/node';

import { Configuration, RelayersApi } from '../../../../src';
import counterAbi from './abi.json';
import { OpenZeppelinRelayerSigner } from './openzeppelin-relayer-signer';

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

  // 2. GenericSigner backed by OZ relayer
  const signer = new OpenZeppelinRelayerSigner({ relayersApi, relayerId, rpcUrl });
  const [relayerAddress, chainId] = await Promise.all([signer.getAddress(), signer.getChainId()]);
  console.log(`🔑 Relayer address: ${relayerAddress}`);
  console.log(`⛓  Chain id:       ${chainId}\n`);

  // 3. Zama FHE backend (worker pool, no signer)
  const relayer = new RelayerNode({
    transports: { [chainId]: { ...SepoliaConfig, network: rpcUrl } },
    getChainId: () => Promise.resolve(chainId),
  });

  // 4. Compose ZamaSDK — relayer + signer + storage
  const sdk = new ZamaSDK({
    relayer,
    signer,
    storage: new MemoryStorage(),
  });

  try {
    const readCount = async (): Promise<Hex> => {
      const encrypted = await signer.readContract({
        address: contractAddress,
        abi: counterAbi as never,
        functionName: 'getCount',
        args: [],
      });
      return encrypted as Hex;
    };

    const decrypt = async (handle: Hex): Promise<bigint | null> => {
      try {
        const pub = await sdk.publicDecrypt([handle]);
        const value = pub.clearValues[handle];
        if (typeof value === 'bigint') {
          console.log(`✅ Decrypted (public): ${value}`);
          return value;
        }
      } catch (err) {
        console.warn('Public decryption failed:', err instanceof Error ? err.message : err);
      }
      try {
        const result = await sdk.userDecrypt([{ handle, contractAddress }]);
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
    const encrypted = await relayer.encrypt({
      values: [{ value: 1n, type: 'euint32' }],
      contractAddress,
      userAddress: relayerAddress,
    });
    const txHash = await signer.writeContract({
      address: contractAddress,
      abi: counterAbi as never,
      functionName: 'increment',
      args: [bytesToHex(encrypted.handles[0]), bytesToHex(encrypted.inputProof)],
    });
    console.log(`📝 Submitted tx: ${txHash}`);
    await signer.waitForTransactionReceipt(txHash);
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
    relayer.terminate();
  }
}

main().catch((err) => {
  console.error('\n❌ Error:', err);
  if (err instanceof Error) {
    console.error('Message:', err.message);
  }
  process.exit(1);
});
