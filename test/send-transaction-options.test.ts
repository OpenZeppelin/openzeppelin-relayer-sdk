import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  mergeSendTransactionOptions,
  type RelayerSendTransactionOptions,
} from '../custom-models/send-transaction-options.ts';

describe('mergeSendTransactionOptions', () => {
  it('sets Idempotency-Key header from idempotencyKey', () => {
    const cfg = mergeSendTransactionOptions({
      idempotencyKey: 'aa:0xdead',
      timeout: 1000,
    });
    assert.equal(
      cfg.headers?.['Idempotency-Key'] ?? cfg.headers?.['idempotency-key'],
      'aa:0xdead',
    );
    assert.equal(cfg.timeout, 1000);
    assert.equal((cfg as RelayerSendTransactionOptions).idempotencyKey, undefined);
  });

  it('returns empty config when options are omitted', () => {
    assert.deepEqual(mergeSendTransactionOptions(), {});
  });

  it('preserves existing headers when no idempotencyKey is set', () => {
    const cfg = mergeSendTransactionOptions({
      headers: { 'X-Custom': '1' },
    });
    assert.equal(cfg.headers?.['X-Custom'], '1');
    assert.equal(cfg.headers?.['Idempotency-Key'], undefined);
  });
});
