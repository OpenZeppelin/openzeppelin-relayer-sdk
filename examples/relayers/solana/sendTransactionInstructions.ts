/**
 * Solana sendTransaction with Instructions Example
 *
 * This example demonstrates how to use the OpenZeppelin Relayer SDK to send a Solana
 * transaction using the instructions array instead of a pre-built transaction.
 *
 *  NOTE: send transaction endpoint is enabled when "fee_payment_strategy" policy is set to "relayer".
 *
 * The relayer will build the transaction from the provided instructions, sign it,
 * and submit it to the Solana blockchain for execution.
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
 *   ts-node sendTransactionInstructions.ts
 */
import { Configuration, RelayersApi } from '../../../src';

import { getTokenTransferInstruction } from './util';

// example dev config
const config = new Configuration({
  basePath: 'http://localhost:8080',
  accessToken: '', // replace with your actual api key
});

const relayersApi = new RelayersApi(config);

// Replace with your actual values
const relayer_id = 'solana-example';
const source = 'C6VBV1EK2Jx7kFgCkCD5wuDeQtEH8ct2hHGUPzEhUSc8';
const destination = 'Gt6wiPeC3XqNZKnMcM2dbRZCkKr1PtytBxf9hhV7Hxew';
const token = 'Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr'; // USDC token mint address

async function sendTransactionWithInstructions() {
  try {
    // Create the token transfer instruction
    const transferInstruction = await getTokenTransferInstruction(
      source,
      destination,
      token,
      1000000, // Amount (consider token decimals)
    );

    console.log('Transfer instruction:', JSON.stringify(transferInstruction, null, 2));

    // Send transaction using the relayer with instructions array
    // The relayer will build, sign, and submit the transaction
    const response = await relayersApi.sendTransaction(relayer_id, {
      instructions: [transferInstruction],
    });

    console.log('Send transaction response:');
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error sending transaction:', error);
  }
}

sendTransactionWithInstructions();
