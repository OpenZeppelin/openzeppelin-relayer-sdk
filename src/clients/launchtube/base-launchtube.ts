import { BasePluginClient } from '../base';
import type {
  LaunchtubeTransactionRequest,
  LaunchtubeTransactionResponse,
  ListSequenceAccountsResponse,
  SetSequenceAccountsResponse,
} from './types';

/**
 * Base class for Launchtube clients with shared business logic
 *
 * Extends BasePluginClient to get payload wrapping and response parsing.
 * Implements Launchtube-specific methods (sendTransaction, management, etc.)
 */
export abstract class BaseLaunchtubeClient extends BasePluginClient {
  protected adminSecret?: string;

  constructor(adminSecret?: string) {
    super();
    this.adminSecret = adminSecret;
  }

  /**
   * Send a transaction to the Launchtube service
   *
   * @param request Transaction request (xdr OR func+auth, plus sim flag)
   * @returns Transaction result with ID and hash
   */
  async sendTransaction(request: LaunchtubeTransactionRequest): Promise<LaunchtubeTransactionResponse> {
    return this.call<LaunchtubeTransactionResponse>(request);
  }

  /**
   * List currently configured sequence accounts
   *
   * @returns List of sequence account relayer IDs
   * @throws Error if adminSecret not provided
   */
  async listSequenceAccounts(): Promise<ListSequenceAccountsResponse> {
    if (!this.adminSecret) {
      throw new Error('adminSecret required for management operations. Provide it in client config.');
    }

    return this.call<ListSequenceAccountsResponse>({
      management: {
        action: 'listSequenceAccounts',
        adminSecret: this.adminSecret,
      },
    });
  }

  /**
   * Configure sequence accounts for the Launchtube service
   *
   * @param relayerIds Array of relayer IDs to use as sequence accounts
   * @returns Confirmation with applied relayer IDs
   * @throws Error if adminSecret not provided
   */
  async setSequenceAccounts(relayerIds: string[]): Promise<SetSequenceAccountsResponse> {
    if (!this.adminSecret) {
      throw new Error('adminSecret required for management operations. Provide it in client config.');
    }

    return this.call<SetSequenceAccountsResponse>({
      management: {
        action: 'setSequenceAccounts',
        adminSecret: this.adminSecret,
        relayerIds,
      },
    });
  }
}
