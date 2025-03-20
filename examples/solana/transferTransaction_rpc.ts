/**
 * Solana transferTransaction RPC Example
 *
 * This example demonstrates how to use the OpenZeppelin Relayer SDK to prepare a Solana
 * transaction for sponsored submission.
 * 
 * IMPORTANT: This is provided as a demonstration only. For production use:
 * - Replace the hardcoded addresses with your actual addresses
 * - Use proper error handling and transaction confirmation checks
 * - Implement appropriate security measures for API keys and tokens
 * - Consider rate limiting and monitoring for production applications
 * - Test thoroughly on devnet/testnet before using on mainnet
 * - Use https connection for production applications
 * 
 * IMPORTANT: This is provided as a demonstration only. For production use:
 * - Replace the hardcoded addresses with your actual addresses
 * - Use proper error handling and transaction confirmation checks
 * - Implement appropriate security measures for API keys and tokens
 * - Consider rate limiting and monitoring for production applications
 * - Test thoroughly on devnet/testnet before using on mainnet
 * - Use https connection for production applications
 * 
 * Usage:
 *   ts-node transferTransaction_rpc.ts
 */
import { Configuration, RelayersApi } from "../../src";

// example dev config
const config = new Configuration({
  basePath: "http://localhost:8080/api/v1/",
  accessToken: "Bearer example-123456",
});

const relayersApi = new RelayersApi(config);

const relayer_id = "solana-example";

const fromAddress = "C6VBV1EK2Jx7kFgCkCD5wuDeQtEH8ct2hHGUPzEhUSc8";
const toAddress = "C6VBV1EK2Jx7kFgCkCD5wuDeQtEH8ct2hHGUPzEhUSc8";

async function transferTransaction() {
  try {
    // Transfer transaction using the relayer
    const transferTransaction = await relayersApi.rpc(relayer_id, {
      method: "transferTransaction",
      id: 1,
      jsonrpc: "2.0",
      params: {
        token: "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr",
        amount: 1,
        source: fromAddress,
        destination: toAddress,
      },
    });

    console.log("Transfer transaction:");
    console.log(JSON.stringify(transferTransaction.data, null, 2));
  } catch (error) {
    console.error("Error preparing transfer transaction:", error);
  }
}

transferTransaction();
