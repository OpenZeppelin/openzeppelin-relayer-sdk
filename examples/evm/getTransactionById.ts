/**
 * Get Relayer Transaction By Id Example
 *
 * This example demonstrates how to use the OpenZeppelin Relayer SDK to get relayer transaction by id.
 *  *
 * IMPORTANT: This is provided as a demonstration only. For production use:
 * - Use proper error handling and transaction confirmation checks
 * - Implement appropriate security measures for API keys and tokens
 * - Consider rate limiting and monitoring for production applications
 * - Test thoroughly on devnet/testnet before using on mainnet
 * - Use https connection for production applications
 *
 * Usage:
 *   ts-node getTransactionById.ts
 */
import { Configuration, RelayersApi } from '../../src';

// example dev config
const config = new Configuration({
  basePath: 'http://localhost:8080',
  accessToken: '', // replace with your actual access token
});

const relayersApi = new RelayersApi(config);

// replace with your actual ids
const relayer_id = 'sepolia-example';

const transaction_id = 'b337e9cb-b10d-4fb2-8412-8fa81b71ad4c';

relayersApi
  .getTransactionById(relayer_id, transaction_id)
  .then((transaction) => console.log(JSON.stringify(transaction.data, null, 2)))
  .catch(console.error);
