# RelayerSolanaSwapConfig

## Properties

| Name                      | Type                                            | Description                                                                    | Notes                        |
| ------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------ | ---------------------------- |
| **cron_schedule**         | **String**                                      | Cron schedule for executing token swap logic to keep relayer funded. Optional. | [optional] [default to null] |
| **jupiter_swap_options**  | [**JupiterSwapOptions**](JupiterSwapOptions.md) | Swap options for JupiterSwap strategy. Optional.                               | [optional] [default to null] |
| **min_balance_threshold** | **Long**                                        | Min sol balance to execute token swap logic to keep relayer funded. Optional.  | [optional] [default to null] |
| **strategy**              | [**SolanaSwapStrategy**](SolanaSwapStrategy.md) | DEX strategy to use for token swaps.                                           | [optional] [default to null] |

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
