/**
 * Zama FHE Keypair Generator
 *
 * Generates a Zama decryption keypair (public/private key) that can be reused
 * across example scripts. Set the output values as ZAMA_PUBLIC_KEY and
 * ZAMA_PRIVATE_KEY in your .env file.
 *
 * Usage:
 *   ts-node generate-keypair.ts
 */
import { config as loadEnv } from 'dotenv';
import { SepoliaConfig, createInstance, type FhevmInstanceConfig } from '@zama-fhe/relayer-sdk/node';
import { join } from 'node:path';

loadEnv({ path: join(__dirname, '.env'), quiet: true });

async function main() {
  const rpcUrl = process.env.RPC_URL ?? 'https://ethereum-sepolia-rpc.publicnode.com';

  console.log('Initializing Zama FHE instance...\n');

  const zamaConfig: FhevmInstanceConfig = {
    ...SepoliaConfig,
    network: rpcUrl,
  };

  const instance = await createInstance(zamaConfig);
  const keypair = instance.generateKeypair();

  console.log('Keypair generated. Add the following to your .env file:\n');
  console.log(`ZAMA_PUBLIC_KEY=${keypair.publicKey}`);
  console.log(`ZAMA_PRIVATE_KEY=${keypair.privateKey}`);
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
