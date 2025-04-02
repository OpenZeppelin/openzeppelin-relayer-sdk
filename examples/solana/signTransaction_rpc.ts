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
import { createTokenTransfer } from './util';
import { getAssociatedTokenAddress } from '@solana/spl-token';

const connection = new solana.Connection(solana.clusterApiUrl('devnet'));

// example dev config
const config = new Configuration({
  basePath: 'http://localhost:8080',
  accessToken: 'EDD3252B-32DD-485B-A618-C1C8CBFC546', // replace with your actual access token
});

const relayersApi = new RelayersApi(config);

// Replace with your actual values
const relayer_id = 'solana-example';
const source = 'C6VBV1EK2Jx7kFgCkCD5wuDeQtEH8ct2hHGUPzEhUSc8';
const destination = 'Gt6wiPeC3XqNZKnMcM2dbRZCkKr1PtytBxf9hhV7Hxew';
const token = 'Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr'; // USDC token mint address

const usdcMint = new solana.PublicKey(token);
const sourceWalletAddress = new solana.PublicKey(source);
const destinationWalletAddress = new solana.PublicKey(destination);

async function signTransaction() {
  try {
    const sourceTokenAccount = await getAssociatedTokenAddress(usdcMint, sourceWalletAddress);
    const destinationTokenAccount = await getAssociatedTokenAddress(usdcMint, destinationWalletAddress);
    const { blockhash } = await connection.getLatestBlockhash();
    console.log(`Latest blockhash: ${blockhash}`);

    const transaction = createTokenTransfer(
      source,
      sourceTokenAccount,
      destinationTokenAccount,
      source,
      1000000, // Amount (consider token decimals)
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
