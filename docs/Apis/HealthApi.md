# HealthApi

All URIs are relative to _http://localhost_

| Method                            | HTTP request       | Description                  |
| --------------------------------- | ------------------ | ---------------------------- |
| [**health**](HealthApi.md#health) | **GET** /v1/health | Health routes implementation |

<a name="health"></a>

# **health**

> String health()

Health routes implementation

    Note: OpenAPI documentation for these endpoints can be found in the &#x60;openapi.rs&#x60; file Handles the &#x60;/health&#x60; endpoint.  Returns an &#x60;HttpResponse&#x60; with a status of &#x60;200 OK&#x60; and a body of &#x60;\&quot;OK\&quot;&#x60;.

### Parameters

This endpoint does not need any parameter.

### Return type

**String**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain
