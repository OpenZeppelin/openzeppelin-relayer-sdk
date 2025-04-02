/**
 * Send EIP1559 Transaction Example
 *
 * This example demonstrates how to use the OpenZeppelin Relayer SDK to send eip1559 transaction.
 *  *
 * IMPORTANT: This is provided as a demonstration only. For production use:
 * - Use proper error handling and transaction confirmation checks
 * - Implement appropriate security measures for API keys and tokens
 * - Consider rate limiting and monitoring for production applications
 * - Test thoroughly on devnet/testnet before using on mainnet
 * - Use https connection for production applications
 *
 * Usage:
 *   ts-node sendTransactionEIP1559.ts
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

relayersApi
  .sendTransaction(relayer_id, {
    to: '0xc834dcdc9a074dbbadcc71584789ae4b463db116',
    value: 0,
    data: '0x',
    gas_limit: 21000,
    max_fee_per_gas: 1000000000,
    max_priority_fee_per_gas: 1000000000,
  })
  .then((transaction) => console.log(JSON.stringify(transaction.data, null, 2)))
  .catch(console.error);
