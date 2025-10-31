# NetworkTransactionRequest

## Properties

| Name                         | Type                         | Description                                                                                             | Notes                        |
| ---------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------- | ---------------------------- |
| **data**                     | **String**                   |                                                                                                         | [optional] [default to null] |
| **gas_limit**                | **Long**                     |                                                                                                         | [optional] [default to null] |
| **gas_price**                | **Integer**                  |                                                                                                         | [optional] [default to null] |
| **max_fee_per_gas**          | **Integer**                  |                                                                                                         | [optional] [default to null] |
| **max_priority_fee_per_gas** | **Integer**                  |                                                                                                         | [optional] [default to null] |
| **speed**                    | [**Speed**](Speed.md)        |                                                                                                         | [optional] [default to null] |
| **to**                       | **String**                   |                                                                                                         | [optional] [default to null] |
| **valid_until**              | **String**                   |                                                                                                         | [optional] [default to null] |
| **value**                    | **Integer**                  |                                                                                                         | [default to null]            |
| **transaction**              | **String**                   |                                                                                                         | [default to null]            |
| **fee_bump**                 | **Boolean**                  | Explicitly request fee-bump wrapper Only valid when transaction_xdr contains a signed transaction       | [optional] [default to null] |
| **max_fee**                  | **Long**                     | Maximum fee in stroops (defaults to 0.1 XLM &#x3D; 1,000,000 stroops)                                   | [optional] [default to null] |
| **memo**                     | [**MemoSpec**](MemoSpec.md)  |                                                                                                         | [optional] [default to null] |
| **network**                  | **String**                   |                                                                                                         | [default to null]            |
| **operations**               | [**List**](OperationSpec.md) |                                                                                                         | [optional] [default to null] |
| **source_account**           | **String**                   |                                                                                                         | [optional] [default to null] |
| **transaction_xdr**          | **String**                   | Pre-built transaction XDR (base64 encoded, signed or unsigned) Mutually exclusive with operations field | [optional] [default to null] |

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
