/**
 * Get Relayer Example
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
 *   ts-node index.ts
 */
import { Configuration, RelayersApi } from '../../src';

// example dev config
const config = new Configuration({
  basePath: 'http://localhost:8080/api/v1/',
  accessToken: 'Bearer example-123456',
});

const relayersApi = new RelayersApi(config);

const relayer_id = 'solana-example';

relayersApi
  .updateRelayer(relayer_id, {
    paused: false, // set to true to unpause
  })
  .then((tokens) => console.log(JSON.stringify(tokens.data, null, 2)))
  .catch(console.error);
