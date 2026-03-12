import {
  Contract,
  TransactionBuilder,
  Networks,
  Address,
  BASE_FEE,
  rpc,
  xdr,
} from '@stellar/stellar-sdk';

export interface CreateSorobanInvocationXdrParams {
  /** Stellar RPC server instance */
  server: rpc.Server;
  /** Source account address (public key) - the user calling the contract */
  sourceAccount: string;
  /** Contract address to invoke */
  contractAddress: string;
  /** Function name to call on the contract */
  functionName: string;
  /** Function arguments as ScVal array */
  args: xdr.ScVal[];
  /** Network passphrase (Networks.TESTNET or Networks.PUBLIC) */
  networkPassphrase: string;
  /** Transaction fee in stroops (optional, defaults to BASE_FEE) */
  fee?: string;
  /** Transaction timeout in seconds (optional, defaults to 180) */
  timeout?: number;
}

/**
 * Creates an unsigned XDR transaction for a Soroban contract invocation.
 * 
 * This function:
 * 1. Creates a Contract instance
 * 2. Builds an invokeContract operation
 * 3. Simulates the transaction to get proper resource footprint
 * 4. Returns the prepared unsigned XDR
 * 
 * @param params - Configuration parameters for the contract invocation
 * @returns Promise resolving to the unsigned XDR string (base64 encoded)
 * 
 * @example
 * ```typescript
 * const server = new rpc.Server('https://soroban-testnet.stellar.org');
 * const xdr = await createSorobanInvocationXdr({
 *   server,
 *   sourceAccount: 'G...',
 *   contractAddress: 'C...',
 *   functionName: 'increment',
 *   args: [new Address('G...').toScVal()],
 *   networkPassphrase: Networks.TESTNET,
 * });
 * ```
 */
export async function createSorobanInvocationXdr(
  params: CreateSorobanInvocationXdrParams
): Promise<string> {
  const {
    server,
    sourceAccount,
    contractAddress,
    functionName,
    args,
    networkPassphrase,
    fee = BASE_FEE.toString(),
    timeout = 180,
  } = params;

  console.log('\n🔨 Building Soroban invocation transaction...');
  console.log(`   Contract: ${contractAddress}`);
  console.log(`   Function: ${functionName}`);
  console.log(`   Source Account: ${sourceAccount}`);

  // Create the contract instance
  const contract = new Contract(contractAddress);

  // Fetch the source account to get the current sequence number
  const account = await server.getAccount(sourceAccount);

  // Build the transaction with the contract call
  const transaction = new TransactionBuilder(account, {
    fee,
    networkPassphrase,
  })
    .addOperation(contract.call(functionName, ...args))
    .setTimeout(timeout)
    .build();

  console.log('   📡 Simulating transaction to get resource footprint...');

  // Simulate the transaction to get proper footprint and resource fees
  const simulateResponse = await server.simulateTransaction(transaction);

  // Check if simulation was successful
  if (rpc.Api.isSimulationError(simulateResponse)) {
    throw new Error(`Simulation failed: ${simulateResponse.error}`);
  }

  if (!rpc.Api.isSimulationSuccess(simulateResponse)) {
    throw new Error('Simulation did not return a successful result');
  }

  // Assemble the transaction with simulation results
  const preparedTransaction = rpc.assembleTransaction(
    transaction,
    simulateResponse
  ).build();

  // Convert to unsigned XDR
  const unsignedXdr = preparedTransaction.toXDR();

  console.log('   ✅ Soroban invocation XDR created successfully');
  console.log(`   XDR length: ${unsignedXdr.length} characters`);

  return unsignedXdr;
}

/**
 * Helper to create an Address ScVal from a Stellar public key
 */
export function addressToScVal(address: string): xdr.ScVal {
  return new Address(address).toScVal();
}

/**
 * Helper to parse a Soroban authorization entry from base64 XDR
 */
export function parseAuthEntry(authEntryXdr: string): xdr.SorobanAuthorizationEntry {
  return xdr.SorobanAuthorizationEntry.fromXDR(authEntryXdr, 'base64');
}

/**
 * Helper to convert a signed authorization entry to base64 XDR
 */
export function authEntryToXdr(authEntry: xdr.SorobanAuthorizationEntry): string {
  return authEntry.toXDR('base64');
}
