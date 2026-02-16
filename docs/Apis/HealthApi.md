# HealthApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**health**](HealthApi.md#health) | **GET** /api/v1/health | Health routes implementation |
| [**readiness**](HealthApi.md#readiness) | **GET** /api/v1/ready | Readiness endpoint that checks system resources, Redis, Queue, and plugins. |


<a name="health"></a>
# **health**
> String health()

Health routes implementation

    Note: OpenAPI documentation for these endpoints can be found in the &#x60;openapi.rs&#x60; file  Handles the &#x60;/health&#x60; endpoint.  Returns an &#x60;HttpResponse&#x60; with a status of &#x60;200 OK&#x60; and a body of &#x60;\&quot;OK\&quot;&#x60;. This endpoint is used for liveness probes in container orchestration platforms.

### Parameters
This endpoint does not need any parameter.

### Return type

**String**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain

<a name="readiness"></a>
# **readiness**
> ReadinessResponse readiness()

Readiness endpoint that checks system resources, Redis, Queue, and plugins.

    Returns 200 OK if the service is ready to accept traffic, or 503 Service Unavailable if not. This endpoint is used for readiness probes in container orchestration platforms like AWS ECS or Kubernetes.  ## Health Check Components  - **System**: File descriptor usage, CLOSE_WAIT socket count - **Redis**: Primary and reader pool connectivity - **Queue**: Queue&#39;s Redis connections (separate from app&#39;s Redis) - **Plugins**: Plugin pool health, circuit breaker state, and connection metrics (if enabled)  ## Status Levels  - &#x60;healthy&#x60;: All components operational - &#x60;degraded&#x60;: Some components degraded but service can function (e.g., reader pool down) - &#x60;unhealthy&#x60;: Critical components failed, service unavailable  ## Plugin Connection Metrics  When plugins are enabled, the following connection metrics are exposed:  - &#x60;shared_socket_available_slots&#x60;: Number of additional concurrent plugin executions that can start - &#x60;shared_socket_active_connections&#x60;: Current number of active plugin execution connections - &#x60;shared_socket_registered_executions&#x60;: Number of plugin executions currently registered (awaiting response) - &#x60;connection_pool_available_slots&#x60;: Available connections to the pool server - &#x60;connection_pool_active_connections&#x60;: Active connections to the pool server  These metrics help diagnose connection pool exhaustion and plugin capacity issues.  ## Caching  Health check results are cached for 10 seconds to prevent excessive load from frequent health checks. Multiple requests within the TTL return the same cached response.

### Parameters
This endpoint does not need any parameter.

### Return type

[**ReadinessResponse**](../Models/ReadinessResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

