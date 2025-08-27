/**
 * Pause Relayer Example
 *
 * This example demonstrates how to use the OpenZeppelin Relayer SDK to pause a specific relayer.
 *  *
 * IMPORTANT: This is provided as a demonstration only. For production use:
 * - Use proper error handling and transaction confirmation checks
 * - Implement appropriate security measures for API keys and tokens
 * - Consider rate limiting and monitoring for production applications
 * - Test thoroughly on devnet/testnet before using on mainnet
 * - Use https connection for production applications
 *
 * Usage:
 *   ts-node pauseRelayer.ts
 */
import { Configuration, RelayersApi } from '../../../src';

// example dev config
const config = new Configuration({
  basePath: 'http://localhost:8080',
  accessToken: '', // replace with your actual api key
});

const relayersApi = new RelayersApi(config);

// replace with your actual id
const relayer_id = '';

relayersApi
  .updateRelayer(relayer_id, {
    paused: false, // set to true to unpause
  })
  .then((response) => console.log(JSON.stringify(response.data, null, 2)))
  .catch(console.error);
