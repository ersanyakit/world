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


export interface TContract {
  address: Address;
}

export interface TCustomContract {
  address: Address;
  abi:object[];
}

export interface MultiContractConfig {
  [contractName: string]: {
    abi: object[];
    contracts:{
      [chainID: number]: TContract;
    }
  };
}

export interface ContractCallResponse{
  success:boolean;
  error:any;
  transaction:any;
}

export interface TweetIdComponents {
  timestamp: number;
  machineId: number;
  sequence: number;
  tweetId:bigint;
}
