import { LogEntry } from '../../src/models';

/**
 * Configuration for LaunchtubeClient (direct HTTP connection)
 */
export interface LaunchtubeClientConfig {
  /** Base URL for Launchtube service */
  baseUrl: string;
  /** API key for Launchtube service */
  apiKey: string;
  /** Optional admin secret for management operations */
  adminSecret?: string;
  /** Optional request timeout in milliseconds */
  timeout?: number;
}

/**
 * Configuration for LaunchtubeRelayerClient (via OpenZeppelin Relayer)
 */
export interface LaunchtubeRelayerClientConfig {
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
 * Core Launchtube transaction request payload
 * Same structure whether going direct or through relayer
 */
export interface LaunchtubeTransactionRequest {
  /** Complete transaction envelope XDR */
  xdr?: string;
  /** Soroban host function XDR */
  func?: string;
  /** Array of authorization entry XDRs */
  auth?: string[];
  /** Whether to simulate before submission */
  sim: boolean;
}

/**
 * Response from transaction submission
 */
export interface LaunchtubeTransactionResponse {
  transactionId: string | null;
  hash: string | null;
  status: string | null;
  metadata?: {
    logs?: LogEntry[];
    traces?: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  };
}

/**
 * Response from listing sequence accounts
 */
export interface ListSequenceAccountsResponse {
  relayerIds: string[];
  metadata?: {
    logs?: LogEntry[];
    traces?: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  };
}

/**
 * Response from setting sequence accounts
 */
export interface SetSequenceAccountsResponse {
  ok: boolean;
  appliedRelayerIds: string[];
  metadata?: {
    logs?: LogEntry[];
    traces?: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  };
}
