/**
 * Get Signer Example
 *
 * This example demonstrates how to use the OpenZeppelin Relayer SDK to query info about a specific signer.
 *  *
 * IMPORTANT: This is provided as a demonstration only. For production use:
 * - Use proper error handling and transaction confirmation checks
 * - Implement appropriate security measures for API keys and tokens
 * - Consider rate limiting and monitoring for production applications
 * - Test thoroughly on devnet/testnet before using on mainnet
 * - Use https connection for production applications
 *
 * Usage:
 *   ts-node getSigner.ts
 */
import { Configuration, SignersApi } from '../../src';

// example dev config
const config = new Configuration({
  basePath: 'http://localhost:8080',
  accessToken: '', // replace with your actual api key
});

const signersApi = new SignersApi(config);

// replace with your actual id
const signer_id = '';

signersApi
  .getSigner(signer_id)
  .then((signer) => console.log(JSON.stringify(signer.data, null, 2)))
  .catch(console.error);
