# Plugin Client Development Guide

This guide explains the architecture and patterns for creating new plugin clients in the OpenZeppelin Relayer SDK.

## Table of Contents

- [Architecture](#architecture)
- [Creating a New Plugin Client](#creating-a-new-plugin-client)

---

## Architecture

The plugin client architecture uses a three-tier inheritance hierarchy that separates concerns and maximizes code reuse.

### Class Hierarchy

```
BasePluginClient (abstract)
    ↓ Provides: payload wrapping, response parsing, error management

BaseLaunchtubeClient (abstract, service-specific)
    ↓ Implements: business methods (sendTransaction, listSequenceAccounts, etc.)

LaunchtubeClient / LaunchtubeRelayerClient (concrete)
    ↓ Implements: transport mechanism (direct HTTP or relayer plugin)
```

### Design Patterns

#### 1. Strategy Pattern (Transport Abstraction)

The abstract `sendCall()` method implements the Strategy pattern, allowing different transport implementations:

```typescript
// Base class defines the interface
abstract class BasePluginClient {
  protected abstract sendCall(payload: { params: unknown }): Promise<any>;
}

// Direct HTTP implementation
class LaunchtubeClient extends BaseLaunchtubeClient {
  protected async sendCall(payload: { params: unknown }): Promise<any> {
    return await this.axios.post('/api/v1/plugins/launchtube-plugin/call', payload);
  }
}

// Relayer implementation
class LaunchtubeRelayerClient extends BaseLaunchtubeClient {
  protected async sendCall(payload: { params: unknown }): Promise<any> {
    return await this.pluginsApi.callPlugin(this.pluginId, payload);
  }
}
```

#### 2. Template Method Pattern (Request/Response Handling)

The `call()` method in `BasePluginClient` implements the Template Method pattern to ensure consistent behavior:

```typescript
protected async call<T>(params: unknown): Promise<T> {
  // 1. Wrap payload in standard format
  const payload = { params };

  // 2. Send via transport (implemented by subclass)
  const responseBody = await this.sendCall(payload);

  // 3. Parse and validate response structure
  // 4. Extract metadata (logs, traces)
  // 5. Handle errors uniformly
  // 6. Return typed result
}
```

### Error Hierarchy

All plugin clients use a consistent error hierarchy for precise error handling:

```typescript
PluginError (abstract base)
├── PluginTransportError    // Network/HTTP failures (503, 504, connection errors)
├── PluginExecutionError    // Plugin rejected request (validation, business rules)
└── PluginUnexpectedError   // Client-side issues (parsing, configuration)
```

Each error includes:

- `message`: Human-readable error description
- `category`: Error classification for routing
- `statusCode?`: HTTP status code (for transport errors)
- `errorDetails?`: Additional context from plugin

---

## Creating a New Plugin Client

Follow this streamlined process to create a plugin client:

### 1. Define Types

```typescript
// types.ts
export interface MyPluginClientConfig {
  baseUrl: string;
  apiKey: string;
}

export interface MyPluginRelayerClientConfig {
  apiKey: string;
  pluginId: string;
  baseUrl?: string; // Defaults to OpenZeppelin Relayer
}

export interface MyPluginRequest {
  action: string;
  data: any;
}

export interface MyPluginResponse {
  result: string;
  metadata?: { logs?: LogEntry[]; traces?: any[] };
}
```

### 2. Create Base Class with Business Logic

```typescript
// base-my-plugin.ts
export abstract class BaseMyPluginClient extends BasePluginClient {
  async executeOperation(request: MyPluginRequest): Promise<MyPluginResponse> {
    return this.call<MyPluginResponse>(request);
  }

  async getStatus(): Promise<{ status: string }> {
    return this.call<{ status: string }>({ action: 'status' });
  }
}
```

### 3. Implement Transport Classes

```typescript
// my-plugin-client.ts (Direct HTTP)
export class MyPluginClient extends BaseMyPluginClient {
  private axios: AxiosInstance;

  constructor(config: MyPluginClientConfig) {
    super();
    this.axios = axios.create({
      baseURL: config.baseUrl,
      headers: { Authorization: `Bearer ${config.apiKey}` },
    });
  }

  protected async sendCall(payload: { params: unknown }): Promise<any> {
    const response = await this.axios.post('/', payload);
    return response.data;
  }
}

// my-plugin-relayer-client.ts (Relayer)
export class MyPluginRelayerClient extends BaseMyPluginClient {
  private pluginsApi: PluginsApi;
  private pluginId: string;

  constructor(config: MyPluginRelayerClientConfig) {
    super();
    this.pluginId = config.pluginId;
    this.pluginsApi = new PluginsApi(
      new Configuration({
        basePath: config.baseUrl,
        apiKey: config.apiKey,
      }),
    );
  }

  protected async sendCall(payload: { params: unknown }): Promise<any> {
    const response = await this.pluginsApi.callPlugin(this.pluginId, payload);
    return response.data;
  }
}
```

### 4. Export Public API

```typescript
// index.ts
export * from './my-plugin-client';
export * from './my-plugin-relayer-client';
export * from './types';
```

---

## Examples

For usage examples, see:

- [Launchtube Client](../examples/clients/README.md#using-launchtube-client)
- [Channels Client](../examples/clients/README.md#using-channels-client)
