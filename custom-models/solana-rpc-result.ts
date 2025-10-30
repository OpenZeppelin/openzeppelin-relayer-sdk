// This file is a workaround to generate the desired output.
// Workaround for https://github.com/OpenAPITools/openapi-generator/issues/13417

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - Import path doesn't exist in custom-models, only in generated src/models
import type { FeeEstimateResult } from './fee-estimate-result';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - Import path doesn't exist in custom-models, only in generated src/models
import type { GetFeaturesEnabledResult } from './get-features-enabled-result';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - Import path doesn't exist in custom-models, only in generated src/models
import type { GetSupportedTokensResult } from './get-supported-tokens-result';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - Import path doesn't exist in custom-models, only in generated src/models
import type { PrepareTransactionResult } from './prepare-transaction-result';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - Import path doesn't exist in custom-models, only in generated src/models
import type { SignAndSendTransactionResult } from './sign-and-send-transaction-result';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - Import path doesn't exist in custom-models, only in generated src/models
import type { SignTransactionResult } from './sign-transaction-result';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - Import path doesn't exist in custom-models, only in generated src/models
import type { TransferTransactionResult } from './transfer-transaction-result';

type TransferTransactionResultWithMethod = TransferTransactionResult & {
  method: 'transferTransaction';
};

type FeeEstimateResultWithMethod = FeeEstimateResult & {
  method: 'feeEstimate';
};

type GetFeaturesEnabledResultWithMethod = GetFeaturesEnabledResult & {
  method: 'getFeaturesEnabled';
};

type PrepareTransactionResultWithMethod = PrepareTransactionResult & {
  method: 'prepareTransaction';
};

type GetSupportedTokensResultWithMethod = GetSupportedTokensResult & {
  method: 'getSupportedTokens';
};

type SignAndSendTransactionResultWithMethod = SignAndSendTransactionResult & {
  method: 'signAndSendTransaction';
};

type SignTransactionResultWithMethod = SignTransactionResult & {
  method: 'signTransaction';
};

/**
 * @type SolanaRpcResult
 * @export
 */
export type SolanaRpcResult =
  | FeeEstimateResultWithMethod
  | GetFeaturesEnabledResultWithMethod
  | GetSupportedTokensResultWithMethod
  | PrepareTransactionResultWithMethod
  | SignAndSendTransactionResultWithMethod
  | SignTransactionResultWithMethod
  | TransferTransactionResultWithMethod;
