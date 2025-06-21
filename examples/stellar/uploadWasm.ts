/**
 * Stellar Upload WASM Example
 *
 * This example demonstrates how to use the OpenZeppelin Relayer SDK to upload a WASM contract to Stellar.
 *
 * IMPORTANT: This is provided as a demonstration only. For production use:
 * - Use proper error handling and transaction confirmation checks
 * - Implement appropriate security measures for API keys and tokens
 * - Consider rate limiting and monitoring for production applications
 * - Test thoroughly on testnet before using on mainnet
 * - Use https connection for production applications
 *
 * Usage:
 *   ts-node uploadWasm.ts
 */
import { Configuration, RelayersApi, StellarTransactionRequest } from '../../src';
import * as fs from 'fs';
import * as path from 'path';

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

// Read WASM contract hex from file
const WASM_HEX_FILE = path.join(__dirname, 'OpenZeppelinTokenContract.hex');
const WASM_HEX = fs.readFileSync(WASM_HEX_FILE, 'utf8').trim();

const transaction: StellarTransactionRequest = {
  source_account: SOURCE_ACCOUNT,
  network: 'testnet',
  operations: [
    {
      type: 'upload_wasm',
      wasm: { type: 'hex', hex: WASM_HEX },
      auth: { type: 'source_account' },
    },
  ],
};

relayersApi
  .sendTransaction(relayer_id, transaction)
  .then((response) => console.log(JSON.stringify(response.data, null, 2)))
  .catch(console.error);
