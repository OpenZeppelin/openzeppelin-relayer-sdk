/**
 * Solana Sponsored Transaction Full Flow Example
 *
 * This example demonstrates the complete flow for a sponsored (gasless) transaction on Solana:
 * 1. Create an unsigned transaction for USDC transfer from user to user
 * 2. Get a sponsored transaction quote using the sponsored relayer
 * 3. Build a sponsored transaction using the sponsored relayer (fee_payment_strategy: 'user')
 * 4. Sign the sponsored transaction using the user relayer (fee_payment_strategy: 'relayer')
 * 5. Send the sponsored transaction via the sponsored relayer (fee_payment_strategy: 'user')
 *
 * Architecture:
 * - User Relayer: Signs transactions on behalf of the user (mimics user wallet)
 * - Sponsored Relayer: Wraps transactions and pays network fees
 *
 * IMPORTANT: This is provided as a demonstration only. For production use:
 * - Use proper error handling and transaction confirmation checks
 * - Implement appropriate security measures for API keys and tokens
 * - Consider rate limiting and monitoring for production applications
 * - Test thoroughly on devnet/testnet before using on mainnet
 * - Use https connection for production applications
 *
 * Usage:
 *   ts-node sponsoredTransactionFullFlow.ts
 */
import {
  Configuration,
  RelayersApi,
  SignTransactionRequest,
  SignTransactionResponseSolana,
  SolanaTransactionRequest,
} from '../../../../src';
import { createSolanaRelayerRpcClient, getSerializedTokenTransfer } from '../util';

const accessToken = ''; // replace with your actual api key
// Replace with your actual addresses
const SOURCE_ADDRESS = 'Ejj3VH5ACFUoGqGmGHNobwdD4aPzrExohqr8WmDjfRGY';
const DESTINATION_ADDRESS = 'Gt6wiPeC3XqNZKnMcM2dbRZCkKr1PtytBxf9hhV7Hxew';
const USDC_TOKEN = 'Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr'; // USDC token mint address
const TRANSFER_AMOUNT = 1000000; // Amount in smallest units (consider token decimals)
// Two relayers: one for user signing, one for sponsored transactions
const USER_RELAYER_ID = ''; // Relayer that mimics user wallet, fee_payment_strategy: 'relayer'
const SPONSORED_RELAYER_ID = ''; // Relayer that sponsors fees, fee_payment_strategy: 'user'

// example dev config
const config = new Configuration({
  basePath: 'http://localhost:8080',
  accessToken,
});

const relayersApi = new RelayersApi(config);

// Initialize Solana RPC client for the sponsored relayer
const rpc = createSolanaRelayerRpcClient('http://localhost:8080', SPONSORED_RELAYER_ID, accessToken);

/**
 * Signs a transaction using the user relayer
 */
async function signTransactionWithUserRelayer(transaction: string): Promise<string> {
  console.log('\n📝 Step 4: Signing transaction with user relayer...');

  const signRequest: SignTransactionRequest = {
    transaction: transaction,
  };

  const response = await relayersApi.signTransaction(USER_RELAYER_ID, signRequest);

  // Extract signed transaction from response
  const responseData = response.data.data;
  if (!responseData || typeof responseData === 'number' || Array.isArray(responseData)) {
    throw new Error('Invalid response from signTransaction');
  }

  // Type guard for Solana response (has 'transaction' property)
  const solanaResponse = responseData as SignTransactionResponseSolana;
  if (!solanaResponse.transaction) {
    throw new Error('Expected Solana transaction response with transaction');
  }

  const signedTransaction = solanaResponse.transaction;
  console.log('✅ Transaction signed successfully by user relayer');
  console.log(`   Signature: ${solanaResponse.signature}`);
  console.log(`   Signed transaction (base64): ${signedTransaction.substring(0, 50)}...`);

  return signedTransaction;
}

/**
 * Sends a sponsored transaction via the sponsored relayer
 */
