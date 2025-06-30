# SolanaPolicyResponse

## Properties

| Name                         | Type                                                        | Description | Notes                        |
| ---------------------------- | ----------------------------------------------------------- | ----------- | ---------------------------- |
| **allowed_accounts**         | **List**                                                    |             | [optional] [default to null] |
| **allowed_programs**         | **List**                                                    |             | [optional] [default to null] |
| **allowed_tokens**           | [**List**](SolanaAllowedTokensPolicy.md)                    |             | [optional] [default to null] |
| **disallowed_accounts**      | **List**                                                    |             | [optional] [default to null] |
| **fee_margin_percentage**    | **Float**                                                   |             | [optional] [default to null] |
| **fee_payment_strategy**     | [**SolanaFeePaymentStrategy**](SolanaFeePaymentStrategy.md) |             | [default to null]            |
| **max_allowed_fee_lamports** | **Long**                                                    |             | [optional] [default to null] |
| **max_signatures**           | **Integer**                                                 |             | [optional] [default to null] |
| **max_tx_data_size**         | **Integer**                                                 |             | [default to null]            |
| **min_balance**              | **Long**                                                    |             | [default to null]            |
| **swap_config**              | [**RelayerSolanaSwapConfig**](RelayerSolanaSwapConfig.md)   |             | [optional] [default to null] |

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
