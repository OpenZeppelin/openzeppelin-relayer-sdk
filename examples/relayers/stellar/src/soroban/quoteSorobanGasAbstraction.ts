import 'dotenv/config';
import { Configuration, RelayersApi, SponsoredTransactionQuoteRequest } from '@openzeppelin/relayer-sdk';
import { Networks, rpc } from '@stellar/stellar-sdk';

import { createSorobanInvocationXdr, addressToScVal } from './utils.js';

/**
 * Soroban Gas Abstraction - Quote Example
 *
 * This example demonstrates how to get a fee quote for a Soroban contract invocation
 * using the OpenZeppelin Relayer SDK's gas abstraction feature.
 *
 * The quote endpoint estimates the fee cost in the user's chosen token (e.g., USDC)
 * for executing a Soroban smart contract call, allowing users to pay gas fees
 * in tokens other than XLM.
 *
 * Flow:
 * 1. Build a Soroban contract invocation XDR (client-side)
 * 2. Get a quote for the gas abstraction fee in the chosen token
 *
 * IMPORTANT: This is provided as a demonstration only. For production use:
 * - Use proper error handling and transaction confirmation checks
 * - Implement appropriate security measures for API keys and tokens
 * - Consider rate limiting and monitoring for production applications
 * - Test thoroughly on testnet before using on mainnet
 * - Use https connection for production applications
 *
 * Setup:
 *   1. Copy .env.example to .env
 *   2. Fill in your configuration values
 *
 * Usage:
 *   npx ts-node quoteSorobanGasAbstraction.ts
 */

// Load configuration from environment variables
const accessToken = process.env.ACCESS_TOKEN || '';
const BASE_PATH = process.env.BASE_PATH || 'http://localhost:8080';
const RELAYER_ID = process.env.RELAYER_ID || 'stellar-example';
const USER_ACCOUNT = process.env.USER_ACCOUNT || '';

// Contract configuration (with defaults)
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || 'CC3NDEI265JEKXJN4VHYD55G6VD56RBASU5JFZ3EJFU5ZDNVER3XCYYX';
const FUNCTION_NAME = process.env.FUNCTION_NAME || 'increment';

// Fee token configuration - USDC on Stellar testnet
const FEE_TOKEN = process.env.FEE_TOKEN || 'CBIELTK6YBZJU5UP2WWQEUCYKLPU6AUNZ2BQ4WWFEIE3USCIHMXQDAMA';

// SDK configuration
const config = new Configuration({
  basePath: BASE_PATH,
  accessToken,
});

const relayersApi = new RelayersApi(config);

// Initialize Stellar RPC server via relayer endpoint
const server = new rpc.Server(`${BASE_PATH}/api/v1/relayers/${RELAYER_ID}/rpc`, {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
  allowHttp: true,
});

async function main() {
  try {
    console.log('🚀 Soroban Gas Abstraction - Quote Example');
    console.log('='.repeat(80));

    // Validate required configuration
    if (!USER_ACCOUNT) {
      throw new Error('USER_ACCOUNT is required. Please set it in your .env file.');
    }

    // Step 1: Create Soroban invocation XDR
    console.log('\n📦 Step 1: Creating Soroban contract invocation XDR...');
    console.log(`   Contract: ${CONTRACT_ADDRESS}`);
    console.log(`   Function: ${FUNCTION_NAME}`);
    console.log(`   User: ${USER_ACCOUNT}`);

    const unsignedXdr = await createSorobanInvocationXdr({
      server,
      sourceAccount: USER_ACCOUNT,
      contractAddress: CONTRACT_ADDRESS,
      functionName: FUNCTION_NAME,
      args: [addressToScVal(USER_ACCOUNT)], // increment(user_address)
      networkPassphrase: Networks.TESTNET,
    });

    console.log('✅ Soroban invocation XDR created');

    // Step 2: Get gas abstraction quote
    console.log('\n💰 Step 2: Getting gas abstraction quote...');
    console.log(`   Relayer: ${RELAYER_ID}`);
    console.log(`   Fee Token: ${FEE_TOKEN}`);

    const quoteRequest: SponsoredTransactionQuoteRequest = {
      fee_token: FEE_TOKEN,
      transaction_xdr: unsignedXdr,
    };

    const quoteResponse = await relayersApi.quoteSponsoredTransaction(RELAYER_ID, quoteRequest);

    if (!quoteResponse.data.data) {
      throw new Error('Failed to get gas abstraction quote: no data in response');
    }

    console.log('✅ Gas abstraction quote received');
    console.log('\n📊 Quote details:');
    console.log(JSON.stringify(quoteResponse.data.data, null, 2));

    // Extract and display key quote information
    const quoteData = quoteResponse.data.data;
    if ('fee_in_token_ui' in quoteData && quoteData.fee_in_token_ui) {
      console.log(`\n💵 Estimated fee: ${quoteData.fee_in_token_ui} USDC`);
    }
    if ('conversion_rate' in quoteData && quoteData.conversion_rate) {
      console.log(`   Conversion rate (XLM→USDC): ${quoteData.conversion_rate}`);
    }

    console.log('\n' + '='.repeat(80));
    console.log('✅ Quote retrieved successfully!');
    console.log('='.repeat(80));
  } catch (error) {
    console.error('\n❌ Error getting gas abstraction quote:', error);
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
