---
'@openzeppelin/relayer-sdk': minor
---

Regenerate the client from Relayer OpenAPI 1.8.0. Adds Azure Key Vault signer models, `StatusCheckResponse`, JSON-RPC error `data`, and an optional `status` filter on `listTransactions`. `sendTransaction(relayerId, body, options)` is unchanged; set `Idempotency-Key` through options.

Breaking for TypeScript callers: `listTransactions` now takes `status` before `options`, so `listTransactions(id, page, perPage, options)` must become `listTransactions(id, page, perPage, undefined, options)`. Stellar `MemoSpec` id `value`, payment `amount` and `StellarTransactionResponse.sequence_number` are now typed `string`, which matches what the Relayer has returned since v1.6.0 (openzeppelin-relayer#789); the Relayer still accepts numbers in requests.
