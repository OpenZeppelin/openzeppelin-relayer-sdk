/**
 * Stellar Create Unsigned XDR from Operations Example
 *
 * This example demonstrates how to create unsigned XDR (External Data Representation)
 * from Stellar operations using the Stellar SDK.
 *
 * IMPORTANT: This is provided as a demonstration only. For production use:
 * - Use proper error handling and transaction confirmation checks
 * - Implement appropriate security measures for API keys and tokens
 * - Consider rate limiting and monitoring for production applications
 * - Test thoroughly on testnet before using on mainnet
 * - Use https connection for production applications
 *
 * Usage:
 *   ts-node createUnsignedXdr.ts
 */
import {
  Asset,
  BASE_FEE,
  Networks,
  Operation,
  TransactionBuilder,
  rpc,
} from '@stellar/stellar-sdk';

// Replace with your actual addresses
const SOURCE_ACCOUNT = 'GCSNQUYFFUYNT6UESIGSYAQIMV3YFCDE2FLN4S3ZBKGZGA56MJZJCAFH';
const DESTINATION_ACCOUNT = 'GCSNQUYFFUYNT6UESIGSYAQIMV3YFCDE2FLN4S3ZBKGZGA56MJZJCAFH';

// Initialize Stellar server (testnet)
const server = new rpc.Server('https://soroban-testnet.stellar.org');

async function createUnsignedXdr() {
  try {
    // 1. Fetch the source account to get the current sequence number
    const sourceAccount = await server.getAccount(SOURCE_ACCOUNT);
    console.log(`Source account sequence: ${sourceAccount.sequenceNumber()}`);

    // 2. Build the transaction with operations
    const transaction = new TransactionBuilder(sourceAccount, {
      fee: BASE_FEE.toString(), // Base fee in stroops
      networkPassphrase: Networks.TESTNET, // Use Networks.MAINNET for mainnet
    })
      .addOperation(
        Operation.payment({
          destination: DESTINATION_ACCOUNT,
          asset: Asset.native(), // XLM
          amount: '1.0000000', // Amount as string with 7 decimal places
        })
      )
      .setTimeout(180) // Transaction timeout in seconds
      .build();

    // 3. Convert the transaction to unsigned XDR (base64 encoded string)
    const unsignedXdr = transaction.toXDR();
    
    console.log('\n✅ Unsigned XDR created successfully:');
    console.log(unsignedXdr);
    console.log('\nYou can now use this XDR with:');
    console.log('- sendTransaction() API with transaction_xdr field');
    console.log('- signTransaction() API to sign it');
    
    return unsignedXdr;
  } catch (error) {
    console.error('Error creating unsigned XDR:', error);
    throw error;
  }
}

// Example: Create XDR with multiple operations
async function createUnsignedXdrWithMultipleOperations() {
  try {
    const sourceAccount = await server.getAccount(SOURCE_ACCOUNT);
    
    const transaction = new TransactionBuilder(sourceAccount, {
      fee: BASE_FEE.toString(),
      networkPassphrase: Networks.TESTNET,
    })
      // Add first payment operation
      .addOperation(
        Operation.payment({
          destination: DESTINATION_ACCOUNT,
          asset: Asset.native(),
          amount: '1.0000000',
        })
      )
      // Add second payment operation
      .addOperation(
        Operation.payment({
          destination: DESTINATION_ACCOUNT,
          asset: Asset.native(),
          amount: '2.0000000',
        })
      )
      .setTimeout(180)
      .build();

    const unsignedXdr = transaction.toXDR();
    console.log('\n✅ Unsigned XDR with multiple operations:');
    console.log(unsignedXdr);
    
    return unsignedXdr;
  } catch (error) {
    console.error('Error creating unsigned XDR:', error);
    throw error;
  }
}

// Example: Create XDR with custom asset (non-native)
async function createUnsignedXdrWithCustomAsset() {
  try {
    const sourceAccount = await server.getAccount(SOURCE_ACCOUNT);
    
    // Example: USDC asset
    const usdcAsset = new Asset('USDC', 'GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN');
    
    const transaction = new TransactionBuilder(sourceAccount, {
      fee: BASE_FEE.toString(),
      networkPassphrase: Networks.TESTNET,
    })
      .addOperation(
        Operation.payment({
          destination: DESTINATION_ACCOUNT,
          asset: usdcAsset,
          amount: '10.0000000',
        })
      )
      .setTimeout(180)
      .build();

    const unsignedXdr = transaction.toXDR();
    console.log('\n✅ Unsigned XDR with custom asset:');
    console.log(unsignedXdr);
    
    return unsignedXdr;
  } catch (error) {
    console.error('Error creating unsigned XDR:', error);
    throw error;
  }
}

