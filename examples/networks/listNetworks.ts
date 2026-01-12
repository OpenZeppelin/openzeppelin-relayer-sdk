/**
 * List Networks Example
 *
 * This example demonstrates how to use the OpenZeppelin Relayer SDK to list networks.
 *  *
 * IMPORTANT: This is provided as a demonstration only. For production use:
 * - Use proper error handling and transaction confirmation checks
 * - Implement appropriate security measures for API keys and tokens
 * - Consider rate limiting and monitoring for production applications
 * - Test thoroughly on devnet/testnet before using on mainnet
 * - Use https connection for production applications
 *
 * Usage:
 *   ts-node listNetworks.ts
 */
import { Configuration, NetworksApi } from '../../src';

// example dev config
const config = new Configuration({
  basePath: 'http://localhost:8080',
  accessToken: '2cc7ec17-45ca-4498-ba86-517ef0788b8c', // replace with your actual api key
});

const networksApi = new NetworksApi(config);

networksApi
  .listNetworks()
  .then((networks) => console.log(JSON.stringify(networks.data, null, 2)))
  .catch(console.error);
