# RelayersApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**cancelTransaction**](RelayersApi.md#cancelTransaction) | **DELETE** /api/v1/relayers/{relayer_id}/transactions/{transaction_id} | Cancels a specific transaction by its ID. |
| [**deletePendingTransactions**](RelayersApi.md#deletePendingTransactions) | **DELETE** /api/v1/relayers/{relayer_id}/transactions/pending | Deletes all pending transactions for a specific relayer. |
| [**getRelayer**](RelayersApi.md#getRelayer) | **GET** /api/v1/relayers/{relayer_id} | Retrieves details of a specific relayer by ID. |
| [**getRelayerBalance**](RelayersApi.md#getRelayerBalance) | **GET** /api/v1/relayers/{relayer_id}/balance | Retrieves the balance of a specific relayer. |
| [**getRelayerStatus**](RelayersApi.md#getRelayerStatus) | **GET** /api/v1/relayers/{relayer_id}/status | Fetches the current status of a specific relayer. |
| [**getTransactionById**](RelayersApi.md#getTransactionById) | **GET** /api/v1/relayers/{relayer_id}/transactions/{transaction_id} | Retrieves a specific transaction by its ID. |
| [**getTransactionByNonce**](RelayersApi.md#getTransactionByNonce) | **GET** /api/v1/relayers/{relayer_id}/transactions/by-nonce/{nonce} | Retrieves a transaction by its nonce value. |
| [**listRelayers**](RelayersApi.md#listRelayers) | **GET** /api/v1/relayers | Relayer routes implementation |
| [**listTransactions**](RelayersApi.md#listTransactions) | **GET** /api/v1/relayers/{relayer_id}/transactions/ | Lists all transactions for a specific relayer with pagination. |
| [**replaceTransaction**](RelayersApi.md#replaceTransaction) | **PUT** /api/v1/relayers/{relayer_id}/transactions/{transaction_id} | Replaces a specific transaction with a new one. |
| [**rpc**](RelayersApi.md#rpc) | **POST** /api/v1/relayers/{relayer_id}/rpc | Performs a JSON-RPC call using the specified relayer. |
| [**sendTransaction**](RelayersApi.md#sendTransaction) | **POST** /api/v1/relayers/{relayer_id}/transactions | Sends a transaction through the specified relayer. |
| [**sign**](RelayersApi.md#sign) | **POST** /api/v1/relayers/{relayer_id}/sign | Signs data using the specified relayer. |
| [**signTypedData**](RelayersApi.md#signTypedData) | **POST** /api/v1/relayers/{relayer_id}/sign-typed-data | Signs typed data using the specified relayer. |
| [**updateRelayer**](RelayersApi.md#updateRelayer) | **PATCH** /api/v1/relayers/{relayer_id} | Updates a relayer&#39;s information based on the provided update request. |


<a name="cancelTransaction"></a>
# **cancelTransaction**
> ApiResponse_TransactionResponse cancelTransaction(relayer\_id, transaction\_id)

Cancels a specific transaction by its ID.

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **relayer\_id** | **String**| The unique identifier of the relayer | [default to null] |
| **transaction\_id** | **String**| The unique identifier of the transaction | [default to null] |

### Return type

[**ApiResponse_TransactionResponse**](../Models/ApiResponse_TransactionResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="deletePendingTransactions"></a>
# **deletePendingTransactions**
> ApiResponse_DeletePendingTransactionsResponse deletePendingTransactions(relayer\_id)

Deletes all pending transactions for a specific relayer.

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **relayer\_id** | **String**| The unique identifier of the relayer | [default to null] |

### Return type

[**ApiResponse_DeletePendingTransactionsResponse**](../Models/ApiResponse_DeletePendingTransactionsResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="getRelayer"></a>
# **getRelayer**
> ApiResponse_RelayerResponse getRelayer(relayer\_id)

Retrieves details of a specific relayer by ID.

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **relayer\_id** | **String**| The unique identifier of the relayer | [default to null] |

### Return type

[**ApiResponse_RelayerResponse**](../Models/ApiResponse_RelayerResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="getRelayerBalance"></a>
# **getRelayerBalance**
> ApiResponse_BalanceResponse getRelayerBalance(relayer\_id)

Retrieves the balance of a specific relayer.

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **relayer\_id** | **String**| The unique identifier of the relayer | [default to null] |

### Return type

[**ApiResponse_BalanceResponse**](../Models/ApiResponse_BalanceResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="getRelayerStatus"></a>
# **getRelayerStatus**
> ApiResponse_RelayerStatus getRelayerStatus(relayer\_id)

Fetches the current status of a specific relayer.

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **relayer\_id** | **String**| The unique identifier of the relayer | [default to null] |

### Return type

[**ApiResponse_RelayerStatus**](../Models/ApiResponse_RelayerStatus.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="getTransactionById"></a>
# **getTransactionById**
> ApiResponse_TransactionResponse getTransactionById(relayer\_id, transaction\_id)

Retrieves a specific transaction by its ID.

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **relayer\_id** | **String**| The unique identifier of the relayer | [default to null] |
| **transaction\_id** | **String**| The unique identifier of the transaction | [default to null] |

### Return type

[**ApiResponse_TransactionResponse**](../Models/ApiResponse_TransactionResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="getTransactionByNonce"></a>
# **getTransactionByNonce**
> ApiResponse_TransactionResponse getTransactionByNonce(relayer\_id, nonce)

Retrieves a transaction by its nonce value.

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **relayer\_id** | **String**| The unique identifier of the relayer | [default to null] |
| **nonce** | **Integer**| The nonce of the transaction | [default to null] |

### Return type

[**ApiResponse_TransactionResponse**](../Models/ApiResponse_TransactionResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="listRelayers"></a>
# **listRelayers**
> ApiResponse_Vec_RelayerResponse listRelayers(page, per\_page)

Relayer routes implementation

    Note: OpenAPI documentation for these endpoints can be found in the &#x60;openapi.rs&#x60; file  Lists all relayers with pagination support.

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **page** | **Integer**| Page number for pagination (starts at 1) | [optional] [default to null] |
| **per\_page** | **Integer**| Number of items per page (default: 10) | [optional] [default to null] |

### Return type

[**ApiResponse_Vec_RelayerResponse**](../Models/ApiResponse_Vec_RelayerResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="listTransactions"></a>
# **listTransactions**
> ApiResponse_Vec_TransactionResponse listTransactions(relayer\_id, page, per\_page)

Lists all transactions for a specific relayer with pagination.

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **relayer\_id** | **String**| The unique identifier of the relayer | [default to null] |
| **page** | **Integer**| Page number for pagination (starts at 1) | [optional] [default to null] |
| **per\_page** | **Integer**| Number of items per page (default: 10) | [optional] [default to null] |

### Return type

[**ApiResponse_Vec_TransactionResponse**](../Models/ApiResponse_Vec_TransactionResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="replaceTransaction"></a>
# **replaceTransaction**
> ApiResponse_TransactionResponse replaceTransaction(relayer\_id, transaction\_id, NetworkTransactionRequest)

Replaces a specific transaction with a new one.

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **relayer\_id** | **String**| The unique identifier of the relayer | [default to null] |
| **transaction\_id** | **String**| The unique identifier of the transaction | [default to null] |
| **NetworkTransactionRequest** | [**NetworkTransactionRequest**](../Models/NetworkTransactionRequest.md)|  | |

### Return type

[**ApiResponse_TransactionResponse**](../Models/ApiResponse_TransactionResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="rpc"></a>
# **rpc**
> JsonRpcResponse_NetworkRpcResult rpc(relayer\_id, JsonRpcRequest\_NetworkRpcRequest)

Performs a JSON-RPC call using the specified relayer.

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **relayer\_id** | **String**| The unique identifier of the relayer | [default to null] |
| **JsonRpcRequest\_NetworkRpcRequest** | [**JsonRpcRequest_NetworkRpcRequest**](../Models/JsonRpcRequest_NetworkRpcRequest.md)| JSON-RPC request with method and parameters | |

### Return type

[**JsonRpcResponse_NetworkRpcResult**](../Models/JsonRpcResponse_NetworkRpcResult.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="sendTransaction"></a>
# **sendTransaction**
> ApiResponse_TransactionResponse sendTransaction(relayer\_id, NetworkTransactionRequest)

Sends a transaction through the specified relayer.

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **relayer\_id** | **String**| The unique identifier of the relayer | [default to null] |
| **NetworkTransactionRequest** | [**NetworkTransactionRequest**](../Models/NetworkTransactionRequest.md)|  | |

### Return type

[**ApiResponse_TransactionResponse**](../Models/ApiResponse_TransactionResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="sign"></a>
# **sign**
> ApiResponse_SignDataResponse sign(relayer\_id, SignDataRequest)

Signs data using the specified relayer.

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **relayer\_id** | **String**| The unique identifier of the relayer | [default to null] |
| **SignDataRequest** | [**SignDataRequest**](../Models/SignDataRequest.md)|  | |

### Return type

[**ApiResponse_SignDataResponse**](../Models/ApiResponse_SignDataResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="signTypedData"></a>
# **signTypedData**
> ApiResponse_SignDataResponse signTypedData(relayer\_id, SignTypedDataRequest)

Signs typed data using the specified relayer.

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **relayer\_id** | **String**| The unique identifier of the relayer | [default to null] |
| **SignTypedDataRequest** | [**SignTypedDataRequest**](../Models/SignTypedDataRequest.md)|  | |

### Return type

[**ApiResponse_SignDataResponse**](../Models/ApiResponse_SignDataResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="updateRelayer"></a>
# **updateRelayer**
> ApiResponse_RelayerResponse updateRelayer(relayer\_id, RelayerUpdateRequest)

Updates a relayer&#39;s information based on the provided update request.

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **relayer\_id** | **String**| The unique identifier of the relayer | [default to null] |
| **RelayerUpdateRequest** | [**RelayerUpdateRequest**](../Models/RelayerUpdateRequest.md)|  | |

### Return type

[**ApiResponse_RelayerResponse**](../Models/ApiResponse_RelayerResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

