# PluginsApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**callPlugin**](PluginsApi.md#callPlugin) | **POST** /api/v1/plugins/{plugin_id}/call | Execute a plugin and receive the sanitized result |


<a name="callPlugin"></a>
# **callPlugin**
> ApiResponse_Value callPlugin(plugin\_id, PluginCallRequest)

Execute a plugin and receive the sanitized result

    Logs and traces are only returned when the plugin is configured with &#x60;emit_logs&#x60; / &#x60;emit_traces&#x60;. Plugin-provided errors are normalized into a consistent payload (&#x60;code&#x60;, &#x60;details&#x60;) and a derived message so downstream clients receive a stable shape regardless of how the handler threw.

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **plugin\_id** | **String**| The unique identifier of the plugin | [default to null] |
| **PluginCallRequest** | [**PluginCallRequest**](../Models/PluginCallRequest.md)|  | |

### Return type

[**ApiResponse_Value**](../Models/ApiResponse_Value.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

