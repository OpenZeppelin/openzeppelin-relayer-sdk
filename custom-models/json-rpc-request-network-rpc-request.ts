/* tslint:disable */
/* eslint-disable */
/**
 * Custom type definitions for JSON-RPC requests.
 * Out of the box generation does not produce the desired output.
 * This file is a workaround to generate the desired output.
 */
export type JsonRpcRequestNetworkRpcRequest = {
  jsonrpc: string;
  id: number;
} & (SolanaRpcRequest | StellarRpcRequest | EvmRpcRequest);

type SolanaRpcRequest =
  | {
      method: "feeEstimate";
      params: FeeEstimateRequestParams;
    }
  | {
      method: "transferTransaction";
      params: TransferTransactionRequestParams;
    }
  | {
      method: "prepareTransaction";
      params: PrepareTransactionRequestParams;
    }
  | {
      method: "signTransaction";
      params: SignTransactionRequestParams;
    }
  | {
      method: "signAndSendTransaction";
      params: SignAndSendTransactionRequestParams;
    }
  | {
      method: "getSupportedTokens";
      params: GetSupportedTokensRequestParams;
    }
  | {
      method: "getFeaturesEnabled";
      params: GetFeaturesEnabledRequestParams;
    };

type StellarRpcRequest = {
  method: "GenericRpcRequest";
  params: string;
};

type EvmRpcRequest = {
  method: "GenericRpcRequest";
  params: string;
};

type FeeEstimateRequestParams = {
  transaction: string;
  fee_token: string;
};

type TransferTransactionRequestParams = {
  amount: number;
  token: string;
  source: string;
  destination: string;
};

type PrepareTransactionRequestParams = {
  transaction: string;
  fee_token: string;
};

type SignTransactionRequestParams = {
  transaction: string;
};

type SignAndSendTransactionRequestParams = {
  transaction: string;
};

type GetSupportedTokensRequestParams = Record<string, never>;

type GetFeaturesEnabledRequestParams = Record<string, never>;
