/**
 * Zama FHE Counter Example
 *
 * This example demonstrates how to use the OpenZeppelin Relayer SDK to interact with the Zama FHE contracts.
 * Counter contract is deployed with the template at https://github.com/zama-ai/fhevm-hardhat-template
 *
 * For more information on the Zama Relayer SDK, see:
 * https://docs.zama.org/protocol/relayer-sdk-guides
 *
 * IMPORTANT: This is provided as a demonstration only. For production use:
 * - Replace the hardcoded addresses with your actual addresses
 * - Use proper error handling and transaction confirmation checks
 * - Implement appropriate security measures for API keys and tokens
 * - Consider rate limiting and monitoring for production applications
 * - Test thoroughly on devnet/testnet before using on mainnet
 * - Use https connection for production applications
 *
 * Usage:
 *   ts-node counter.ts
 */
import { config as loadEnv } from 'dotenv';
import { Configuration, EvmTransactionResponse, RelayersApi, SignDataResponseEvm, Speed } from '../../../../src';
import { DecryptionKeypair } from './types';
import { Interface, JsonRpcProvider, TypedDataEncoder, getAddress } from 'ethers';
import {
  SepoliaConfig,
  createInstance,
  // MainnetConfig,
  type FhevmInstance,
  type FhevmInstanceConfig,
} from '@zama-fhe/relayer-sdk/node';
import { join } from 'node:path';

import ABI from './abi.json';

loadEnv({ path: join(__dirname, '..', '.env'), quiet: true });

const transactionPollingIntervalMs = 2000;
const transactionPollingMaxAttempts = 60;
const iface = new Interface(ABI);

type Config = {
  apiKey: string;
  basePath: string;
  contractAddress: string;
  relayerId: string;
  rpcUrl: string;
  zamaPrivateKey?: string;
  zamaPublicKey?: string;
};

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function loadConfig(): Config {
  return {
    apiKey: getRequiredEnv('RELAYER_API_KEY'),
    basePath: process.env.RELAYER_BASE_PATH ?? 'http://localhost:8080',
    contractAddress: getRequiredEnv('ZAMA_CONTRACT_ADDRESS'),
    relayerId: getRequiredEnv('RELAYER_ID'),
    rpcUrl: process.env.RPC_URL ?? 'https://ethereum-sepolia-rpc.publicnode.com',
    zamaPrivateKey: process.env.ZAMA_PRIVATE_KEY,
    zamaPublicKey: process.env.ZAMA_PUBLIC_KEY,
  };
}

const configValues = loadConfig();

// Configuration
const config = new Configuration({
  basePath: configValues.basePath,
  accessToken: configValues.apiKey,
});
const relayersApi = new RelayersApi(config);

async function waitForTransactionConfirmation(transactionId: string): Promise<string | undefined> {
  for (let attempt = 1; attempt <= transactionPollingMaxAttempts; attempt += 1) {
    await new Promise((resolve) => setTimeout(resolve, transactionPollingIntervalMs));

    const txStatus = await relayersApi.getTransactionById(configValues.relayerId, transactionId);
    const transaction = txStatus.data.data as EvmTransactionResponse | undefined;

    if (!transaction) {
      throw new Error(`Transaction "${transactionId}" was not returned by the relayer`);
    }

    console.log(`⏳ Status: ${transaction.status} (${attempt}/${transactionPollingMaxAttempts})`);

    if (transaction.status === 'mined' || transaction.status === 'confirmed') {
      return transaction.hash;
    }

    if (transaction.status === 'failed' || transaction.status === 'canceled' || transaction.status === 'expired') {
      const reason = transaction.status_reason ? ` Reason: ${transaction.status_reason}` : '';
      throw new Error(`Transaction ${transaction.status}.${reason}`);
    }
  }

  throw new Error(
    `Transaction confirmation timed out after ${transactionPollingMaxAttempts * transactionPollingIntervalMs}ms`,
  );
}

/**
 * Reads the encrypted count from the contract
 */
async function getCount(provider: JsonRpcProvider, contractAddress: string): Promise<string> {
  const data = iface.encodeFunctionData('getCount', []);
  const result = await provider.call({ to: contractAddress, data });
  const decoded = iface.decodeFunctionResult('getCount', result);
  return decoded[0];
}

