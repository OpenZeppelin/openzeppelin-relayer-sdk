/**
 * Create Notification Example
 *
 * This example demonstrates how to use the OpenZeppelin Relayer SDK to create a new notification.
 *  *
 * IMPORTANT: This is provided as a demonstration only. For production use:
 * - Use proper error handling and transaction confirmation checks
 * - Implement appropriate security measures for API keys and tokens
 * - Consider rate limiting and monitoring for production applications
 * - Test thoroughly on devnet/testnet before using on mainnet
 * - Use https connection for production applications
 *
 * Usage:
 *   ts-node createNotification.ts
 */
import { Configuration, NotificationType, NotificationsApi } from '../../src';

// example dev config
const config = new Configuration({
  basePath: 'http://localhost:8080',
  accessToken: '', // replace with your actual api key
});

const notificationsApi = new NotificationsApi(config);

notificationsApi
  .createNotification({
    type: NotificationType.WEBHOOK,
    url: 'https://webhook.site/123e4567-e89b-12d3-a456-426614174000',
  })
  .then((notification) => console.log(JSON.stringify(notification.data, null, 2)))
  .catch(console.error);
