/**
 * Cancel Relayer Transaction By Id Example
 *
 * This example demonstrates how to use the OpenZeppelin Relayer SDK to cancel a relayer transaction by id.
 *
 * IMPORTANT: This is provided as a demonstration only. For production use:
 * - Use proper error handling and transaction confirmation checks
 * - Implement appropriate security measures for API keys and tokens
 * - Consider rate limiting and monitoring for production applications
 * - Test thoroughly on devnet/testnet before using on mainnet
 * - Use https connection for production applications
 *
 * Usage:
 *   ts-node cancelTransactionById.ts
 */
import { Configuration, RelayersApi } from '../../../src';

// example dev config
const config = new Configuration({
  basePath: 'http://localhost:8080',
  accessToken: 'Bearer example-123456',
});

const relayersApi = new RelayersApi(config);

const relayer_id = 'sepolia-example';

const transaction_id = '305ff83d-6653-465f-8fa3-e8a46271fb83';

relayersApi
  .cancelTransaction(relayer_id, transaction_id)
  .then((transaction) => console.log(JSON.stringify(transaction.data, null, 2)))
  .catch(console.error);
