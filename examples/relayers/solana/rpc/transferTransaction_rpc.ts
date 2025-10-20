/**
 * Solana transferTransaction RPC Example
 *
 * This example demonstrates how to use the OpenZeppelin Relayer SDK to execute a simple
 * token transfer using the relayer's built-in transferTransaction method.
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
 *   ts-node transferTransaction_rpc.ts
 */
import { Configuration, RelayersApi } from '../../../../src';

// example dev config
const config = new Configuration({
  basePath: 'http://localhost:8080',
  accessToken: '', // replace with your actual api key
});

const relayersApi = new RelayersApi(config);

// Replace with your actual values
const relayer_id = 'solana-example';
const source = 'DiUZ95hZn7cJCY6THuuGQUPMv4bfTuSCUraunmD5PdoZ';
const destination = '6S9v8CedUumV7qbqq37v2GfBRxWemA6zpVGjQsiVHSZ4';
const token = '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU';

async function transferTransaction() {
  try {
    // Transfer transaction using the relayer
    const transferTransaction = await relayersApi.rpc(relayer_id, {
      method: 'transferTransaction',
      id: 1,
      jsonrpc: '2.0',
      params: {
        token,
        amount: 1000000,
        source,
        destination,
      },
    });

    console.log('Transfer Transaction:');
    console.log(JSON.stringify(transferTransaction.data, null, 2));
  } catch (error) {
    console.error('Error executing transfer transaction:', error);
  }
}

transferTransaction();
