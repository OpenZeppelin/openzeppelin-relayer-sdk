import { Configuration, RelayersApi, SponsoredTransactionBuildRequest } from '@openzeppelin/relayer-sdk';
import { Networks, rpc } from '@stellar/stellar-sdk';

import { createUnsignedXdrWithCustomAsset } from '../utils.js';

/**
 * Stellar Build Sponsored Transaction Example
 *
 * This example demonstrates how to use the OpenZeppelin Relayer SDK to build a sponsored
 * transaction on Stellar. A sponsored transaction wraps the user's transaction in a fee-bump
 * transaction, allowing the relayer to pay network fees on behalf of the user.
 *
 * Flow:
 * 1. Create an unsigned transaction XDR for a USDC transfer
 * 2. Build a sponsored transaction (fee-bump wrapper) using the relayer
 *
 * IMPORTANT: This is provided as a demonstration only. For production use:
 * - Use proper error handling and transaction confirmation checks
 * - Implement appropriate security measures for API keys and tokens
 * - Consider rate limiting and monitoring for production applications
 * - Test thoroughly on testnet before using on mainnet
 * - Use https connection for production applications
 *
 * Usage:
 *   ts-node buildSponsoredTransaction.ts
 */

const accessToken = 'EDD3252B-32DD-485B-A618-C1C8CBFC546'; // replace with your actual api key
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
const USER_ACCOUNT = 'GDGBTXFQSQOZ2NHLHFXQILDFWZIOG4EGX3CT34ZXHOIVO32NJDWXKZNF';
const DESTINATION_ACCOUNT = 'GDGBTXFQSQOZ2NHLHFXQILDFWZIOG4EGX3CT34ZXHOIVO32NJDWXKZNF';

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
    console.log('🚀 Stellar Build Sponsored Transaction');
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

    // Step 2: Build sponsored transaction
    console.log('\n💰 Step 2: Building sponsored transaction (fee-bump wrapper)...');
    console.log(`   Using sponsored relayer: ${SPONSORED_RELAYER_ID}`);
    console.log(`   Fee token: ${USDC_ASSET_CODE}:${USDC_ASSET_ISSUER}`);

    const buildRequest: SponsoredTransactionBuildRequest = {
      fee_token: `${USDC_ASSET_CODE}:${USDC_ASSET_ISSUER}`,
      transaction_xdr: unsignedXdr,
    };

    const buildResponse = await relayersApi.buildSponsoredTransaction(SPONSORED_RELAYER_ID, buildRequest);

    if (!buildResponse.data.data) {
      throw new Error('Failed to build sponsored transaction: no data in response');
    }

    console.log('✅ Sponsored transaction built successfully');
    console.log('\n📊 Sponsored transaction details:');
    console.log(JSON.stringify(buildResponse.data.data, null, 2));

    // Extract the wrapped transaction XDR for reference
    const wrappedTransactionXdr = buildResponse.data.data.transaction;
    if (wrappedTransactionXdr) {
      console.log(`\n📝 Wrapped transaction XDR length: ${wrappedTransactionXdr.length} characters`);
      console.log('   Note: This transaction needs to be signed before it can be submitted.');
    }

    console.log('\n' + '='.repeat(80));
    console.log('✅ Build completed successfully!');
    console.log('='.repeat(80));
  } catch (error) {
    console.error('\n❌ Error building sponsored transaction:', error);
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
