/**
 * Solana estimateFee RPC Example
 *
 * This example demonstrates how to use the solana rpc client to perform an RPC calls to a Solana relayer.
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
 *   ts-node rpc_client.ts
 */
import { createSolanaRelayerRpcClient } from './util';

// Replace with your actual values
const basePath = 'http://localhost:8080';
const accessToken = ''; // replace with your actual api key
const relayer_id = 'solana-example';

const rpc = createSolanaRelayerRpcClient(basePath, relayer_id, accessToken);

rpc
  .getLatestBlockhash()
  .send()
  .then((blockhash) => {
    console.log(`Latest blockhash: ${blockhash.value.blockhash}`);
  })
  .catch((error) => {
    console.error('Error getting latest blockhash:', error);
  });
