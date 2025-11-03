/**
 * Multi-Chain RPC Example
 *
 * This example demonstrates how to use the OpenZeppelin Relayer SDK to perform an RPC calls.
 * This example uses raw RPC requests to the relayer.
 * You can also use the rpc clients to perform RPC calls to the relayer. Check network specific examples for more details.
 *  *
 * IMPORTANT: This is provided as a demonstration only. For production use:
 * - Use proper error handling and transaction confirmation checks
 * - Implement appropriate security measures for API keys and tokens
 * - Consider rate limiting and monitoring for production applications
 * - Test thoroughly on devnet/testnet before using on mainnet
 * - Use https connection for production applications
 *
 * Usage:
 *   ts-node rpc.ts
 */
import { Configuration, RelayersApi } from '../../../src';

// example dev config
const config = new Configuration({
  basePath: 'http://localhost:8080',
  accessToken: 'EDD3252B-32DD-485B-A618-C1C8CBFC546', // replace with your actual api key
});

const relayersApi = new RelayersApi(config);

// replace with your actual ids
const evm_relayer_id = 'sepolia-example'; // Replace with your actual relayer id
const solana_relayer_id = 'solana-example'; // Replace with your actual relayer id
const stellar_relayer_id = 'stellar-example'; // Replace with your actual relayer id

// EVM RPC request
relayersApi
  .rpc(evm_relayer_id, {
    method: 'eth_blockNumber',
    id: 1,
    jsonrpc: '2.0',
    params: [],
  })
  .then((transaction) => console.log('EVM RPC Response:', JSON.stringify(transaction.data, null, 2)))
  .catch(console.error);

// Solana RPC request
relayersApi
  .rpc(solana_relayer_id, {
    jsonrpc: '2.0',
    id: 1,
    method: 'getLatestBlockhash',
    params: [
      {
        commitment: 'finalized',
      },
    ],
  })
  .then((transaction) => console.log('Solana RPC Response:', JSON.stringify(transaction.data, null, 2)))
  .catch(console.error);

// Stellar RPC request
relayersApi
  .rpc(stellar_relayer_id, {
    jsonrpc: '2.0',
    id: 1,
    method: 'getLedgerEntries',
    params: {
      keys: [
        'AAAABgAAAAHMA/50/Q+w3Ni8UXWm/trxFBfAfl6De5kFttaMT0/ACwAAABAAAAABAAAAAgAAAA8AAAAHQ291bnRlcgAAAAASAAAAAAAAAAAg4dbAxsGAGICfBG3iT2cKGYQ6hK4sJWzZ6or1C5v6GAAAAAE=',
      ],
    },
  })
  .then((response: any) => console.log('Stellar RPC Response:', JSON.stringify(response.data, null, 2)))
  .catch(console.error);
