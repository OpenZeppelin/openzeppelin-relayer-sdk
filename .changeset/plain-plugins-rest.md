---
'@openzeppelin/relayer-sdk': patch
---

Restore `any` for `PluginContext.params` and `PluginContext.config` so plugins that read fields without a cast keep compiling
