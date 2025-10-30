import { PluginsApi } from '../../src/apis/plugins-api';
import { Configuration } from '../../src/configuration';
import { BaseChannelsClient } from './base-channels';
import type { ChannelsRelayerClientConfig } from './types';

/**
 * Relayer plugin client for Channels
 *
 * Routes requests through the OpenZeppelin Relayer plugin system.
 * For direct HTTP connection, see ChannelsClient.
 *
 * @example
 * ```typescript
 * const client = new ChannelsRelayerClient({
 *   apiKey: 'your-relayer-api-key',
 *   pluginId: 'channels',
 *   baseUrl: 'http://localhost:8080',
 *   adminSecret: 'your-admin-secret', // Optional: for management
 * });
 *
 * // Submit a Soroban transaction
 * const result = await client.submitSorobanTransaction({
 *   func: 'base64-host-function',
 *   auth: ['base64-auth-entry-1', 'base64-auth-entry-2'],
 * });
 * ```
 */
export class ChannelsRelayerClient extends BaseChannelsClient {
  private pluginsApi: PluginsApi;
  private pluginId: string;

  constructor(config: ChannelsRelayerClientConfig) {
    super(config.adminSecret);

    this.pluginId = config.pluginId;

    const relayerConfig = new Configuration({
      basePath: config.baseUrl,
      accessToken: config.apiKey,
    });

    this.pluginsApi = new PluginsApi(relayerConfig);
  }

  /**
   * Send a raw call to Channels via OpenZeppelin Relayer
   *
   * @param payload The payload (already wrapped in {params} by BasePluginClient)
   * @returns Raw response from the relayer
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected async sendCall(payload: { params: unknown }): Promise<any> {
    const response = await this.pluginsApi.callPlugin(this.pluginId, payload);
    return response.data;
  }
}
