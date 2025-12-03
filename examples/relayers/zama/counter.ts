/**
 * Zama FHE Counter Example
 *
 * This example demonstrates how to use the OpenZeppelin Relayer SDK to interact with the Zama FHE contracts.
 * Counter contract is deployed with the template at https://github.com/zama-ai/fhevm-hardhat-template
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
import { Configuration, EvmTransactionResponse, RelayersApi, SignDataResponseEvm, Speed } from '../../../src';
import { DecryptionKeypair, EIP712 } from './types';
import { Interface, JsonRpcProvider, TypedDataEncoder, getAddress } from 'ethers';
import { SepoliaConfig, createInstance } from '@zama-fhe/relayer-sdk/node';

import ABI from './abi.json';

// Replace with your actual contract address and relayer id
const contractAddress = '0x861Ae8202EcCc10779289F5026b46506904BFEEC'; // Sepolia host chain contract address
const relayerId = 'sepolia-example'; // Sepolia relayer id
const basePath = 'http://localhost:8080';
const accessToken = '';

const zamaPublicKey = undefined; // Optional: Replace with your Zama public key. Will generate a new keypair if not provided.
const zamaPrivateKey = undefined; // Optional: Replace with your Zama private key. Will generate a new keypair if not provided.

// Configuration
const config = new Configuration({
  basePath,
  accessToken,
});
const relayersApi = new RelayersApi(config);

/**
 * Reads the encrypted count from the contract
 */
async function getCount(provider: JsonRpcProvider, contractAddress: string): Promise<string> {
  const iface = new Interface(ABI);
  const data = iface.encodeFunctionData('getCount', []);
  const result = await provider.call({ to: contractAddress, data });
  const decoded = iface.decodeFunctionResult('getCount', result);
  return decoded[0];
}

/**
 * Attempts to decrypt using public decryption (no permissions required)
 */
async function tryPublicDecrypt(instance: any, encryptedHandle: string): Promise<bigint | null> {
  try {
    const result = await instance.publicDecrypt([encryptedHandle]);
    return result?.[encryptedHandle] || null;
  } catch (error) {
    return null;
  }
}

/**
 * Signs the EIP712 message with the relayer
 */
async function signTypedData(eip712: EIP712, relayerId: string): Promise<string | null> {
  // Hash for signing
  const domainSeparator = TypedDataEncoder.hashDomain(eip712.domain);
  // Extract only the types needed for the struct (exclude EIP712Domain)
  const { EIP712Domain, ...structTypes } = eip712.types;
  const messageHash = TypedDataEncoder.hashStruct(eip712.primaryType, structTypes, eip712.message);

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
  instance: any,
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

    const startTimeStamp = Math.floor((Date.now() - 24 * 60 * 60 * 1000) / 1000).toString();
    const durationDays = 365;
    const contractAddresses = [contractAddress];

    // Create EIP712 message
    const eip712 = instance.createEIP712(keypair.publicKey, contractAddresses, startTimeStamp, durationDays);

    // Sign EIP712 message with relayer
    const signature = await signTypedData(eip712, relayerId);

    // Decrypt
    const result = await instance.userDecrypt(
      handleContractPairs,
      keypair.privateKey,
      keypair.publicKey,
      signature,
      contractAddresses,
      relayerAddress,
      startTimeStamp,
      durationDays,
    );

    return result[encryptedHandle] || null;
  } catch (error) {
    console.error('User decryption failed:', error instanceof Error ? error.message : error);
    return null;
  }
}

/**
 * Attempts to decrypt (tries public first, then user)
 */
async function tryDecrypt(
  instance: any,
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
async function incrementCount(instance: any, contractAddress: string, relayerAddress: string): Promise<void> {
  console.log('\n🔼 Incrementing counter...');
  // Create encrypted input
  const encInput = instance.createEncryptedInput(contractAddress, relayerAddress);
  encInput.add32(1);
  const { handles, inputProof } = await encInput.encrypt();

  // Encode transaction data
  const iface = new Interface(ABI);
  const data = iface.encodeFunctionData('increment', [handles[0], inputProof]);

  // Send transaction using relayer
  const txResponse = await relayersApi.sendTransaction(relayerId, {
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

  // Poll until status is mined, confirmed, or failed
  let status: string | undefined;
  let txHash: string | undefined;

  while (true) {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds

    const txStatus = await relayersApi.getTransactionById(relayerId, transactionId);
    status = txStatus.data.data?.status;
    txHash = (txStatus.data.data as EvmTransactionResponse).hash;

    console.log(`⏳ Status: ${status}`);

    if (status === 'mined' || status === 'confirmed') {
      console.log('✅ Transaction confirmed! Hash:', txHash);
      break;
    }

    if (status === 'failed') {
      throw new Error('Transaction failed');
    }
  }
}

function retrieveOrGenerateKeypair(instance: any): DecryptionKeypair {
  if (zamaPublicKey && zamaPrivateKey) {
    return { publicKey: zamaPublicKey, privateKey: zamaPrivateKey };
  }
  return instance.generateKeypair();
}

/**
 * Main execution
 */
async function main() {
  try {
    console.log('🚀 Zama FHE Counter Example\n');
    // Initialize
    const provider = new JsonRpcProvider(SepoliaConfig.network as string);
    const instance = await createInstance(SepoliaConfig);

    console.log('✅ FHE instance created\n');

    // Optional: Generate and reuse keypair for all decryptions
    const keypair = retrieveOrGenerateKeypair(instance);
    console.log('🔑 Generated keypair for decryption\n');
    console.log(keypair);

    const relayerInfo = await relayersApi.getRelayer(relayerId);
    const relayerAddress = getAddress(relayerInfo.data.data?.address || '');
    console.log('🔑 Relayer address:', relayerAddress);

    // Step 1: Get count and decrypt
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 STEP 1: Get initial count');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    let encryptedCount = await getCount(provider, contractAddress);
    console.log('Encrypted handle:', encryptedCount);
    await tryDecrypt(instance, encryptedCount, contractAddress, relayerAddress, keypair);

    // Step 2: Increment
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 STEP 2: Increment counter');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    await incrementCount(instance, contractAddress, relayerAddress);

    // Step 3: Get count and decrypt
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 STEP 3: Get count after first increment');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    encryptedCount = await getCount(provider, contractAddress);
    console.log('Encrypted handle:', encryptedCount);
    await tryDecrypt(instance, encryptedCount, contractAddress, relayerAddress, keypair);

    // Step 4: Increment again
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 STEP 4: Increment counter again');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    await incrementCount(instance, contractAddress, relayerAddress);

    // Step 5: Get final count and decrypt
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 STEP 5: Get final count');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    encryptedCount = await getCount(provider, contractAddress);
    console.log('Encrypted handle:', encryptedCount);
    await tryDecrypt(instance, encryptedCount, contractAddress, relayerAddress, keypair);

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
