/**
 * Solana prepareTransaction RPC Example
 *
 * This example demonstrates how to use the OpenZeppelin Relayer SDK to prepare a Solana
 * transaction for sponsored submission.
 *
 *  NOTE: Solana RPC methods are designed to be used with "fee_payment_strategy" policy set to "user".
 *
 * Prepare a transaction to be signed by adding relayer-specific instructions, such as updating
 * the fee payer and including relayer-specific instructions.
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
 *   ts-node prepareTransaction_rpc.ts
 */
import { Configuration, RelayersApi } from '../../../../src';

import { createSolanaRpc } from '@solana/kit';
import { getSerializedTokenTransfer } from '../util';

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
const token = 'Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr'; // USDC token mint address

async function prepareTransaction() {
  try {
    // Get latest blockhash
    const { value: latestBlockhash } = await rpc.getLatestBlockhash().send();
    console.log(`Latest blockhash: ${latestBlockhash.blockhash}`);

    // Create the serialized transaction using the util function
    const serializedTransaction = await getSerializedTokenTransfer(
      source,
      destination,
      token,
      1000000, // Amount (consider token decimals)
      latestBlockhash,
    );

    // Prepare transaction using the relayer
    const prepareTransaction = await relayersApi.rpc(relayer_id, {
      method: 'prepareTransaction',
      id: 1,
      jsonrpc: '2.0',
      params: {
        transaction: serializedTransaction,
        fee_token: token,
      },
    });

    console.log('Prepare transaction:');
    console.log(JSON.stringify(prepareTransaction.data, null, 2));
  } catch (error) {
    console.error('Error preparing transaction:', error);
  }
}

prepareTransaction();
