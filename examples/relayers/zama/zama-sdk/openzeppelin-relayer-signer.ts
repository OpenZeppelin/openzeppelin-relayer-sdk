/**
 * `OpenZeppelinRelayerSigner` — `GenericSigner` implementation that backs
 * `@zama-fhe/sdk` with an OpenZeppelin Relayer for signing and submission.
 * Read-only ops go through a viem `PublicClient`.
 */
import {
  type Abi,
  type Address,
  type ContractFunctionArgs,
  type ContractFunctionName,
  type ContractFunctionReturnType,
  type Hex,
  type PublicClient,
  type Transport,
  createPublicClient,
  encodeFunctionData,
  getAddress,
  hashDomain,
  hashStruct,
  http,
  isHex,
} from 'viem';

import type {
  EIP712TypedData,
  GenericSigner,
  ReadContractConfig,
  TransactionReceipt,
  WriteContractConfig,
} from '@zama-fhe/sdk';

import {
  type EvmTransactionResponse,
  type RelayersApi,
  type SignDataResponseEvm,
  Speed,
  TransactionStatus,
} from '../../../../src';

export interface OpenZeppelinRelayerSignerConfig {
  /** Configured `RelayersApi` client from `@openzeppelin/relayer-sdk`. */
  relayersApi: RelayersApi;
  /** The relayer id to use for signing and submission. */
  relayerId: string;
  /** RPC URL for read-only EVM operations (chain id, blocks, contract reads, receipt waiting). */
  rpcUrl: string;
  /** How often (ms) to poll the relayer (used for both submit and confirmation phases). Default: 2000. */
  pollIntervalMs?: number;
  /**
   * Maximum poll attempts while waiting for the relayer to broadcast and assign
   * the initial on-chain hash. If omitted, polls indefinitely.
   *
   * Only applies to the submit phase inside `writeContract`. Confirmation
   * inside `waitForTransactionReceipt` is always uncapped — fee-escalation
   * cycles can outlast any default. Wrap with `Promise.race` if you need a
   * deadline at the call site.
   */
  maxSubmitPollAttempts?: number;
  /** Speed setting passed to the relayer's `sendTransaction`. Default: `Speed.FAST`. */
  speed?: Speed;
  /** Default gas limit if `WriteContractConfig.gas` is not set. Default: 500000. */
  defaultGasLimit?: number;
}

const DEFAULT_POLL_INTERVAL_MS = 2000;
const DEFAULT_GAS_LIMIT = 500_000;

type OpenZeppelinPublicClient = PublicClient<Transport, undefined, any>;
type ReadContractConfigParam = Parameters<OpenZeppelinPublicClient['readContract']>[0];
type ReceiptLog = { topics: readonly Hex[]; data: Hex };
const createOpenZeppelinPublicClient = createPublicClient as (config: {
  transport: Transport;
}) => OpenZeppelinPublicClient;

/** Implements Zama's `GenericSigner` on top of an OpenZeppelin Relayer. */
export class OpenZeppelinRelayerSigner implements GenericSigner {
  readonly #relayersApi: RelayersApi;
  readonly #relayerId: string;
  readonly #pollIntervalMs: number;
  readonly #maxSubmitPollAttempts?: number;
  readonly #speed: Speed;
  readonly #defaultGasLimit: number;
  readonly #publicClient: OpenZeppelinPublicClient;
  #cachedAddress?: Address;
  /**
   * Maps an initial on-chain hash to its relayer transaction id, so
   * `waitForTransactionReceipt` can follow fee-bump resubmissions: the relayer
   * may broadcast under a new hash while the consumer still holds the original.
   */
  readonly #txIdByInitialHash = new Map<Hex, string>();

  constructor(config: OpenZeppelinRelayerSignerConfig) {
    this.#relayersApi = config.relayersApi;
    this.#relayerId = config.relayerId;
    this.#pollIntervalMs = config.pollIntervalMs ?? DEFAULT_POLL_INTERVAL_MS;
    this.#maxSubmitPollAttempts = config.maxSubmitPollAttempts;
    this.#speed = config.speed ?? Speed.FAST;
    this.#defaultGasLimit = config.defaultGasLimit ?? DEFAULT_GAS_LIMIT;
    this.#publicClient = createOpenZeppelinPublicClient({ transport: http(config.rpcUrl) });
  }

