/**
 * List Relayers Example
 *
 * This example demonstrates how to use the OpenZeppelin Relayer SDK to list relayers.
 *  *
 * IMPORTANT: This is provided as a demonstration only. For production use:
 * - Use proper error handling and transaction confirmation checks
 * - Implement appropriate security measures for API keys and tokens
 * - Consider rate limiting and monitoring for production applications
 * - Test thoroughly on devnet/testnet before using on mainnet
 * - Use https connection for production applications
 *
 * Usage:
 *   ts-node listRelayers.ts
 */
import { Configuration, RelayersApi } from '../../../src';

// example dev config
const config = new Configuration({
  basePath: 'http://localhost:8080',
  accessToken: '', // replace with your actual api key
});

const relayersApi = new RelayersApi(config);

relayersApi
  .listRelayers()
  .then((relayers) => console.log(JSON.stringify(relayers.data, null, 2)))
  .catch(console.error);
