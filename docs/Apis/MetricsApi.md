# MetricsApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**listMetrics**](MetricsApi.md#listMetrics) | **GET** /metrics | Metrics routes implementation |
| [**metricDetail**](MetricsApi.md#metricDetail) | **GET** /metrics/{metric_name} | Returns the details of a specific metric in plain text format. |
| [**scrapeMetrics**](MetricsApi.md#scrapeMetrics) | **GET** /debug/metrics/scrape | Triggers an update of system metrics and returns the result in plain text format. |


<a name="listMetrics"></a>
# **listMetrics**
> List listMetrics()

Metrics routes implementation

    Note: OpenAPI documentation for these endpoints can be found in the &#x60;openapi.rs&#x60; file Returns a list of all available metric names in JSON format.  # Returns  An &#x60;HttpResponse&#x60; containing a JSON array of metric names.

### Parameters
This endpoint does not need any parameter.

### Return type

**List**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="metricDetail"></a>
# **metricDetail**
> String metricDetail(metric\_name)

Returns the details of a specific metric in plain text format.

    # Parameters  - &#x60;path&#x60;: The name of the metric to retrieve details for.  # Returns  An &#x60;HttpResponse&#x60; containing the metric details in plain text, or a 404 error if the metric is not found.

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **metric\_name** | **String**| Name of the metric to retrieve, e.g. utopia_transactions_total | [default to null] |

### Return type

**String**

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain

<a name="scrapeMetrics"></a>
# **scrapeMetrics**
> String scrapeMetrics()

Triggers an update of system metrics and returns the result in plain text format.

    # Returns  An &#x60;HttpResponse&#x60; containing the updated metrics in plain text, or an error message if the update fails.

### Parameters
This endpoint does not need any parameter.

### Return type

**String**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain

