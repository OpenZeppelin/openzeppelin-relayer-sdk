# RelayerResponse
## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
| **address** | **String** |  | [optional] [default to null] |
| **custom\_rpc\_urls** | [**List**](RpcConfig.md) |  | [optional] [default to null] |
| **disabled\_reason** | [**DisabledReason**](DisabledReason.md) |  | [optional] [default to null] |
| **id** | **String** |  | [default to null] |
| **name** | **String** |  | [default to null] |
| **network** | **String** |  | [default to null] |
| **network\_type** | [**RelayerNetworkType**](RelayerNetworkType.md) |  | [default to null] |
| **notification\_id** | **String** |  | [optional] [default to null] |
| **paused** | **Boolean** |  | [default to null] |
| **policies** | [**RelayerNetworkPolicyResponse**](RelayerNetworkPolicyResponse.md) | Policies without redundant network_type tag - network type is available at top level Only included if user explicitly provided policies (not shown for empty/default policies) | [optional] [default to null] |
| **signer\_id** | **String** |  | [default to null] |
| **system\_disabled** | **Boolean** |  | [optional] [default to null] |

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

