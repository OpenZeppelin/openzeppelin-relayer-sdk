// This file is a workaround to generate the desired output.
// Workaround for https://github.com/OpenAPITools/openapi-generator/issues/13417

// @ts-expect-error - May contain unused imports in some cases
import type { FeeEstimateResult } from './fee-estimate-result';
// @ts-expect-error - May contain unused imports in some cases
import type { GetFeaturesEnabledResult } from './get-features-enabled-result';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { GetSupportedTokensItem } from './get-supported-tokens-item';
// @ts-expect-error - May contain unused imports in some cases
import type { GetSupportedTokensResult } from './get-supported-tokens-result';
// @ts-expect-error - May contain unused imports in some cases
import type { PrepareTransactionResult } from './prepare-transaction-result';
// @ts-expect-error - May contain unused imports in some cases
import type { SignAndSendTransactionResult } from './sign-and-send-transaction-result';
// @ts-expect-error - May contain unused imports in some cases
import type { SignTransactionResult } from './sign-transaction-result';
// @ts-expect-error - May contain unused imports in some cases
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
