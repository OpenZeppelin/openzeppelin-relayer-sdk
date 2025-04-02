/**
 * Solana signAndSendTransaction RPC Example
 *
 * This example demonstrates how to use the OpenZeppelin Relayer SDK to sign and submit a Solana
 * transaction.
 *
 * Sign a prepared transaction and immediately submit it to the Solana blockchain for
 * execution.
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
 *   ts-node signAndSendTransaction_rpc.ts
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

const tokenMint = new solana.PublicKey(token);
const sourceWalletAddress = new solana.PublicKey(source);
const destinationWalletAddress = new solana.PublicKey(destination);

async function signAndSendTransaction() {
  try {
    const sourceTokenAccount = await getAssociatedTokenAddress(tokenMint, sourceWalletAddress);
    const destinationTokenAccount = await getAssociatedTokenAddress(tokenMint, destinationWalletAddress);
    // Get the latest blockhash from devnet
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

    // Sign and send transaction using the relayer
    const signAndSendTransaction = await relayersApi.rpc(relayer_id, {
      method: 'signAndSendTransaction',
      id: 1,
      jsonrpc: '2.0',
      params: {
        transaction: serializedTransaction,
      },
    });

    console.log('Sign and send transaction:');
    console.log(JSON.stringify(signAndSendTransaction.data, null, 2));
  } catch (error) {
    console.error('Error signing and sending transaction:', error);
  }
}

signAndSendTransaction();
