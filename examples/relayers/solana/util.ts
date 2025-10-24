import { Address, address } from '@solana/addresses';
import {
  appendTransactionMessageInstructions,
  createTransactionMessage,
  getBase64EncodedWireTransaction,
  pipe,
  setTransactionMessageLifetimeUsingBlockhash,
  setTransactionMessageFeePayer,
  compileTransaction,
  type Blockhash,
} from '@solana/kit';
import { findAssociatedTokenPda, getTransferInstruction, TOKEN_PROGRAM_ADDRESS } from '@solana-program/token';
import { getTransferCheckedInstruction, TOKEN_2022_PROGRAM_ADDRESS } from '@solana-program/token-2022';

type LatestBlockhash = Readonly<{
  blockhash: Blockhash;
  lastValidBlockHeight: bigint;
}>;

/**
 * Helper function to create a serialized transaction with the given instruction
 * @param sourceAddress - Source wallet address (Address)
 * @param instruction - The transfer instruction to include
 * @param latestBlockhash - Latest blockhash response
 * @returns Base64 encoded serialized transaction ready for submission
 */
function createSerializedTransaction(
  sourceAddress: Address<string>,
  instruction: any,
  latestBlockhash: LatestBlockhash,
): string {
  const transactionMessage = pipe(
    createTransactionMessage({ version: 'legacy' }),
    (tx) => setTransactionMessageFeePayer(sourceAddress, tx),
    (tx) => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, tx),
    (tx) => appendTransactionMessageInstructions([instruction], tx),
  );

  const transaction = compileTransaction(transactionMessage);
  return getBase64EncodedWireTransaction(transaction);
}

/**
 * Creates a token transfer transaction and returns the serialized transaction
 * @param source - Source wallet address (string)
 * @param destination - Destination wallet address (string)
 * @param token - Token mint address (string)
 * @param amount - Amount to transfer (in smallest units)
 * @param latestBlockhash - Latest blockhash response
 * @returns Base64 encoded serialized transaction ready for submission
 */
export async function getSerializedTokenTransfer(
  source: string,
  destination: string,
  token: string,
  amount: number,
  latestBlockhash: LatestBlockhash,
): Promise<string> {
  // Convert string addresses to Address objects
  const sourceAddress = address(source);
  const destinationAddress = address(destination);
  const tokenAddress = address(token);

  // Find associated token accounts
  const [sourceAccount] = await findAssociatedTokenPda({
    mint: tokenAddress,
    owner: sourceAddress,
    tokenProgram: TOKEN_PROGRAM_ADDRESS,
  });

  const [destinationAccount] = await findAssociatedTokenPda({
    mint: tokenAddress,
    owner: destinationAddress,
    tokenProgram: TOKEN_PROGRAM_ADDRESS,
  });

  console.log('sourceAccount', sourceAccount);
  console.log('destinationAccount', destinationAccount);

  // Create the transfer instruction
  const transferIx = getTransferInstruction({
    source: sourceAccount,
    destination: destinationAccount,
    authority: sourceAddress,
    amount: BigInt(amount),
    multiSigners: [],
  });

  return createSerializedTransaction(sourceAddress, transferIx, latestBlockhash);
}

/**
 * Helper function to convert a Solana instruction to API format
 * @param instruction - The Solana instruction to convert
 * @returns Instruction object in API format with program_id, data, and accounts
 */
function formatInstructionForApi(source: string, instruction: any) {
  return {
    program_id: instruction.programAddress,
    data: Buffer.from(instruction.data).toString('base64'),
    accounts: instruction.accounts.map((account: any) => ({
      pubkey: account.address,
      is_signer: account.address === source,
      is_writable: account.role === 1 || account.role === 2,
    })),
  };
}

/**
 * Creates a token transfer instruction in API format
 * @param source - Source wallet address (string)
 * @param destination - Destination wallet address (string)
 * @param token - Token mint address (string)
 * @param amount - Amount to transfer (in smallest units)
 * @returns Instruction object ready for API submission
 */
export async function getTokenTransferInstruction(source: string, destination: string, token: string, amount: number) {
  // Convert string addresses to Address objects
  const sourceAddress = address(source);
  const destinationAddress = address(destination);
  const tokenAddress = address(token);

  // Find associated token accounts
  const [sourceAccount] = await findAssociatedTokenPda({
    mint: tokenAddress,
    owner: sourceAddress,
    tokenProgram: TOKEN_PROGRAM_ADDRESS,
  });

  const [destinationAccount] = await findAssociatedTokenPda({
    mint: tokenAddress,
    owner: destinationAddress,
    tokenProgram: TOKEN_PROGRAM_ADDRESS,
  });

  // Create the transfer instruction
  const transferIx = getTransferInstruction({
    source: sourceAccount,
    destination: destinationAccount,
    authority: sourceAddress,
    amount: BigInt(amount),
    multiSigners: [],
  });

  console.log('yyyy', transferIx);

  console.log('=== RAW instruction from SDK ===');
  console.log('Accounts:');
  transferIx.accounts.forEach((acc, i) => {
    console.log(`${i}: address=${acc.address}, role=${acc.role}`);
  });

  // Then format it

  return formatInstructionForApi(source, transferIx);
}

/**
 * Creates a Token2022 transfer transaction and returns the serialized transaction
 * @param source - Source wallet address (string)
 * @param destination - Destination wallet address (string)
 * @param token - Token mint address (string)
 * @param amount - Amount to transfer (in smallest units)
 * @param decimals - Token decimals for checked transfer
 * @param latestBlockhash - Latest blockhash response
 * @returns Base64 encoded serialized transaction ready for submission
 */
export async function getSerializedToken2022Transfer(
  source: string,
  destination: string,
  token: string,
  amount: number,
  decimals: number,
  latestBlockhash: LatestBlockhash,
): Promise<string> {
  // Convert string addresses to Address objects
  const sourceAddress = address(source);
  const destinationAddress = address(destination);
  const tokenAddress = address(token);

  // Find associated token accounts for Token2022
  const [sourceAccount] = await findAssociatedTokenPda({
    mint: tokenAddress,
    owner: sourceAddress,
    tokenProgram: TOKEN_2022_PROGRAM_ADDRESS,
  });

  const [destinationAccount] = await findAssociatedTokenPda({
    mint: tokenAddress,
    owner: destinationAddress,
    tokenProgram: TOKEN_2022_PROGRAM_ADDRESS,
  });

  // Create the transfer checked instruction for Token2022
  const transferIx = getTransferCheckedInstruction({
    source: sourceAccount,
    mint: tokenAddress,
    destination: destinationAccount,
    authority: sourceAddress,
    amount: BigInt(amount),
    decimals,
  });

  return createSerializedTransaction(sourceAddress, transferIx, latestBlockhash);
}
