import { LogEntry } from '../../src/models';

/**
 * Configuration for ChannelsClient (direct HTTP connection)
 */
export interface ChannelsClientConfig {
  /** Base URL for channels service */
  baseUrl: string;
  /** API key for authentication */
  apiKey: string;
  /** Optional admin secret for management operations */
  adminSecret?: string;
  /** Optional request timeout in milliseconds */
  timeout?: number;
}

/**
 * Configuration for ChannelsRelayerClient (via OpenZeppelin Relayer)
 */
export interface ChannelsRelayerClientConfig {
  /** API key for OpenZeppelin Relayer */
  apiKey: string;
  /** Plugin ID in the relayer */
  pluginId: string;
  /** Base URL for OpenZeppelin Relayer */
  baseUrl: string;
  /** Optional admin secret for management operations */
  adminSecret?: string;
  /** Optional request timeout in milliseconds */
  timeout?: number;
}

/**
 * Transaction submission request using signed XDR
 */
export interface ChannelsXdrRequest {
  /** Complete signed transaction envelope XDR */
  xdr: string;
}

/**
 * Transaction submission using Soroban function and authorization
 */
export interface ChannelsFuncAuthRequest {
  /** Soroban host function XDR (base64) */
  func: string;
  /** Array of authorization entry XDRs (base64) */
  auth: string[];
}

/**
 * Response from transaction submission
 */
export interface ChannelsTransactionResponse {
  /** Transaction ID */
  transactionId: string | null;
  /** Transaction hash */
  hash: string | null;
  /** Transaction status */
  status: string | null;
  /** Optional metadata */
  metadata?: {
    logs?: LogEntry[];
    traces?: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  };
}

/**
 * Response from listing channel accounts
 */
export interface ListChannelAccountsResponse {
  /** Array of relayer IDs configured as channel accounts */
  relayerIds: string[];
  /** Optional metadata */
  metadata?: {
    logs?: LogEntry[];
    traces?: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  };
}

/**
 * Response from setting channel accounts
 */
export interface SetChannelAccountsResponse {
  /** Whether the operation succeeded */
  ok: boolean;
  /** Array of relayer IDs that were applied */
  appliedRelayerIds: string[];
  /** Optional metadata */
  metadata?: {
    logs?: LogEntry[];
    traces?: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  };
}
