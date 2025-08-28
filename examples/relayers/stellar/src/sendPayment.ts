/**
 * Stellar Send Payment Example
 *
 * This example demonstrates how to use the OpenZeppelin Relayer SDK to send a payment transaction on Stellar.
 *
 * IMPORTANT: This is provided as a demonstration only. For production use:
 * - Use proper error handling and transaction confirmation checks
 * - Implement appropriate security measures for API keys and tokens
 * - Consider rate limiting and monitoring for production applications
 * - Test thoroughly on testnet before using on mainnet
 * - Use https connection for production applications
 *
 * Usage:
 *   ts-node sendPayment.ts
 */
import {
  AssetSpecOneOfTypeEnum,
  Configuration,
  OperationSpecOneOfTypeEnum,
  RelayersApi,
  StellarTransactionRequest,
} from '@openzeppelin/relayer-sdk';

// example dev config
const config = new Configuration({
  basePath: 'http://localhost:8080',
  accessToken: '', // replace with your actual api key
});

const relayersApi = new RelayersApi(config);

// replace with your actual ids
const relayer_id = 'stellar-testnet';

// Replace with your actual addresses
const SOURCE_ACCOUNT = 'GCRID3RFJXOBEB73FWRYJJ4II5E5UQ423F7LTM4W5KI54NBHQDRUXVLY';
const DESTINATION_ACCOUNT = 'GCRID3RFJXOBEB73FWRYJJ4II5E5UQ423F7LTM4W5KI54NBHQDRUXVLY';

const transaction: StellarTransactionRequest = {
  source_account: SOURCE_ACCOUNT,
  network: 'testnet',
  operations: [
    {
      type: OperationSpecOneOfTypeEnum.PAYMENT,
      destination: DESTINATION_ACCOUNT,
      amount: 1,
      asset: { type: AssetSpecOneOfTypeEnum.NATIVE },
    },
  ],
};

relayersApi
  .sendTransaction(relayer_id, transaction)
  .then((response) => console.log(JSON.stringify(response.data, null, 2)))
  .catch(console.error);
