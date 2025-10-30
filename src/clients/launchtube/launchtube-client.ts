import axios, { AxiosInstance } from 'axios';
import { BaseLaunchtubeClient } from './base-launchtube';
import type { LaunchtubeClientConfig } from './types';

/**
 * Direct HTTP client for the Launchtube managed service
 *
 * This client sends requests directly to the Launchtube service.
 * For connecting to an OpenZeppelin Relayer, see LaunchtubeRelayerClient.
 *
 */
export class LaunchtubeClient extends BaseLaunchtubeClient {
  private axios: AxiosInstance;

  constructor(config: LaunchtubeClientConfig) {
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
   * Send a raw call to the Launchtube service via direct HTTP
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
