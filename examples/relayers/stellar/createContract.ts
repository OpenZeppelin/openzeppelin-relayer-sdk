/**
 * Stellar Create Contract Example
 *
 * This example demonstrates how to use the OpenZeppelin Relayer SDK to create a contract on Stellar from uploaded WASM.
 *
 * IMPORTANT: This is provided as a demonstration only. For production use:
 * - Use proper error handling and transaction confirmation checks
 * - Implement appropriate security measures for API keys and tokens
 * - Consider rate limiting and monitoring for production applications
 * - Test thoroughly on testnet before using on mainnet
 * - Use https connection for production applications
 *
 * Usage:
 *   ts-node createContract.ts
 */
import {
  AuthSpecOneOf1TypeEnum,
  Configuration,
  ContractSourceOneOfFromEnum,
  OperationSpecOneOf2TypeEnum,
  RelayersApi,
  StellarTransactionRequest,
} from '../../../src';

// example dev config
const config = new Configuration({
  basePath: 'http://localhost:8080',
  accessToken: '', // replace with your actual api key
});

const relayersApi = new RelayersApi(config);

// replace with your actual ids
const relayer_id = 'stellar-testnet';

// Replace with your actual address
const SOURCE_ACCOUNT = 'GCRID3RFJXOBEB73FWRYJJ4II5E5UQ423F7LTM4W5KI54NBHQDRUXVLY';

// Replace with the WASM hash from your upload transaction
const WASM_HASH = '82a3a81f9ef3730dbb0f763f62731c8d81f16531bdd5727bd51ec81594c765ce';

// 32-byte salt (hex-encoded)
const SALT = '6f7a5f746f6b656e5f7631000000000000000000000000000000000000000000';

const transaction: StellarTransactionRequest = {
  source_account: SOURCE_ACCOUNT,
  network: 'testnet',
  operations: [
    {
      type: OperationSpecOneOf2TypeEnum.CREATE_CONTRACT,
      source: { from: ContractSourceOneOfFromEnum.ADDRESS, address: SOURCE_ACCOUNT },
      wasm_hash: WASM_HASH,
      salt: SALT,
      constructor_args: [
        { address: SOURCE_ACCOUNT }, // Owner address
      ],
      auth: { type: AuthSpecOneOf1TypeEnum.SOURCE_ACCOUNT },
    },
  ],
};

relayersApi
  .sendTransaction(relayer_id, transaction)
  .then((response) => console.log(JSON.stringify(response.data, null, 2)))
  .catch(console.error);
