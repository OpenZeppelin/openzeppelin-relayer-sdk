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
| *NetworksApi* | [**getNetwork**](Apis/NetworksApi.md#getnetwork) | **GET** /api/v1/networks/{network_id} | Retrieves details of a specific network by ID. |
*NetworksApi* | [**listNetworks**](Apis/NetworksApi.md#listnetworks) | **GET** /api/v1/networks | Network routes implementation |
*NetworksApi* | [**updateNetwork**](Apis/NetworksApi.md#updatenetwork) | **PATCH** /api/v1/networks/{network_id} | Updates a network's configuration. Currently supports updating RPC URLs only. Can be extended to support other fields. |
| *NotificationsApi* | [**createNotification**](Apis/NotificationsApi.md#createnotification) | **POST** /api/v1/notifications | Creates a new notification. |
*NotificationsApi* | [**deleteNotification**](Apis/NotificationsApi.md#deletenotification) | **DELETE** /api/v1/notifications/{notification_id} | Deletes a notification by ID. |
*NotificationsApi* | [**getNotification**](Apis/NotificationsApi.md#getnotification) | **GET** /api/v1/notifications/{notification_id} | Retrieves details of a specific notification by ID. |
*NotificationsApi* | [**listNotifications**](Apis/NotificationsApi.md#listnotifications) | **GET** /api/v1/notifications | Notification routes implementation |
*NotificationsApi* | [**updateNotification**](Apis/NotificationsApi.md#updatenotification) | **PATCH** /api/v1/notifications/{notification_id} | Updates an existing notification. |
| *PluginsApi* | [**callPlugin**](Apis/PluginsApi.md#callplugin) | **POST** /api/v1/plugins/{plugin_id}/call | Execute a plugin and receive the sanitized result |
| *RelayersApi* | [**buildSponsoredTransaction**](Apis/RelayersApi.md#buildsponsoredtransaction) | **POST** /api/v1/relayers/{relayer_id}/transactions/sponsored/build | Prepares a sponsored (gasless) transaction with fee payments. |
*RelayersApi* | [**cancelTransaction**](Apis/RelayersApi.md#canceltransaction) | **DELETE** /api/v1/relayers/{relayer_id}/transactions/{transaction_id} | Cancels a specific transaction by its ID. |
*RelayersApi* | [**createRelayer**](Apis/RelayersApi.md#createrelayer) | **POST** /api/v1/relayers | Creates a new relayer. |
*RelayersApi* | [**deletePendingTransactions**](Apis/RelayersApi.md#deletependingtransactions) | **DELETE** /api/v1/relayers/{relayer_id}/transactions/pending | Deletes all pending transactions for a specific relayer. |
*RelayersApi* | [**deleteRelayer**](Apis/RelayersApi.md#deleterelayer) | **DELETE** /api/v1/relayers/{relayer_id} | Deletes a relayer by ID. |
*RelayersApi* | [**getRelayer**](Apis/RelayersApi.md#getrelayer) | **GET** /api/v1/relayers/{relayer_id} | Retrieves details of a specific relayer by ID. |
*RelayersApi* | [**getRelayerBalance**](Apis/RelayersApi.md#getrelayerbalance) | **GET** /api/v1/relayers/{relayer_id}/balance | Retrieves the balance of a specific relayer. |
*RelayersApi* | [**getRelayerStatus**](Apis/RelayersApi.md#getrelayerstatus) | **GET** /api/v1/relayers/{relayer_id}/status | Fetches the current status of a specific relayer. |
*RelayersApi* | [**getTransactionById**](Apis/RelayersApi.md#gettransactionbyid) | **GET** /api/v1/relayers/{relayer_id}/transactions/{transaction_id} | Retrieves a specific transaction by its ID. |
*RelayersApi* | [**getTransactionByNonce**](Apis/RelayersApi.md#gettransactionbynonce) | **GET** /api/v1/relayers/{relayer_id}/transactions/by-nonce/{nonce} | Retrieves a transaction by its nonce value. |
*RelayersApi* | [**listRelayers**](Apis/RelayersApi.md#listrelayers) | **GET** /api/v1/relayers | Relayer routes implementation |
*RelayersApi* | [**listTransactions**](Apis/RelayersApi.md#listtransactions) | **GET** /api/v1/relayers/{relayer_id}/transactions/ | Lists all transactions for a specific relayer with pagination. |
*RelayersApi* | [**quoteSponsoredTransaction**](Apis/RelayersApi.md#quotesponsoredtransaction) | **POST** /api/v1/relayers/{relayer_id}/transactions/sponsored/quote | Estimates fees for a sponsored (gasless) transaction. |
*RelayersApi* | [**replaceTransaction**](Apis/RelayersApi.md#replacetransaction) | **PUT** /api/v1/relayers/{relayer_id}/transactions/{transaction_id} | Replaces a specific transaction with a new one. |
*RelayersApi* | [**rpc**](Apis/RelayersApi.md#rpc) | **POST** /api/v1/relayers/{relayer_id}/rpc | Performs a JSON-RPC call using the specified relayer. |
*RelayersApi* | [**sendTransaction**](Apis/RelayersApi.md#sendtransaction) | **POST** /api/v1/relayers/{relayer_id}/transactions | Sends a transaction through the specified relayer. |
*RelayersApi* | [**sign**](Apis/RelayersApi.md#sign) | **POST** /api/v1/relayers/{relayer_id}/sign | Signs data using the specified relayer. |
*RelayersApi* | [**signTransaction**](Apis/RelayersApi.md#signtransaction) | **POST** /api/v1/relayers/{relayer_id}/sign-transaction | Signs a transaction using the specified relayer (Stellar only). |
*RelayersApi* | [**signTypedData**](Apis/RelayersApi.md#signtypeddata) | **POST** /api/v1/relayers/{relayer_id}/sign-typed-data | Signs typed data using the specified relayer. |
*RelayersApi* | [**updateRelayer**](Apis/RelayersApi.md#updaterelayer) | **PATCH** /api/v1/relayers/{relayer_id} | Updates a relayer's information based on the provided update request. |
| *SignersApi* | [**createSigner**](Apis/SignersApi.md#createsigner) | **POST** /api/v1/signers | Creates a new signer. |
*SignersApi* | [**deleteSigner**](Apis/SignersApi.md#deletesigner) | **DELETE** /api/v1/signers/{signer_id} | Deletes a signer by ID. |
*SignersApi* | [**getSigner**](Apis/SignersApi.md#getsigner) | **GET** /api/v1/signers/{signer_id} | Retrieves details of a specific signer by ID. |
*SignersApi* | [**listSigners**](Apis/SignersApi.md#listsigners) | **GET** /api/v1/signers | Signer routes implementation |
*SignersApi* | [**updateSigner**](Apis/SignersApi.md#updatesigner) | **PATCH** /api/v1/signers/{signer_id} | Updates an existing signer. |


<a name="documentation-for-models"></a>
## Documentation for Models

 - [ApiResponse_BalanceResponse](./Models/ApiResponse_BalanceResponse.md)
 - [ApiResponse_BalanceResponse_data](./Models/ApiResponse_BalanceResponse_data.md)
 - [ApiResponse_DeletePendingTransactionsResponse](./Models/ApiResponse_DeletePendingTransactionsResponse.md)
 - [ApiResponse_DeletePendingTransactionsResponse_data](./Models/ApiResponse_DeletePendingTransactionsResponse_data.md)
 - [ApiResponse_NetworkResponse](./Models/ApiResponse_NetworkResponse.md)
 - [ApiResponse_NetworkResponse_data](./Models/ApiResponse_NetworkResponse_data.md)
 - [ApiResponse_NotificationResponse](./Models/ApiResponse_NotificationResponse.md)
 - [ApiResponse_NotificationResponse_data](./Models/ApiResponse_NotificationResponse_data.md)
 - [ApiResponse_PluginHandlerError](./Models/ApiResponse_PluginHandlerError.md)
 - [ApiResponse_PluginHandlerError_data](./Models/ApiResponse_PluginHandlerError_data.md)
 - [ApiResponse_RelayerResponse](./Models/ApiResponse_RelayerResponse.md)
 - [ApiResponse_RelayerResponse_data](./Models/ApiResponse_RelayerResponse_data.md)
 - [ApiResponse_RelayerStatus](./Models/ApiResponse_RelayerStatus.md)
 - [ApiResponse_RelayerStatus_data](./Models/ApiResponse_RelayerStatus_data.md)
 - [ApiResponse_RelayerStatus_data_oneOf](./Models/ApiResponse_RelayerStatus_data_oneOf.md)
 - [ApiResponse_RelayerStatus_data_oneOf_1](./Models/ApiResponse_RelayerStatus_data_oneOf_1.md)
 - [ApiResponse_RelayerStatus_data_oneOf_2](./Models/ApiResponse_RelayerStatus_data_oneOf_2.md)
 - [ApiResponse_SignDataResponse](./Models/ApiResponse_SignDataResponse.md)
 - [ApiResponse_SignDataResponse_data](./Models/ApiResponse_SignDataResponse_data.md)
 - [ApiResponse_SignTransactionResponse](./Models/ApiResponse_SignTransactionResponse.md)
 - [ApiResponse_SignTransactionResponse_data](./Models/ApiResponse_SignTransactionResponse_data.md)
 - [ApiResponse_SignerResponse](./Models/ApiResponse_SignerResponse.md)
 - [ApiResponse_SignerResponse_data](./Models/ApiResponse_SignerResponse_data.md)
 - [ApiResponse_SponsoredTransactionBuildResponse](./Models/ApiResponse_SponsoredTransactionBuildResponse.md)
 - [ApiResponse_SponsoredTransactionBuildResponse_data](./Models/ApiResponse_SponsoredTransactionBuildResponse_data.md)
 - [ApiResponse_SponsoredTransactionQuoteResponse](./Models/ApiResponse_SponsoredTransactionQuoteResponse.md)
 - [ApiResponse_SponsoredTransactionQuoteResponse_data](./Models/ApiResponse_SponsoredTransactionQuoteResponse_data.md)
 - [ApiResponse_String](./Models/ApiResponse_String.md)
 - [ApiResponse_TransactionResponse](./Models/ApiResponse_TransactionResponse.md)
 - [ApiResponse_TransactionResponse_data](./Models/ApiResponse_TransactionResponse_data.md)
 - [ApiResponse_Value](./Models/ApiResponse_Value.md)
 - [ApiResponse_Vec_NetworkResponse](./Models/ApiResponse_Vec_NetworkResponse.md)
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
 - [CdpSignerRequestConfig](./Models/CdpSignerRequestConfig.md)
 - [ContractSource](./Models/ContractSource.md)
 - [ContractSource_oneOf](./Models/ContractSource_oneOf.md)
 - [ContractSource_oneOf_1](./Models/ContractSource_oneOf_1.md)
 - [CreateRelayerPolicyRequest](./Models/CreateRelayerPolicyRequest.md)
 - [CreateRelayerRequest](./Models/CreateRelayerRequest.md)
 - [DeletePendingTransactionsResponse](./Models/DeletePendingTransactionsResponse.md)
 - [DisabledReason](./Models/DisabledReason.md)
 - [DisabledReason_oneOf](./Models/DisabledReason_oneOf.md)
 - [DisabledReason_oneOf_1](./Models/DisabledReason_oneOf_1.md)
 - [DisabledReason_oneOf_2](./Models/DisabledReason_oneOf_2.md)
 - [DisabledReason_oneOf_3](./Models/DisabledReason_oneOf_3.md)
 - [DisabledReason_oneOf_4](./Models/DisabledReason_oneOf_4.md)
 - [EvmPolicyResponse](./Models/EvmPolicyResponse.md)
 - [EvmRpcRequest](./Models/EvmRpcRequest.md)
 - [EvmRpcRequest_oneOf](./Models/EvmRpcRequest_oneOf.md)
 - [EvmRpcResult](./Models/EvmRpcResult.md)
 - [EvmTransactionDataSignature](./Models/EvmTransactionDataSignature.md)
 - [EvmTransactionRequest](./Models/EvmTransactionRequest.md)
 - [EvmTransactionResponse](./Models/EvmTransactionResponse.md)
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
 - [MaskedRpcConfig](./Models/MaskedRpcConfig.md)
 - [MemoSpec](./Models/MemoSpec.md)
 - [MemoSpec_oneOf](./Models/MemoSpec_oneOf.md)
 - [MemoSpec_oneOf_1](./Models/MemoSpec_oneOf_1.md)
 - [MemoSpec_oneOf_2](./Models/MemoSpec_oneOf_2.md)
 - [MemoSpec_oneOf_3](./Models/MemoSpec_oneOf_3.md)
 - [MemoSpec_oneOf_4](./Models/MemoSpec_oneOf_4.md)
 - [NetworkPolicyResponse](./Models/NetworkPolicyResponse.md)
 - [NetworkResponse](./Models/NetworkResponse.md)
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
 - [PluginHandlerError](./Models/PluginHandlerError.md)
 - [PluginMetadata](./Models/PluginMetadata.md)
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
 - [RelayerStellarSwapConfig](./Models/RelayerStellarSwapConfig.md)
 - [RpcConfig](./Models/RpcConfig.md)
 - [RpcUrlEntry](./Models/RpcUrlEntry.md)
 - [SignAndSendTransactionRequestParams](./Models/SignAndSendTransactionRequestParams.md)
 - [SignAndSendTransactionResult](./Models/SignAndSendTransactionResult.md)
 - [SignDataRequest](./Models/SignDataRequest.md)
 - [SignDataResponse](./Models/SignDataResponse.md)
 - [SignDataResponseEvm](./Models/SignDataResponseEvm.md)
 - [SignDataResponseSolana](./Models/SignDataResponseSolana.md)
 - [SignTransactionRequest](./Models/SignTransactionRequest.md)
 - [SignTransactionRequestParams](./Models/SignTransactionRequestParams.md)
 - [SignTransactionRequestSolana](./Models/SignTransactionRequestSolana.md)
 - [SignTransactionRequestStellar](./Models/SignTransactionRequestStellar.md)
 - [SignTransactionResponse](./Models/SignTransactionResponse.md)
 - [SignTransactionResponseSolana](./Models/SignTransactionResponseSolana.md)
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
 - [SignerConfigResponse_oneOf_5](./Models/SignerConfigResponse_oneOf_5.md)
 - [SignerCreateRequest](./Models/SignerCreateRequest.md)
 - [SignerResponse](./Models/SignerResponse.md)
 - [SignerType](./Models/SignerType.md)
 - [SignerTypeRequest](./Models/SignerTypeRequest.md)
 - [SolanaAccountMeta](./Models/SolanaAccountMeta.md)
 - [SolanaAllowedTokensPolicy](./Models/SolanaAllowedTokensPolicy.md)
 - [SolanaAllowedTokensSwapConfig](./Models/SolanaAllowedTokensSwapConfig.md)
 - [SolanaFeeEstimateRequestParams](./Models/SolanaFeeEstimateRequestParams.md)
 - [SolanaFeeEstimateResult](./Models/SolanaFeeEstimateResult.md)
 - [SolanaFeePaymentStrategy](./Models/SolanaFeePaymentStrategy.md)
 - [SolanaInstructionSpec](./Models/SolanaInstructionSpec.md)
 - [SolanaPolicyResponse](./Models/SolanaPolicyResponse.md)
 - [SolanaPrepareTransactionRequestParams](./Models/SolanaPrepareTransactionRequestParams.md)
 - [SolanaPrepareTransactionResult](./Models/SolanaPrepareTransactionResult.md)
 - [SolanaRpcRequest](./Models/SolanaRpcRequest.md)
 - [SolanaRpcRequest_oneOf](./Models/SolanaRpcRequest_oneOf.md)
 - [SolanaRpcRequest_oneOf_1](./Models/SolanaRpcRequest_oneOf_1.md)
 - [SolanaRpcRequest_oneOf_2](./Models/SolanaRpcRequest_oneOf_2.md)
 - [SolanaRpcRequest_oneOf_3](./Models/SolanaRpcRequest_oneOf_3.md)
 - [SolanaRpcRequest_oneOf_4](./Models/SolanaRpcRequest_oneOf_4.md)
 - [SolanaRpcRequest_oneOf_5](./Models/SolanaRpcRequest_oneOf_5.md)
 - [SolanaRpcRequest_oneOf_6](./Models/SolanaRpcRequest_oneOf_6.md)
 - [SolanaRpcRequest_oneOf_7](./Models/SolanaRpcRequest_oneOf_7.md)
 - [SolanaRpcRequest_oneOf_7_params](./Models/SolanaRpcRequest_oneOf_7_params.md)
 - [SolanaRpcResult](./Models/SolanaRpcResult.md)
 - [SolanaRpcResult_oneOf](./Models/SolanaRpcResult_oneOf.md)
 - [SolanaRpcResult_oneOf_1](./Models/SolanaRpcResult_oneOf_1.md)
 - [SolanaRpcResult_oneOf_2](./Models/SolanaRpcResult_oneOf_2.md)
 - [SolanaRpcResult_oneOf_3](./Models/SolanaRpcResult_oneOf_3.md)
 - [SolanaRpcResult_oneOf_4](./Models/SolanaRpcResult_oneOf_4.md)
 - [SolanaRpcResult_oneOf_5](./Models/SolanaRpcResult_oneOf_5.md)
 - [SolanaRpcResult_oneOf_6](./Models/SolanaRpcResult_oneOf_6.md)
 - [SolanaRpcResult_oneOf_7](./Models/SolanaRpcResult_oneOf_7.md)
 - [SolanaSwapStrategy](./Models/SolanaSwapStrategy.md)
 - [SolanaTransactionRequest](./Models/SolanaTransactionRequest.md)
 - [SolanaTransactionResponse](./Models/SolanaTransactionResponse.md)
 - [Speed](./Models/Speed.md)
 - [SponsoredTransactionBuildRequest](./Models/SponsoredTransactionBuildRequest.md)
 - [SponsoredTransactionBuildResponse](./Models/SponsoredTransactionBuildResponse.md)
 - [SponsoredTransactionQuoteRequest](./Models/SponsoredTransactionQuoteRequest.md)
 - [SponsoredTransactionQuoteResponse](./Models/SponsoredTransactionQuoteResponse.md)
 - [StellarAllowedTokensPolicy](./Models/StellarAllowedTokensPolicy.md)
 - [StellarAllowedTokensSwapConfig](./Models/StellarAllowedTokensSwapConfig.md)
 - [StellarFeeEstimateRequestParams](./Models/StellarFeeEstimateRequestParams.md)
 - [StellarFeeEstimateResult](./Models/StellarFeeEstimateResult.md)
 - [StellarFeePaymentStrategy](./Models/StellarFeePaymentStrategy.md)
 - [StellarPolicyResponse](./Models/StellarPolicyResponse.md)
 - [StellarPrepareTransactionRequestParams](./Models/StellarPrepareTransactionRequestParams.md)
 - [StellarPrepareTransactionResult](./Models/StellarPrepareTransactionResult.md)
 - [StellarRpcRequest](./Models/StellarRpcRequest.md)
 - [StellarRpcRequest_oneOf](./Models/StellarRpcRequest_oneOf.md)
 - [StellarRpcResult](./Models/StellarRpcResult.md)
 - [StellarSwapStrategy](./Models/StellarSwapStrategy.md)
 - [StellarTokenKind](./Models/StellarTokenKind.md)
 - [StellarTokenKind_oneOf](./Models/StellarTokenKind_oneOf.md)
 - [StellarTokenKind_oneOf_1](./Models/StellarTokenKind_oneOf_1.md)
 - [StellarTokenKind_oneOf_1_contract](./Models/StellarTokenKind_oneOf_1_contract.md)
 - [StellarTokenKind_oneOf_classic](./Models/StellarTokenKind_oneOf_classic.md)
 - [StellarTokenMetadata](./Models/StellarTokenMetadata.md)
 - [StellarTransactionRequest](./Models/StellarTransactionRequest.md)
 - [StellarTransactionResponse](./Models/StellarTransactionResponse.md)
 - [TransactionResponse](./Models/TransactionResponse.md)
 - [TransactionStatus](./Models/TransactionStatus.md)
 - [TransferTransactionRequestParams](./Models/TransferTransactionRequestParams.md)
 - [TransferTransactionResult](./Models/TransferTransactionResult.md)
 - [TurnkeySignerRequestConfig](./Models/TurnkeySignerRequestConfig.md)
 - [UpdateNetworkRequest](./Models/UpdateNetworkRequest.md)
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

