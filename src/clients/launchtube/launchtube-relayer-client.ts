import { PluginsApi } from '../../apis/plugins-api';
import { Configuration } from '../../configuration';
import { BaseLaunchtubeClient } from './base-launchtube';
import type { LaunchtubeRelayerClientConfig } from './types';

/**
 * A Launchtube client that connects to an OpenZeppelin Relayer plugin.
 *
 * Instead of connecting directly to the Launchtube service, this client
 * routes requests through to an OpenZeppelin Relayer plugin.
 *
 * For a direct HTTP connection to the Launchtube service, see LaunchtubeClient.
 *
 */
export class LaunchtubeRelayerClient extends BaseLaunchtubeClient {
  private pluginsApi: PluginsApi;
  private pluginId: string;

  constructor(config: LaunchtubeRelayerClientConfig) {
    super(config.adminSecret);

    this.pluginId = config.pluginId;

    // Build Configuration for PluginsApi
    const relayerConfig = new Configuration({
      basePath: config.baseUrl,
      accessToken: config.apiKey,
    });

    this.pluginsApi = new PluginsApi(relayerConfig);
  }

  /**
   * Send a raw call to the Launchtube service via relayer plugin
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
