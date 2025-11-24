import { Configuration, RelayersApi, SponsoredTransactionQuoteRequest } from '@openzeppelin/relayer-sdk';
import { Networks, rpc } from '@stellar/stellar-sdk';

import { createUnsignedXdrWithCustomAsset } from '../utils.js';

/**
 * Stellar Get Sponsored Transaction Quote Example
 *
 * This example demonstrates how to use the OpenZeppelin Relayer SDK to get a sponsored
 * transaction quote on Stellar. This allows you to check the cost (in fee tokens) before
 * actually building and submitting a sponsored transaction.
 *
 * Flow:
 * 1. Create an unsigned transaction XDR for a USDC transfer
 * 2. Get a quote for sponsoring the transaction (shows fee cost)
 *
 * IMPORTANT: This is provided as a demonstration only. For production use:
 * - Use proper error handling and transaction confirmation checks
 * - Implement appropriate security measures for API keys and tokens
 * - Consider rate limiting and monitoring for production applications
 * - Test thoroughly on testnet before using on mainnet
 * - Use https connection for production applications
 *
 * Usage:
 *   ts-node quoteSponsoredTransaction.ts
 */

const accessToken = ''; // replace with your actual api key
const BASE_PATH = 'http://localhost:8080';

// example dev config
const config = new Configuration({
  basePath: BASE_PATH,
  accessToken,
});

const relayersApi = new RelayersApi(config);

// Replace with your actual relayer ID (must have fee_payment_strategy: 'user')
const SPONSORED_RELAYER_ID = 'stellar-example';

// Replace with your actual addresses
const USER_ACCOUNT = '';
const DESTINATION_ACCOUNT = '';

// USDC asset configuration
const USDC_ASSET_CODE = 'USDC';
const USDC_ASSET_ISSUER = 'GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5';
const TRANSFER_AMOUNT = '0.1';

// Initialize Stellar server via relayer RPC endpoint
const server = new rpc.Server(`${BASE_PATH}/api/v1/relayers/${SPONSORED_RELAYER_ID}/rpc`, {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
  allowHttp: true,
});

async function main() {
  try {
    console.log('🚀 Stellar Get Sponsored Transaction Quote');
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
      throw new Error('Failed to get sponsored transaction quote: no data in response');
    }

    console.log('✅ Sponsored transaction quote received');
    console.log('\n📊 Sponsored transaction quote:');
    console.log(JSON.stringify(quoteResponse.data.data, null, 2));

    // Extract and display key quote information
    const quoteData = quoteResponse.data.data;
    if ('fee_in_token' in quoteData && quoteData.fee_in_token) {
      console.log(`\n💵 Estimated fee: ${quoteData.fee_in_token} ${USDC_ASSET_CODE}`);
    }

    console.log('\n' + '='.repeat(80));
    console.log('✅ Quote retrieved successfully!');
    console.log('='.repeat(80));
  } catch (error) {
    console.error('\n❌ Error getting sponsored transaction quote:', error);
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
