# PluginHealth
## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
| **avg\_response\_time\_ms** | **Integer** | Average response time in milliseconds | [optional] [default to null] |
| **circuit\_state** | **String** |  | [optional] [default to null] |
| **connection\_pool\_active\_connections** | **Integer** | Connection pool active connections (for pool server connections) | [optional] [default to null] |
| **connection\_pool\_available\_slots** | **Integer** | Connection pool available slots (for pool server connections) | [optional] [default to null] |
| **enabled** | **Boolean** |  | [default to null] |
| **error** | **String** |  | [optional] [default to null] |
| **memory** | **Long** | Memory usage in bytes | [optional] [default to null] |
| **pool\_completed** | **Long** | Number of completed tasks in the pool | [optional] [default to null] |
| **pool\_queued** | **Long** | Number of queued tasks in the pool | [optional] [default to null] |
| **recovering** | **Boolean** | Whether recovery mode is active | [optional] [default to null] |
| **recovery\_percent** | **Integer** | Current recovery allowance percentage | [optional] [default to null] |
| **shared\_socket\_active\_connections** | **Integer** | Shared socket active connection count | [optional] [default to null] |
| **shared\_socket\_available\_slots** | **Integer** | Shared socket available connection slots | [optional] [default to null] |
| **shared\_socket\_registered\_executions** | **Integer** | Shared socket registered execution count | [optional] [default to null] |
| **status** | [**ComponentStatus**](ComponentStatus.md) |  | [default to null] |
| **success\_rate** | **Double** | Success rate as a percentage (0.0-100.0) | [optional] [default to null] |
| **uptime\_ms** | **Long** | Plugin uptime in milliseconds | [optional] [default to null] |

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

