import { Configuration, RelayersApi, SignTransactionRequest, SignTransactionResponseStellar, SponsoredTransactionBuildRequest, SponsoredTransactionQuoteRequest, StellarTransactionRequest } from '@openzeppelin/relayer-sdk';
import { FeeBumpTransaction, Networks, Transaction, TransactionBuilder, rpc } from '@stellar/stellar-sdk';

import { createUnsignedXdrWithCustomAsset } from '../utils.js';

/**
 * Stellar Sponsored Transaction Full Flow Example
 *
 * This example demonstrates the complete flow for a sponsored (gasless) transaction on Stellar:
 * 1. Build an unsigned transaction for USDC transfer from user to user
 * 2. Get a sponsored transaction quote using the sponsored relayer
 * 3. Build a sponsored transaction using the sponsored relayer
 * 4. Sign the sponsored transaction using the user relayer (fee_payment_strategy: 'relayer')
 * 5. Send the sponsored transaction via the sponsored relayer (fee_payment_strategy: 'user')
 *
 * Architecture:
 * - User Relayer: Signs transactions on behalf of the user (mimics user wallet)
 * - Sponsored Relayer: Wraps transactions in fee-bump and pays network fees
 *
 * IMPORTANT: This is provided as a demonstration only. For production use:
 * - Use proper error handling and transaction confirmation checks
 * - Implement appropriate security measures for API keys and tokens
 * - Consider rate limiting and monitoring for production applications
 * - Test thoroughly on testnet before using on mainnet
 * - Use https connection for production applications
 *
 * Usage:
 *   ts-node sponsoredTransactionFullFlow.ts
 */

const accessToken = ''; // replace with your actual api key
// example dev config
const config = new Configuration({
  basePath: 'http://localhost:8080',
  accessToken,
});

const relayersApi = new RelayersApi(config);

// Two relayers: one for user signing, one for sponsored transactions
const USER_RELAYER_ID = ''; // Relayer that mimics user wallet, fee_payment_strategy: 'relayer'
const SPONSORED_RELAYER_ID = ''; // Relayer that sponsors fees, fee_payment_strategy: 'user'

// Replace with your actual addresses
const USER_ACCOUNT = '';
const DESTINATION_ACCOUNT = '';

// USDC asset configuration
const USDC_ASSET_CODE = 'USDC';
const USDC_ASSET_ISSUER = 'GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5';
const TRANSFER_AMOUNT = '0.1';

// Initialize Stellar server (testnet)
const server = new rpc.Server(`http://localhost:8080/api/v1/relayers/${SPONSORED_RELAYER_ID}/rpc`, {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
  allowHttp: true,
});


/**
 * Signs a transaction using the user relayer
 */
async function signTransactionWithUserRelayer(unsignedXdr: string): Promise<string> {
  console.log('\n📝 Step 3: Signing transaction with user relayer...');
  
  const signRequest: SignTransactionRequest = {
    unsigned_xdr: unsignedXdr,
  };

  const response = await relayersApi.signTransaction(USER_RELAYER_ID, signRequest);
  
  // Extract signed XDR from response
  const responseData = response.data.data;
  if (!responseData || typeof responseData === 'number' || Array.isArray(responseData)) {
    throw new Error('Invalid response from signTransaction');
  }

  // Type guard for Stellar response (has 'signedXdr' property)
  const stellarResponse = responseData as SignTransactionResponseStellar;
  if (!stellarResponse.signedXdr) {
    throw new Error('Expected Stellar transaction response with signedXdr');
  }

  const signedXdr = stellarResponse.signedXdr;
  console.log('✅ Transaction signed successfully by user relayer');
  console.log(`   Signed XDR length: ${signedXdr.length} characters`);
  
  return signedXdr;
}

/**
 * Sends a fee-bump transaction via the sponsored relayer
 */