/**
 * Attempts to decrypt using public decryption (no permissions required)
 */
async function tryPublicDecrypt(instance: FhevmInstance, encryptedHandle: string): Promise<bigint | null> {
  try {
    const result = await instance.publicDecrypt([encryptedHandle]);
    const value = result.clearValues[encryptedHandle as `0x${string}`];
    return typeof value === 'bigint' ? value : null;
  } catch (error) {
    console.error('Public decryption failed:', error instanceof Error ? error.message : error);
    return null;
  }
}

type UserDecryptEip712 = ReturnType<FhevmInstance['createEIP712']>;

/**
 * Signs the EIP712 message with the relayer
 */
async function signTypedData(eip712: UserDecryptEip712, relayerId: string): Promise<string> {
  // Hash for signing
  const domainSeparator = TypedDataEncoder.hashDomain(eip712.domain);
  // Extract only the types needed for the struct (exclude EIP712Domain)
  const { EIP712Domain, ...structTypes } = eip712.types;
  const normalizedStructTypes = Object.fromEntries(
    Object.entries(structTypes).map(([typeName, fields]) => [typeName, [...fields]]),
  );
  const messageHash = TypedDataEncoder.hashStruct(eip712.primaryType, normalizedStructTypes, eip712.message);

  // Sign with relayer
  const signResponse = await relayersApi.signTypedData(relayerId, {
    domain_separator: domainSeparator,
    hash_struct_message: messageHash,
  });

  const signature = signResponse.data.data as SignDataResponseEvm;
  if (!signature.sig) {
    throw new Error('Failed to get signature from relayer');
  }

  return signature.sig;
}

/**
 * Decrypts using user decryption with relayer signature
 */
async function tryUserDecrypt(
  instance: FhevmInstance,
  encryptedHandle: string,
  contractAddress: string,
  relayerAddress: string,
  providedKeypair: DecryptionKeypair,
): Promise<bigint | null> {
  try {
    const keypair = providedKeypair;

    const handleContractPairs = [
      {
        handle: encryptedHandle,
        contractAddress: contractAddress,
      },
    ];

    const startTimeStamp = Math.floor((Date.now() - 24 * 60 * 60 * 1000) / 1000);
    const durationDays = 365;
    const contractAddresses = [contractAddress];

    // Create EIP712 message
    const eip712 = instance.createEIP712(keypair.publicKey, contractAddresses, startTimeStamp, durationDays);

    // Sign EIP712 message with relayer
    const signature = await signTypedData(eip712, configValues.relayerId);

    // Decrypt
    const result = (await instance.userDecrypt(
      handleContractPairs,
      keypair.privateKey,
      keypair.publicKey,
      signature,
      contractAddresses,
      relayerAddress,
      startTimeStamp,
      durationDays,
    )) as Record<string, bigint | undefined>;

    return result[encryptedHandle] ?? null;
  } catch (error) {
    console.error('User decryption failed:', error instanceof Error ? error.message : error);
    return null;
  }
}

/**
 * Attempts to decrypt (tries public first, then user)
 */
async function tryDecrypt(
  instance: FhevmInstance,
  encryptedHandle: string,
  contractAddress: string,
  relayerAddress: string,
  keypair: DecryptionKeypair,
): Promise<bigint | null> {
  // Try public decryption first
  let value = await tryPublicDecrypt(instance, encryptedHandle);
  if (value !== null) {
    console.log('✅ Decrypted (public):', value.toString());
    return value;
  }

  // Try user decryption
  value = await tryUserDecrypt(instance, encryptedHandle, contractAddress, relayerAddress, keypair);
  if (value !== null) {
    console.log('✅ Decrypted (user):', value.toString());
    return value;
  }

  console.log('❌ Decryption failed');
  return null;
}

/**
 * Increments the counter
 */
