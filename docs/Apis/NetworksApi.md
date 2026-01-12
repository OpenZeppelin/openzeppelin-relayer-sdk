# NetworksApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getNetwork**](NetworksApi.md#getNetwork) | **GET** /api/v1/networks/{network_id} | Retrieves details of a specific network by ID. |
| [**listNetworks**](NetworksApi.md#listNetworks) | **GET** /api/v1/networks | Network routes implementation |
| [**updateNetwork**](NetworksApi.md#updateNetwork) | **PATCH** /api/v1/networks/{network_id} | Updates a network&#39;s configuration. Currently supports updating RPC URLs only. Can be extended to support other fields. |


<a name="getNetwork"></a>
# **getNetwork**
> ApiResponse_NetworkResponse getNetwork(network\_id)

Retrieves details of a specific network by ID.

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **network\_id** | **String**| Network ID (e.g., evm:sepolia, solana:mainnet) | [default to null] |

### Return type

[**ApiResponse_NetworkResponse**](../Models/ApiResponse_NetworkResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="listNetworks"></a>
# **listNetworks**
> ApiResponse_Vec_NetworkResponse listNetworks(page, per\_page)

Network routes implementation

    Note: OpenAPI documentation for these endpoints can be found in the &#x60;openapi.rs&#x60; file  Lists all networks with pagination support.

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **page** | **Integer**| Page number for pagination (starts at 1) | [optional] [default to null] |
| **per\_page** | **Integer**| Number of items per page (default: 10) | [optional] [default to null] |

### Return type

[**ApiResponse_Vec_NetworkResponse**](../Models/ApiResponse_Vec_NetworkResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="updateNetwork"></a>
# **updateNetwork**
> ApiResponse_NetworkResponse updateNetwork(network\_id, UpdateNetworkRequest)

Updates a network&#39;s configuration. Currently supports updating RPC URLs only. Can be extended to support other fields.

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **network\_id** | **String**| Network ID (e.g., evm:sepolia, solana:mainnet) | [default to null] |
| **UpdateNetworkRequest** | [**UpdateNetworkRequest**](../Models/UpdateNetworkRequest.md)|  | |

### Return type

[**ApiResponse_NetworkResponse**](../Models/ApiResponse_NetworkResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

