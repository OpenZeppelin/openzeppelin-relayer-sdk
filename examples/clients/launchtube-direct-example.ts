/**
 * Launchtube Direct Client Example
 *
 * Demonstrates basic usage of the Launchtube client for direct HTTP connections.
 * For relayer mode, see launchtube-relayer-example.ts
 */

import { LaunchtubeClient } from '../../src';

async function main() {
  // Initialize client
  const client = new LaunchtubeClient({
    baseUrl: process.env.LAUNCHTUBE_BASE_URL || 'https://launchtube.example.com',
    apiKey: process.env.LAUNCHTUBE_API_KEY || 'your-launchtube-api-key',
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
