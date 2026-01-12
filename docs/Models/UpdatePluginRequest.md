# UpdatePluginRequest
## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
| **allow\_get\_invocation** | **Boolean** | Whether to allow GET requests to invoke plugin logic | [optional] [default to null] |
| **config** | [**Map**](AnyType.md) | User-defined configuration accessible to the plugin (must be a JSON object) Use &#x60;null&#x60; to clear the config | [optional] [default to null] |
| **emit\_logs** | **Boolean** | Whether to include logs in the HTTP response | [optional] [default to null] |
| **emit\_traces** | **Boolean** | Whether to include traces in the HTTP response | [optional] [default to null] |
| **forward\_logs** | **Boolean** | Whether to forward plugin logs into the relayer&#39;s tracing output | [optional] [default to null] |
| **raw\_response** | **Boolean** | Whether to return raw plugin response without ApiResponse wrapper | [optional] [default to null] |
| **timeout** | **Long** | Plugin timeout in seconds | [optional] [default to null] |

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