// Example: Create XDR for swapping XLM to native USDC using path payment
async function createUnsignedXdrForXlmToUsdcSwap() {
  try {
    const sourceAccount = await server.getAccount(SOURCE_ACCOUNT);
    
    // USDC asset (native USDC on Stellar)
    const usdcAsset = new Asset('USDC', 'GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN');
    
    // Amount of XLM to send
    const sendAmount = '1.0000000';
    
    // Minimum amount of USDC to receive (slippage protection)
    const destMin = '0.00001';
    
    const transaction = new TransactionBuilder(sourceAccount, {
      fee: BASE_FEE.toString(),
      networkPassphrase: Networks.TESTNET,
    })
      .addOperation(
        Operation.pathPaymentStrictSend({
          sendAsset: Asset.native(), // XLM
          sendAmount, // Amount of XLM to send
          destination: SOURCE_ACCOUNT, // Destination account (swap to self)
          destAsset: usdcAsset, // USDC
          destMin, // Minimum USDC to receive (slippage protection)
          path: [], // Empty path = direct XLM/USDC orderbook
        })
      )
      .setTimeout(180)
      .build();

    const unsignedXdr = transaction.toXDR();
    console.log('\n✅ Unsigned XDR for XLM to USDC swap:');
    console.log(`   Sending: ${sendAmount} XLM`);
    console.log(`   Minimum receiving: ${destMin} USDC`);
    console.log(`   XDR: ${unsignedXdr}`);
    console.log('\n⚠️  Common reasons for swap failures:');
    console.log('   1. Missing trustline - You must establish a trustline for USDC first');
    console.log('   2. No liquidity - There may be no orderbook/liquidity for XLM/USDC pair');
    console.log('   3. Insufficient balance - Not enough XLM to cover swap + fees');
    console.log('   4. Slippage too strict - destMin might be too high');
    
    return unsignedXdr;
  } catch (error) {
    console.error('Error creating unsigned XDR for swap:', error);
    throw error;
  }
}

/**
 * TRUSTLINE EXPLANATION:
 * 
 * In Stellar, a trustline is REQUIRED before an account can hold any non-native asset (like USDC, PYUSD, etc.).
 * 
 * What is a trustline?
 * - A trustline is a relationship between your account and an asset issuer
 * - It allows your account to receive and hold that specific asset
 * - It's established using the "changeTrust" operation
 * - You can set a limit on how much of that asset you're willing to hold
 * 
 * Why do you need it?
 * - Stellar requires explicit consent before holding assets from issuers
 * - This prevents spam and unwanted assets
 * - Without a trustline, you CANNOT receive non-native assets
 * 
 * Common failure scenarios:
 * - PATH_PAYMENT_STRICT_SEND_NO_TRUST: Destination account doesn't have trustline
 * - PATH_PAYMENT_STRICT_SEND_SRC_NO_TRUST: Source account doesn't have trustline (if sending non-native asset)
 * 
 * Steps to establish a trustline:
 * 1. Create a transaction with changeTrust operation
 * 2. Sign and submit the transaction
 * 3. Once confirmed, you can receive that asset
 */
async function createUnsignedXdrForTrustline(asset: Asset) {
  try {
    const sourceAccount = await server.getAccount(SOURCE_ACCOUNT);
    
    const transaction = new TransactionBuilder(sourceAccount, {
      fee: BASE_FEE.toString(),
      networkPassphrase: Networks.TESTNET,
    })
      .addOperation(
        Operation.changeTrust({
          asset: asset,
          // Limit: Maximum amount of this asset you're willing to hold
          // Use max value to allow unlimited holdings
          limit: '922337203685.4775807', // Max limit (2^63 - 1)
        })
      )
      .setTimeout(180)
      .build();

    const unsignedXdr = transaction.toXDR();
    console.log(`\n✅ Unsigned XDR for establishing trustline for ${asset.getCode()}:`);
    console.log(`   Asset Code: ${asset.getCode()}`);
    console.log(`   Asset Issuer: ${asset.getIssuer()}`);
    console.log(`   Limit: Unlimited (max value)`);
    console.log(`   XDR: ${unsignedXdr}`);
    console.log('\n📝 Next steps:');
    console.log('   1. Sign this XDR with your account\'s secret key');
    console.log('   2. Submit the signed transaction to the network');
    console.log('   3. Once confirmed, you can receive this asset');
    
    return unsignedXdr;
  } catch (error) {
    console.error('Error creating trustline XDR:', error);
    throw error;
  }
}

// Example: Create trustline for USDC
async function createUsdcTrustline() {
  const usdcAsset = new Asset('USDC', 'GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN');
  return createUnsignedXdrForTrustline(usdcAsset);
}

// Example: Create trustline for PYUSD
async function createPyusdTrustline() {
  const pyusdAsset = new Asset('PYUSD', 'GBT2KJDKUZYZTQPCSR57VZT5NJHI4H7FOB5LT5FPRWSR7I5B4FS3UU7G');
  return createUnsignedXdrForTrustline(pyusdAsset);
}

// Run examples
async function main() {
  console.log('🚀 Creating Unsigned XDR Examples\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  // Example 1: Simple payment
  console.log('📝 Example 1: Simple Payment');
  await createUnsignedXdr();
  
  // Example 2: Multiple operations
  console.log('\n\n📝 Example 2: Multiple Operations');
  await createUnsignedXdrWithMultipleOperations();
  
  // Example 3: Custom asset
  // Uncomment to test with custom asset
  // console.log('\n\n📝 Example 3: Custom Asset');
  await createUnsignedXdrWithCustomAsset();
  
  // Example 4: XLM to USDC swap
  console.log('\n\n📝 Example 4: XLM to USDC Swap');
  await createUnsignedXdrForXlmToUsdcSwap();
  
  // Example 5: Create trustline for USDC (required before receiving USDC)
  console.log('\n\n📝 Example 5: Create Trustline for USDC');
  await createUsdcTrustline();
  
  // Example 6: Create trustline for PYUSD
  // Uncomment to test with PYUSD
  // console.log('\n\n📝 Example 6: Create Trustline for PYUSD');
  // await createPyusdTrustline();
}

main().catch(console.error);

