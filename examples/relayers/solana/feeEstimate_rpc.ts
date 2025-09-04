/**
 * Solana estimateFee RPC Example
 *
 * This example demonstrates how to use the OpenZeppelin Relayer SDK to estimate the fee in SPL token
 * for a Solana transaction.
 *
 * Estimate the fee for an arbitrary transaction using a specified token. This helps clients
 * calculate costs before preparing or submitting the transaction.
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
 *   ts-node feeEstimate_rpc.ts
 */
import { Configuration, RelayersApi } from '../../../src';

import { createSolanaRpc } from '@solana/kit';
import { getSerializedTokenTransfer } from './util';

const rpc = createSolanaRpc('https://api.devnet.solana.com');

// example dev config
const config = new Configuration({
  basePath: 'http://localhost:8080',
  accessToken: '', // replace with your actual api key
});

const relayersApi = new RelayersApi(config);

// Replace with your actual values
const relayer_id = 'solana-example';
const source = 'EYsk8PduFSAt7W9dnvL2Pt7qcVsb5wAVCYbJ5UQaUpXf';
const destination = 'Gt6wiPeC3XqNZKnMcM2dbRZCkKr1PtytBxf9hhV7Hxew';
const usdcToken = 'Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr';

async function estimateFee() {
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
    const feeEstimate = await relayersApi.rpc(relayer_id, {
      method: 'feeEstimate',
      id: 1,
      jsonrpc: '2.0',
      params: {
        transaction: serializedTransaction,
        fee_token: usdcToken,
      },
    });

    console.log('Fee Estimate:');
    console.log(JSON.stringify(feeEstimate.data, null, 2));
  } catch (error) {
    console.error('Error estimating fee:', error);
  }
}

estimateFee();
