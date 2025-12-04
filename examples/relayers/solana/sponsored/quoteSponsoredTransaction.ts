/**
 * Solana Get Sponsored Transaction Quote Example
 *
 * This example demonstrates how to use the OpenZeppelin Relayer SDK to get a sponsored
 * transaction quote on Solana. This allows you to check the cost (in fee tokens) before
 * actually building and submitting a sponsored transaction.
 *
 * IMPORTANT: This is provided as a demonstration only. For production use:
 * - Replace the hardcoded addresses with your actual addresses
 * - Use proper error handling and transaction confirmation checks
 * - Implement appropriate security measures for API keys and tokens
 * - Consider rate limiting and monitoring for production applications
 * - Test thoroughly on devnet/testnet before using on mainnet
 * - Use https connection for production applications
 *
 * Usage:
 *   ts-node quoteSponsoredTransaction.ts
 */
import { Configuration, RelayersApi } from '../../../../src';
import { createSolanaRelayerRpcClient, getSerializedTokenTransfer } from '../util';

// Replace with your actual values
const basePath = 'http://localhost:8080';
const accessToken = 'EDD3252B-32DD-485B-A618-C1C8CBFC546'; // replace with your actual api key
const relayer_id = 'solana-example';
const source = 'EYsk8PduFSAt7W9dnvL2Pt7qcVsb5wAVCYbJ5UQaUpXf';
const destination = 'Gt6wiPeC3XqNZKnMcM2dbRZCkKr1PtytBxf9hhV7Hxew';
const usdcToken = 'Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr';

const rpc = createSolanaRelayerRpcClient(basePath, relayer_id, accessToken);

// example dev config
const config = new Configuration({
  basePath,
  accessToken,
});

const relayersApi = new RelayersApi(config);

async function quoteSponsoredTransaction() {
  try {
    // Get latest blockhash
    const { value: latestBlockhash } = await rpc.getLatestBlockhash().send();
    console.log(`Latest blockhash: ${latestBlockhash.blockhash}`);

    // Create the serialized transaction using the util function
    const serializedTransaction = await getSerializedTokenTransfer(
      source,
      destination,
      usdcToken,
      1000000, // Amount (consider token decimals)
      latestBlockhash,
    );

    // Estimate fee using the relayer
    const feeEstimate = await relayersApi.quoteSponsoredTransaction(relayer_id, {
      transaction: serializedTransaction,
      fee_token: usdcToken,
    });

    console.log('Fee Estimate:');
    console.log(JSON.stringify(feeEstimate.data, null, 2));
  } catch (error) {
    console.error('Error estimating fee:', error);
  }
}

quoteSponsoredTransaction();
