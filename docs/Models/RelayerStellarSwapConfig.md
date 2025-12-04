# RelayerStellarSwapConfig
## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
| **cron\_schedule** | **String** | Cron schedule for executing token swap logic to keep relayer funded. Optional. | [optional] [default to null] |
| **min\_balance\_threshold** | **Long** | Min XLM balance (in stroops) to execute token swap logic to keep relayer funded. Optional. | [optional] [default to null] |
| **strategies** | [**List**](StellarSwapStrategy.md) | DEX strategies to use for token swaps, in priority order. Strategies are tried sequentially until one can handle the asset. | [optional] [default to null] |

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

