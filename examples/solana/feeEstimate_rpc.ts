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
import { Configuration, RelayersApi } from '../../src';
import * as solana from '@solana/web3.js';
import { createSolTransfer } from './util';

const connection = new solana.Connection(solana.clusterApiUrl('devnet'));

// example dev config
const config = new Configuration({
  basePath: 'http://localhost:8080/api/v1/',
  accessToken: 'Bearer example-123456',
});

const relayersApi = new RelayersApi(config);

const relayer_id = 'solana-example';

const fromAddress = 'C6VBV1EK2Jx7kFgCkCD5wuDeQtEH8ct2hHGUPzEhUSc8';
const toAddress = 'C6VBV1EK2Jx7kFgCkCD5wuDeQtEH8ct2hHGUPzEhUSc8';

async function estimateFee() {
  try {
    // Get the latest blockhash from devnet
    const { blockhash } = await connection.getLatestBlockhash();
    console.log(`Latest blockhash: ${blockhash}`);

    // Create transaction with the latest blockhash
    const transaction = createSolTransfer(
      fromAddress,
      toAddress,
      1000000, // lamports (0.001 SOL)
      blockhash,
    );

    const serializedTransaction = transaction
      .serialize({
        requireAllSignatures: false,
        verifySignatures: false,
      })
      .toString('base64');

    // Estimate fee using the relayer
    const feeEstimate = await relayersApi.rpc(relayer_id, {
      method: 'feeEstimate',
      id: 1,
      jsonrpc: '2.0',
      params: {
        transaction: serializedTransaction,
        fee_token: 'Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr',
      },
    });

    console.log('Fee Estimate:');
    console.log(JSON.stringify(feeEstimate.data, null, 2));
  } catch (error) {
    console.error('Error estimating fee:', error);
  }
}

estimateFee();
