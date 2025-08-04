/* tslint:disable */

/**
 * Custom type definitions for Stellar Transaction Requests.
 * Out of the box generation does not produce the desired output.
 * This file is a workaround to generate the desired output.
 */

// Stellar Contract Value (ScVal) types for contract arguments
export type ScVal =
  | { u64: string } // Unsigned 64-bit integer (can be string for large numbers)
  | { i64: string } // Signed 64-bit integer (can be string for large numbers)
  | { u128: { hi: string; lo: string } } // Unsigned 128-bit integer (as high/low parts)
  | { i128: { hi: string; lo: string } } // Signed 128-bit integer (as high/low parts)
  | { i256: { hi_hi: string; hi_lo: string; lo_hi: string; lo_lo: string } } // Signed 256-bit integer (as high/low parts)
  | { u256: { hi_hi: string; hi_lo: string; lo_hi: string; lo_lo: string } } // Unsigned 256-bit integer (as high/low parts)
  | { u32: number } // Unsigned 32-bit integer
  | { i32: number } // Signed 32-bit integer
  | { bool: boolean } // Boolean value
  | { string: string } // UTF-8 string
  | { symbol: string } // Symbol (used for function names and identifiers)
  | { address: string } // Stellar account or contract address
  | { bytes: string } // Hex-encoded byte array
  | { vec: ScVal[] } // Array of ScVal values (recursive)
  | { map: Array<{ key: ScVal; val: ScVal }> }; // Key-value pairs of ScVal values (recursive)

// Asset types
export type StellarAssetSpec =
  | { type: 'native' }
  | { type: 'credit_alphanum4'; code: string; issuer: string }
  | { type: 'credit_alphanum12'; code: string; issuer: string };

// Authorization types for Soroban operations
export type StellarAuthSpec =
  | { type: 'none' } // No authorization required
  | { type: 'source_account' } // Use transaction source account
  | { type: 'addresses'; signers: string[] } // Use specific addresses
  | { type: 'xdr'; entries: string[] }; // Advanced: base64-encoded XDR entries

// Memo types
export type StellarMemoSpec =
  | { type: 'none' }
  | { type: 'text'; value: string }
  | { type: 'id'; value: string }
  | { type: 'hash'; value: string }
  | { type: 'return'; value: string };

// Contract source for creation
export type StellarContractSource =
  | { from: 'address'; address: string } // Deploy from a Stellar account
  | { from: 'contract'; contract: string }; // Deploy from an existing contract (factory pattern)

// WASM source for upload
export type StellarWasmSource = { type: 'hex'; hex: string } | { type: 'base64'; base64: string };

// Operation types - flattened structure
export type StellarOperationSpec =
  | {
      type: 'payment';
      destination: string;
      amount: number;
      asset: StellarAssetSpec;
    }
  | {
      type: 'invoke_contract';
      contract_address: string;
      function_name: string;
      args: ScVal[];
      auth?: StellarAuthSpec;
    }
  | {
      type: 'create_contract';
      source: StellarContractSource;
      wasm_hash: string;
      salt?: string;
      constructor_args?: ScVal[];
      auth?: StellarAuthSpec;
    }
  | {
      type: 'upload_wasm';
      wasm: StellarWasmSource;
      auth?: StellarAuthSpec;
    };

// Main transaction request type
export interface StellarTransactionRequest {
  network: string;
  source_account?: string;
  operations?: StellarOperationSpec[];
  transaction_xdr?: string;
  fee_bump?: boolean;
  max_fee?: number;
  memo?: StellarMemoSpec;
  valid_until?: string;
}
