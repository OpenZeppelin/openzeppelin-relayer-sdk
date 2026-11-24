# StatusCheckResponse
## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
| **initial\_delay\_seconds** | **Long** | Delay before the first transaction status check, in seconds. | [default to null] |
| **retry\_delay\_seconds** | **Long** | Delay between healthy checks while the transaction is not final, in seconds. The retry backoff starts here and caps at 1.5x this value. | [default to null] |

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

