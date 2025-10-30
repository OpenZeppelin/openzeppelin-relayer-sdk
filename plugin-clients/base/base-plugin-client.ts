import { LogEntry } from '../../src/models';
import { PluginUnexpectedError, PluginExecutionError, PluginTransportError } from './errors';
import axios from 'axios';

/**
 * Abstract base class for plugin clients that handles payload wrapping,
 * response parsing, and error management for both direct HTTP and relayer communication.
 *
 * Subclasses must implement `sendCall()` to define their transport mechanism.
 */
export abstract class BasePluginClient {
  /**
   * Send a raw call to the plugin service.
   * Must be implemented by subclasses (direct HTTP or via relayer).
   *
   * @param payload The complete payload (already wrapped in {params})
   * @returns Raw response from the service/relayer
   */
  protected abstract sendCall(payload: { params: unknown }): Promise<any>;

  /**
   * Make a plugin call with automatic payload wrapping and response parsing
   *
   * @param params Request parameters
   * @returns Parsed response data with optional metadata
   * @throws Error if the request fails
   */
  protected async call<T>(params: unknown): Promise<T> {
    const payload = { params };
    let responseBody: any; // eslint-disable-next-line @typescript-eslint/no-explicit-any

    try {
      responseBody = await this.sendCall(payload);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response?.data) {
        responseBody = error.response.data; // Treat error response body as the body to inspect
      } else if (axios.isAxiosError(error)) {
        // Network or other transport error without a response body
        throw new PluginTransportError(`Network error: ${error.message}`, error.response?.status, error);
      } else {
        throw new PluginUnexpectedError(`Unexpected error: ${error?.message || String(error)}`, error);
      }
    }

    if (!responseBody) {
      throw new PluginUnexpectedError('Empty response from plugin');
    }

    if (responseBody.success === false) {
      throw new PluginExecutionError(responseBody.error || 'Plugin execution failed', responseBody.data);
    }

    // Handle relayer success response
    if (responseBody.success === true && responseBody.data) {
      const result = responseBody.data;

      // Merge with metadata
      if (responseBody.metadata && (responseBody.metadata.logs || responseBody.metadata.traces)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const metadata: { logs?: LogEntry[]; traces?: any[] } = {};
        if (responseBody.metadata.logs) metadata.logs = responseBody.metadata.logs;
        if (responseBody.metadata.traces) metadata.traces = responseBody.metadata.traces;
        return { ...result, metadata } as T;
      }
      return result as T;
    }

    // If none of the above, the response is malformed
    throw new PluginUnexpectedError('Malformed response: unexpected structure');
  }
}
