/**
 * Solana signTransaction Example with Manual RPC Submission
 *
 * This example demonstrates how to:
 * 1. Use the OpenZeppelin Relayer SDK sign endpoint to sign a Solana transaction
 * 2. Submit the signed transaction directly to Solana devnet using bare bone RPC
 * 3. Confirm the transaction on the blockchain
 *
 * This is useful when you want to separate the signing step from the submission step,
 * or when you need more control over the transaction submission process.
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
 *   ts-node signTransaction.ts
 */
import { Configuration, RelayersApi } from '../../../src';

import { createSolanaRpc } from '@solana/kit';
import { getSerializedTokenTransfer } from './util';

const rpc = createSolanaRpc('https://api.devnet.solana.com');

// example dev config
const config = new Configuration({
  basePath: 'http://localhost:8080',
  accessToken: 'EDD3252B-32DD-485B-A618-C1C8CBFC546', // replace with your actual api key
});

const relayersApi = new RelayersApi(config);

// Replace with your actual values
const relayer_id = 'solana-example';
const source = 'C6VBV1EK2Jx7kFgCkCD5wuDeQtEH8ct2hHGUPzEhUSc8';
const destination = 'Gt6wiPeC3XqNZKnMcM2dbRZCkKr1PtytBxf9hhV7Hxew';
const token = 'Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr'; // USDC token mint address

/**
 * Helper function to wait for transaction confirmation
 * @param signature - Transaction signature
 * @param maxAttempts - Maximum number of confirmation attempts
 * @returns Transaction confirmation status
 */
async function confirmTransaction(signature: string, maxAttempts = 30): Promise<void> {
  console.log(`\nWaiting for transaction confirmation...`);
  console.log(`Signature: ${signature}`);

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const { value: statuses } = await rpc
        .getSignatureStatuses([signature as any], { searchTransactionHistory: true })
        .send();

      const status = statuses[0];
      if (status !== null) {
        if (status.err) {
          throw new Error(`Transaction failed: ${JSON.stringify(status.err)}`);
        }

        if (status.confirmationStatus === 'confirmed' || status.confirmationStatus === 'finalized') {
          console.log(`✓ Transaction confirmed with status: ${status.confirmationStatus}`);
          console.log(`  Slot: ${status.slot}`);
          console.log(`  Confirmations: ${status.confirmations ?? 'finalized'}`);
          return;
        }
      }
    } catch (error) {
      // If we get an error other than "not found", throw it
      if (error instanceof Error && !error.message.includes('not found')) {
        throw error;
      }
    }

    // Wait 1 second before next attempt
    await new Promise((resolve) => setTimeout(resolve, 1000));
    process.stdout.write(`\r  Attempt ${attempt + 1}/${maxAttempts}...`);
  }

  throw new Error('Transaction confirmation timeout');
}

async function signAndSubmitTransaction() {
  try {
    console.log('='.repeat(80));
    console.log('Step 1: Get latest blockhash from Solana devnet');
    console.log('='.repeat(80));

    // Get latest blockhash
    const { value: latestBlockhash } = await rpc.getLatestBlockhash().send();
    console.log(`✓ Latest blockhash: ${latestBlockhash.blockhash}`);
    console.log(`  Last valid block height: ${latestBlockhash.lastValidBlockHeight}`);

    console.log('\n' + '='.repeat(80));
    console.log('Step 2: Create serialized token transfer transaction');
    console.log('='.repeat(80));

    // Create the serialized transaction using the util function
    const serializedTransaction = await getSerializedTokenTransfer(
      source,
      destination,
      token,
      1000000, // Amount (consider token decimals)
      latestBlockhash,
    );

    console.log(`✓ Created serialized transaction`);
    console.log(`  From: ${source}`);
    console.log(`  To: ${destination}`);
    console.log(`  Token: ${token}`);
    console.log(`  Amount: 1000000 (smallest units)`);

    console.log('\n' + '='.repeat(80));
    console.log('Step 3: Sign transaction using OpenZeppelin Relayer');
    console.log('='.repeat(80));

    // Sign transaction using the relayer
    const signResponse = await relayersApi.signTransaction(relayer_id, {
      transaction: serializedTransaction,
    });

    // Extract the signed transaction from the response
    const responseData = signResponse.data.data;
    if (!responseData || typeof responseData === 'number' || Array.isArray(responseData)) {
      throw new Error('Invalid response from signTransaction');
    }

    // Type guard for Solana response (has 'transaction' property)
    if (!('transaction' in responseData)) {
      throw new Error('Expected Solana transaction response');
    }

    const signedTransaction = responseData.transaction;
    const txSignature = responseData.signature;

    console.log(`✓ Transaction signed successfully`);
    console.log(`  Signature from relayer: ${txSignature}`);
    console.log(`  Signed transaction (base64): ${signedTransaction.substring(0, 50)}...`);

    console.log('\n' + '='.repeat(80));
    console.log('Step 4: Submit signed transaction to Solana devnet RPC');
    console.log('='.repeat(80));

    // Submit the signed transaction to Solana using bare bone RPC with base64 encoding
    const rpcPayload = {
      jsonrpc: '2.0',
      id: 1,
      method: 'sendTransaction',
      params: [
        signedTransaction, // base64 encoded transaction
        {
          encoding: 'base64',
          skipPreflight: false,
          preflightCommitment: 'confirmed',
        },
      ],
    };

    const response = await fetch('https://api.devnet.solana.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rpcPayload),
    });

    const result = await response.json();

    if (result.error) {
      throw new Error(`RPC Error: ${JSON.stringify(result.error)}`);
    }

    const signature = result.result;

    console.log(`✓ Transaction submitted successfully`);
    console.log(`  Transaction signature: ${signature}`);
    console.log(`  Explorer: https://explorer.solana.com/tx/${signature}?cluster=devnet`);

    console.log('\n' + '='.repeat(80));
    console.log('Step 5: Confirm transaction on blockchain');
    console.log('='.repeat(80));

    // Wait for confirmation
    await confirmTransaction(signature);

    console.log('\n' + '='.repeat(80));
    console.log('✓ Transaction completed successfully!');
    console.log('='.repeat(80));
  } catch (error) {
    console.error('\n' + '='.repeat(80));
    console.error('✗ Error occurred:');
    console.error('='.repeat(80));
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
      if ('response' in error) {
        console.error('Response data:', JSON.stringify((error as any).response?.data, null, 2));
      }
    } else {
      console.error('Error:', error);
    }
    process.exit(1);
  }
}

signAndSubmitTransaction();
