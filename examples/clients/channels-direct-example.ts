/**
 * Channels Direct Client Example
 *
 * Demonstrates basic usage of the Channels client for direct HTTP connections.
 * For relayer mode, see channels-relayer-example.ts
 */

import { ChannelsClient } from '../../src/clients/channels';

async function main() {
  // Initialize client
  const client = new ChannelsClient({
    baseUrl: process.env.CHANNELS_BASE_URL || 'https://channels.example.com',
    apiKey: process.env.CHANNELS_API_KEY || 'your-api-key',
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
