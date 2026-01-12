# NetworkResponse
## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
| **average\_blocktime\_ms** | **Long** | Estimated average time between blocks in milliseconds | [optional] [default to null] |
| **chain\_id** | **Long** | EVM-specific: Chain ID | [optional] [default to null] |
| **explorer\_urls** | **List** | List of Explorer endpoint URLs | [optional] [default to null] |
| **features** | **List** | EVM-specific: Network features (e.g., \&quot;eip1559\&quot;) | [optional] [default to null] |
| **horizon\_url** | **String** | Stellar-specific: Horizon URL | [optional] [default to null] |
| **id** | **String** | Unique identifier composed of network_type and name, e.g., \&quot;evm:mainnet\&quot; | [default to null] |
| **is\_testnet** | **Boolean** | Flag indicating if the network is a testnet | [optional] [default to null] |
| **name** | **String** | Name of the network (e.g., \&quot;mainnet\&quot;, \&quot;sepolia\&quot;) | [default to null] |
| **network\_type** | [**RelayerNetworkType**](RelayerNetworkType.md) | Type of the network (EVM, Solana, Stellar) | [default to null] |
| **passphrase** | **String** | Stellar-specific: Network passphrase | [optional] [default to null] |
| **required\_confirmations** | **Long** | EVM-specific: Required confirmations | [optional] [default to null] |
| **rpc\_urls** | [**List**](RpcConfig.md) | List of RPC endpoint configurations | [optional] [default to null] |
| **symbol** | **String** | EVM-specific: Native token symbol | [optional] [default to null] |
| **tags** | **List** | List of arbitrary tags for categorizing or filtering networks | [optional] [default to null] |

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