  async getChainId(): Promise<number> {
    return this.#publicClient.getChainId();
  }

  async getBlockTimestamp(): Promise<bigint> {
    const block = await this.#publicClient.getBlock();
    return block.timestamp;
  }

  async getAddress(): Promise<Address> {
    if (this.#cachedAddress) {
      return this.#cachedAddress;
    }
    const response = await this.#relayersApi.getRelayer(this.#relayerId);
    const raw = response.data.data?.address;
    if (!raw) {
      throw new Error(`Relayer "${this.#relayerId}" did not return an address`);
    }
    this.#cachedAddress = getAddress(raw);
    return this.#cachedAddress;
  }

  async signTypedData(typedData: EIP712TypedData): Promise<Hex> {
    const { domain, types, primaryType, message } = typedData;
    // viem's hashDomain wants mutable arrays; clone readonly inputs.
    const mutableTypes = Object.fromEntries(Object.entries(types).map(([key, fields]) => [key, [...fields]]));
    const { EIP712Domain: _ignored, ...structTypes } = mutableTypes;

    const structTypeNames = Object.keys(structTypes);
    // `RelayerNode.createEIP712` in @zama-fhe/sdk@3.0.0 omits primaryType.
    // Only infer it when the payload has exactly one user-defined struct.
    const resolvedPrimaryType = primaryType ?? (structTypeNames.length === 1 ? structTypeNames[0] : undefined);
    if (!resolvedPrimaryType) {
      throw new Error(
        `signTypedData: typedData must include primaryType when it has ${structTypeNames.length} user-defined struct types`,
      );
    }

    const domainSeparator = hashDomain({ domain, types: mutableTypes });
    const hashStructMessage = hashStruct({
      data: message,
      primaryType: resolvedPrimaryType,
      types: structTypes,
    });

    const response = await this.#relayersApi.signTypedData(this.#relayerId, {
      domain_separator: domainSeparator,
      hash_struct_message: hashStructMessage,
    });
    const rawSig = (response.data.data as SignDataResponseEvm | undefined)?.sig;
    if (!rawSig) {
      throw new Error('Relayer did not return a signature');
    }
    const sig = (rawSig.startsWith('0x') ? rawSig : `0x${rawSig}`) as Hex;
    if (!isHex(sig)) {
      throw new Error(`Relayer returned non-hex signature: ${rawSig}`);
    }
    return sig;
  }

  async readContract<
    const TAbi extends Abi | readonly unknown[],
    TFunctionName extends ContractFunctionName<TAbi, 'pure' | 'view'>,
    const TArgs extends ContractFunctionArgs<TAbi, 'pure' | 'view', TFunctionName>,
  >(
    config: ReadContractConfig<TAbi, TFunctionName, TArgs>,
  ): Promise<ContractFunctionReturnType<TAbi, 'pure' | 'view', TFunctionName, TArgs>> {
    return this.#publicClient.readContract(config as unknown as ReadContractConfigParam) as Promise<
      ContractFunctionReturnType<TAbi, 'pure' | 'view', TFunctionName, TArgs>
    >;
  }

  async writeContract<
    const TAbi extends Abi | readonly unknown[],
    TFunctionName extends ContractFunctionName<TAbi, 'nonpayable' | 'payable'>,
    const TArgs extends ContractFunctionArgs<TAbi, 'nonpayable' | 'payable', TFunctionName>,
  >(config: WriteContractConfig<TAbi, TFunctionName, TArgs>): Promise<Hex> {
    const data = encodeFunctionData({
      abi: config.abi,
      functionName: config.functionName,
      args: config.args,
    } as Parameters<typeof encodeFunctionData>[0]);

    const value = config.value ?? 0n;
    if (value > BigInt(Number.MAX_SAFE_INTEGER)) {
      throw new RangeError(
        `OpenZeppelinRelayerSigner: value (${value}) exceeds Number.MAX_SAFE_INTEGER. ` +
          `The OZ relayer API encodes 'value' as a JSON number; large values are not currently supported.`,
      );
    }

    const txResponse = await this.#relayersApi.sendTransaction(this.#relayerId, {
      to: config.address,
      data,
      value: Number(value),
      gas_limit: config.gas !== undefined ? Number(config.gas) : this.#defaultGasLimit,
      speed: this.#speed,
    });
    const transactionId = txResponse.data.data?.id;
    if (!transactionId) {
      throw new Error('Relayer did not return a transaction id');
    }

    const initialHash = await this.#waitForRelayerHash(transactionId);
    this.#txIdByInitialHash.set(initialHash, transactionId);
    return initialHash;
  }

  async waitForTransactionReceipt(hash: Hex): Promise<TransactionReceipt> {
    const transactionId = this.#txIdByInitialHash.get(hash);
    if (!transactionId) {
      // Hashes the signer didn't issue (e.g. external code) fall through to RPC.
      return this.#fetchReceipt(hash, { wait: true });
    }
    try {
      const finalHash = await this.#waitForRelayerCompletion(transactionId);
      // Relayer already confirmed the tx, so a single receipt fetch is enough.
      return this.#fetchReceipt(finalHash, { wait: false });
    } finally {
      this.#txIdByInitialHash.delete(hash);
    }
  }

  async #fetchReceipt(hash: Hex, { wait }: { wait: boolean }): Promise<TransactionReceipt> {
    const receipt = wait
      ? await this.#publicClient.waitForTransactionReceipt({ hash })
      : await this.#publicClient.getTransactionReceipt({ hash });
    return {
      logs: (receipt.logs as unknown as readonly ReceiptLog[]).map((log) => ({
        topics: log.topics,
        data: log.data,
      })),
    };
  }

  /**
   * Poll the relayer until the transaction reaches a terminal status. Returns
   * the *current* on-chain hash from the relayer (which may differ from the
   * initial hash after a fee-bump resubmission).
   *
   * Intentionally uncapped — fee escalation cycles can outlast any default.
   * Callers needing a deadline should wrap with `Promise.race`.
   */
  async #waitForRelayerCompletion(transactionId: string): Promise<Hex> {
    for (;;) {
      const tx = await this.#pollTransaction(transactionId);
      if (tx.status === TransactionStatus.MINED || tx.status === TransactionStatus.CONFIRMED) {
        if (!tx.hash || !isHex(tx.hash)) {
          throw new Error(`Relayer reported ${tx.status} but did not return a valid on-chain hash`);
        }
        return tx.hash;
      }
      throwIfTerminalFailure(tx);
    }
  }

  /**
   * Poll the relayer until it broadcasts the transaction and assigns an
   * on-chain hash. Capped by `maxSubmitPollAttempts` if set, else uncapped.
   */
  async #waitForRelayerHash(transactionId: string): Promise<Hex> {
    const cap = this.#maxSubmitPollAttempts;
    for (let attempt = 1; cap === undefined || attempt <= cap; attempt += 1) {
      const tx = await this.#pollTransaction(transactionId);
      if (tx.hash && isHex(tx.hash)) {
        return tx.hash;
      }
      throwIfTerminalFailure(tx);
    }
    throw new Error(
      `Timed out waiting for relayer to assign a transaction hash after ` +
        `${(cap ?? 0) * this.#pollIntervalMs}ms (maxSubmitPollAttempts=${cap})`,
    );
  }

  async #pollTransaction(transactionId: string): Promise<EvmTransactionResponse> {
    await new Promise((resolve) => setTimeout(resolve, this.#pollIntervalMs));
    const status = await this.#relayersApi.getTransactionById(this.#relayerId, transactionId);
    const tx = status.data.data as EvmTransactionResponse | undefined;
    if (!tx) {
      throw new Error(`Relayer transaction "${transactionId}" not found`);
    }
    return tx;
  }
}

function throwIfTerminalFailure(tx: EvmTransactionResponse): void {
  if (
    tx.status === TransactionStatus.FAILED ||
    tx.status === TransactionStatus.CANCELED ||
    tx.status === TransactionStatus.EXPIRED
  ) {
    const reason = tx.status_reason ? ` Reason: ${tx.status_reason}` : '';
    throw new Error(`Relayer transaction ${tx.status}.${reason}`);
  }
}
