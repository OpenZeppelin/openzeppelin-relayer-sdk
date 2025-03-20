# OpenZeppelin Relayer SDK

The OpenZeppelin Relayer SDK provides a TypeScript/JavaScript client for interacting with the OpenZeppelin Relayer service. This SDK allows developers to easily integrate relayer functionality into their applications for various blockchain networks.

## Installation

```bash
npm install @openzeppelin/relayer-sdk
# or
yarn add @openzeppelin/relayer-sdk
# or
pnpm add @openzeppelin/relayer-sdk
```

## Features

- Easy integration with OpenZeppelin Relayer services
- Support for multiple blockchain networks (EVM, Solana)
- TypeScript typings for better development experience
- Built-in configuration management

## Usage Examples

The SDK includes various examples demonstrating how to interact with relayers:

### EVM Networks
See the [examples/evm](examples/evm) directory for EVM-specific examples.

### Solana
See the [examples/solana](examples/solana) directory for Solana-specific examples.

### Common Operations

#### Get Relayer
```typescript
import { RelayerAPI } from '@openzeppelin/relayer-sdk';

const config = new Configuration({
  basePath: "https://your-path.com/api/v1/",
  accessToken: "Bearer example-123456",
});

const relayersApi = new RelayersApi(config);


const relayer = await api.getRelayer('relayer-id');
console.log(relayer);
```

For more examples, check the [examples directory](examples).

## API Documentation

The SDK is built on top of an OpenAPI specification which can be found in the [openapi.json](openapi.json) file. For detailed API documentation, please refer to the OpenZeppelin Relayer documentation.

## Development

### Setup
```bash
# Install dependencies
pnpm install

# Build the SDK
pnpm build
```

## Generating a New Client

The SDK client is generated from an OpenAPI specification file. To generate a new client:

1. Create or update the `openapi.json` file in the root directory if it doesn't exist.
2. Run the generation command:

```bash
pnpm run generate
```

This command performs the following steps:
- Cleans the existing source files
- Generates a TypeScript Axios client from the OpenAPI specification
- Runs post-generation scripts to customize the output
- Builds the final client


### Testing
```bash
pnpm test
```

### Contributing

Contributions are welcome! Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing to this project.

## License

This project is licensed under the **AGPL-3.0-or-later** license. See the [LICENSE](LICENSE) file for more details.

---
```