import { BasePluginClient } from '../base';
import type {
  ChannelsXdrRequest,
  ChannelsFuncAuthRequest,
  ChannelsTransactionResponse,
  ListChannelAccountsResponse,
  SetChannelAccountsResponse,
} from './types';

/**
 * Base class for Channels clients with shared business logic
 *
 * Provides methods for transaction submission and channel management
 * that work identically in both direct and relayer modes.
 */
export abstract class BaseChannelsClient extends BasePluginClient {
  protected adminSecret?: string;

  constructor(adminSecret?: string) {
    super();
    this.adminSecret = adminSecret;
  }

  /**
   * Submit a signed transaction through channel accounts with automatic fee bumping
   *
   * @param request Transaction request with signed XDR
   * @returns Transaction result with ID, hash, and status
   */
  async submitTransaction(request: ChannelsXdrRequest): Promise<ChannelsTransactionResponse> {
    return this.call<ChannelsTransactionResponse>(request);
  }

  /**
   * Submit a Soroban transaction using function and authorization entries
   *
   * Automatically acquires a channel account, simulates the transaction,
   * signs it, and submits with fee bumping.
   *
   * @param request Transaction request with func and auth
   * @returns Transaction result with ID, hash, and status
   */
  async submitSorobanTransaction(request: ChannelsFuncAuthRequest): Promise<ChannelsTransactionResponse> {
    return this.call<ChannelsTransactionResponse>(request);
  }

  /**
   * List currently configured channel accounts
   *
   * @returns List of channel account relayer IDs
   * @throws Error if adminSecret not provided
   */
  async listChannelAccounts(): Promise<ListChannelAccountsResponse> {
    if (!this.adminSecret) {
      throw new Error('adminSecret required for management operations. Provide it in client config.');
    }

    return this.call<ListChannelAccountsResponse>({
      management: {
        action: 'listChannelAccounts',
        adminSecret: this.adminSecret,
      },
    });
  }

  /**
   * Configure channel accounts for parallel transaction submission
   *
   * @param relayerIds Array of relayer IDs to use as channel accounts
   * @returns Confirmation with applied relayer IDs
   * @throws Error if adminSecret not provided
   * @throws PluginExecutionError with code LOCKED_CONFLICT if trying to remove locked accounts
   */
  async setChannelAccounts(relayerIds: string[]): Promise<SetChannelAccountsResponse> {
    if (!this.adminSecret) {
      throw new Error('adminSecret required for management operations. Provide it in client config.');
    }

    return this.call<SetChannelAccountsResponse>({
      management: {
        action: 'setChannelAccounts',
        adminSecret: this.adminSecret,
        relayerIds,
      },
    });
  }
}
