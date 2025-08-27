import * as solana from '@solana/web3.js';

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

import { createTokenTransfer } from './util';
import { getAssociatedTokenAddress } from '@solana/spl-token';

const connection = new solana.Connection(solana.clusterApiUrl('devnet'));

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

const usdcMint = new solana.PublicKey(usdcToken);
const sourceWalletAddress = new solana.PublicKey(source);
const destinationWalletAddress = new solana.PublicKey(destination);

async function estimateFee() {
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
