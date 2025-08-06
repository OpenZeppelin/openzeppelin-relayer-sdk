/**
 * Custom Plugin API Model
 *
 * This file contains custom type definitions for the Plugin API that are not generated
 * by the OpenAPI generator. This file is automatically copied to src/models/ by the
 * post-generate script after OpenAPI code generation.
 *
 * Note: Import paths use absolute references from project root and are automatically
 * normalized to relative paths when copied by scripts/post-generate.js
 */

import { NetworkTransactionRequest } from './network-transaction-request';
import { TransactionResponse } from './transaction-response';
import { ApiResponseRelayerStatusData } from './api-response-relayer-status-data';
import { ApiResponseRelayerResponseData } from './api-response-relayer-response-data';
import { SignTransactionRequest } from './sign-transaction-request';
import { SignTransactionResponse } from './sign-transaction-response';

/**
 * The result of a sendTransaction call.
 *
 * @property id - The transaction ID.
 * @property relayer_id - The relayer ID.
 * @property status - The transaction status. Can be `submitted`, `pending`, `sent`, `mined`, `cancelled`, `confirmed`, `failed` or `expired`.
 * @property confirmed_at - The date and time the transaction was confirmed.
 * @property created_at - The date and time the transaction was created.
 * @property from - The address of the sender.
 * @property gas_limit - The gas limit of the transaction.
 * @property gas_price - The gas price of the transaction.
 * @property hash - The hash of the transaction.
 * @property nonce - The nonce of the transaction.
 * @property sent_at - The date and time the transaction was sent.
 * @property status_reason - The reason for the transaction status.
 * @property to - The address of the recipient.
 * @property value - The value of the transaction.
 * @property wait - A method to wait for the transaction to be mined on chain.
 */
type SendTransactionResult = {
  id: string;
  relayer_id: string;
  status: string;
  confirmed_at: string | null;
  created_at: string;
  from: string;
  gas_limit: number;
  gas_price: string | null;
  hash: string | null;
  nonce: number | null;
  sent_at: string | null;
  status_reason: string | null;
  to: string;
  value: string;

  /**
   * Waits for the transaction to be mined on chain.
   * @param options - Allows to specify the polling interval and the timeout.
   *  - `interval` - The polling interval in milliseconds. Defaults to `5000`.
   *  - `timeout` - The timeout in milliseconds. Defaults to `60000`.
   * @returns The transaction response.
   */
  wait: (options?: TransactionWaitOptions) => Promise<TransactionResponse>;
};

type GetTransactionRequest = {
  transactionId: string;
};

/**
 * The relayer API.
 * We are defining this interface here and in SDK. When changes are made to the interface, we need to update both places.
 *
 * @property sendTransaction - Sends a transaction to the relayer.
 * @property getTransaction - Gets a transaction from the relayer.
 * @property getRelayerStatus - Gets the relayer status (Stellar).
 * @property signTransaction - Signs a transaction (Stellar).
 * @property getRelayer - Gets the relayer info including address.
 */
export type Relayer = {
  /**
   * Sends a transaction to the relayer.
   * @param payload - The transaction request payload.
   * @returns The transaction result.
   */
  sendTransaction: (payload: NetworkTransactionRequest) => Promise<SendTransactionResult>;

  /**
   * Fetches a transaction from the relayer.
   * @param payload - including the transaction id.
   * @returns The transaction response.
   */
  getTransaction: (payload: GetTransactionRequest) => Promise<TransactionResponse>;

  /**
   * Gets the relayer status (balance, nonce/sequence number, etc).
   * @returns The relayer status information.
   */
  getRelayerStatus: () => Promise<ApiResponseRelayerStatusData>;
  /**
   * Gets the relayer info including address.
   * @returns The relayer information.
   */
  getRelayer: () => Promise<ApiResponseRelayerResponseData>;

  /**
   * Signs a transaction with the relayer's key (Stellar specific).
   * @param payload - The unsigned transaction XDR.
   * @returns The signed transaction XDR and signature.
   */
  signTransaction: (payload: SignTransactionRequest) => Promise<SignTransactionResponse>;
};

export interface PluginAPI {
  useRelayer(relayerId: string): Relayer;
  transactionWait(transaction: SendTransactionResult, options?: TransactionWaitOptions): Promise<TransactionResponse>;
}

type TransactionWaitOptions = {
  interval?: number;
  timeout?: number;
};
