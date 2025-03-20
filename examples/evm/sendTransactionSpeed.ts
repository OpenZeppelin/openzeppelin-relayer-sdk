/**
 * Send Speed Transaction Example
 *
 * This example demonstrates how to use the OpenZeppelin Relayer SDK to send legacy transaction.
 *  * 
  * IMPORTANT: This is provided as a demonstration only. For production use:
 * - Use proper error handling and transaction confirmation checks
 * - Implement appropriate security measures for API keys and tokens
 * - Consider rate limiting and monitoring for production applications
 * - Test thoroughly on devnet/testnet before using on mainnet
 * - Use https connection for production applications
 * 
 * Usage:
 *   ts-node sendTransactionSpeed.ts
 */
import { Configuration, RelayersApi, Speed } from "../../src";

// example dev config
const config = new Configuration({
  basePath: "http://localhost:8080/api/v1/",
  accessToken: "Bearer example-123456",
});

const relayersApi = new RelayersApi(config);

const relayer_id = "sepolia-example";

relayersApi
  .sendTransaction(relayer_id, {
    to: "0xc834dcdc9a074dbbadcc71584789ae4b463db116",
    value: 0,
    data: "0x",
    gas_limit: 21000,
    speed: Speed.FAST
  })
  .then((transaction) => console.log(JSON.stringify(transaction.data, null, 2)))
  .catch(console.error);
