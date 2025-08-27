# Documentation for OpenZeppelin Relayer API

<a name="documentation-for-api-endpoints"></a>

## Documentation for API Endpoints

All URIs are relative to _http://localhost_

| Class              | Method                                                                         | HTTP request                                                           | Description                                                                       |
| ------------------ | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| _HealthApi_        | [**health**](Apis/HealthApi.md#health)                                         | **GET** /v1/health                                                     | Health routes implementation                                                      |
| _MetricsApi_       | [**listMetrics**](Apis/MetricsApi.md#listmetrics)                              | **GET** /metrics                                                       | Metrics routes implementation                                                     |
| _MetricsApi_       | [**metricDetail**](Apis/MetricsApi.md#metricdetail)                            | **GET** /metrics/{metric_name}                                         | Returns the details of a specific metric in plain text format.                    |
| _MetricsApi_       | [**scrapeMetrics**](Apis/MetricsApi.md#scrapemetrics)                          | **GET** /debug/metrics/scrape                                          | Triggers an update of system metrics and returns the result in plain text format. |
| _NotificationsApi_ | [**createNotification**](Apis/NotificationsApi.md#createnotification)          | **POST** /api/v1/notifications                                         | Creates a new notification.                                                       |
| _NotificationsApi_ | [**deleteNotification**](Apis/NotificationsApi.md#deletenotification)          | **DELETE** /api/v1/notifications/{notification_id}                     | Deletes a notification by ID.                                                     |
| _NotificationsApi_ | [**getNotification**](Apis/NotificationsApi.md#getnotification)                | **GET** /api/v1/notifications/{notification_id}                        | Retrieves details of a specific notification by ID.                               |
| _NotificationsApi_ | [**listNotifications**](Apis/NotificationsApi.md#listnotifications)            | **GET** /api/v1/notifications                                          | Notification routes implementation                                                |
| _NotificationsApi_ | [**updateNotification**](Apis/NotificationsApi.md#updatenotification)          | **PATCH** /api/v1/notifications/{notification_id}                      | Updates an existing notification.                                                 |
| _PluginsApi_       | [**callPlugin**](Apis/PluginsApi.md#callplugin)                                | **POST** /api/v1/plugins/{plugin_id}/call                              | Calls a plugin method.                                                            |
| _RelayersApi_      | [**cancelTransaction**](Apis/RelayersApi.md#canceltransaction)                 | **DELETE** /api/v1/relayers/{relayer_id}/transactions/{transaction_id} | Cancels a specific transaction by its ID.                                         |
| _RelayersApi_      | [**createRelayer**](Apis/RelayersApi.md#createrelayer)                         | **POST** /api/v1/relayers                                              | Creates a new relayer.                                                            |
| _RelayersApi_      | [**deletePendingTransactions**](Apis/RelayersApi.md#deletependingtransactions) | **DELETE** /api/v1/relayers/{relayer_id}/transactions/pending          | Deletes all pending transactions for a specific relayer.                          |
| _RelayersApi_      | [**deleteRelayer**](Apis/RelayersApi.md#deleterelayer)                         | **DELETE** /api/v1/relayers/{relayer_id}                               | Deletes a relayer by ID.                                                          |
| _RelayersApi_      | [**getRelayer**](Apis/RelayersApi.md#getrelayer)                               | **GET** /api/v1/relayers/{relayer_id}                                  | Retrieves details of a specific relayer by ID.                                    |
| _RelayersApi_      | [**getRelayerBalance**](Apis/RelayersApi.md#getrelayerbalance)                 | **GET** /api/v1/relayers/{relayer_id}/balance                          | Retrieves the balance of a specific relayer.                                      |
| _RelayersApi_      | [**getRelayerStatus**](Apis/RelayersApi.md#getrelayerstatus)                   | **GET** /api/v1/relayers/{relayer_id}/status                           | Fetches the current status of a specific relayer.                                 |
| _RelayersApi_      | [**getTransactionById**](Apis/RelayersApi.md#gettransactionbyid)               | **GET** /api/v1/relayers/{relayer_id}/transactions/{transaction_id}    | Retrieves a specific transaction by its ID.                                       |
| _RelayersApi_      | [**getTransactionByNonce**](Apis/RelayersApi.md#gettransactionbynonce)         | **GET** /api/v1/relayers/{relayer_id}/transactions/by-nonce/{nonce}    | Retrieves a transaction by its nonce value.                                       |
| _RelayersApi_      | [**listRelayers**](Apis/RelayersApi.md#listrelayers)                           | **GET** /api/v1/relayers                                               | Relayer routes implementation                                                     |
| _RelayersApi_      | [**listTransactions**](Apis/RelayersApi.md#listtransactions)                   | **GET** /api/v1/relayers/{relayer_id}/transactions/                    | Lists all transactions for a specific relayer with pagination.                    |
| _RelayersApi_      | [**replaceTransaction**](Apis/RelayersApi.md#replacetransaction)               | **PUT** /api/v1/relayers/{relayer_id}/transactions/{transaction_id}    | Replaces a specific transaction with a new one.                                   |
| _RelayersApi_      | [**rpc**](Apis/RelayersApi.md#rpc)                                             | **POST** /api/v1/relayers/{relayer_id}/rpc                             | Performs a JSON-RPC call using the specified relayer.                             |
| _RelayersApi_      | [**sendTransaction**](Apis/RelayersApi.md#sendtransaction)                     | **POST** /api/v1/relayers/{relayer_id}/transactions                    | Sends a transaction through the specified relayer.                                |
| _RelayersApi_      | [**sign**](Apis/RelayersApi.md#sign)                                           | **POST** /api/v1/relayers/{relayer_id}/sign                            | Signs data using the specified relayer.                                           |
| _RelayersApi_      | [**signTransaction**](Apis/RelayersApi.md#signtransaction)                     | **POST** /api/v1/relayers/{relayer_id}/sign-transaction                | Signs a transaction using the specified relayer (Stellar only).                   |
| _RelayersApi_      | [**signTypedData**](Apis/RelayersApi.md#signtypeddata)                         | **POST** /api/v1/relayers/{relayer_id}/sign-typed-data                 | Signs typed data using the specified relayer.                                     |
| _RelayersApi_      | [**updateRelayer**](Apis/RelayersApi.md#updaterelayer)                         | **PATCH** /api/v1/relayers/{relayer_id}                                | Updates a relayer's information based on the provided update request.             |
| _SignersApi_       | [**createSigner**](Apis/SignersApi.md#createsigner)                            | **POST** /api/v1/signers                                               | Creates a new signer.                                                             |
| _SignersApi_       | [**deleteSigner**](Apis/SignersApi.md#deletesigner)                            | **DELETE** /api/v1/signers/{signer_id}                                 | Deletes a signer by ID.                                                           |
| _SignersApi_       | [**getSigner**](Apis/SignersApi.md#getsigner)                                  | **GET** /api/v1/signers/{signer_id}                                    | Retrieves details of a specific signer by ID.                                     |
| _SignersApi_       | [**listSigners**](Apis/SignersApi.md#listsigners)                              | **GET** /api/v1/signers                                                | Signer routes implementation                                                      |
| _SignersApi_       | [**updateSigner**](Apis/SignersApi.md#updatesigner)                            | **PATCH** /api/v1/signers/{signer_id}                                  | Updates an existing signer.                                                       |

<a name="documentation-for-models"></a>

## Documentation for Models

- [ApiResponse_BalanceResponse](./Models/ApiResponse_BalanceResponse.md)
- [ApiResponse_BalanceResponse_data](./Models/ApiResponse_BalanceResponse_data.md)
- [ApiResponse_DeletePendingTransactionsResponse](./Models/ApiResponse_DeletePendingTransactionsResponse.md)
- [ApiResponse_DeletePendingTransactionsResponse_data](./Models/ApiResponse_DeletePendingTransactionsResponse_data.md)
- [ApiResponse_NotificationResponse](./Models/ApiResponse_NotificationResponse.md)
- [ApiResponse_NotificationResponse_data](./Models/ApiResponse_NotificationResponse_data.md)
- [ApiResponse_PluginCallResponse](./Models/ApiResponse_PluginCallResponse.md)
- [ApiResponse_PluginCallResponse_data](./Models/ApiResponse_PluginCallResponse_data.md)
- [ApiResponse_RelayerResponse](./Models/ApiResponse_RelayerResponse.md)
- [ApiResponse_RelayerResponse_data](./Models/ApiResponse_RelayerResponse_data.md)
- [ApiResponse_RelayerStatus](./Models/ApiResponse_RelayerStatus.md)
- [ApiResponse_RelayerStatus_data](./Models/ApiResponse_RelayerStatus_data.md)
- [ApiResponse_RelayerStatus_data_oneOf](./Models/ApiResponse_RelayerStatus_data_oneOf.md)
- [ApiResponse_RelayerStatus_data_oneOf_1](./Models/ApiResponse_RelayerStatus_data_oneOf_1.md)
- [ApiResponse_RelayerStatus_data_oneOf_2](./Models/ApiResponse_RelayerStatus_data_oneOf_2.md)
- [ApiResponse_SignDataResponse](./Models/ApiResponse_SignDataResponse.md)
- [ApiResponse_SignDataResponse_data](./Models/ApiResponse_SignDataResponse_data.md)
- [ApiResponse_SignerResponse](./Models/ApiResponse_SignerResponse.md)
- [ApiResponse_SignerResponse_data](./Models/ApiResponse_SignerResponse_data.md)
- [ApiResponse_String](./Models/ApiResponse_String.md)
- [ApiResponse_TransactionResponse](./Models/ApiResponse_TransactionResponse.md)
- [ApiResponse_TransactionResponse_data](./Models/ApiResponse_TransactionResponse_data.md)
- [ApiResponse_Vec_NotificationResponse](./Models/ApiResponse_Vec_NotificationResponse.md)
- [ApiResponse_Vec_RelayerResponse](./Models/ApiResponse_Vec_RelayerResponse.md)
- [ApiResponse_Vec_SignerResponse](./Models/ApiResponse_Vec_SignerResponse.md)
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
- [AwsKmsSignerRequestConfig](./Models/AwsKmsSignerRequestConfig.md)
- [BalanceResponse](./Models/BalanceResponse.md)
- [ContractSource](./Models/ContractSource.md)
- [ContractSource_oneOf](./Models/ContractSource_oneOf.md)
- [ContractSource_oneOf_1](./Models/ContractSource_oneOf_1.md)
- [CreateRelayerPolicyRequest](./Models/CreateRelayerPolicyRequest.md)
- [CreateRelayerPolicyRequest_oneOf](./Models/CreateRelayerPolicyRequest_oneOf.md)
- [CreateRelayerPolicyRequest_oneOf_1](./Models/CreateRelayerPolicyRequest_oneOf_1.md)
- [CreateRelayerPolicyRequest_oneOf_2](./Models/CreateRelayerPolicyRequest_oneOf_2.md)
- [CreateRelayerRequest](./Models/CreateRelayerRequest.md)
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
- [GoogleCloudKmsSignerKeyRequestConfig](./Models/GoogleCloudKmsSignerKeyRequestConfig.md)
- [GoogleCloudKmsSignerKeyResponseConfig](./Models/GoogleCloudKmsSignerKeyResponseConfig.md)
- [GoogleCloudKmsSignerRequestConfig](./Models/GoogleCloudKmsSignerRequestConfig.md)
- [GoogleCloudKmsSignerServiceAccountRequestConfig](./Models/GoogleCloudKmsSignerServiceAccountRequestConfig.md)
- [GoogleCloudKmsSignerServiceAccountResponseConfig](./Models/GoogleCloudKmsSignerServiceAccountResponseConfig.md)
- [JsonRpcError](./Models/JsonRpcError.md)
- [JsonRpcId](./Models/JsonRpcId.md)
- [JsonRpcRequest_NetworkRpcRequest](./Models/JsonRpcRequest_NetworkRpcRequest.md)
- [JsonRpcResponse_NetworkRpcResult](./Models/JsonRpcResponse_NetworkRpcResult.md)
- [JsonRpcResponse_NetworkRpcResult_result](./Models/JsonRpcResponse_NetworkRpcResult_result.md)
- [JupiterSwapOptions](./Models/JupiterSwapOptions.md)
- [LocalSignerRequestConfig](./Models/LocalSignerRequestConfig.md)
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
- [NotificationCreateRequest](./Models/NotificationCreateRequest.md)
- [NotificationResponse](./Models/NotificationResponse.md)
- [NotificationType](./Models/NotificationType.md)
- [NotificationUpdateRequest](./Models/NotificationUpdateRequest.md)
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
- [RelayerEvmPolicy](./Models/RelayerEvmPolicy.md)
- [RelayerNetworkPolicy](./Models/RelayerNetworkPolicy.md)
- [RelayerNetworkPolicyResponse](./Models/RelayerNetworkPolicyResponse.md)
- [RelayerNetworkPolicy_oneOf](./Models/RelayerNetworkPolicy_oneOf.md)
- [RelayerNetworkPolicy_oneOf_1](./Models/RelayerNetworkPolicy_oneOf_1.md)
- [RelayerNetworkPolicy_oneOf_2](./Models/RelayerNetworkPolicy_oneOf_2.md)
- [RelayerNetworkType](./Models/RelayerNetworkType.md)
- [RelayerResponse](./Models/RelayerResponse.md)
- [RelayerSolanaPolicy](./Models/RelayerSolanaPolicy.md)
- [RelayerSolanaSwapConfig](./Models/RelayerSolanaSwapConfig.md)
- [RelayerStatus](./Models/RelayerStatus.md)
- [RelayerStellarPolicy](./Models/RelayerStellarPolicy.md)
- [RpcConfig](./Models/RpcConfig.md)
- [SignAndSendTransactionRequestParams](./Models/SignAndSendTransactionRequestParams.md)
- [SignAndSendTransactionResult](./Models/SignAndSendTransactionResult.md)
- [SignDataRequest](./Models/SignDataRequest.md)
- [SignDataResponse](./Models/SignDataResponse.md)
- [SignDataResponseEvm](./Models/SignDataResponseEvm.md)
- [SignDataResponseSolana](./Models/SignDataResponseSolana.md)
- [SignTransactionRequest](./Models/SignTransactionRequest.md)
- [SignTransactionRequestParams](./Models/SignTransactionRequestParams.md)
- [SignTransactionRequestStellar](./Models/SignTransactionRequestStellar.md)
- [SignTransactionResponse](./Models/SignTransactionResponse.md)
- [SignTransactionResponseStellar](./Models/SignTransactionResponseStellar.md)
- [SignTransactionResult](./Models/SignTransactionResult.md)
- [SignTypedDataRequest](./Models/SignTypedDataRequest.md)
- [SignerConfigRequest](./Models/SignerConfigRequest.md)
- [SignerConfigResponse](./Models/SignerConfigResponse.md)
- [SignerConfigResponse_oneOf](./Models/SignerConfigResponse_oneOf.md)
- [SignerConfigResponse_oneOf_1](./Models/SignerConfigResponse_oneOf_1.md)
- [SignerConfigResponse_oneOf_2](./Models/SignerConfigResponse_oneOf_2.md)
- [SignerConfigResponse_oneOf_3](./Models/SignerConfigResponse_oneOf_3.md)
- [SignerConfigResponse_oneOf_4](./Models/SignerConfigResponse_oneOf_4.md)
- [SignerCreateRequest](./Models/SignerCreateRequest.md)
- [SignerResponse](./Models/SignerResponse.md)
- [SignerType](./Models/SignerType.md)
- [SignerTypeRequest](./Models/SignerTypeRequest.md)
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
- [TurnkeySignerRequestConfig](./Models/TurnkeySignerRequestConfig.md)
- [UpdateRelayerRequest](./Models/UpdateRelayerRequest.md)
- [VaultSignerRequestConfig](./Models/VaultSignerRequestConfig.md)
- [VaultTransitSignerRequestConfig](./Models/VaultTransitSignerRequestConfig.md)
- [WasmSource](./Models/WasmSource.md)
- [WasmSource_oneOf](./Models/WasmSource_oneOf.md)
- [WasmSource_oneOf_1](./Models/WasmSource_oneOf_1.md)

<a name="documentation-for-authorization"></a>

## Documentation for Authorization

<a name="bearer_auth"></a>

### bearer_auth

- **Type**: HTTP Bearer Token authentication
