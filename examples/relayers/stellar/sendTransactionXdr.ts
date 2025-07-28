/**
 * Stellar Send Transaction with XDR Example
 *
 * This example demonstrates how to use the OpenZeppelin Relayer SDK to send a pre-built
 * transaction using XDR (External Data Representation) on Stellar.
 *
 * IMPORTANT: This is provided as a demonstration only. For production use:
 * - Use proper error handling and transaction confirmation checks
 * - Implement appropriate security measures for API keys and tokens
 * - Consider rate limiting and monitoring for production applications
 * - Test thoroughly on testnet before using on mainnet
 * - Use https connection for production applications
 *
 * Usage:
 *   ts-node sendTransactionXdr.ts
 */
import { Configuration, RelayersApi, StellarTransactionRequest } from '../../../src';

// example dev config
const config = new Configuration({
  basePath: 'http://localhost:8080',
  accessToken: '', // replace with your actual api key
});

const relayersApi = new RelayersApi(config);

// replace with your actual ids
const relayer_id = 'stellar-testnet';

// Replace with your unsigned transaction XDR
const UNSIGNED_XDR = '';

async function main() {
  try {
    const transaction: StellarTransactionRequest = {
      network: 'testnet',
      transaction_xdr: UNSIGNED_XDR,
    };

    console.log('Sending transaction with XDR...');
    console.log('XDR:', UNSIGNED_XDR);

    const response = await relayersApi.sendTransaction(relayer_id, transaction);

    console.log('Transaction submitted successfully:');
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error sending transaction:', error);
  }
}

main();
