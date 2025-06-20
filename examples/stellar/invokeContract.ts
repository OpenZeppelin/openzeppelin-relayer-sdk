/**
 * Stellar Invoke Contract Example
 *
 * This example demonstrates how to use the OpenZeppelin Relayer SDK to invoke contract functions on Stellar.
 *
 * IMPORTANT: This is provided as a demonstration only. For production use:
 * - Use proper error handling and transaction confirmation checks
 * - Implement appropriate security measures for API keys and tokens
 * - Consider rate limiting and monitoring for production applications
 * - Test thoroughly on testnet before using on mainnet
 * - Use https connection for production applications
 *
 * Usage:
 *   ts-node invokeContract.ts mint      # Mint tokens (owner only)
 *   ts-node invokeContract.ts transfer  # Transfer tokens
 */
import { Configuration, RelayersApi, StellarTransactionRequest, ScVal } from '../../src';

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
const RECIPIENT_ADDRESS = 'GCRID3RFJXOBEB73FWRYJJ4II5E5UQ423F7LTM4W5KI54NBHQDRUXVLY';
const CONTRACT_ADDRESS = 'CBC4BKTDLYXSKP76SFWY7IQWWOLF6QSWEMUUEOHBWEXHCSTL6SOIRCRX';

// Helper function to convert string to i128 for token amounts
function stringToI128(value: string): ScVal {
  const bigValue = BigInt(value);
  const hi = (bigValue >> BigInt(64)).toString();
  const lo = (bigValue & ((BigInt(1) << BigInt(64)) - BigInt(1))).toString();
  return { i128: { hi, lo } };
}

// Parse command line arguments
const command = process.argv[2] || 'mint';

// Define transactions based on command
let transaction: StellarTransactionRequest;

if (command === 'mint') {
  transaction = {
    source_account: SOURCE_ACCOUNT,
    network: 'testnet',
    operations: [
      {
        type: 'invoke_contract',
        contract_address: CONTRACT_ADDRESS,
        function_name: 'mint',
        args: [
          { address: RECIPIENT_ADDRESS },
          stringToI128('1000000000000000000000'), // 1000 tokens (18 decimals)
        ],
        auth: { type: 'source_account' },
      },
    ],
  };
} else if (command === 'transfer') {
  transaction = {
    source_account: SOURCE_ACCOUNT,
    network: 'testnet',
    operations: [
      {
        type: 'invoke_contract',
        contract_address: CONTRACT_ADDRESS,
        function_name: 'transfer',
        args: [
          { address: SOURCE_ACCOUNT }, // From
          { address: RECIPIENT_ADDRESS }, // To
          stringToI128('100000000000000000000'), // 100 tokens (18 decimals)
        ],
        auth: { type: 'source_account' },
      },
    ],
  };
} else {
  console.error(`Unknown command: ${command}`);
  console.error('Usage:');
  console.error('  ts-node invokeContract.ts mint      # Mint tokens (owner only)');
  console.error('  ts-node invokeContract.ts transfer  # Transfer tokens');
  process.exit(1);
}

relayersApi
  .sendTransaction(relayer_id, transaction)
  .then((response) => console.log(JSON.stringify(response.data, null, 2)))
  .catch(console.error);