async function sendFeeBumpTransaction(signedXdr: string): Promise<void> {
  console.log('\n📤 Step 4: Sending sponsored transaction via sponsored relayer...');
  
  const transactionRequest: StellarTransactionRequest = {
    network: 'testnet',
    transaction_xdr: signedXdr,
    fee_bump: true, // Indicate this is a fee-bump transaction
  };

  const response = await relayersApi.sendTransaction(SPONSORED_RELAYER_ID, transactionRequest);
  
  console.log('✅ Fee-bump transaction submitted successfully');
  const txData = response.data.data;
  if (txData) {
    console.log(`   Transaction ID: ${txData.id || 'N/A'}`);
    console.log(`   Status: ${txData.status || 'N/A'}`);
    // Check if it's a Stellar transaction response (has hash property)
    if ('hash' in txData && txData.hash) {
      console.log(`   Hash: ${txData.hash}`);
    }
    console.log('\n📊 Transaction details:');
    console.log(JSON.stringify(txData, null, 2));
  }
}

async function main() {
  try {
    console.log('🚀 Stellar Sponsored Transaction Full Flow');
    console.log('='.repeat(80));
    
    // Step 1: Create unsigned XDR for USDC transfer
    console.log('\n📦 Step 1: Creating unsigned transaction for USDC transfer...');
    console.log(`   From: ${USER_ACCOUNT}`);
    console.log(`   To: ${DESTINATION_ACCOUNT}`);
    console.log(`   Asset: ${USDC_ASSET_CODE}:${USDC_ASSET_ISSUER}`);
    console.log(`   Amount: ${TRANSFER_AMOUNT}`);
    
    const unsignedXdr = await createUnsignedXdrWithCustomAsset({
      server,
      sourceAccount: USER_ACCOUNT,
      destinationAccount: DESTINATION_ACCOUNT,
      assetCode: USDC_ASSET_CODE,
      assetIssuer: USDC_ASSET_ISSUER,
      amount: TRANSFER_AMOUNT,
      networkPassphrase: Networks.TESTNET,
    });

    console.log('✅ Unsigned transaction XDR created');

    // Step 2: Get sponsored transaction quote
    console.log('\n💰 Step 2: Getting sponsored transaction quote...');
    console.log(`   Using sponsored relayer: ${SPONSORED_RELAYER_ID}`);
    console.log(`   Fee token: ${USDC_ASSET_CODE}:${USDC_ASSET_ISSUER}`);
    
    const quoteRequest: SponsoredTransactionQuoteRequest = {
      fee_token: `${USDC_ASSET_CODE}:${USDC_ASSET_ISSUER}`,
      transaction_xdr: unsignedXdr,
    };

    const quoteResponse = await relayersApi.quoteSponsoredTransaction(SPONSORED_RELAYER_ID, quoteRequest);

    if (!quoteResponse.data.data) {
      throw new Error('Failed to get sponsored transaction quote');
    }

    console.log('\nSponsored transaction quote:');
    console.log(JSON.stringify(quoteResponse.data.data, null, 2));

    // Step 3: Build sponsored transaction
    console.log('\n💰 Step 2: Building sponsored transaction (fee-bump wrapper)...');
    console.log(`   Using sponsored relayer: ${SPONSORED_RELAYER_ID}`);
    console.log(`   Fee token: ${USDC_ASSET_CODE}:${USDC_ASSET_ISSUER}`);
    
    const buildRequest: SponsoredTransactionBuildRequest = {
      fee_token: `${USDC_ASSET_CODE}:${USDC_ASSET_ISSUER}`,
      transaction_xdr: unsignedXdr,
    };

    const buildResponse = await relayersApi.buildSponsoredTransaction(SPONSORED_RELAYER_ID, buildRequest);
    
    if (!buildResponse.data.data) {
      throw new Error('Failed to build sponsored transaction');
    }

    console.log('\nSponsored transaction built:');
    console.log(JSON.stringify(buildResponse.data.data, null, 2));

    console.log('✅ Sponsored transaction built successfully');


    // Step 3: Sign the inner transaction with user relayer
    const signedXdr = await signTransactionWithUserRelayer(buildResponse.data.data.transaction);

    // Step 5: Send the fee-bump transaction via sponsored relayer
    await sendFeeBumpTransaction(signedXdr);

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

