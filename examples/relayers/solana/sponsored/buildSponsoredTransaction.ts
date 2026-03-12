/**
 * Solana Build Sponsored Transaction Example
 *
 * This example demonstrates how to use the OpenZeppelin Relayer SDK to build a sponsored
 * transaction on Solana. This allows you to build a transaction that can be signed by the
 * user and submitted to the network.
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
 *   ts-node buildSponsoredTransaction.ts
 */
import { Configuration, RelayersApi } from '../../../../src';
import { createSolanaRelayerRpcClient, getSerializedTokenTransfer } from '../util';

// Replace with your actual values
const basePath = 'http://localhost:8080';
const accessToken = 'EDD3252B-32DD-485B-A618-C1C8CBFC546'; // replace with your actual api key
const relayer_id = 'solana-example';
const source = 'EYsk8PduFSAt7W9dnvL2Pt7qcVsb5wAVCYbJ5UQaUpXf';
const destination = 'Gt6wiPeC3XqNZKnMcM2dbRZCkKr1PtytBxf9hhV7Hxew';
const token = 'Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr'; // USDC token mint address

const rpc = createSolanaRelayerRpcClient(basePath, relayer_id, accessToken);

// example dev config
const config = new Configuration({
  basePath,
  accessToken,
});

const relayersApi = new RelayersApi(config);
async function buildSponsoredTransaction() {
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
    const prepareTransaction = await relayersApi.buildSponsoredTransaction(relayer_id, {
      transaction: serializedTransaction,
      fee_token: token,
    });

    console.log('Sponsored transaction built:');
    console.log(JSON.stringify(prepareTransaction.data, null, 2));
  } catch (error) {
    console.error('Error building sponsored transaction:', error);
  }
}

buildSponsoredTransaction();
