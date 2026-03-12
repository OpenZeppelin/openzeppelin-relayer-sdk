import {
  Asset,
  BASE_FEE,
  Networks,
  Operation,
  TransactionBuilder,
  rpc,
} from '@stellar/stellar-sdk';

export interface CreateUnsignedXdrWithCustomAssetParams {
  /** Stellar RPC server instance */
  server: rpc.Server;
  /** Source account address (public key) */
  sourceAccount: string;
  /** Destination account address (public key) */
  destinationAccount: string;
  /** Asset code (e.g., 'USDC', 'PYUSD') */
  assetCode: string;
  /** Asset issuer address (public key) */
  assetIssuer: string;
  /** Amount to transfer as string with 7 decimal places (e.g., '10.0000000') */
  amount: string;
  /** Network passphrase (Networks.TESTNET or Networks.MAINNET) */
  networkPassphrase: Networks;
  /** Transaction fee in stroops (optional, defaults to BASE_FEE) */
  fee?: string;
  /** Transaction timeout in seconds (optional, defaults to 180) */
  timeout?: number;
}

/**
 * Creates an unsigned XDR transaction for a custom asset transfer on Stellar.
 * 
 * @param params - Configuration parameters for the transaction
 * @returns Promise resolving to the unsigned XDR string
 * 
 * @example
 * ```typescript
 * const server = new rpc.Server('https://soroban-testnet.stellar.org');
 * const xdr = await createUnsignedXdrWithCustomAsset({
 *   server,
 *   sourceAccount: 'G...',
 *   destinationAccount: 'G...',
 *   assetCode: 'USDC',
 *   assetIssuer: 'GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5',
 *   amount: '10.0000000',
 *   networkPassphrase: Networks.TESTNET,
 * });
 * ```
 */
export async function createUnsignedXdrWithCustomAsset(
  params: CreateUnsignedXdrWithCustomAssetParams
): Promise<string> {
  try {
    const {
      server,
      sourceAccount,
      destinationAccount,
      assetCode,
      assetIssuer,
      amount,
      networkPassphrase,
      fee = BASE_FEE.toString(),
      timeout = 180,
    } = params;

    // Fetch the source account to get the current sequence number
    const account = await server.getAccount(sourceAccount);
    
    // Create the custom asset
    const asset = new Asset(assetCode, assetIssuer);
    
    // Build the transaction
    const transaction = new TransactionBuilder(account, {
      fee,
      networkPassphrase,
    })
      .addOperation(
        Operation.payment({
          destination: destinationAccount,
          asset,
          amount,
        })
      )
      .setTimeout(timeout)
      .build();

    // Convert to unsigned XDR
    const unsignedXdr = transaction.toXDR();
    
    console.log('\n✅ Unsigned XDR with custom asset created successfully:');
    console.log(`   Asset: ${assetCode}:${assetIssuer}`);
    console.log(`   Amount: ${amount}`);
    console.log(`   From: ${sourceAccount}`);
    console.log(`   To: ${destinationAccount}`);
    console.log(`   XDR: ${unsignedXdr}`);
    
    return unsignedXdr;
  } catch (error) {
    console.error('Error creating unsigned XDR:', error);
    throw error;
  }
}