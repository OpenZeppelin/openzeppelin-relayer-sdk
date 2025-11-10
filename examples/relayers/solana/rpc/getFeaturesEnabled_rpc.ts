/**
 * Solana getFeaturesEnabled RPC Example
 *
 * This example demonstrates how to use the OpenZeppelin Relayer SDK to query the features
 * enabled on a specified Solana relayer.
 *
 *  NOTE: Solana RPC methods are designed to be used with "fee_payment_strategy" policy set to "user".
 *
 * Retrieve a list of features supported and enabled by the relayer.
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
 *   ts-node getFeaturesEnabled_rpc.ts
 */
import { Configuration, RelayersApi } from '../../../../src';

// example dev config
const config = new Configuration({
  basePath: 'http://localhost:8080',
  accessToken: '', // replace with your actual api key
});

const relayersApi = new RelayersApi(config);

const relayer_id = 'solana-example';

relayersApi
  .rpc(relayer_id, {
    method: 'getFeaturesEnabled',
    id: 1,
    jsonrpc: '2.0',
    params: {},
  })
  .then((features) => console.log(JSON.stringify(features.data, null, 2)))
  .catch(console.error);