async function sendSponsoredTransaction(signedTransaction: string): Promise<void> {
  console.log('\n📤 Step 5: Sending sponsored transaction via sponsored relayer...');

  const transactionRequest: SolanaTransactionRequest = {
    transaction: signedTransaction,
  };

  const response = await relayersApi.sendTransaction(SPONSORED_RELAYER_ID, transactionRequest);

  console.log('✅ Sponsored transaction submitted successfully');
  const txData = response.data.data;
  if (txData) {
    console.log(`   Transaction ID: ${txData.id || 'N/A'}`);
    console.log(`   Status: ${txData.status || 'N/A'}`);
    // Check if it's a Solana transaction response (has signature property)
    if ('signature' in txData && txData.signature) {
      console.log(`   Signature: ${txData.signature}`);
    }
    console.log('\n📊 Transaction details:');
    console.log(JSON.stringify(txData, null, 2));
  }
}

async function main() {
  try {
    console.log('🚀 Solana Sponsored Transaction Full Flow');
    console.log('='.repeat(80));

    // Step 1: Create unsigned transaction for USDC transfer
    console.log('\n📦 Step 1: Creating unsigned transaction for USDC transfer...');
    console.log(`   From: ${SOURCE_ADDRESS}`);
    console.log(`   To: ${DESTINATION_ADDRESS}`);
    console.log(`   Token: ${USDC_TOKEN}`);
    console.log(`   Amount: ${TRANSFER_AMOUNT} (smallest units)`);

    // Get latest blockhash
    const { value: latestBlockhash } = await rpc.getLatestBlockhash().send();
    console.log(`   Latest blockhash: ${latestBlockhash.blockhash}`);

    const unsignedTransaction = await getSerializedTokenTransfer(
      SOURCE_ADDRESS,
      DESTINATION_ADDRESS,
      USDC_TOKEN,
      TRANSFER_AMOUNT,
      latestBlockhash,
    );

    console.log('✅ Unsigned transaction created');
    console.log(`   Transaction (base64): ${unsignedTransaction.substring(0, 50)}...`);

    // Step 2: Get sponsored transaction quote
    console.log('\n💰 Step 2: Getting sponsored transaction quote...');
    console.log(`   Using sponsored relayer: ${SPONSORED_RELAYER_ID}`);
    console.log(`   Fee token: ${USDC_TOKEN}`);

    const quoteRequest = {
      fee_token: USDC_TOKEN,
      transaction: unsignedTransaction,
    };

    const quoteResponse = await relayersApi.quoteSponsoredTransaction(SPONSORED_RELAYER_ID, quoteRequest);

    if (!quoteResponse.data.data) {
      throw new Error('Failed to get sponsored transaction quote');
    }

    console.log('\nSponsored transaction quote:');
    console.log(JSON.stringify(quoteResponse.data.data, null, 2));

    // Step 3: Build sponsored transaction
    console.log('\n🔨 Step 3: Building sponsored transaction...');
    console.log(`   Using sponsored relayer: ${SPONSORED_RELAYER_ID}`);
    console.log(`   Fee token: ${USDC_TOKEN}`);

    const buildRequest = {
      fee_token: USDC_TOKEN,
      transaction: unsignedTransaction,
    };

    const buildResponse = await relayersApi.buildSponsoredTransaction(SPONSORED_RELAYER_ID, buildRequest);

    if (!buildResponse.data.data) {
      throw new Error('Failed to build sponsored transaction');
    }

    console.log('\nSponsored transaction built:');
    console.log(JSON.stringify(buildResponse.data.data, null, 2));

    console.log('✅ Sponsored transaction built successfully');

    // Step 4: Sign the prepared transaction with user relayer
    const signedTransaction = await signTransactionWithUserRelayer(buildResponse.data.data.transaction);

    // Step 5: Send the sponsored transaction via sponsored relayer
    await sendSponsoredTransaction(signedTransaction);

    console.log('\n' + '='.repeat(80));
    console.log('✅ Full flow completed successfully!');
    console.log('='.repeat(80));
  } catch (error) {
    console.error('\n❌ Error in sponsored transaction flow:', error);
    if (error instanceof Error) {
      console.error('   Message:', error.message);
      if (error.stack) {
        console.error('   Stack:', error.stack);
      }
    }
    throw error;
  }
}

main().catch(console.error);
