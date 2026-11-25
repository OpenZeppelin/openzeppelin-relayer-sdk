# @openzeppelin/relayer-sdk


## 1.11.0 (2026-11-24)

- Plugin `Relayer.sendTransaction(payload, { idempotencyKey })` accepts an optional `SendTransactionOptions`, matching the Relayer plugin socket API (openzeppelin-relayer#917). HTTP callers set the header with `withIdempotencyKey`. ([#259](https://github.com/OpenZeppelin/openzeppelin-relayer-sdk/pull/259))
- Add Zama integration example ([#239](https://github.com/OpenZeppelin/openzeppelin-relayer-sdk/pull/239))
- Regenerate the client from Relayer OpenAPI 1.8.0. Adds Azure Key Vault signer models, `StatusCheckResponse`, JSON-RPC error `data`, and an optional `status` filter on `listTransactions`. `sendTransaction(relayerId, body, options)` is unchanged; set `Idempotency-Key` through options. ([#259](https://github.com/OpenZeppelin/openzeppelin-relayer-sdk/pull/259))

  Breaking for TypeScript callers: `listTransactions` now takes `status` before `options`, so `listTransactions(id, page, perPage, options)` must become `listTransactions(id, page, perPage, undefined, options)`. Stellar `MemoSpec` id `value`, payment `amount` and `StellarTransactionResponse.sequence_number` are now typed `string`, which matches what the Relayer has returned since v1.6.0 (openzeppelin-relayer#789); the Relayer still accepts numbers in requests.

- Add `withIdempotencyKey` helper that sets the `Idempotency-Key` header in axios options for `RelayersApi.sendTransaction` ([#260](https://github.com/OpenZeppelin/openzeppelin-relayer-sdk/pull/260))
- Restore `any` for `PluginContext.params` and `PluginContext.config` so plugins that read fields without a cast keep compiling ([#261](https://github.com/OpenZeppelin/openzeppelin-relayer-sdk/pull/261))

## 1.10.0 (2026-02-19)

- - feat: Soroban gas abstraction support ([#250](https://github.com/OpenZeppelin/openzeppelin-relayer-sdk/pull/250))
  - feat: RPC improvements
  - feat: Extend PluginContext
  - feat: Update latest openapi spec

## 1.9.0 (2026-01-16)

- fear: stellar gas abstraction ([#244](https://github.com/OpenZeppelin/openzeppelin-relayer-sdk/pull/244))

## 1.8.0 (2025-12-02)

- feat: add headers to plugin context type ([#233](https://github.com/OpenZeppelin/openzeppelin-relayer-sdk/pull/233))
- fix: fix the failing build ([#236](https://github.com/OpenZeppelin/openzeppelin-relayer-sdk/pull/236))

## 1.7.0 (2025-11-10)

- feat: introduce rpc client logic and examples ([#225](https://github.com/OpenZeppelin/openzeppelin-relayer-sdk/pull/225))
  feat: Solana send tx endpoint

- fix: fix lint build issues ([#227](https://github.com/OpenZeppelin/openzeppelin-relayer-sdk/pull/227))

## 1.6.0 (2025-09-30)

- feat: add plugin error types ([#206](https://github.com/OpenZeppelin/openzeppelin-relayer-sdk/pull/206))

## 1.5.0 (2025-09-23)

- New examples + OpenApi spec updated to include newly exposed CRUD endpoints ([#134](https://github.com/OpenZeppelin/openzeppelin-relayer-sdk/pull/134))
- fix: fix style issue ([#192](https://github.com/OpenZeppelin/openzeppelin-relayer-sdk/pull/192))
- feat: add PluginKVStore and PluginContext interfaces ([#190](https://github.com/OpenZeppelin/openzeppelin-relayer-sdk/pull/190))

## 1.4.0 (2025-08-07)

- fix: plugin method response types ([#158](https://github.com/OpenZeppelin/openzeppelin-relayer-sdk/pull/158))

## 1.3.0 (2025-08-06)

- Add new endpoint types for plugins ([#151](https://github.com/OpenZeppelin/openzeppelin-relayer-sdk/pull/151))

## 1.2.1 (2025-08-05)

- Export custom modules from modules index file ([#144](https://github.com/OpenZeppelin/openzeppelin-relayer-sdk/pull/144))

## 1.2.0 (2025-08-04)

- Expose PluginAPI interface ([#136](https://github.com/OpenZeppelin/openzeppelin-relayer-sdk/pull/136))
- Regenerate spec with latest openapi spec ([#118](https://github.com/OpenZeppelin/openzeppelin-relayer-sdk/pull/118))

## 1.1.0 (2025-07-02)

- fix: generate a tsconfig pointing to root folder ([#109](https://github.com/OpenZeppelin/openzeppelin-relayer-sdk/pull/109))

## 1.0.0 (2025-07-02)

- fix(package): remove postinstall husky script command ([#101](https://github.com/OpenZeppelin/openzeppelin-relayer-sdk/pull/101))
  fix: correct package entry points
  fix: replace tx request body
  fix: update docs & client
  feat: add get status endpoint example
  feat: add stellar fee bump and transaction XDR support
  feat: add support to plugins

- Add example demonstrating how to use the get relayer status endpoint ([#67](https://github.com/OpenZeppelin/openzeppelin-relayer-sdk/pull/67))

## 0.2.0 (2025-06-21)

- feat: Add Stellar examples ([#80](https://github.com/OpenZeppelin/openzeppelin-relayer-sdk/pull/80))

## 0.1.0 (2025-08-04)

- The initial release, v0.1.0. ([#34](https://github.com/OpenZeppelin/openzeppelin-relayer-sdk/pull/34))

## 0.1.0-rc.0 (2025-08-04)

- The initial release, v0.1.0.
