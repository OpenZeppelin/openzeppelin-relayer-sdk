/**
 * Send Transaction with Idempotency-Key Example
 *
 * Sends the same transaction twice with one Idempotency-Key. The Relayer creates
 * the transaction once and returns it again for the repeat, so a request can be
 * retried safely after a timeout or connection error.
 *
 * IMPORTANT: This is provided as a demonstration only. For production use:
 * - Use proper error handling and transaction confirmation checks
 * - Implement appropriate security measures for API keys and tokens
 * - Consider rate limiting and monitoring for production applications
 * - Test thoroughly on devnet/testnet before using on mainnet
 * - Use https connection for production applications
 *
 * Usage:
 *   ts-node sendTransactionIdempotency.ts
 */
import { randomUUID } from 'node:crypto';
import { Configuration, RelayersApi, Speed, withIdempotencyKey } from '../../../src';

// example dev config
const config = new Configuration({
  basePath: 'http://localhost:8080',
  accessToken: '', // replace with your actual api key
});

const relayersApi = new RelayersApi(config);

// replace with your actual ids
const relayer_id = ''; // Replace with your actual relayer id

async function main() {
  const body = {
    to: '0xc834dcdc9a074dbbadcc71584789ae4b463db116',
    value: 0,
    data: '0x',
    gas_limit: 21000,
    speed: Speed.FAST,
  };
  // Generate one key per logical transaction and reuse it for every retry.
  const idempotencyKey = randomUUID();

  const first = await relayersApi.sendTransaction(relayer_id, body, withIdempotencyKey(idempotencyKey));
  const retry = await relayersApi.sendTransaction(relayer_id, body, withIdempotencyKey(idempotencyKey));

  console.log('First transaction id:', first.data.data?.id);
  console.log('Retry transaction id:', retry.data.data?.id); // same id as the first request
}

main().catch(console.error);
