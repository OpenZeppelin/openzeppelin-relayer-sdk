import 'dotenv/config';
import {
  Configuration,
  RelayersApi,
  SponsoredTransactionQuoteRequest,
  SponsoredTransactionBuildRequest,
  StellarTransactionRequest,
} from '@openzeppelin/relayer-sdk';
import {
  Networks,
  rpc,
  Keypair,
  authorizeEntry,
} from '@stellar/stellar-sdk';

import { createSorobanInvocationXdr, addressToScVal, parseAuthEntry, authEntryToXdr } from './utils.js';

/**
 * Soroban Gas Abstraction - Full Flow Example
 *
 * This example demonstrates the complete flow for executing a Soroban smart contract
 * call with gas abstraction, where the user pays fees in USDC instead of XLM.
 *
 * Flow:
 * 1. Build a Soroban contract invocation XDR (client-side)
 * 2. Get a quote for the gas abstraction fee (optional, for user confirmation)
 * 3. Build the gas-abstracted transaction via the relayer
 * 4. Sign the user_auth_entry using the user's keypair
 * 5. Submit the transaction with the signed auth entry
 *
 * Architecture:
 * - User: Signs the authorization entry (approves the contract call + fee payment)
 * - Relayer: Handles fee conversion and pays network fees in XLM
 *
 * IMPORTANT: This is provided as a demonstration only. For production use:
 * - Use proper error handling and transaction confirmation checks
 * - Implement appropriate security measures for API keys and tokens
 * - NEVER expose secret keys in production code
 * - Consider rate limiting and monitoring for production applications
 * - Test thoroughly on testnet before using on mainnet
 * - Use https connection for production applications
 *
 * Setup:
 *   1. Copy .env.example to .env
 *   2. Fill in your configuration values (including USER_SECRET_KEY)
 *
 * Usage:
 *   npx tsx sorobanGasAbstractionFullFlow.ts
 */

// Load configuration from environment variables
const accessToken = process.env.ACCESS_TOKEN || '';
const BASE_PATH = process.env.BASE_PATH || 'http://localhost:8080';
const RELAYER_ID = process.env.RELAYER_ID || 'stellar-example';

// User configuration from environment
// WARNING: Never commit your .env file with secret keys to version control!
const USER_SECRET_KEY = process.env.USER_SECRET_KEY || '';
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

/**
 * Signs a Soroban authorization entry using the user's keypair
 */
async function signAuthEntry(
  authEntryXdr: string,
  keypair: Keypair,
  networkPassphrase: string
): Promise<string> {
  console.log('\n📝 Signing authorization entry...');

  // Parse the auth entry from XDR
  const authEntry = parseAuthEntry(authEntryXdr);

  // Get current ledger sequence for expiration calculation
  const latestLedger = await server.getLatestLedger();
  // Set expiration to ~5 minutes from now (assuming ~5 seconds per ledger)
  const validUntilLedgerSeq = latestLedger.sequence + 60;

  console.log(`   Current ledger: ${latestLedger.sequence}`);
  console.log(`   Auth valid until ledger: ${validUntilLedgerSeq}`);

  // Sign the auth entry using authorizeEntry from stellar-sdk
  const signedAuthEntry = await authorizeEntry(
    authEntry,
    keypair,
    validUntilLedgerSeq,
    networkPassphrase
  );

  const signedXdr = authEntryToXdr(signedAuthEntry);
  console.log('✅ Authorization entry signed successfully');
  console.log(`   Signed auth entry length: ${signedXdr.length} characters`);

  return signedXdr;
}

/**
 * Sends the gas-abstracted transaction
 */
