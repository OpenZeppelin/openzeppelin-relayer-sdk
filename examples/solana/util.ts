import * as solana from "@solana/web3.js";

// util fn to create sol transfer transaction
export function createSolTransfer(
  payer: string,
  recipient: string,
  amount: number,
  recentBlockhash: string
) {
  // Convert string addresses to PublicKey objects if needed
  const payerPubkey =
    typeof payer === "string" ? new solana.PublicKey(payer) : payer;
  const recipientPubkey =
    typeof recipient === "string" ? new solana.PublicKey(recipient) : recipient;

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