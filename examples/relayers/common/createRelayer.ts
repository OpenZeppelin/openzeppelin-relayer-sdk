/**
 * Create Relayer Example
 *
 * This example demonstrates how to use the OpenZeppelin Relayer SDK to create a new relayer.
 *  *
 * IMPORTANT: This is provided as a demonstration only. For production use:
 * - Use proper error handling and transaction confirmation checks
 * - Implement appropriate security measures for API keys and tokens
 * - Consider rate limiting and monitoring for production applications
 * - Test thoroughly on devnet/testnet before using on mainnet
 * - Use https connection for production applications
 *
 * Usage:
 *   ts-node createRelayer.ts
 */
import { Configuration, RelayerNetworkType, RelayersApi, StellarFeePaymentStrategy } from '../../../src';

// example dev config
const config = new Configuration({
  basePath: 'http://localhost:8080',
  accessToken: 'EDD3252B-32DD-485B-A618-C1C8CBFC546', // replace with your actual api key
});

const relayersApi = new RelayersApi(config);
const signer_id = 'local-signer-3'; // Replace with your actual signer id
const notification_id = null; // Replace with your actual notification id

relayersApi
  .createRelayer({
    name: 'ze-test-stellar',
    network_type: RelayerNetworkType.STELLAR,
    network: 'testnet',
    signer_id: signer_id,
    // notification_id: notification_id,
    paused: false,
    policies: {
      fee_payment_strategy: StellarFeePaymentStrategy.RELAYER,
    },
  })
  .then((relayer) => console.log(JSON.stringify(relayer.data, null, 2)))
  .catch(console.error);
