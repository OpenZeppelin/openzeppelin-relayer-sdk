# FeeEstimateRequestParams
## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
| **fee\_token** | **String** | Asset identifier for fee token (e.g., \&quot;native\&quot; or \&quot;USDC:GA5Z...\&quot;) | [default to null] |
| **operations** | [**List**](OperationSpec.md) | Operations array to build transaction from Mutually exclusive with transaction_xdr field | [optional] [default to null] |
| **transaction\_xdr** | **String** | Pre-built transaction XDR (base64 encoded, signed or unsigned) Mutually exclusive with operations field | [optional] [default to null] |

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

