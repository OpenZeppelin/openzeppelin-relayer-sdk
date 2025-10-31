# RelayersApi

All URIs are relative to _http://localhost_

| Method                                                                    | HTTP request                                                           | Description                                                               |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| [**cancelTransaction**](RelayersApi.md#cancelTransaction)                 | **DELETE** /api/v1/relayers/{relayer_id}/transactions/{transaction_id} | Cancels a specific transaction by its ID.                                 |
| [**createRelayer**](RelayersApi.md#createRelayer)                         | **POST** /api/v1/relayers                                              | Creates a new relayer.                                                    |
| [**deletePendingTransactions**](RelayersApi.md#deletePendingTransactions) | **DELETE** /api/v1/relayers/{relayer_id}/transactions/pending          | Deletes all pending transactions for a specific relayer.                  |
| [**deleteRelayer**](RelayersApi.md#deleteRelayer)                         | **DELETE** /api/v1/relayers/{relayer_id}                               | Deletes a relayer by ID.                                                  |
| [**getRelayer**](RelayersApi.md#getRelayer)                               | **GET** /api/v1/relayers/{relayer_id}                                  | Retrieves details of a specific relayer by ID.                            |
| [**getRelayerBalance**](RelayersApi.md#getRelayerBalance)                 | **GET** /api/v1/relayers/{relayer_id}/balance                          | Retrieves the balance of a specific relayer.                              |
| [**getRelayerStatus**](RelayersApi.md#getRelayerStatus)                   | **GET** /api/v1/relayers/{relayer_id}/status                           | Fetches the current status of a specific relayer.                         |
| [**getTransactionById**](RelayersApi.md#getTransactionById)               | **GET** /api/v1/relayers/{relayer_id}/transactions/{transaction_id}    | Retrieves a specific transaction by its ID.                               |
| [**getTransactionByNonce**](RelayersApi.md#getTransactionByNonce)         | **GET** /api/v1/relayers/{relayer_id}/transactions/by-nonce/{nonce}    | Retrieves a transaction by its nonce value.                               |
| [**listRelayers**](RelayersApi.md#listRelayers)                           | **GET** /api/v1/relayers                                               | Relayer routes implementation                                             |
| [**listTransactions**](RelayersApi.md#listTransactions)                   | **GET** /api/v1/relayers/{relayer_id}/transactions/                    | Lists all transactions for a specific relayer with pagination.            |
| [**replaceTransaction**](RelayersApi.md#replaceTransaction)               | **PUT** /api/v1/relayers/{relayer_id}/transactions/{transaction_id}    | Replaces a specific transaction with a new one.                           |
| [**rpc**](RelayersApi.md#rpc)                                             | **POST** /api/v1/relayers/{relayer_id}/rpc                             | Performs a JSON-RPC call using the specified relayer.                     |
| [**sendTransaction**](RelayersApi.md#sendTransaction)                     | **POST** /api/v1/relayers/{relayer_id}/transactions                    | Sends a transaction through the specified relayer.                        |
| [**sign**](RelayersApi.md#sign)                                           | **POST** /api/v1/relayers/{relayer_id}/sign                            | Signs data using the specified relayer.                                   |
| [**signTransaction**](RelayersApi.md#signTransaction)                     | **POST** /api/v1/relayers/{relayer_id}/sign-transaction                | Signs a transaction using the specified relayer (Stellar only).           |
| [**signTypedData**](RelayersApi.md#signTypedData)                         | **POST** /api/v1/relayers/{relayer_id}/sign-typed-data                 | Signs typed data using the specified relayer.                             |
| [**updateRelayer**](RelayersApi.md#updateRelayer)                         | **PATCH** /api/v1/relayers/{relayer_id}                                | Updates a relayer&#39;s information based on the provided update request. |

<a name="cancelTransaction"></a>

# **cancelTransaction**

> ApiResponse_TransactionResponse cancelTransaction(relayer_id, transaction_id)

Cancels a specific transaction by its ID.

### Parameters

| Name               | Type       | Description                              | Notes             |
| ------------------ | ---------- | ---------------------------------------- | ----------------- |
| **relayer_id**     | **String** | The unique identifier of the relayer     | [default to null] |
| **transaction_id** | **String** | The unique identifier of the transaction | [default to null] |

### Return type

[**ApiResponse_TransactionResponse**](../Models/ApiResponse_TransactionResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="createRelayer"></a>

# **createRelayer**

> ApiResponse_RelayerResponse createRelayer(CreateRelayerRequest)

Creates a new relayer.

### Parameters

| Name                     | Type                                                          | Description | Notes |
| ------------------------ | ------------------------------------------------------------- | ----------- | ----- |
| **CreateRelayerRequest** | [**CreateRelayerRequest**](../Models/CreateRelayerRequest.md) |             |       |

### Return type

[**ApiResponse_RelayerResponse**](../Models/ApiResponse_RelayerResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="deletePendingTransactions"></a>

# **deletePendingTransactions**

> ApiResponse_DeletePendingTransactionsResponse deletePendingTransactions(relayer_id)

Deletes all pending transactions for a specific relayer.

### Parameters

| Name           | Type       | Description                          | Notes             |
| -------------- | ---------- | ------------------------------------ | ----------------- |
| **relayer_id** | **String** | The unique identifier of the relayer | [default to null] |

### Return type

[**ApiResponse_DeletePendingTransactionsResponse**](../Models/ApiResponse_DeletePendingTransactionsResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="deleteRelayer"></a>

# **deleteRelayer**

> ApiResponse_String deleteRelayer(relayer_id)

Deletes a relayer by ID.

### Parameters

| Name           | Type       | Description                          | Notes             |
| -------------- | ---------- | ------------------------------------ | ----------------- |
| **relayer_id** | **String** | The unique identifier of the relayer | [default to null] |

### Return type

[**ApiResponse_String**](../Models/ApiResponse_String.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="getRelayer"></a>

# **getRelayer**

> ApiResponse_RelayerResponse getRelayer(relayer_id)

Retrieves details of a specific relayer by ID.

### Parameters

| Name           | Type       | Description                          | Notes             |
| -------------- | ---------- | ------------------------------------ | ----------------- |
| **relayer_id** | **String** | The unique identifier of the relayer | [default to null] |

### Return type

[**ApiResponse_RelayerResponse**](../Models/ApiResponse_RelayerResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="getRelayerBalance"></a>

# **getRelayerBalance**

> ApiResponse_BalanceResponse getRelayerBalance(relayer_id)

Retrieves the balance of a specific relayer.

### Parameters

| Name           | Type       | Description                          | Notes             |
| -------------- | ---------- | ------------------------------------ | ----------------- |
| **relayer_id** | **String** | The unique identifier of the relayer | [default to null] |

### Return type

[**ApiResponse_BalanceResponse**](../Models/ApiResponse_BalanceResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="getRelayerStatus"></a>

# **getRelayerStatus**

> ApiResponse_RelayerStatus getRelayerStatus(relayer_id)

Fetches the current status of a specific relayer.

### Parameters

| Name           | Type       | Description                          | Notes             |
| -------------- | ---------- | ------------------------------------ | ----------------- |
| **relayer_id** | **String** | The unique identifier of the relayer | [default to null] |

### Return type

[**ApiResponse_RelayerStatus**](../Models/ApiResponse_RelayerStatus.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="getTransactionById"></a>

# **getTransactionById**

> ApiResponse_TransactionResponse getTransactionById(relayer_id, transaction_id)

Retrieves a specific transaction by its ID.

### Parameters

| Name               | Type       | Description                              | Notes             |
| ------------------ | ---------- | ---------------------------------------- | ----------------- |
| **relayer_id**     | **String** | The unique identifier of the relayer     | [default to null] |
| **transaction_id** | **String** | The unique identifier of the transaction | [default to null] |

### Return type

[**ApiResponse_TransactionResponse**](../Models/ApiResponse_TransactionResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="getTransactionByNonce"></a>

# **getTransactionByNonce**

> ApiResponse_TransactionResponse getTransactionByNonce(relayer_id, nonce)

Retrieves a transaction by its nonce value.

### Parameters

| Name           | Type        | Description                          | Notes             |
| -------------- | ----------- | ------------------------------------ | ----------------- |
| **relayer_id** | **String**  | The unique identifier of the relayer | [default to null] |
| **nonce**      | **Integer** | The nonce of the transaction         | [default to null] |

### Return type

[**ApiResponse_TransactionResponse**](../Models/ApiResponse_TransactionResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="listRelayers"></a>

# **listRelayers**

> ApiResponse_Vec_RelayerResponse listRelayers(page, per_page)

Relayer routes implementation

    Note: OpenAPI documentation for these endpoints can be found in the &#x60;openapi.rs&#x60; file  Lists all relayers with pagination support.

### Parameters

| Name         | Type        | Description                              | Notes                        |
| ------------ | ----------- | ---------------------------------------- | ---------------------------- |
| **page**     | **Integer** | Page number for pagination (starts at 1) | [optional] [default to null] |
| **per_page** | **Integer** | Number of items per page (default: 10)   | [optional] [default to null] |

### Return type

[**ApiResponse_Vec_RelayerResponse**](../Models/ApiResponse_Vec_RelayerResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="listTransactions"></a>

# **listTransactions**

> ApiResponse_Vec_TransactionResponse listTransactions(relayer_id, page, per_page)

Lists all transactions for a specific relayer with pagination.

### Parameters

| Name           | Type        | Description                              | Notes                        |
| -------------- | ----------- | ---------------------------------------- | ---------------------------- |
| **relayer_id** | **String**  | The unique identifier of the relayer     | [default to null]            |
| **page**       | **Integer** | Page number for pagination (starts at 1) | [optional] [default to null] |
| **per_page**   | **Integer** | Number of items per page (default: 10)   | [optional] [default to null] |

### Return type

[**ApiResponse_Vec_TransactionResponse**](../Models/ApiResponse_Vec_TransactionResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="replaceTransaction"></a>

# **replaceTransaction**

> ApiResponse_TransactionResponse replaceTransaction(relayer_id, transaction_id, NetworkTransactionRequest)

Replaces a specific transaction with a new one.

### Parameters

| Name                          | Type                                                                    | Description                              | Notes             |
| ----------------------------- | ----------------------------------------------------------------------- | ---------------------------------------- | ----------------- |
| **relayer_id**                | **String**                                                              | The unique identifier of the relayer     | [default to null] |
| **transaction_id**            | **String**                                                              | The unique identifier of the transaction | [default to null] |
| **NetworkTransactionRequest** | [**NetworkTransactionRequest**](../Models/NetworkTransactionRequest.md) |                                          |                   |

### Return type

[**ApiResponse_TransactionResponse**](../Models/ApiResponse_TransactionResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="rpc"></a>

# **rpc**

> JsonRpcResponse_NetworkRpcResult rpc(relayer_id, JsonRpcRequest_NetworkRpcRequest)

Performs a JSON-RPC call using the specified relayer.

### Parameters

| Name                                 | Type                                                                                  | Description                                 | Notes             |
| ------------------------------------ | ------------------------------------------------------------------------------------- | ------------------------------------------- | ----------------- |
| **relayer_id**                       | **String**                                                                            | The unique identifier of the relayer        | [default to null] |
| **JsonRpcRequest_NetworkRpcRequest** | [**JsonRpcRequest_NetworkRpcRequest**](../Models/JsonRpcRequest_NetworkRpcRequest.md) | JSON-RPC request with method and parameters |                   |

### Return type

[**JsonRpcResponse_NetworkRpcResult**](../Models/JsonRpcResponse_NetworkRpcResult.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="sendTransaction"></a>

# **sendTransaction**

> ApiResponse_TransactionResponse sendTransaction(relayer_id, NetworkTransactionRequest)

Sends a transaction through the specified relayer.

### Parameters

| Name                          | Type                                                                    | Description                          | Notes             |
| ----------------------------- | ----------------------------------------------------------------------- | ------------------------------------ | ----------------- |
| **relayer_id**                | **String**                                                              | The unique identifier of the relayer | [default to null] |
| **NetworkTransactionRequest** | [**NetworkTransactionRequest**](../Models/NetworkTransactionRequest.md) |                                      |                   |

### Return type

[**ApiResponse_TransactionResponse**](../Models/ApiResponse_TransactionResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="sign"></a>

# **sign**

> ApiResponse_SignDataResponse sign(relayer_id, SignDataRequest)

Signs data using the specified relayer.

### Parameters

| Name                | Type                                                | Description                          | Notes             |
| ------------------- | --------------------------------------------------- | ------------------------------------ | ----------------- |
| **relayer_id**      | **String**                                          | The unique identifier of the relayer | [default to null] |
| **SignDataRequest** | [**SignDataRequest**](../Models/SignDataRequest.md) |                                      |                   |

### Return type

[**ApiResponse_SignDataResponse**](../Models/ApiResponse_SignDataResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="signTransaction"></a>

# **signTransaction**

> ApiResponse_SignTransactionResponse signTransaction(relayer_id, SignTransactionRequest)

Signs a transaction using the specified relayer (Stellar only).

### Parameters

| Name                       | Type                                                              | Description                          | Notes             |
| -------------------------- | ----------------------------------------------------------------- | ------------------------------------ | ----------------- |
| **relayer_id**             | **String**                                                        | The unique identifier of the relayer | [default to null] |
| **SignTransactionRequest** | [**SignTransactionRequest**](../Models/SignTransactionRequest.md) |                                      |                   |

### Return type

[**ApiResponse_SignTransactionResponse**](../Models/ApiResponse_SignTransactionResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="signTypedData"></a>

# **signTypedData**

> ApiResponse_SignDataResponse signTypedData(relayer_id, SignTypedDataRequest)

Signs typed data using the specified relayer.

### Parameters

| Name                     | Type                                                          | Description                          | Notes             |
| ------------------------ | ------------------------------------------------------------- | ------------------------------------ | ----------------- |
| **relayer_id**           | **String**                                                    | The unique identifier of the relayer | [default to null] |
| **SignTypedDataRequest** | [**SignTypedDataRequest**](../Models/SignTypedDataRequest.md) |                                      |                   |

### Return type

[**ApiResponse_SignDataResponse**](../Models/ApiResponse_SignDataResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="updateRelayer"></a>

# **updateRelayer**

> ApiResponse_RelayerResponse updateRelayer(relayer_id, UpdateRelayerRequest)

Updates a relayer&#39;s information based on the provided update request.

### Parameters

| Name                     | Type                                                          | Description                          | Notes             |
| ------------------------ | ------------------------------------------------------------- | ------------------------------------ | ----------------- |
| **relayer_id**           | **String**                                                    | The unique identifier of the relayer | [default to null] |
| **UpdateRelayerRequest** | [**UpdateRelayerRequest**](../Models/UpdateRelayerRequest.md) |                                      |                   |

### Return type

[**ApiResponse_RelayerResponse**](../Models/ApiResponse_RelayerResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json
