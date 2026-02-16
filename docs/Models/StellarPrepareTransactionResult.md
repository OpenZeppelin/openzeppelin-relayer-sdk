# StellarPrepareTransactionResult
## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
| **fee\_in\_stroops** | **String** | Fee amount in stroops (as string) | [default to null] |
| **fee\_in\_token** | **String** | Fee amount in token (raw units as string) | [default to null] |
| **fee\_in\_token\_ui** | **String** | Fee amount in token (decimal UI representation as string) | [default to null] |
| **fee\_token** | **String** | Asset identifier for fee token | [default to null] |
| **max\_fee\_in\_token** | **String** | Maximum fee in token amount (raw units as string). Only present for Soroban gas abstraction - includes slippage buffer. | [optional] [default to null] |
| **max\_fee\_in\_token\_ui** | **String** | Maximum fee in token amount (decimal UI representation as string). Only present for Soroban gas abstraction - includes slippage buffer. | [optional] [default to null] |
| **transaction** | **String** | Extended transaction XDR (base64 encoded) | [default to null] |
| **user\_auth\_entry** | **String** | User authorization entry XDR (base64 encoded). Present for Soroban gas abstraction - user must sign this auth entry. | [optional] [default to null] |
| **valid\_until** | **String** | Transaction validity timestamp (ISO 8601 format) | [default to null] |

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

