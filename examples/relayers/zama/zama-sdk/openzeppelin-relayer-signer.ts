/**
 * `OpenZeppelinRelayerSigner` — a `GenericSigner` implementation that backs
 * `@zama-fhe/sdk` with an OpenZeppelin Relayer for signing and transaction
 * submission.
 *
 * In `@zama-fhe/sdk@3.x` the wallet contract is split in two:
 *
 * - `GenericSigner` — write authority: `signTypedData` (decrypt authorization)
 *   and `writeContract` (on-chain submission), plus an observable
 *   `walletAccount` store. This class implements it on top of the relayer.
 * - `GenericProvider` — read-only RPC: chain id, contract reads, block
 *   timestamps, receipt waiting. The relayer is not involved in reads, so the
 *   example wires the SDK's built-in `ViemProvider` (a viem `PublicClient`)
 *   for that half.
 *
 * Extending `BaseSigner` provides the `walletAccount` store and
 * `requireWalletAccount` boilerplate; this class only supplies `signTypedData`
 * and `writeContract`. Because the relayer resolves its address asynchronously,
 * construct instances through the static `create` factory rather than `new`.
 */
import {
  type Abi,
  type Address,
  type ContractFunctionArgs,
  type ContractFunctionName,
  type Hex,
  type TypedDataParameter,
  encodeFunctionData,
  getAddress,
  hashDomain,
  hashStruct,
  isHex,
} from 'viem';

import { BaseSigner, type EIP712TypedData, type WriteContractConfig } from '@zama-fhe/sdk';

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
  /** How often (ms) to poll the relayer while waiting for a transaction. Default: 2000. */
  pollIntervalMs?: number;
  /**
   * Maximum poll attempts while waiting for the relayer to broadcast and mine a
   * transaction. If omitted, polls indefinitely — fee-escalation cycles can
   * outlast any default. Wrap `writeContract` in `Promise.race` if you need a
   * deadline at the call site.
   */
  maxPollAttempts?: number;
  /** Speed setting passed to the relayer's `sendTransaction`. Default: `Speed.FAST`. */
  speed?: Speed;
  /** Default gas limit if `WriteContractConfig.gas` is not set. Default: 500000. */
  defaultGasLimit?: number;
}

const DEFAULT_POLL_INTERVAL_MS = 2000;
const DEFAULT_GAS_LIMIT = 500_000;

/** Implements Zama's `GenericSigner` on top of an OpenZeppelin Relayer. */
export class OpenZeppelinRelayerSigner extends BaseSigner {
  readonly #relayersApi: RelayersApi;
  readonly #relayerId: string;
  readonly #pollIntervalMs: number;
  readonly #maxPollAttempts?: number;
  readonly #speed: Speed;
  readonly #defaultGasLimit: number;

  private constructor(config: OpenZeppelinRelayerSignerConfig, walletAccount: { address: Address; chainId: number }) {
    super(walletAccount);
    this.#relayersApi = config.relayersApi;
    this.#relayerId = config.relayerId;
    this.#pollIntervalMs = config.pollIntervalMs ?? DEFAULT_POLL_INTERVAL_MS;
    this.#maxPollAttempts = config.maxPollAttempts;
    this.#speed = config.speed ?? Speed.FAST;
    this.#defaultGasLimit = config.defaultGasLimit ?? DEFAULT_GAS_LIMIT;
  }

  /**
   * Build a signer, resolving the relayer's on-chain address from the API and
   * seeding the wallet-account store with `{ address, chainId }`. `chainId` is
   * the chain the SDK operates on (fetch it once from the provider).
   */
  static async create(
    config: OpenZeppelinRelayerSignerConfig & { chainId: number },
  ): Promise<OpenZeppelinRelayerSigner> {
    const response = await config.relayersApi.getRelayer(config.relayerId);
    const raw = response.data.data?.address;
    if (!raw) {
      throw new Error(`Relayer "${config.relayerId}" did not return an address`);
    }
    return new OpenZeppelinRelayerSigner(config, { address: getAddress(raw), chainId: config.chainId });
  }

  /** The relayer's on-chain address (from the seeded wallet account). */
  get address(): Address {
    return this.requireWalletAccount('address').address;
  }

  async signTypedData(typedData: EIP712TypedData): Promise<Hex> {
    const { domain, types, primaryType, message } = typedData;
    // viem's hashDomain/hashStruct want mutable arrays; clone the readonly inputs.
    const mutableTypes = Object.fromEntries(
      Object.entries(types as Record<string, readonly TypedDataParameter[]>).map(([key, fields]) => [key, [...fields]]),
    );
    const { EIP712Domain: _ignored, ...structTypes } = mutableTypes;

    const structTypeNames = Object.keys(structTypes);
    // Some createEIP712 payloads omit primaryType; infer it only when the
    // payload has exactly one user-defined struct.
    const resolvedPrimaryType = primaryType ?? (structTypeNames.length === 1 ? structTypeNames[0] : undefined);
    if (!resolvedPrimaryType) {
      throw new Error(
        `signTypedData: typedData must include primaryType when it has ${structTypeNames.length} user-defined struct types`,
      );
    }

    // The OZ relayer's signTypedData endpoint takes a pre-computed
    // (domain_separator, hash_struct_message) pair, not the full typed data.
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

    // The relayer broadcasts asynchronously and may re-broadcast a fee-bumped
    // replacement under a new hash. Poll until it mines, then return the final
    // on-chain hash — one that the SDK's `GenericProvider.waitForTransactionReceipt`
    // can resolve directly (no relayer-specific bookkeeping leaks into reads).
    return this.#waitForMinedHash(transactionId);
  }

  async #waitForMinedHash(transactionId: string): Promise<Hex> {
    const cap = this.#maxPollAttempts;
    for (let attempt = 1; cap === undefined || attempt <= cap; attempt += 1) {
      await new Promise((resolve) => setTimeout(resolve, this.#pollIntervalMs));

      const status = await this.#relayersApi.getTransactionById(this.#relayerId, transactionId);
      const tx = status.data.data as EvmTransactionResponse | undefined;
      if (!tx) {
        throw new Error(`Relayer transaction "${transactionId}" not found`);
      }

      if (tx.status === TransactionStatus.MINED || tx.status === TransactionStatus.CONFIRMED) {
        if (!tx.hash || !isHex(tx.hash)) {
          throw new Error(`Relayer reported ${tx.status} but did not return a valid on-chain hash`);
        }
        return tx.hash;
      }

      if (
        tx.status === TransactionStatus.FAILED ||
        tx.status === TransactionStatus.CANCELED ||
        tx.status === TransactionStatus.EXPIRED
      ) {
        const reason = tx.status_reason ? ` Reason: ${tx.status_reason}` : '';
        throw new Error(`Relayer transaction ${tx.status}.${reason}`);
      }
    }

    throw new Error(
      `Timed out waiting for relayer to mine the transaction after ` +
        `${(cap ?? 0) * this.#pollIntervalMs}ms (maxPollAttempts=${cap})`,
    );
  }
}
