/**
 * Stellar Channel Account with Fee Bump Example
 *
 * This example demonstrates how to use the OpenZeppelin Relayer SDK to submit parallel 
 * transactions on Stellar using channel accounts with fee bumping. Channel accounts allow 
 * multiple transactions to be submitted simultaneously without sequence number conflicts.
 *
 * Architecture:
 * - Source Account: Holds funds, signs payment operations, and pays for fee bumps
 * - Channel Accounts: Provide unique sequence numbers for parallel transaction submission
 * - Both accounts sign the inner transaction; source account wraps it in a fee bump
 *
 * IMPORTANT: This is provided as a demonstration only. For production use:
 * - Use proper error handling and transaction confirmation checks
 * - Implement appropriate security measures for API keys and tokens
 * - Consider rate limiting and monitoring for production applications
 * - Test thoroughly on testnet before using on mainnet
 * - Use https connection for production applications
 *
 * Usage:
 *   tsx channelAccountWithRemoteSigning.ts
 */
import {
  Configuration,
  RelayersApi,
  SignTransactionRequest,
  StellarTransactionRequest,
  SignTransactionResponseStellar,
} from '@openzeppelin/relayer-sdk';
import {
  rpc,
  TransactionBuilder,
  Networks,
  Operation,
  Asset,
  BASE_FEE,
  Transaction,
} from '@stellar/stellar-sdk';

// Configuration
const RELAYER_SOURCE_ID = 'launchtube-fund';        // Source account relayer
const RELAYER_CHANNEL_IDS = [                       // Channel account relayers
  'launchtube-seq-001',
  'launchtube-seq-002',
];
const AMOUNT = '1.0000000';                         // Payment amount per transaction
const MAX_FEE = 1000000;                            // Max fee for fee bump (0.1 XLM)

// Initialize API clients
const relayersApi = new RelayersApi(new Configuration({
  basePath: 'http://localhost:8080',
  accessToken: '05b836ed-bce9-43f5-ba62-e3f6d2512a36',
}));

const server = new rpc.Server('https://soroban-testnet.stellar.org');

// Type guard for Stellar response
function isStellarResponse(data: unknown): data is SignTransactionResponseStellar {
  return data !== null && 
         typeof data === 'object' && 
         'signature' in data && 
         'signedXdr' in data;
}

// Get relayer address
async function getRelayerAddress(relayerId: string): Promise<string> {
  const response = await relayersApi.getRelayer(relayerId);
  const address = response.data.data?.address;
  if (!address) throw new Error(`Failed to fetch address for relayer ${relayerId}`);
  return address;
}

// Sign a transaction and return signature
async function signTransaction(relayerId: string, xdr: string): Promise<string> {
  const response = await relayersApi.signTransaction(relayerId, {
    unsigned_xdr: xdr,
  } as SignTransactionRequest);
  
  const data = response.data.data;
  if (!data || !isStellarResponse(data)) {
    throw new Error('Failed to get signature from response');
  }
  return data.signature;
}

// Build a payment transaction with channel account as source
async function buildChannelTransaction(
  channelAddress: string,
  sourceAddress: string,
  amount: string
): Promise<Transaction> {
  // Fetch account (gets current sequence number from network)
  const channelAccount = await server.getAccount(channelAddress);
  
  // Build transaction (auto-increments sequence)
  return new TransactionBuilder(channelAccount, {
    fee: BASE_FEE.toString(),
    networkPassphrase: Networks.TESTNET,
  })
    .addOperation(
      Operation.payment({
        source: sourceAddress,      // Operation source (who's paying)
        destination: sourceAddress, // Send to same account (demo)
        asset: Asset.native(),
        amount,
      })
    )
    .setTimeout(180)
    .build();
}

// Submit transaction with fee bump
async function submitWithFeeBump(xdr: string): Promise<string> {
  const response = await relayersApi.sendTransaction(RELAYER_SOURCE_ID, {
    network: 'testnet',
    transaction_xdr: xdr,
    fee_bump: true,
    max_fee: MAX_FEE,
  } as StellarTransactionRequest);
  
  const transactionId = response.data.data?.id;
  if (!transactionId) throw new Error('Failed to get transaction ID');
  return transactionId;
}

// Process a single channel account transaction
// Each channel account maintains its own sequence number, allowing parallel submission
async function processChannelTransaction(
  channelId: string,
  channelAddress: string,
  sourceAddress: string
): Promise<string> {
  console.log(`\n📤 Processing ${channelId}...`);
  
  // 1. Build transaction with channel as source (provides sequence number)
  const tx = await buildChannelTransaction(channelAddress, sourceAddress, AMOUNT);
  console.log(`   Sequence: ${tx.sequence}`);
  
  // 2. Get signatures from both accounts in parallel
  // - Source account signature: authorizes the payment operation
  // - Channel account signature: authorizes using its sequence number
  const [sourceSignature, channelSignature] = await Promise.all([
    signTransaction(RELAYER_SOURCE_ID, tx.toXDR()),
    signTransaction(channelId, tx.toXDR()),
  ]);
  
  // 3. Combine both signatures on the transaction
  tx.addSignature(sourceAddress, sourceSignature);
  tx.addSignature(channelAddress, channelSignature);
  
  // 4. Submit with fee bump (source account pays the higher fee)
  const transactionId = await submitWithFeeBump(tx.toXDR());
  console.log(`   ✅ Transaction ID: ${transactionId}`);
  
  return transactionId;
}

async function main() {
  try {
    console.log('🚀 Stellar Channel Account Example');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    // Fetch all addresses
    const [sourceAddress, ...channelAddresses] = await Promise.all([
      getRelayerAddress(RELAYER_SOURCE_ID),
      ...RELAYER_CHANNEL_IDS.map(getRelayerAddress)
    ]);
    
    console.log('📍 Accounts:');
    console.log(`   Source: ${sourceAddress}`);
    channelAddresses.forEach((addr, i) => 
      console.log(`   Channel ${i + 1}: ${addr}`)
    );
    
    console.log('\n🔄 Submitting parallel transactions...');
    
    // Submit all transactions in parallel
    const results = await Promise.all(
      RELAYER_CHANNEL_IDS.map((id, i) =>
        processChannelTransaction(id, channelAddresses[i], sourceAddress)
      )
    );
    
    console.log('\n✨ Complete!');
    console.log('   Transaction IDs:', results);
  } catch (error) {
    console.error('\n❌ Error:', error);
  }
}

main();