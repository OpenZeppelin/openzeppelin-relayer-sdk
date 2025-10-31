# PluginsApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**callPlugin**](PluginsApi.md#callPlugin) | **POST** /api/v1/plugins/{plugin_id}/call | Calls a plugin method. |


<a name="callPlugin"></a>
# **callPlugin**
> ApiResponse_PluginCallResponse callPlugin(plugin\_id, PluginCallRequest)

Calls a plugin method.

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **plugin\_id** | **String**| The unique identifier of the plugin | [default to null] |
| **PluginCallRequest** | [**PluginCallRequest**](../Models/PluginCallRequest.md)|  | |

### Return type

[**ApiResponse_PluginCallResponse**](../Models/ApiResponse_PluginCallResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

