/**
 * Custom model for Azure Key Vault signer requests.
 *
 * OpenAPI Generator drops `string | null` on these fields and emits `| Null`
 * for the auth union. This file is copied over the generated model by
 * scripts/post-generate.js.
 */

import type { AzureKeyVaultSignerRequestConfigAuthType } from './azure-key-vault-signer-request-config-auth-type';

/**
 * Azure Key Vault signer configuration for API requests.
 * Matches the OpenAPI schema: explicit nulls are valid on the optional credentials.
 */
export interface AzureKeyVaultSignerRequestConfig {
  auth_type?: AzureKeyVaultSignerRequestConfigAuthType;
  client_id?: string | null;
  client_secret?: string | null;
  federated_token_file?: string | null;
  key_name: string;
  key_version?: string;
  tenant_id?: string | null;
  vault_url: string;
}
