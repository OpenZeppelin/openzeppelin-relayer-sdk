# Documentation for OpenZeppelin Relayer API

<a name="documentation-for-api-endpoints"></a>
## Documentation for API Endpoints

All URIs are relative to *http://localhost*

| Class | Method | HTTP request | Description |
|------------ | ------------- | ------------- | -------------|
| *HealthApi* | [**health**](Apis/HealthApi.md#health) | **GET** /v1/health | Health routes implementation |
| *MetricsApi* | [**listMetrics**](Apis/MetricsApi.md#listmetrics) | **GET** /metrics | Metrics routes implementation |
*MetricsApi* | [**metricDetail**](Apis/MetricsApi.md#metricdetail) | **GET** /metrics/{metric_name} | Returns the details of a specific metric in plain text format. |
*MetricsApi* | [**scrapeMetrics**](Apis/MetricsApi.md#scrapemetrics) | **GET** /debug/metrics/scrape | Triggers an update of system metrics and returns the result in plain text format. |
| *PluginsApi* | [**callPlugin**](Apis/PluginsApi.md#callplugin) | **POST** /api/v1/plugins/{plugin_id}/call | Calls a plugin method. |
| *RelayersApi* | [**cancelTransaction**](Apis/RelayersApi.md#canceltransaction) | **DELETE** /api/v1/relayers/{relayer_id}/transactions/{transaction_id} | Cancels a specific transaction by its ID. |
*RelayersApi* | [**deletePendingTransactions**](Apis/RelayersApi.md#deletependingtransactions) | **DELETE** /api/v1/relayers/{relayer_id}/transactions/pending | Deletes all pending transactions for a specific relayer. |
*RelayersApi* | [**getRelayer**](Apis/RelayersApi.md#getrelayer) | **GET** /api/v1/relayers/{relayer_id} | Retrieves details of a specific relayer by ID. |
*RelayersApi* | [**getRelayerBalance**](Apis/RelayersApi.md#getrelayerbalance) | **GET** /api/v1/relayers/{relayer_id}/balance | Retrieves the balance of a specific relayer. |
*RelayersApi* | [**getRelayerStatus**](Apis/RelayersApi.md#getrelayerstatus) | **GET** /api/v1/relayers/{relayer_id}/status | Fetches the current status of a specific relayer. |
*RelayersApi* | [**getTransactionById**](Apis/RelayersApi.md#gettransactionbyid) | **GET** /api/v1/relayers/{relayer_id}/transactions/{transaction_id} | Retrieves a specific transaction by its ID. |
*RelayersApi* | [**getTransactionByNonce**](Apis/RelayersApi.md#gettransactionbynonce) | **GET** /api/v1/relayers/{relayer_id}/transactions/by-nonce/{nonce} | Retrieves a transaction by its nonce value. |
*RelayersApi* | [**listRelayers**](Apis/RelayersApi.md#listrelayers) | **GET** /api/v1/relayers | Relayer routes implementation |
*RelayersApi* | [**listTransactions**](Apis/RelayersApi.md#listtransactions) | **GET** /api/v1/relayers/{relayer_id}/transactions/ | Lists all transactions for a specific relayer with pagination. |
*RelayersApi* | [**replaceTransaction**](Apis/RelayersApi.md#replacetransaction) | **PUT** /api/v1/relayers/{relayer_id}/transactions/{transaction_id} | Replaces a specific transaction with a new one. |
*RelayersApi* | [**rpc**](Apis/RelayersApi.md#rpc) | **POST** /api/v1/relayers/{relayer_id}/rpc | Performs a JSON-RPC call using the specified relayer. |
*RelayersApi* | [**sendTransaction**](Apis/RelayersApi.md#sendtransaction) | **POST** /api/v1/relayers/{relayer_id}/transactions | Sends a transaction through the specified relayer. |
*RelayersApi* | [**sign**](Apis/RelayersApi.md#sign) | **POST** /api/v1/relayers/{relayer_id}/sign | Signs data using the specified relayer. |
*RelayersApi* | [**signTypedData**](Apis/RelayersApi.md#signtypeddata) | **POST** /api/v1/relayers/{relayer_id}/sign-typed-data | Signs typed data using the specified relayer. |
*RelayersApi* | [**updateRelayer**](Apis/RelayersApi.md#updaterelayer) | **PATCH** /api/v1/relayers/{relayer_id} | Updates a relayer's information based on the provided update request. |


<a name="documentation-for-models"></a>
## Documentation for Models

 - [ApiResponse_BalanceResponse](./Models/ApiResponse_BalanceResponse.md)
 - [ApiResponse_BalanceResponse_data](./Models/ApiResponse_BalanceResponse_data.md)
 - [ApiResponse_DeletePendingTransactionsResponse](./Models/ApiResponse_DeletePendingTransactionsResponse.md)
 - [ApiResponse_DeletePendingTransactionsResponse_data](./Models/ApiResponse_DeletePendingTransactionsResponse_data.md)
 - [ApiResponse_PluginCallResponse](./Models/ApiResponse_PluginCallResponse.md)
 - [ApiResponse_PluginCallResponse_data](./Models/ApiResponse_PluginCallResponse_data.md)
 - [ApiResponse_RelayerResponse](./Models/ApiResponse_RelayerResponse.md)
 - [ApiResponse_RelayerResponse_data](./Models/ApiResponse_RelayerResponse_data.md)
 - [ApiResponse_RelayerStatus](./Models/ApiResponse_RelayerStatus.md)
 - [ApiResponse_RelayerStatus_data](./Models/ApiResponse_RelayerStatus_data.md)
 - [ApiResponse_RelayerStatus_data_oneOf](./Models/ApiResponse_RelayerStatus_data_oneOf.md)
 - [ApiResponse_RelayerStatus_data_oneOf_1](./Models/ApiResponse_RelayerStatus_data_oneOf_1.md)
 - [ApiResponse_SignDataResponse](./Models/ApiResponse_SignDataResponse.md)
 - [ApiResponse_SignDataResponse_data](./Models/ApiResponse_SignDataResponse_data.md)
 - [ApiResponse_String](./Models/ApiResponse_String.md)
 - [ApiResponse_TransactionResponse](./Models/ApiResponse_TransactionResponse.md)
 - [ApiResponse_TransactionResponse_data](./Models/ApiResponse_TransactionResponse_data.md)
 - [ApiResponse_Vec_RelayerResponse](./Models/ApiResponse_Vec_RelayerResponse.md)
 - [ApiResponse_Vec_TransactionResponse](./Models/ApiResponse_Vec_TransactionResponse.md)
 - [AssetSpec](./Models/AssetSpec.md)
 - [AssetSpec_oneOf](./Models/AssetSpec_oneOf.md)
 - [AssetSpec_oneOf_1](./Models/AssetSpec_oneOf_1.md)
 - [AssetSpec_oneOf_2](./Models/AssetSpec_oneOf_2.md)
 - [AuthSpec](./Models/AuthSpec.md)
 - [AuthSpec_oneOf](./Models/AuthSpec_oneOf.md)
 - [AuthSpec_oneOf_1](./Models/AuthSpec_oneOf_1.md)
 - [AuthSpec_oneOf_2](./Models/AuthSpec_oneOf_2.md)
 - [AuthSpec_oneOf_3](./Models/AuthSpec_oneOf_3.md)
 - [BalanceResponse](./Models/BalanceResponse.md)
 - [ContractSource](./Models/ContractSource.md)
 - [ContractSource_oneOf](./Models/ContractSource_oneOf.md)
 - [ContractSource_oneOf_1](./Models/ContractSource_oneOf_1.md)
 - [DeletePendingTransactionsResponse](./Models/DeletePendingTransactionsResponse.md)
 - [EvmPolicyResponse](./Models/EvmPolicyResponse.md)
 - [EvmRpcRequest](./Models/EvmRpcRequest.md)
 - [EvmRpcRequest_oneOf](./Models/EvmRpcRequest_oneOf.md)
 - [EvmRpcRequest_oneOf_1](./Models/EvmRpcRequest_oneOf_1.md)
 - [EvmTransactionDataSignature](./Models/EvmTransactionDataSignature.md)
 - [EvmTransactionRequest](./Models/EvmTransactionRequest.md)
 - [EvmTransactionResponse](./Models/EvmTransactionResponse.md)
 - [FeeEstimateRequestParams](./Models/FeeEstimateRequestParams.md)
 - [FeeEstimateResult](./Models/FeeEstimateResult.md)
 - [GetFeaturesEnabledResult](./Models/GetFeaturesEnabledResult.md)
 - [GetSupportedTokensItem](./Models/GetSupportedTokensItem.md)
 - [GetSupportedTokensResult](./Models/GetSupportedTokensResult.md)
 - [JsonRpcError](./Models/JsonRpcError.md)
 - [JsonRpcId](./Models/JsonRpcId.md)
 - [JsonRpcRequest_NetworkRpcRequest](./Models/JsonRpcRequest_NetworkRpcRequest.md)
 - [JsonRpcResponse_NetworkRpcResult](./Models/JsonRpcResponse_NetworkRpcResult.md)
 - [JsonRpcResponse_NetworkRpcResult_result](./Models/JsonRpcResponse_NetworkRpcResult_result.md)
 - [JupiterSwapOptions](./Models/JupiterSwapOptions.md)
 - [LogEntry](./Models/LogEntry.md)
 - [LogLevel](./Models/LogLevel.md)
 - [MemoSpec](./Models/MemoSpec.md)
 - [MemoSpec_oneOf](./Models/MemoSpec_oneOf.md)
 - [MemoSpec_oneOf_1](./Models/MemoSpec_oneOf_1.md)
 - [MemoSpec_oneOf_2](./Models/MemoSpec_oneOf_2.md)
 - [MemoSpec_oneOf_3](./Models/MemoSpec_oneOf_3.md)
 - [MemoSpec_oneOf_4](./Models/MemoSpec_oneOf_4.md)
 - [NetworkPolicyResponse](./Models/NetworkPolicyResponse.md)
 - [NetworkRpcRequest](./Models/NetworkRpcRequest.md)
 - [NetworkRpcResult](./Models/NetworkRpcResult.md)
 - [NetworkTransactionRequest](./Models/NetworkTransactionRequest.md)
 - [NetworkType](./Models/NetworkType.md)
 - [OperationSpec](./Models/OperationSpec.md)
 - [OperationSpec_oneOf](./Models/OperationSpec_oneOf.md)
 - [OperationSpec_oneOf_1](./Models/OperationSpec_oneOf_1.md)
 - [OperationSpec_oneOf_2](./Models/OperationSpec_oneOf_2.md)
 - [OperationSpec_oneOf_3](./Models/OperationSpec_oneOf_3.md)
 - [PaginationMeta](./Models/PaginationMeta.md)
 - [PluginCallRequest](./Models/PluginCallRequest.md)
 - [PluginCallResponse](./Models/PluginCallResponse.md)
 - [PrepareTransactionRequestParams](./Models/PrepareTransactionRequestParams.md)
 - [PrepareTransactionResult](./Models/PrepareTransactionResult.md)
 - [RelayerResponse](./Models/RelayerResponse.md)
 - [RelayerSolanaSwapConfig](./Models/RelayerSolanaSwapConfig.md)
 - [RelayerStatus](./Models/RelayerStatus.md)
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
 - [SolanaAllowedTokensSwapConfig](./Models/SolanaAllowedTokensSwapConfig.md)
 - [SolanaFeePaymentStrategy](./Models/SolanaFeePaymentStrategy.md)
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
 - [SolanaSwapStrategy](./Models/SolanaSwapStrategy.md)
 - [SolanaTransactionRequest](./Models/SolanaTransactionRequest.md)
 - [SolanaTransactionResponse](./Models/SolanaTransactionResponse.md)
 - [Speed](./Models/Speed.md)
 - [StellarPolicyResponse](./Models/StellarPolicyResponse.md)
 - [StellarRpcRequest](./Models/StellarRpcRequest.md)
 - [StellarRpcRequest_oneOf](./Models/StellarRpcRequest_oneOf.md)
 - [StellarRpcResult](./Models/StellarRpcResult.md)
 - [StellarTransactionRequest](./Models/StellarTransactionRequest.md)
 - [StellarTransactionResponse](./Models/StellarTransactionResponse.md)
 - [TransactionResponse](./Models/TransactionResponse.md)
 - [TransactionStatus](./Models/TransactionStatus.md)
 - [TransferTransactionRequestParams](./Models/TransferTransactionRequestParams.md)
 - [TransferTransactionResult](./Models/TransferTransactionResult.md)
 - [WasmSource](./Models/WasmSource.md)
 - [WasmSource_oneOf](./Models/WasmSource_oneOf.md)
 - [WasmSource_oneOf_1](./Models/WasmSource_oneOf_1.md)


<a name="documentation-for-authorization"></a>
## Documentation for Authorization

<a name="bearer_auth"></a>
### bearer_auth

- **Type**: HTTP Bearer Token authentication

