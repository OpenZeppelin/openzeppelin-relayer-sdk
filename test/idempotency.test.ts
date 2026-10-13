import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { IDEMPOTENCY_KEY_HEADER, withIdempotencyKey } from '../custom-models/idempotency.ts';

describe('withIdempotencyKey', () => {
  it('sets the Idempotency-Key header', () => {
    const cfg = withIdempotencyKey('aa:0xdead');
    assert.equal(IDEMPOTENCY_KEY_HEADER, 'Idempotency-Key');
    assert.deepEqual(cfg, { headers: { 'Idempotency-Key': 'aa:0xdead' } });
  });

  it('keeps other options and headers', () => {
    const cfg = withIdempotencyKey('k1', { timeout: 1000, headers: { 'X-Custom': '1' } });
    assert.equal(cfg.timeout, 1000);
    assert.deepEqual(cfg.headers, { 'X-Custom': '1', 'Idempotency-Key': 'k1' });
  });

  it('overrides an Idempotency-Key already present in options', () => {
    const cfg = withIdempotencyKey('new', { headers: { 'Idempotency-Key': 'old' } });
    assert.equal(cfg.headers?.['Idempotency-Key'], 'new');
  });

  it('does not mutate the options passed in', () => {
    const options = { headers: { 'X-Custom': '1' } };
    withIdempotencyKey('k1', options);
    assert.deepEqual(options, { headers: { 'X-Custom': '1' } });
  });

  it('forwards an empty key for Relayer validation', () => {
    const cfg = withIdempotencyKey('');
    assert.equal(cfg.headers?.['Idempotency-Key'], '');
  });
});
