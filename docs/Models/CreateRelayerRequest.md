# CreateRelayerRequest

## Properties

| Name                | Type                                                            | Description                                                     | Notes                        |
| ------------------- | --------------------------------------------------------------- | --------------------------------------------------------------- | ---------------------------- |
| **custom_rpc_urls** | [**List**](RpcConfig.md)                                        |                                                                 | [optional] [default to null] |
| **id**              | **String**                                                      |                                                                 | [optional] [default to null] |
| **name**            | **String**                                                      |                                                                 | [default to null]            |
| **network**         | **String**                                                      |                                                                 | [default to null]            |
| **network_type**    | [**RelayerNetworkType**](RelayerNetworkType.md)                 |                                                                 | [default to null]            |
| **notification_id** | **String**                                                      |                                                                 | [optional] [default to null] |
| **paused**          | **Boolean**                                                     |                                                                 | [default to null]            |
| **policies**        | [**CreateRelayerPolicyRequest**](CreateRelayerPolicyRequest.md) | Policies - will be deserialized based on the network_type field | [optional] [default to null] |
| **signer_id**       | **String**                                                      |                                                                 | [default to null]            |

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
