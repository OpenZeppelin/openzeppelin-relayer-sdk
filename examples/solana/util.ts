import * as solana from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, createTransferInstruction } from '@solana/spl-token';

// util fn to create sol transfer transaction
export function createSolTransfer(payer: string, recipient: string, amount: number, recentBlockhash: string) {
  // Convert string addresses to PublicKey objects if needed
  const payerPubkey = typeof payer === 'string' ? new solana.PublicKey(payer) : payer;
  const recipientPubkey = typeof recipient === 'string' ? new solana.PublicKey(recipient) : recipient;

  // Create the transfer instruction
  const transferIx = solana.SystemProgram.transfer({
    fromPubkey: payerPubkey,
    toPubkey: recipientPubkey,
    lamports: amount,
  });

  // Create a new transaction with the transfer instruction
  const transaction = new solana.Transaction().add(transferIx);

  // Set the payer and recent blockhash
  transaction.feePayer = payerPubkey;
  transaction.recentBlockhash = recentBlockhash;

  return transaction;
}

export function createTokenTransfer(
  payer: string | solana.PublicKey,
  sourceTokenAccount: string | solana.PublicKey,
  destinationTokenAccount: string | solana.PublicKey,
  ownerOrDelegate: string | solana.PublicKey,
  amount: number,
  recentBlockhash: string,
  multiSigners: solana.Signer[] = [],
): solana.Transaction {
  // Convert string addresses to PublicKey objects
  const payerPubkey = typeof payer === 'string' ? new solana.PublicKey(payer) : payer;
  const sourcePubkey =
    typeof sourceTokenAccount === 'string' ? new solana.PublicKey(sourceTokenAccount) : sourceTokenAccount;
  const destinationPubkey =
    typeof destinationTokenAccount === 'string'
      ? new solana.PublicKey(destinationTokenAccount)
      : destinationTokenAccount;
  const ownerPubkey = typeof ownerOrDelegate === 'string' ? new solana.PublicKey(ownerOrDelegate) : ownerOrDelegate;

  // Create the transfer instruction
  const transferIx = createTransferInstruction(
    sourcePubkey,
    destinationPubkey,
    ownerPubkey,
    amount,
    multiSigners,
    TOKEN_PROGRAM_ID,
  );

  // Create a new transaction with the transfer instruction
  const transaction = new solana.Transaction().add(transferIx);

  // Set the payer and recent blockhash
  transaction.feePayer = payerPubkey;
  transaction.recentBlockhash = recentBlockhash;

  return transaction;
}
