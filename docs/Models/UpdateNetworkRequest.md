# UpdateNetworkRequest
## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
| **rpc\_urls** | [**List**](RpcUrlEntry.md) | List of RPC endpoint configurations for connecting to the network. Supports multiple formats: - Array of strings: &#x60;[\&quot;https://rpc.example.com\&quot;]&#x60; (defaults to weight 100) - Array of RpcConfig objects: &#x60;[{\&quot;url\&quot;: \&quot;https://rpc.example.com\&quot;, \&quot;weight\&quot;: 100}]&#x60; - Mixed array: &#x60;[\&quot;https://rpc1.com\&quot;, {\&quot;url\&quot;: \&quot;https://rpc2.com\&quot;, \&quot;weight\&quot;: 100}]&#x60;   Must be non-empty and contain valid HTTP/HTTPS URLs if provided. | [optional] [default to null] |

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

