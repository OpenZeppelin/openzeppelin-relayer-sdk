/**
 * Stellar Send Fee Bump Transaction Example
 *
 * This example demonstrates how to use the OpenZeppelin Relayer SDK to send a fee bump
 * transaction on Stellar. This is useful when you have a pre-signed transaction and need
 * the relayer to pay the fees by wrapping it in a fee bump transaction.
 *
 * IMPORTANT: This is provided as a demonstration only. For production use:
 * - Use proper error handling and transaction confirmation checks
 * - Implement appropriate security measures for API keys and tokens
 * - Consider rate limiting and monitoring for production applications
 * - Test thoroughly on testnet before using on mainnet
 * - Use https connection for production applications
 *
 * Usage:
 *   ts-node sendFeeBumpTransaction.ts
 */
import { Configuration, RelayersApi, StellarTransactionRequest } from '../../src';

// example dev config
const config = new Configuration({
  basePath: 'http://localhost:8080',
  accessToken: '', // replace with your actual api key
});

const relayersApi = new RelayersApi(config);

// replace with your actual ids
const relayer_id = 'stellar-testnet';

// Replace with your signed transaction XDR that needs fee bumping
const UNSIGNED_XDR = '';

async function main() {
  try {
    const transaction: StellarTransactionRequest = {
      network: 'testnet',
      transaction_xdr: UNSIGNED_XDR,
      fee_bump: true,
      max_fee: 1000000, // 0.1 XLM
    };

    console.log('Sending fee bump transaction...');
    console.log('Original signed XDR:', UNSIGNED_XDR);
    console.log('Max fee:', transaction.max_fee, 'stroops (', transaction.max_fee! / 10000000, 'XLM)');

    const response = await relayersApi.sendTransaction(relayer_id, transaction);

    console.log('Fee bump transaction submitted successfully:');
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error sending fee bump transaction:', error);
  }
}

main();
