# SponsoredTransactionBuildRequest
## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
| **fee\_token** | **String** | Asset identifier for fee token | [default to null] |
| **operations** | [**List**](OperationSpec.md) | Operations array to build transaction from Mutually exclusive with transaction_xdr field | [optional] [default to null] |
| **source\_account** | **String** | Source account address (required when operations are provided) For gasless transactions, this should be the user&#39;s account address | [optional] [default to null] |
| **transaction\_xdr** | **String** | Pre-built transaction XDR (base64 encoded, signed or unsigned) Mutually exclusive with operations field | [optional] [default to null] |

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

