---
'@openzeppelin/relayer-sdk': minor
---

Plugin `Relayer.sendTransaction(payload, { idempotencyKey })` accepts an optional `SendTransactionOptions`, matching the Relayer plugin socket API (openzeppelin-relayer#917). HTTP callers set the header with `withIdempotencyKey`.
