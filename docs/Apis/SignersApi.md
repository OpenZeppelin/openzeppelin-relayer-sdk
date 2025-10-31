# SignersApi

All URIs are relative to _http://localhost_

| Method                                         | HTTP request                           | Description                                   |
| ---------------------------------------------- | -------------------------------------- | --------------------------------------------- |
| [**createSigner**](SignersApi.md#createSigner) | **POST** /api/v1/signers               | Creates a new signer.                         |
| [**deleteSigner**](SignersApi.md#deleteSigner) | **DELETE** /api/v1/signers/{signer_id} | Deletes a signer by ID.                       |
| [**getSigner**](SignersApi.md#getSigner)       | **GET** /api/v1/signers/{signer_id}    | Retrieves details of a specific signer by ID. |
| [**listSigners**](SignersApi.md#listSigners)   | **GET** /api/v1/signers                | Signer routes implementation                  |
| [**updateSigner**](SignersApi.md#updateSigner) | **PATCH** /api/v1/signers/{signer_id}  | Updates an existing signer.                   |

<a name="createSigner"></a>

# **createSigner**

> ApiResponse_SignerResponse createSigner(SignerCreateRequest)

Creates a new signer.

### Parameters

| Name                    | Type                                                        | Description | Notes |
| ----------------------- | ----------------------------------------------------------- | ----------- | ----- |
| **SignerCreateRequest** | [**SignerCreateRequest**](../Models/SignerCreateRequest.md) |             |       |

### Return type

[**ApiResponse_SignerResponse**](../Models/ApiResponse_SignerResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="deleteSigner"></a>

# **deleteSigner**

> ApiResponse_String deleteSigner(signer_id)

Deletes a signer by ID.

### Parameters

| Name          | Type       | Description | Notes             |
| ------------- | ---------- | ----------- | ----------------- |
| **signer_id** | **String** | Signer ID   | [default to null] |

### Return type

[**ApiResponse_String**](../Models/ApiResponse_String.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="getSigner"></a>

# **getSigner**

> ApiResponse_SignerResponse getSigner(signer_id)

Retrieves details of a specific signer by ID.

### Parameters

| Name          | Type       | Description | Notes             |
| ------------- | ---------- | ----------- | ----------------- |
| **signer_id** | **String** | Signer ID   | [default to null] |

### Return type

[**ApiResponse_SignerResponse**](../Models/ApiResponse_SignerResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="listSigners"></a>

# **listSigners**

> ApiResponse_Vec_SignerResponse listSigners(page, per_page)

Signer routes implementation

    Note: OpenAPI documentation for these endpoints can be found in the &#x60;openapi.rs&#x60; file  Lists all signers with pagination support.

### Parameters

| Name         | Type        | Description                              | Notes                        |
| ------------ | ----------- | ---------------------------------------- | ---------------------------- |
| **page**     | **Integer** | Page number for pagination (starts at 1) | [optional] [default to null] |
| **per_page** | **Integer** | Number of items per page (default: 10)   | [optional] [default to null] |

### Return type

[**ApiResponse_Vec_SignerResponse**](../Models/ApiResponse_Vec_SignerResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="updateSigner"></a>

# **updateSigner**

> ApiResponse_SignerResponse updateSigner(signer_id, body)

Updates an existing signer.

### Parameters

| Name          | Type       | Description | Notes             |
| ------------- | ---------- | ----------- | ----------------- |
| **signer_id** | **String** | Signer ID   | [default to null] |
| **body**      | **Object** |             |                   |

### Return type

[**ApiResponse_SignerResponse**](../Models/ApiResponse_SignerResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json
