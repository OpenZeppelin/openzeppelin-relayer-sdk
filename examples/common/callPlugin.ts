/**
 * Invoke Plugin Example
 *
 * This example demonstrates how to use the OpenZeppelin Relayer SDK to invoke a plugin.
 *  *
 * IMPORTANT: This is provided as a demonstration only. For production use:
 * - Use proper error handling and transaction confirmation checks
 * - Implement appropriate security measures for API keys and tokens
 * - Consider rate limiting and monitoring for production applications
 * - Test thoroughly on devnet/testnet before using on mainnet
 * - Use https connection for production applications
 *
 * Usage:
 *   ts-node callPlugin.ts
 */
import { Configuration, PluginsApi } from '../../src';

// example dev config
const config = new Configuration({
  basePath: 'http://localhost:8080',
  accessToken: '', // replace with your actual api key
});

const pluginsApi = new PluginsApi(config);

const plugin_id = 'example';

pluginsApi.callPlugin(plugin_id, {
  // these params will be passed to the plugin.
  params: {
    foo: 'bar',
    baz: 123,
  },
});