async function sendTransaction(
  transactionXdr: string,
  signedAuthEntry: string
): Promise<void> {
  console.log('\n📤 Sending gas-abstracted transaction...');

  const transactionRequest: StellarTransactionRequest = {
    network: 'stellar-testnet',
    transaction_xdr: transactionXdr,
    // Note: For Soroban gas abstraction, we send signed_auth_entry instead of using fee_bump
  };

  // Add signed_auth_entry to the request
  // The SDK type might not include this field yet, so we extend it
  const requestWithAuth = {
    ...transactionRequest,
    signed_auth_entry: signedAuthEntry,
  };

  const response = await relayersApi.sendTransaction(RELAYER_ID, requestWithAuth as StellarTransactionRequest);

  console.log('✅ Transaction submitted successfully');
  const txData = response.data.data;
  if (txData) {
    console.log(`   Transaction ID: ${txData.id || 'N/A'}`);
    console.log(`   Status: ${txData.status || 'N/A'}`);
    if ('hash' in txData && txData.hash) {
      console.log(`   Hash: ${txData.hash}`);
    }
    console.log('\n📊 Transaction details:');
    console.log(JSON.stringify(txData, null, 2));
  }
}

async function main() {
  try {
    console.log('🚀 Soroban Gas Abstraction - Full Flow');
    console.log('='.repeat(80));

    // Validate required configuration
    if (!USER_SECRET_KEY) {
      throw new Error('USER_SECRET_KEY is required. Please set it in your .env file.');
    }
    if (!USER_ACCOUNT) {
      throw new Error('USER_ACCOUNT is required. Please set it in your .env file.');
    }

    // Create keypair from secret key
    const userKeypair = Keypair.fromSecret(USER_SECRET_KEY);
    
    // Verify the public key matches
    if (userKeypair.publicKey() !== USER_ACCOUNT) {
      throw new Error('USER_SECRET_KEY does not match USER_ACCOUNT');
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

    // Step 2: Get gas abstraction quote (optional, for user confirmation)
    console.log('\n💰 Step 2: Getting gas abstraction quote...');
    console.log(`   Relayer: ${RELAYER_ID}`);
    console.log(`   Fee Token: ${FEE_TOKEN}`);

    const quoteRequest: SponsoredTransactionQuoteRequest = {
      fee_token: FEE_TOKEN,
      transaction_xdr: unsignedXdr,
    };

    const quoteResponse = await relayersApi.quoteSponsoredTransaction(RELAYER_ID, quoteRequest);

    if (!quoteResponse.data.data) {
      throw new Error('Failed to get gas abstraction quote');
    }

    console.log('✅ Quote received');
    const quoteData = quoteResponse.data.data;
    if ('fee_in_token_ui' in quoteData && quoteData.fee_in_token_ui) {
      console.log(`   Estimated fee: ${quoteData.fee_in_token_ui} USDC`);
    }

    // Step 3: Build gas-abstracted transaction
    console.log('\n🔨 Step 3: Building gas-abstracted transaction...');

    const buildRequest: SponsoredTransactionBuildRequest = {
      fee_token: FEE_TOKEN,
      transaction_xdr: unsignedXdr,
    };

    const buildResponse = await relayersApi.buildSponsoredTransaction(RELAYER_ID, buildRequest);

    if (!buildResponse.data.data) {
      throw new Error('Failed to build gas-abstracted transaction');
    }

    console.log('✅ Transaction built successfully');

    const buildData = buildResponse.data.data;
    
    // Extract transaction XDR and user auth entry
    if (!('transaction' in buildData) || !buildData.transaction) {
      throw new Error('Build response missing transaction XDR');
    }
    
    if (!('user_auth_entry' in buildData) || !(buildData as { user_auth_entry?: string }).user_auth_entry) {
      throw new Error('Build response missing user_auth_entry');
    }

    const transactionXdr = buildData.transaction;
    const userAuthEntry = (buildData as { user_auth_entry: string }).user_auth_entry;

    if ('fee_in_token_ui' in buildData && buildData.fee_in_token_ui) {
      console.log(`   Fee: ${buildData.fee_in_token_ui} USDC`);
    }
    if ('valid_until' in buildData && buildData.valid_until) {
      console.log(`   Valid until: ${buildData.valid_until}`);
    }

    // Step 4: Sign the authorization entry
    const signedAuthEntry = await signAuthEntry(
      userAuthEntry,
      userKeypair,
      Networks.TESTNET
    );

    // Step 5: Send the transaction
    await sendTransaction(transactionXdr, signedAuthEntry);

    console.log('\n' + '='.repeat(80));
    console.log('✅ Full flow completed successfully!');
    console.log('='.repeat(80));
  } catch (error) {
    console.error('\n❌ Error in gas abstraction flow:', error);
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
