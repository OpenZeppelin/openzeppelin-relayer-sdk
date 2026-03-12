import 'dotenv/config';
import { Configuration, RelayersApi, SponsoredTransactionBuildRequest } from '@openzeppelin/relayer-sdk';
import { Networks, rpc } from '@stellar/stellar-sdk';

import { createSorobanInvocationXdr, addressToScVal } from './utils.js';

/**
 * Soroban Gas Abstraction - Build Example
 *
 * This example demonstrates how to build a gas-abstracted Soroban contract invocation
 * using the OpenZeppelin Relayer SDK.
 *
 * The build endpoint prepares a transaction where:
 * - The user pays fees in their chosen token (e.g., USDC) instead of XLM
 * - The relayer handles the conversion and pays the actual network fees
 * - A `user_auth_entry` is returned that must be signed by the user
 *
 * Flow:
 * 1. Build a Soroban contract invocation XDR (client-side)
 * 2. Call the build endpoint to get the prepared transaction and auth entry
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
 *   npx tsx buildSorobanGasAbstraction.ts
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
    console.log('🚀 Soroban Gas Abstraction - Build Example');
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

    // Step 2: Build gas-abstracted transaction
    console.log('\n🔨 Step 2: Building gas-abstracted transaction...');
    console.log(`   Relayer: ${RELAYER_ID}`);
    console.log(`   Fee Token: ${FEE_TOKEN}`);

    const buildRequest: SponsoredTransactionBuildRequest = {
      fee_token: FEE_TOKEN,
      transaction_xdr: unsignedXdr,
    };

    const buildResponse = await relayersApi.buildSponsoredTransaction(RELAYER_ID, buildRequest);

    if (!buildResponse.data.data) {
      throw new Error('Failed to build gas-abstracted transaction: no data in response');
    }

    console.log('✅ Gas-abstracted transaction built successfully');
    console.log('\n📊 Build response:');
    console.log(JSON.stringify(buildResponse.data.data, null, 2));

    // Extract key information from the response
    const buildData = buildResponse.data.data;
    
    if ('transaction' in buildData && buildData.transaction) {
      console.log(`\n📝 Transaction XDR length: ${buildData.transaction.length} characters`);
    }
    
    if ('user_auth_entry' in buildData && buildData.user_auth_entry) {
      console.log(`   User Auth Entry length: ${(buildData as { user_auth_entry: string }).user_auth_entry.length} characters`);
      console.log('\n⚠️  Note: The user_auth_entry must be signed before submitting the transaction.');
      console.log('   Use authorizeEntry() from @stellar/stellar-sdk to sign it.');
    }

    if ('fee_in_token_ui' in buildData && buildData.fee_in_token_ui) {
      console.log(`\n💵 Fee: ${buildData.fee_in_token_ui} USDC`);
    }

    if ('valid_until' in buildData && buildData.valid_until) {
      console.log(`   Valid until: ${buildData.valid_until}`);
    }

    console.log('\n' + '='.repeat(80));
    console.log('✅ Build completed successfully!');
    console.log('='.repeat(80));
  } catch (error) {
    console.error('\n❌ Error building gas-abstracted transaction:', error);
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
