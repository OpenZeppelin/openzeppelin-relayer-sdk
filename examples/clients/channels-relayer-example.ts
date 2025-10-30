/**
 * Channels Relayer Client Example
 *
 * Demonstrates basic usage of the Channels client via OpenZeppelin Relayer.
 * For direct HTTP connection, see channels-direct-example.ts
 */

import { ChannelsRelayerClient } from '../../src/clients/channels';

async function main() {
  // Initialize client
  const client = new ChannelsRelayerClient({
    apiKey: process.env.RELAYER_API_KEY || 'your-relayer-api-key',
    pluginId: process.env.CHANNELS_PLUGIN_ID || 'channels',
    baseUrl: process.env.RELAYER_BASE_URL || 'http://localhost:8080',
    adminSecret: process.env.CHANNELS_ADMIN_SECRET, // Optional: for management operations
  });

  // Submit transaction with XDR
  const txResult = await client.submitTransaction({
    xdr: 'AAAAAgAAAABQEp+s8xGPrF...', // Your signed transaction envelope XDR
  });
  console.log('Transaction result:', txResult);

  // Submit Soroban transaction with func + auth
  const sorobanResult = await client.submitSorobanTransaction({
    func: 'AAAABAAAAAEAAAAGc3ltYm9s...', // Soroban host function XDR
    auth: ['AAAACAAAAAEAAAA...', 'AAAACAAAAAEAAAB...'], // Authorization entry XDRs
  });
  console.log('Soroban transaction result:', sorobanResult);

  // List channel accounts
  const accounts = await client.listChannelAccounts();
  console.log('Channel accounts:', accounts);

  // Set channel accounts
  const setResult = await client.setChannelAccounts(['channel-001', 'channel-002', 'channel-003']);
  console.log('Set result:', setResult);
}

main().catch(console.error);
