# RelayerSolanaSwapConfig
## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
| **cron\_schedule** | **String** | Cron schedule for executing token swap logic to keep relayer funded. Optional. | [optional] [default to null] |
| **jupiter\_swap\_options** | [**JupiterSwapOptions**](JupiterSwapOptions.md) | Swap options for JupiterSwap strategy. Optional. | [optional] [default to null] |
| **min\_balance\_threshold** | **Long** | Min sol balance to execute token swap logic to keep relayer funded. Optional. | [optional] [default to null] |
| **strategy** | [**SolanaSwapStrategy**](SolanaSwapStrategy.md) | DEX strategy to use for token swaps. | [optional] [default to null] |

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

