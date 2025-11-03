/**
 * Stellar RPC Client Example
 *
 * This example demonstrates how to use the stellar-sdk library to perform an RPC calls to a Stellar relayer.
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

import { rpc } from '@stellar/stellar-sdk';

const relayer_id = 'stellar-example'; // Replace with your actual relayer id
const access_token = ''; // Replace with your actual access token

const server = new rpc.Server(`http://localhost:8080/api/v1/relayers/${relayer_id}/rpc`, {
  headers: {
    Authorization: `Bearer ${access_token}`,
  },
  allowHttp: true,
});

// Simple RPC calls for demo purposes:

// 1. Get latest ledger info
server.getLatestLedger()
  .then((ledger) => console.log('Latest Ledger:', JSON.stringify(ledger, null, 2)))
  .catch(console.error);

// 2. Get network info
server.getNetwork()
  .then((network) => console.log('Network Info:', JSON.stringify(network, null, 2)))
  .catch(console.error);

// 3. Get health status
server.getHealth()
  .then((health) => console.log('Health:', JSON.stringify(health, null, 2)))
  .catch(console.error);
