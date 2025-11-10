/**
 * Solana getSupportedTokens RPC Example
 *
 * This example demonstrates how to use the OpenZeppelin Relayer SDK to query the tokens
 * enabled on a specified Solana relayer.
 *
 *  NOTE: Solana RPC methods are designed to be used with "fee_payment_strategy" policy set to "user".
 *
 * Retrieve a list of tokens supported by the relayer for fee payments.
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
 *   ts-node getSupportedTokens_rpc.ts
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
    method: 'getSupportedTokens',
    id: 1,
    jsonrpc: '2.0',
    params: {},
  })
  .then((tokens) => console.log(JSON.stringify(tokens.data, null, 2)))
  .catch(console.error);
