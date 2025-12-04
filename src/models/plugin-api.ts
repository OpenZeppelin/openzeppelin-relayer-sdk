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

import { ApiResponseRelayerResponseData } from './api-response-relayer-response-data';
import { ApiResponseRelayerStatusData } from './api-response-relayer-status-data';
import { JsonRpcRequestNetworkRpcRequest } from './json-rpc-request-network-rpc-request';
import { JsonRpcResponseNetworkRpcResult } from './json-rpc-response-network-rpc-result';
import { NetworkTransactionRequest } from './network-transaction-request';
import { SignTransactionRequest } from './sign-transaction-request';
import { SignTransactionResponse } from './sign-transaction-response';
import { TransactionResponse } from './transaction-response';

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
 *
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

  /**
   * Performs an RPC call to the relayer.
   * @param payload - The RPC request payload.
   * @returns The RPC response.
   */
  rpc: (payload: JsonRpcRequestNetworkRpcRequest) => Promise<JsonRpcResponseNetworkRpcResult>;
};

export interface PluginKVStore {
  /**
   * Get and JSON-parse a value by key.
   * @typeParam T - Expected value type after JSON parse.
   * @param key - The key to retrieve.
   * @returns Resolves to the parsed value, or null if missing.
   */
  get<T = unknown>(key: string): Promise<T | null>;

  /**
   * Set a JSON-encoded value.
   * @param key - The key to set.
   * @param value - Serializable value; must not be undefined.
   * @param opts - Optional settings.
   * @param opts.ttlSec - Time-to-live in seconds; if > 0, sets expiry.
   * @returns True on success.
   * @throws Error if `value` is undefined or the key is invalid.
   */
  set(key: string, value: unknown, opts?: { ttlSec?: number }): Promise<boolean>;

  /**
   * Delete a key.
   * @param key - The key to remove.
   * @returns True if exactly one key was removed.
   */
  del(key: string): Promise<boolean>;

  /**
   * Check whether a key exists.
   * @param key - The key to check.
   * @returns True if the key exists.
   */
  exists(key: string): Promise<boolean>;

  /**
   * List keys in this namespace matching `pattern`.
   * @param pattern - Glob-like match pattern (default '*').
   * @param batch - SCAN COUNT per iteration (default 500).
   * @returns Array of bare keys (without the namespace prefix).
   */
  listKeys(pattern?: string, batch?: number): Promise<string[]>;

  /**
   * Remove all keys in this namespace.
   * @returns The number of keys deleted.
   */
  clear(): Promise<number>;

  /**
   * Execute `fn` under a distributed lock for `key`.
   * @typeParam T - The return type of `fn`.
   * @param key - The lock key.
   * @param fn - Async function to execute while holding the lock.
   * @param opts - Lock options.
   * @param opts.ttlSec - Lock expiry in seconds (default 30).
   * @param opts.onBusy - Behavior when the lock is busy: 'throw' or 'skip'.
   * @returns The result of `fn`, or null when skipped due to a busy lock.
   * @throws Error if the lock is busy and `onBusy` is 'throw'.
   */
  withLock<T>(
    key: string,
    fn: () => Promise<T>,
    opts?: { ttlSec?: number; onBusy?: 'throw' | 'skip' },
  ): Promise<T | null>;
}

/**
 * HTTP headers from the incoming request.
 * Each header name maps to an array of values (since HTTP headers can have multiple values).
 */
export type PluginHeaders = Record<string, string[]>;

/**
 * Plugin context with KV always available for modern plugins.
 */
export interface PluginContext {
  api: PluginAPI;
  kv: PluginKVStore;
<<<<<<< HEAD
=======
  headers: PluginHeaders;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
>>>>>>> main
  params: any;
}

export interface PluginAPI {
  useRelayer(relayerId: string): Relayer;
  transactionWait(transaction: SendTransactionResult, options?: TransactionWaitOptions): Promise<TransactionResponse>;
}

type TransactionWaitOptions = {
  interval?: number;
  timeout?: number;
};

/**
 * JSON-safe type for plugin returns and error details.
 */
export type Json = null | boolean | number | string | Json[] | { [k: string]: Json };

/**
 * Error shape normalized by the runtime.
 */
export interface PluginErrorShape {
  message: string;
  code?: string;
  status?: number;
  details?: Json;
}

/**
 * Minimal error class for plugin authors; SDK will mirror this.
 * @property message - The error message.
 * @property code - The error code.
 * @property status - The HTTP status code.
 * @property details - The error details.
 */
export class PluginError extends Error implements PluginErrorShape {
  code?: string;
  status?: number;
  details?: Json;
  constructor(message: string, opts?: { code?: string; status?: number; details?: Json }) {
    super(message);
    this.name = 'PluginError';
    this.code = opts?.code;
    this.status = opts?.status;
    this.details = opts?.details;
  }
}

/**
 * Convenience helper.
 * @param message - The error message.
 * @param opts - The error options.
 * @returns The error object.
 */
export function pluginError(message: string, opts?: { code?: string; status?: number; details?: Json }): PluginError {
  return new PluginError(message, opts);
}
