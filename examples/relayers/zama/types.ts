export interface DecryptionKeypair {
  privateKey: string;
  publicKey: string;
}
export type EIP712Type = { name: string; type: string };
export type EIP712 = {
  domain: {
    chainId: number;
    name: string;
    verifyingContract: string;
    version: string;
  };
  message: any;
  primaryType: string;
  types: {
    [key: string]: EIP712Type[];
  };
};
