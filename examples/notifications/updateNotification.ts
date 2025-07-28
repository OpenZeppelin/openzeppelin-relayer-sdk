/**
 * Update Notification Example
 *
 * This example demonstrates how to use the OpenZeppelin Relayer SDK to update a specfic notification.
 *  *
 * IMPORTANT: This is provided as a demonstration only. For production use:
 * - Use proper error handling and transaction confirmation checks
 * - Implement appropriate security measures for API keys and tokens
 * - Consider rate limiting and monitoring for production applications
 * - Test thoroughly on devnet/testnet before using on mainnet
 * - Use https connection for production applications
 *
 * Usage:
 *   ts-node updateNotification.ts
 */
import { Configuration, NotificationType, NotificationsApi } from '../../src';

// example dev config
const config = new Configuration({
  basePath: 'http://localhost:8080',
  accessToken: '', // replace with your actual api key
});

const notificationsApi = new NotificationsApi(config);

// replace with your actual id
const notification_id = '';

const webhook_url = ''; // replace with your actual webhook url

notificationsApi
  .updateNotification(notification_id, {
    type: NotificationType.WEBHOOK,
    url: webhook_url,
  })
  .then((response) => console.log(JSON.stringify(response.data, null, 2)))
  .catch(console.error);
