/**
 * Idempotency-Key helper for RelayersApi.sendTransaction.
 *
 * This file is automatically copied to src/models/ by the post-generate
 * script after OpenAPI code generation.
 *
 * The Relayer reads the optional `Idempotency-Key` header on
 * `POST /api/v1/relayers/{relayer_id}/transactions`. The header is documented in
 * the operation description rather than declared as a parameter, so the generated
 * client has no dedicated argument for it and the key travels in axios options.
 */

import type { RawAxiosRequestConfig } from 'axios';

/** HTTP header the Relayer reads the idempotency key from. */
export const IDEMPOTENCY_KEY_HEADER = 'Idempotency-Key';

/**
 * Return axios request options that send `key` as the `Idempotency-Key` header,
 * keeping any other options and headers passed in.
 *
 * Repeating a request with the same key returns the original transaction instead
 * of creating a new one. Keys are at most 255 characters and expire after the
 * Relayer's IDEMPOTENCY_KEY_TTL_SECONDS (default 24h).
 *
 * @example
 * ```ts
 * await api.sendTransaction(relayerId, body, withIdempotencyKey(crypto.randomUUID()));
 * await api.sendTransaction(relayerId, body, withIdempotencyKey(key, { timeout: 10_000 }));
 * ```
 */
export function withIdempotencyKey(key: string, options: RawAxiosRequestConfig = {}): RawAxiosRequestConfig {
  return {
    ...options,
    headers: {
      ...(options.headers as Record<string, unknown> | undefined),
      // Sent as given, including '', so the Relayer validates the key rather than the SDK.
      [IDEMPOTENCY_KEY_HEADER]: key,
    },
  } as RawAxiosRequestConfig;
}