async function incrementCount(instance: FhevmInstance, contractAddress: string, relayerAddress: string): Promise<void> {
  console.log('\n🔼 Incrementing counter...');
  // Create encrypted input
  const encInput = instance.createEncryptedInput(contractAddress, relayerAddress);
  encInput.add32(1);
  const { handles, inputProof } = await encInput.encrypt({
    timeout: 90_000,
    onProgress: (progress: unknown) => console.log('Encrypt progress:', progress),
  });
  // Encode transaction data
  const data = iface.encodeFunctionData('increment', [handles[0], inputProof]);

  // Send transaction using relayer
  const txResponse = await relayersApi.sendTransaction(configValues.relayerId, {
    to: contractAddress,
    data,
    value: 0,
    gas_limit: 500000,
    speed: Speed.FAST,
  });

  const transactionId = txResponse.data.data?.id;
  if (!transactionId) {
    throw new Error('Failed to send transaction');
  }

  console.log('📝 Transaction submitted with ID:', transactionId);

  const txHash = await waitForTransactionConfirmation(transactionId);
  console.log('✅ Transaction confirmed! Hash:', txHash);
}

function retrieveOrGenerateKeypair(instance: FhevmInstance): DecryptionKeypair {
  if (configValues.zamaPublicKey && configValues.zamaPrivateKey) {
    return { publicKey: configValues.zamaPublicKey, privateKey: configValues.zamaPrivateKey };
  }
  return instance.generateKeypair();
}

/**
 * Main execution
 */
async function main() {
  try {
    console.log('🚀 Zama FHE Counter Example\n');
    console.log(`Relayer: ${configValues.relayerId}`);
    console.log(`Contract: ${configValues.contractAddress}\n`);
    // Initialize
    const zamaConfig: FhevmInstanceConfig = {
      ...SepoliaConfig,
      network: configValues.rpcUrl,
      // Uncomment to use API key authentication for Ethereum mainnet
      // MainnetConfig
      // auth: { __type: 'ApiKeyHeader', value: ZAMA_FHEVM_API_KEY },
    };
    const provider = new JsonRpcProvider(configValues.rpcUrl);
    const instance = await createInstance(zamaConfig);

    console.log('✅ FHE instance created\n');

    // Optional: Generate and reuse keypair for all decryptions
    const keypair = retrieveOrGenerateKeypair(instance);
    console.log('🔑 Decryption keypair ready\n');
    console.log('Public key:', keypair.publicKey);

    const relayerInfo = await relayersApi.getRelayer(configValues.relayerId);
    const rawRelayerAddress = relayerInfo.data.data?.address;
    if (!rawRelayerAddress) {
      throw new Error(`Relayer "${configValues.relayerId}" did not return an address`);
    }
    const relayerAddress = getAddress(rawRelayerAddress);
    console.log('🔑 Relayer address:', relayerAddress);

    // Step 1: Get count and decrypt
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 STEP 1: Get initial count');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    let encryptedCount = await getCount(provider, configValues.contractAddress);
    console.log('Encrypted handle:', encryptedCount);
    await tryDecrypt(instance, encryptedCount, configValues.contractAddress, relayerAddress, keypair);

    // Step 2: Increment
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 STEP 2: Increment counter');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    await incrementCount(instance, configValues.contractAddress, relayerAddress);

    // Step 3: Get count and decrypt
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 STEP 3: Get count after first increment');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    encryptedCount = await getCount(provider, configValues.contractAddress);
    console.log('Encrypted handle:', encryptedCount);
    await tryDecrypt(instance, encryptedCount, configValues.contractAddress, relayerAddress, keypair);

    // Step 4: Increment again
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 STEP 4: Increment counter again');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    await incrementCount(instance, configValues.contractAddress, relayerAddress);

    // Step 5: Get final count and decrypt
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 STEP 5: Get final count');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    encryptedCount = await getCount(provider, configValues.contractAddress);
    console.log('Encrypted handle:', encryptedCount);
    await tryDecrypt(instance, encryptedCount, configValues.contractAddress, relayerAddress, keypair);

    console.log('\n✨ Script completed successfully');
  } catch (error) {
    console.error('\n❌ Error:', error);
    if (error instanceof Error) {
      console.error('Message:', error.message);
    }
    process.exit(1);
  }
}

// Run
main();
