/**
 * Launchtube Relayer Client Example
 *
 * Demonstrates basic usage of the Launchtube client via OpenZeppelin Relayer.
 * For direct HTTP connection, see launchtube-direct-example.ts
 */

import { LaunchtubeRelayerClient } from '../../src/clients';

async function main() {
  // Initialize client
  const client = new LaunchtubeRelayerClient({
    apiKey: process.env.RELAYER_API_KEY || 'your-relayer-api-key',
    pluginId: process.env.LAUNCHTUBE_PLUGIN_ID || 'launchtube-plugin',
    baseUrl: process.env.RELAYER_BASE_URL || 'http://localhost:8080',
    adminSecret: process.env.LAUNCHTUBE_ADMIN_SECRET, // Optional: for management operations
  });

  // Send transaction with XDR
  const txResult = await client.sendTransaction({
    xdr: 'AAAAAgAAAABQEp+s8xGPrF...', // Your transaction envelope XDR
    sim: false, // Set to true to simulate before submission
  });
  console.log('Transaction result:', txResult);

  // Send transaction with func + auth
  const funcTxResult = await client.sendTransaction({
    func: 'AAAABAAAAAEAAAAGc3ltYm9s...', // Soroban host function XDR
    auth: ['AAAACAAAAAEAAAA...', 'AAAACAAAAAEAAAB...'], // Authorization entry XDRs
    sim: true, // Simulate first to check for issues
  });
  console.log('Func+auth result:', funcTxResult);

  // List sequence accounts
  const accounts = await client.listSequenceAccounts();
  console.log('Sequence accounts:', accounts);

  // Set sequence accounts
  const updateResult = await client.setSequenceAccounts(['seq-001', 'seq-002', 'seq-003']);
  console.log('Update result:', updateResult);
}

main().catch(console.error);
