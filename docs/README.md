# Documentation for OpenZeppelin Relayer API

<a name="documentation-for-api-endpoints"></a>
## Documentation for API Endpoints

All URIs are relative to *http://localhost*

| Class | Method | HTTP request | Description |
|------------ | ------------- | ------------- | -------------|
| *MetricsApi* | [**listMetrics**](Apis/MetricsApi.md#listmetrics) | **GET** /metrics | Returns a list of all available metric names in JSON format. |
*MetricsApi* | [**metricDetail**](Apis/MetricsApi.md#metricdetail) | **GET** /metrics/{metric_name} | Returns the details of a specific metric in plain text format. |
*MetricsApi* | [**scrapeMetrics**](Apis/MetricsApi.md#scrapemetrics) | **GET** /debug/metrics/scrape | Triggers an update of system metrics and returns the result in plain text format. |
| *RelayersApi* | [**cancelTransaction**](Apis/RelayersApi.md#canceltransaction) | **DELETE** /api/v1/relayers/{relayer_id}/transactions/{transaction_id} | Cancels a specific transaction by its ID. |
*RelayersApi* | [**deletePendingTransactions**](Apis/RelayersApi.md#deletependingtransactions) | **DELETE** /api/v1/relayers/{relayer_id}/transactions/pending | Deletes all pending transactions for a specific relayer. |
*RelayersApi* | [**getRelayer**](Apis/RelayersApi.md#getrelayer) | **GET** /api/v1/relayers/{relayer_id} | Retrieves details of a specific relayer by ID. |
*RelayersApi* | [**getRelayerBalance**](Apis/RelayersApi.md#getrelayerbalance) | **GET** /api/v1/relayers/{relayer_id}/balance | Retrieves the balance of a specific relayer. |
*RelayersApi* | [**getRelayerStatus**](Apis/RelayersApi.md#getrelayerstatus) | **GET** /api/v1/relayers/{relayer_id}/status | Fetches the current status of a specific relayer. |
*RelayersApi* | [**getTransactionById**](Apis/RelayersApi.md#gettransactionbyid) | **GET** /api/v1/relayers/{relayer_id}/transactions/{transaction_id} | Retrieves a specific transaction by its ID. |
*RelayersApi* | [**getTransactionByNonce**](Apis/RelayersApi.md#gettransactionbynonce) | **GET** /api/v1/relayers/{relayer_id}/transactions/by-nonce/{nonce} | Retrieves a transaction by its nonce value. |
*RelayersApi* | [**listRelayers**](Apis/RelayersApi.md#listrelayers) | **GET** /api/v1/relayers | Lists all relayers with pagination support. |
*RelayersApi* | [**listTransactions**](Apis/RelayersApi.md#listtransactions) | **GET** /api/v1/relayers/{relayer_id}/transactions/ | Lists all transactions for a specific relayer with pagination. |
*RelayersApi* | [**rpc**](Apis/RelayersApi.md#rpc) | **POST** /api/v1/relayers/{relayer_id}/rpc | Performs a JSON-RPC call using the specified relayer. |
*RelayersApi* | [**sendTransaction**](Apis/RelayersApi.md#sendtransaction) | **POST** /api/v1/relayers/{relayer_id}/transactions | Sends a transaction through the specified relayer. |
*RelayersApi* | [**sign**](Apis/RelayersApi.md#sign) | **POST** /api/v1/relayers/{relayer_id}/sign | Signs data using the specified relayer. |
*RelayersApi* | [**signTypedData**](Apis/RelayersApi.md#signtypeddata) | **POST** /api/v1/relayers/{relayer_id}/sign-typed-data | Signs typed data using the specified relayer. |
*RelayersApi* | [**updateRelayer**](Apis/RelayersApi.md#updaterelayer) | **PATCH** /api/v1/relayers/{relayer_id} | Updates a relayer's information based on the provided update request. |


<a name="documentation-for-models"></a>
## Documentation for Models

 - [ApiResponse_BalanceResponse](./Models/ApiResponse_BalanceResponse.md)
 - [ApiResponse_BalanceResponse_data](./Models/ApiResponse_BalanceResponse_data.md)
 - [ApiResponse_RelayerResponse](./Models/ApiResponse_RelayerResponse.md)
 - [ApiResponse_RelayerResponse_data](./Models/ApiResponse_RelayerResponse_data.md)
 - [ApiResponse_SignDataResponse](./Models/ApiResponse_SignDataResponse.md)
 - [ApiResponse_SignDataResponse_data](./Models/ApiResponse_SignDataResponse_data.md)
 - [ApiResponse_String](./Models/ApiResponse_String.md)
 - [ApiResponse_TransactionResponse](./Models/ApiResponse_TransactionResponse.md)
 - [ApiResponse_TransactionResponse_data](./Models/ApiResponse_TransactionResponse_data.md)
 - [ApiResponse_Vec_RelayerResponse](./Models/ApiResponse_Vec_RelayerResponse.md)
 - [ApiResponse_Vec_TransactionResponse](./Models/ApiResponse_Vec_TransactionResponse.md)
 - [ApiResponse_bool](./Models/ApiResponse_bool.md)
 - [BalanceResponse](./Models/BalanceResponse.md)
 - [EvmPolicyResponse](./Models/EvmPolicyResponse.md)
 - [EvmRpcRequest](./Models/EvmRpcRequest.md)
 - [EvmRpcRequest_oneOf](./Models/EvmRpcRequest_oneOf.md)
 - [EvmRpcResult](./Models/EvmRpcResult.md)
 - [EvmTransactionRequest](./Models/EvmTransactionRequest.md)
 - [EvmTransactionResponse](./Models/EvmTransactionResponse.md)
 - [FeeEstimateRequestParams](./Models/FeeEstimateRequestParams.md)
 - [FeeEstimateResult](./Models/FeeEstimateResult.md)
 - [GetFeaturesEnabledResult](./Models/GetFeaturesEnabledResult.md)
 - [GetSupportedTokensItem](./Models/GetSupportedTokensItem.md)
 - [GetSupportedTokensResult](./Models/GetSupportedTokensResult.md)
 - [JsonRpcError](./Models/JsonRpcError.md)
 - [JsonRpcRequest_NetworkRpcRequest](./Models/JsonRpcRequest_NetworkRpcRequest.md)
 - [JsonRpcResponse_NetworkRpcResult](./Models/JsonRpcResponse_NetworkRpcResult.md)
 - [JsonRpcResponse_NetworkRpcResult_result](./Models/JsonRpcResponse_NetworkRpcResult_result.md)
 - [NetworkPolicyResponse](./Models/NetworkPolicyResponse.md)
 - [NetworkRpcRequest](./Models/NetworkRpcRequest.md)
 - [NetworkRpcResult](./Models/NetworkRpcResult.md)
 - [NetworkTransactionRequest](./Models/NetworkTransactionRequest.md)
 - [NetworkType](./Models/NetworkType.md)
 - [PaginationMeta](./Models/PaginationMeta.md)
 - [PrepareTransactionRequestParams](./Models/PrepareTransactionRequestParams.md)
 - [PrepareTransactionResult](./Models/PrepareTransactionResult.md)
 - [RelayerResponse](./Models/RelayerResponse.md)
 - [RelayerUpdateRequest](./Models/RelayerUpdateRequest.md)
 - [SignAndSendTransactionRequestParams](./Models/SignAndSendTransactionRequestParams.md)
 - [SignAndSendTransactionResult](./Models/SignAndSendTransactionResult.md)
 - [SignDataRequest](./Models/SignDataRequest.md)
 - [SignDataResponse](./Models/SignDataResponse.md)
 - [SignDataResponseEvm](./Models/SignDataResponseEvm.md)
 - [SignDataResponseSolana](./Models/SignDataResponseSolana.md)
 - [SignTransactionRequestParams](./Models/SignTransactionRequestParams.md)
 - [SignTransactionResult](./Models/SignTransactionResult.md)
 - [SignTypedDataRequest](./Models/SignTypedDataRequest.md)
 - [SolanaAllowedTokensPolicy](./Models/SolanaAllowedTokensPolicy.md)
 - [SolanaPolicyResponse](./Models/SolanaPolicyResponse.md)
 - [SolanaRpcRequest](./Models/SolanaRpcRequest.md)
 - [SolanaRpcRequest_oneOf](./Models/SolanaRpcRequest_oneOf.md)
 - [SolanaRpcRequest_oneOf_1](./Models/SolanaRpcRequest_oneOf_1.md)
 - [SolanaRpcRequest_oneOf_2](./Models/SolanaRpcRequest_oneOf_2.md)
 - [SolanaRpcRequest_oneOf_3](./Models/SolanaRpcRequest_oneOf_3.md)
 - [SolanaRpcRequest_oneOf_4](./Models/SolanaRpcRequest_oneOf_4.md)
 - [SolanaRpcRequest_oneOf_5](./Models/SolanaRpcRequest_oneOf_5.md)
 - [SolanaRpcRequest_oneOf_6](./Models/SolanaRpcRequest_oneOf_6.md)
 - [SolanaRpcResult](./Models/SolanaRpcResult.md)
 - [SolanaTransactionRequest](./Models/SolanaTransactionRequest.md)
 - [SolanaTransactionResponse](./Models/SolanaTransactionResponse.md)
 - [Speed](./Models/Speed.md)
 - [StellarPolicyResponse](./Models/StellarPolicyResponse.md)
 - [StellarRpcRequest](./Models/StellarRpcRequest.md)
 - [StellarRpcResult](./Models/StellarRpcResult.md)
 - [StellarTransactionRequest](./Models/StellarTransactionRequest.md)
 - [StellarTransactionResponse](./Models/StellarTransactionResponse.md)
 - [TransactionResponse](./Models/TransactionResponse.md)
 - [TransactionStatus](./Models/TransactionStatus.md)
 - [TransferTransactionRequestParams](./Models/TransferTransactionRequestParams.md)
 - [TransferTransactionResult](./Models/TransferTransactionResult.md)


<a name="documentation-for-authorization"></a>
## Documentation for Authorization

<a name="bearer_auth"></a>
### bearer_auth

- **Type**: HTTP Bearer Token authentication

