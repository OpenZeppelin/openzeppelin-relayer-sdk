/**
 * EVM RPC Client Example
 *
 * This example demonstrates how to use the viem library to perform an RPC calls to an EVM relayer.
 *  *
 * IMPORTANT: This is provided as a demonstration only. For production use:
 * - Use proper error handling and transaction confirmation checks
 * - Implement appropriate security measures for API keys and tokens
 * - Consider rate limiting and monitoring for production applications
 * - Test thoroughly on devnet/testnet before using on mainnet
 * - Use https connection for production applications
 *
 * Usage:
 *   ts-node rpc_client.ts
 */
import { HttpTransportConfig, createPublicClient, http } from 'viem';

import { sepolia } from 'viem/chains';

// replace with your actual ids
const relayer_id = 'sepolia-example'; // Replace with your actual relayer id
const access_token = ''; // Replace with your actual access token
const base_path = 'http://localhost:8080';

const customTransport = (config?: HttpTransportConfig) =>
  http(`${base_path}/api/v1/relayers/${relayer_id}/rpc`, {
    fetchOptions: {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
    ...config,
  });

const client = createPublicClient({
  chain: sepolia,
  transport: customTransport(),
});

client
  .getBlock({ blockTag: 'latest' })
  .then((block) => {
    console.log('Block height:', block.number);
    console.log('Hash:', block.hash);
    console.log('Timestamp:', new Date(Number(block.timestamp) * 1000).toISOString());
  })
  .catch((error) => {
    console.error('Error:', error);
  });
