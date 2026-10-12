/**
 * Typed Idempotency-Key helper for RelayersApi.sendTransaction.
 *
 * This file is automatically copied to src/models/ by the post-generate
 * script after OpenAPI code generation.
 *
 * Note: Import paths use absolute references from project root and are
 * automatically normalized to relative paths when copied by
 * scripts/post-generate.js (axios package imports are left unchanged).
 */

import type { RawAxiosRequestConfig } from 'axios';

/**
 * Axios request overrides for RelayersApi.sendTransaction, with a typed
 * `idempotencyKey` that maps to the `Idempotency-Key` HTTP header (Relayer #893).
 */
export type RelayerSendTransactionOptions = {
  idempotencyKey?: string;
} & RawAxiosRequestConfig;

/**
 * Convert typed sendTransaction options into a plain `RawAxiosRequestConfig`.
 * Strips `idempotencyKey` and sets `Idempotency-Key` when provided.
 *
 * Prefer the generated third argument: `sendTransaction(relayerId, body, idempotencyKey, options)`.
 * Use this helper only when the key must be folded into an axios config passed as the fourth argument.
 *
 * @example
 * ```ts
 * await api.sendTransaction(
 *   relayerId,
 *   body,
 *   undefined,
 *   mergeSendTransactionOptions({ idempotencyKey: 'my-key', timeout: 1000 }),
 * );
 * ```
 */
export function mergeSendTransactionOptions(
  options?: RelayerSendTransactionOptions,
): RawAxiosRequestConfig {
  if (!options) return {};
  const { idempotencyKey, headers, ...rest } = options;
  return {
    ...rest,
    headers: {
      ...(headers as Record<string, string> | undefined),
      // Presence check (not truthiness): forward '' so Relayer can reject invalid keys.
      ...(idempotencyKey !== undefined ? { 'Idempotency-Key': idempotencyKey } : {}),
    },
  };
}
