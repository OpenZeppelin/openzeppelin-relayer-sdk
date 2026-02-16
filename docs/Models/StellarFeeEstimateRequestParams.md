# StellarFeeEstimateRequestParams
## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
| **fee\_token** | **String** | Asset identifier for fee token. For classic: \&quot;native\&quot; or \&quot;USDC:GA5Z...\&quot; format. For Soroban: contract address (C...) format. | [default to null] |
| **operations** | [**List**](OperationSpec.md) | Operations array to build transaction from Mutually exclusive with transaction_xdr field | [optional] [default to null] |
| **source\_account** | **String** | Source account address (required when operations are provided) For sponsored transactions, this should be the user&#39;s account address | [optional] [default to null] |
| **transaction\_xdr** | **String** | Pre-built transaction XDR (base64 encoded, signed or unsigned) Mutually exclusive with operations field. For Soroban gas abstraction: pass XDR containing InvokeHostFunction operation. | [optional] [default to null] |

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

