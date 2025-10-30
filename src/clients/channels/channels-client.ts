import axios, { AxiosInstance } from 'axios';
import { BaseChannelsClient } from './base-channels';
import type { ChannelsClientConfig } from './types';

/**
 * Direct HTTP client for the Channels service
 *
 * Connects directly to a channels service instance via HTTP/HTTPS.
 * For use with OpenZeppelin Relayer, see ChannelsRelayerClient.
 *
 * @example
 * ```typescript
 * const client = new ChannelsClient({
 *   baseUrl: 'https://channels.example.com',
 *   apiKey: 'your-api-key',
 *   adminSecret: 'your-admin-secret', // Optional: for management
 * });
 *
 * // Submit a signed transaction
 * const result = await client.submitTransaction({ xdr: '...' });
 * ```
 */
export class ChannelsClient extends BaseChannelsClient {
  private axios: AxiosInstance;

  constructor(config: ChannelsClientConfig) {
    super(config.adminSecret);

    this.axios = axios.create({
      baseURL: config.baseUrl,
      timeout: config.timeout || 30000,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`,
      },
    });
  }

  /**
   * Send a raw call to the Channels service via direct HTTP
   *
   * @param payload The payload (already wrapped in {params} by BasePluginClient)
   * @returns Raw response from the service (if HTTP 2xx) or throws the raw error
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected async sendCall(payload: { params: unknown }): Promise<any> {
    const response = await this.axios.post('/', payload);
    return response.data;
  }
}
