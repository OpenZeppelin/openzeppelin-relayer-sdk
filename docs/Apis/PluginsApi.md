# PluginsApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**callPlugin**](PluginsApi.md#callPlugin) | **POST** /api/v1/plugins/{plugin_id}/call | Execute a plugin with optional wildcard route routing |
| [**callPluginGet**](PluginsApi.md#callPluginGet) | **GET** /api/v1/plugins/{plugin_id}/call | Execute a plugin via GET (must be enabled per plugin) |
| [**listPlugins**](PluginsApi.md#listPlugins) | **GET** /api/v1/plugins | List plugins. |


<a name="callPlugin"></a>
# **callPlugin**
> ApiResponse_Value callPlugin(plugin\_id, PluginCallRequest, route)

Execute a plugin with optional wildcard route routing

    Logs and traces are only returned when the plugin is configured with &#x60;emit_logs&#x60; / &#x60;emit_traces&#x60;. Plugin-provided errors are normalized into a consistent payload (&#x60;code&#x60;, &#x60;details&#x60;) and a derived message so downstream clients receive a stable shape regardless of how the handler threw.  The endpoint supports wildcard route routing, allowing plugins to implement custom routing logic: - &#x60;/api/v1/plugins/{plugin_id}/call&#x60; - Default endpoint (route &#x3D; \&quot;\&quot;) - &#x60;/api/v1/plugins/{plugin_id}/call?route&#x3D;/verify&#x60; - Custom route via query parameter - &#x60;/api/v1/plugins/{plugin_id}/call/verify&#x60; - Custom route via URL path (route &#x3D; \&quot;/verify\&quot;)  The route is passed to the plugin handler via the &#x60;context.route&#x60; field. You can specify a custom route either by appending it to the URL path or by using the &#x60;route&#x60; query parameter.

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **plugin\_id** | **String**| The unique identifier of the plugin | [default to null] |
| **PluginCallRequest** | [**PluginCallRequest**](../Models/PluginCallRequest.md)|  | |
| **route** | **String**| Optional route suffix for custom routing (e.g., &#39;/verify&#39;). Alternative to appending the route to the URL path. | [optional] [default to null] |

### Return type

[**ApiResponse_Value**](../Models/ApiResponse_Value.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="callPluginGet"></a>
# **callPluginGet**
> ApiResponse_Value callPluginGet(plugin\_id, route)

Execute a plugin via GET (must be enabled per plugin)

    This endpoint is disabled by default. To enable it for a given plugin, set &#x60;allow_get_invocation: true&#x60; in the plugin configuration.  When invoked via GET: - &#x60;params&#x60; is an empty object (&#x60;{}&#x60;) - query parameters are passed to the plugin handler via &#x60;context.query&#x60; - wildcard route routing is supported the same way as POST (see &#x60;doc_call_plugin&#x60;) - Use the &#x60;route&#x60; query parameter or append the route to the URL path

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **plugin\_id** | **String**| The unique identifier of the plugin | [default to null] |
| **route** | **String**| Optional route suffix for custom routing (e.g., &#39;/verify&#39;). Alternative to appending the route to the URL path. | [optional] [default to null] |

### Return type

[**ApiResponse_Value**](../Models/ApiResponse_Value.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="listPlugins"></a>
# **listPlugins**
> ApiResponse_PaginatedResult_PluginModel listPlugins(page, per\_page)

List plugins.

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **page** | **Integer**| Page number for pagination (starts at 1) | [optional] [default to null] |
| **per\_page** | **Integer**| Number of items per page (default: 10) | [optional] [default to null] |

### Return type

[**ApiResponse_PaginatedResult_PluginModel**](../Models/ApiResponse_PaginatedResult_PluginModel.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

