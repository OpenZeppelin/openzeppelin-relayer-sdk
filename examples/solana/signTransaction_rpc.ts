/**
 * Solana signTransaction RPC Example
 *
 * This example demonstrates how to use the OpenZeppelin Relayer SDK to sign a transaction.
 *
 * Sign a prepared transaction without submitting it to the blockchain. This ensures the
 * transaction is valid and ready for later submission.
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
 *   ts-node signTransaction_rpc.ts
 */
import { Configuration, RelayersApi } from '../../src';
import * as solana from '@solana/web3.js';
import { createSolTransfer } from './util';

const connection = new solana.Connection(solana.clusterApiUrl('devnet'));

// example dev config
const config = new Configuration({
  basePath: 'http://localhost:8080',
  accessToken: 'Bearer example-123456',
});

const relayersApi = new RelayersApi(config);

const relayer_id = 'solana-example';

const fromAddress = 'C6VBV1EK2Jx7kFgCkCD5wuDeQtEH8ct2hHGUPzEhUSc8';
const toAddress = 'C6VBV1EK2Jx7kFgCkCD5wuDeQtEH8ct2hHGUPzEhUSc8';

async function signTransaction() {
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

    // Sign transaction using the relayer
    const signTransaction = await relayersApi.rpc(relayer_id, {
      method: 'signTransaction',
      id: 1,
      jsonrpc: '2.0',
      params: {
        transaction: serializedTransaction,
      },
    });

    console.log('Sign Transaction:');
    console.log(JSON.stringify(signTransaction.data, null, 2));
  } catch (error) {
    console.error('Error signing transaction:', error);
  }
}

signTransaction();
