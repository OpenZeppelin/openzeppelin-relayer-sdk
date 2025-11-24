import { Asset, BASE_FEE, Networks, Operation, TransactionBuilder, rpc } from '@stellar/stellar-sdk';
import { Configuration, RelayersApi, StellarTransactionRequest } from '@openzeppelin/relayer-sdk';

/**
 * Stellar Create and Send Trustline Transaction Example
 *
 * This example demonstrates how to use the OpenZeppelin Relayer SDK to create and send
 * a trustline transaction on Stellar. A trustline is required before an account can hold
 * any non-native asset (like USDC, PYUSD, etc.).
 *
 * What is a trustline?
 * - A trustline is a relationship between your account and an asset issuer
 * - It allows your account to receive and hold that specific asset
 * - It's established using the "changeTrust" operation
 * - You can set a limit on how much of that asset you're willing to hold
 *
 * Flow:
 * 1. Create an unsigned transaction XDR for establishing a trustline
 * 2. Send the transaction via the relayer (relayer will sign and submit it)
 *
 * IMPORTANT: This is provided as a demonstration only. For production use:
 * - Use proper error handling and transaction confirmation checks
 * - Implement appropriate security measures for API keys and tokens
 * - Consider rate limiting and monitoring for production applications
 * - Test thoroughly on testnet before using on mainnet
 * - Use https connection for production applications
 *
 * Usage:
 *   ts-node createTrustline.ts
 */

const accessToken = 'EDD3252B-32DD-485B-A618-C1C8CBFC546'; // replace with your actual api key
const BASE_PATH = 'http://localhost:8080';

// example dev config
const config = new Configuration({
  basePath: BASE_PATH,
  accessToken,
});

const relayersApi = new RelayersApi(config);

// Replace with your actual relayer ID
const RELAYER_ID = 'stellar-example';

// Replace with your actual address
const USER_ACCOUNT = 'GDGBTXFQSQOZ2NHLHFXQILDFWZIOG4EGX3CT34ZXHOIVO32NJDWXKZNF';

// USDC asset configuration (replace with your desired asset)
const USDC_ASSET_CODE = 'USDC';
const USDC_ASSET_ISSUER = 'GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5';

// Initialize Stellar server via relayer RPC endpoint
const server = new rpc.Server(`${BASE_PATH}/api/v1/relayers/${RELAYER_ID}/rpc`, {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
  allowHttp: true,
});

/**
 * Creates an unsigned XDR for establishing a trustline for a given asset
 */
async function createUnsignedXdrForTrustline(asset: Asset): Promise<string> {
  try {
    const sourceAccount = await server.getAccount(USER_ACCOUNT);

    const transaction = new TransactionBuilder(sourceAccount, {
      fee: BASE_FEE.toString(),
      networkPassphrase: Networks.TESTNET,
    })
      .addOperation(
        Operation.changeTrust({
          asset: asset,
          // Limit: Maximum amount of this asset you're willing to hold
          limit: '922337203685.4775807', // Max limit (2^63 - 1)
        })
      )
      .setTimeout(180)
      .build();

    const unsignedXdr = transaction.toXDR();
    console.log(`✅ Unsigned XDR for establishing trustline for ${asset.getCode()}:`);
    console.log(`   Asset Code: ${asset.getCode()}`);
    console.log(`   Asset Issuer: ${asset.getIssuer()}`);
    console.log(`   Limit: Unlimited (max value)`);

    return unsignedXdr;
  } catch (error) {
    console.error('Error creating trustline XDR:', error);
    throw error;
  }
}

async function main() {
  try {
    console.log('🚀 Stellar Create and Send Trustline Transaction');
    console.log('='.repeat(80));

    // Step 1: Create unsigned XDR for trustline
    console.log('\n📦 Step 1: Creating unsigned transaction for trustline...');
    console.log(`   Account: ${USER_ACCOUNT}`);
    console.log(`   Asset: ${USDC_ASSET_CODE}:${USDC_ASSET_ISSUER}`);
    console.log(`   Operation: changeTrust (establish trustline)`);

    const usdcAsset = new Asset(USDC_ASSET_CODE, USDC_ASSET_ISSUER);
    const unsignedXdr = await createUnsignedXdrForTrustline(usdcAsset);

    console.log('✅ Unsigned transaction XDR created');
    console.log(`   XDR length: ${unsignedXdr.length} characters`);

    // Step 2: Send the transaction via relayer
    console.log('\n📤 Step 2: Sending transaction via relayer...');
    console.log(`   Using relayer: ${RELAYER_ID}`);
    console.log(`   Network: testnet`);

    const transaction: StellarTransactionRequest = {
      network: 'testnet',
      transaction_xdr: unsignedXdr,
    };

    const response = await relayersApi.sendTransaction(RELAYER_ID, transaction);

    console.log('✅ Transaction submitted successfully');
    
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
    } else {
      console.log('\n📊 Response:');
      console.log(JSON.stringify(response.data, null, 2));
    }

    console.log('\n📝 Next steps:');
    console.log('   1. Wait for transaction confirmation');
    console.log('   2. Once confirmed, you can receive and hold this asset');
    console.log('   3. You can now use this asset in other transactions');

    console.log('\n' + '='.repeat(80));
    console.log('✅ Trustline creation completed successfully!');
    console.log('='.repeat(80));
  } catch (error) {
    console.error('\n❌ Error creating trustline:', error);
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

