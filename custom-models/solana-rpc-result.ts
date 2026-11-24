// This file is a workaround to generate the desired output.
// Workaround for https://github.com/OpenAPITools/openapi-generator/issues/13417

// May contain unused imports in some cases
// @ts-expect-error openapi generator may skip this model depending on spec variant
import type { FeeEstimateResult } from './fee-estimate-result';
import type { GetFeaturesEnabledResult } from './get-features-enabled-result';
import type { GetSupportedTokensResult } from './get-supported-tokens-result';
// May contain unused imports in some cases
// @ts-expect-error openapi generator may skip this model depending on spec variant
import type { PrepareTransactionResult } from './prepare-transaction-result';
import type { SignAndSendTransactionResult } from './sign-and-send-transaction-result';
import type { SignTransactionResult } from './sign-transaction-result';
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
