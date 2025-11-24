/**
 * Update Relayer Example
 *
 * This example demonstrates how to use the OpenZeppelin Relayer SDK to update a relayer.
 *  *
 * IMPORTANT: This is provided as a demonstration only. For production use:
 * - Use proper error handling and transaction confirmation checks
 * - Implement appropriate security measures for API keys and tokens
 * - Consider rate limiting and monitoring for production applications
 * - Test thoroughly on devnet/testnet before using on mainnet
 * - Use https connection for production applications
 *
 * Usage:
 *   ts-node updateRelayer.ts
 */
import { Configuration, RelayersApi, StellarFeePaymentStrategy } from '../../../src';

// example dev config
const config = new Configuration({
  basePath: 'http://localhost:8080',
  accessToken: 'EDD3252B-32DD-485B-A618-C1C8CBFC546', // replace with your actual api key
});

const relayersApi = new RelayersApi(config);
const relayer_id = '6a782af4-231e-4a09-9d64-e557af14bb9f'; // Replace with your actual relayer id

relayersApi
  .updateRelayer(relayer_id, {
    policies: {
      fee_payment_strategy: StellarFeePaymentStrategy.USER,
    },
  })
  .then((relayer) => console.log(JSON.stringify(relayer.data, null, 2)))
  .catch(console.error);
