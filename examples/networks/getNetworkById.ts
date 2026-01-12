/**
 * Get Network By Id Example
 *
 * This example demonstrates how to use the OpenZeppelin Relayer SDK to get a network by id.
 *  *
 * IMPORTANT: This is provided as a demonstration only. For production use:
 * - Use proper error handling and transaction confirmation checks
 * - Implement appropriate security measures for API keys and tokens
 * - Consider rate limiting and monitoring for production applications
 * - Test thoroughly on devnet/testnet before using on mainnet
 * - Use https connection for production applications
 *
 * Usage:
 *   ts-node getNetworkById.ts
 */
import { Configuration, NetworksApi } from '../../src';

// example dev config
const config = new Configuration({
  basePath: 'http://localhost:8080',
  accessToken: '', // replace with your actual api key
});

const networksApi = new NetworksApi(config);

const networkId = 'evm:sepolia';

networksApi
  .getNetwork(networkId)
  .then((networks) => console.log(JSON.stringify(networks.data, null, 2)))
  .catch(console.error);
