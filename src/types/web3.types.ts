import { Address } from "@reown/appkit-adapter-ethers";
import { PublicClient } from "viem";

export type NetworkClient = {
  network: TNetwork;
  client:PublicClient;
};

export type Token = {
  chainId: number;
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
}

export type TNetwork = {
  chainId: number;
  name: string;
  currency: string;
  explorerUrl: string;
  rpcUrl: string;
  image: string;
};

export type TContract = {
  address: Address;
  abi: object[];
  chainId: number;
  rpcUrl: string;
};
