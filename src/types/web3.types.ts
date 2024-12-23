export type TNetwork = {
  chainId: number;
  name: string;
  currency: string;
  explorerUrl: string;
  rpcUrl: string;
  image: string;
};

export type TContract = {
  address: `0x${string}` | string;
  abi: object[];
  chainId: number;
  rpcUrl: string;
};
