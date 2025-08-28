/**
 * List Notifications Example
 *
 * This example demonstrates how to use the OpenZeppelin Relayer SDK to list notifications.
 *  *
 * IMPORTANT: This is provided as a demonstration only. For production use:
 * - Use proper error handling and transaction confirmation checks
 * - Implement appropriate security measures for API keys and tokens
 * - Consider rate limiting and monitoring for production applications
 * - Test thoroughly on devnet/testnet before using on mainnet
 * - Use https connection for production applications
 *
 * Usage:
 *   ts-node listNotifications.ts
 */
import { Configuration, NotificationsApi } from '../../src';

// example dev config
const config = new Configuration({
  basePath: 'http://  localhost:8080',
  accessToken: '', // replace with your actual api key
});

const notificationsApi = new NotificationsApi(config);

notificationsApi
  .listNotifications()
  .then((notifications) => console.log(JSON.stringify(notifications.data, null, 2)))
  .catch(console.error);
