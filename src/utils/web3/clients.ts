import { createPublicClient, http, PublicClient } from 'viem';
import { avalanche, chiliz, hardhat, spicy } from 'viem/chains';
import { AvaxMainnet, ChilizMainnet, ChilizSpicyTestNet, HardhatTestnet } from './chains';
import { NetworkClient, TNetwork } from '#src/types/web3.types';
import { useContributionContext } from '#src/context/GlobalStateContext';

export const chilizClient = createPublicClient({
  batch: {
    multicall: true,
  },
  cacheTime: 10_000,
  pollingInterval: 10_000,
  chain: chiliz,
  transport: http(ChilizMainnet.rpcUrl),
});

export const chilizSpicyClient = createPublicClient({
  batch: {
    multicall: true,
  },
  cacheTime: 10_000,
  pollingInterval: 10_000,
  chain: spicy,
  transport: http(ChilizSpicyTestNet.rpcUrl),
});


export const avaxClient = createPublicClient({
  batch: {
    multicall: true,
  },
  cacheTime: 10_000,
  pollingInterval: 10_000,
  chain: avalanche,
  transport: http(AvaxMainnet.rpcUrl),
});


export const hardhatClient = createPublicClient({
  batch: {
    multicall: true,
  },
  cacheTime: 10_000,
  pollingInterval: 10_000,
  chain: hardhat,
  transport: http(HardhatTestnet.rpcUrl),
});


export const NETWORKS : Record<string, NetworkClient>= {
  chiliz:{client:chilizClient,network:ChilizMainnet},
  spicy:{client:chilizSpicyClient,network:ChilizSpicyTestNet},
  hardhat:{client:hardhatClient,network:HardhatTestnet},
  avalanche:{client:avaxClient,network:AvaxMainnet}
}

export function getNetworkClient(chainId: number) : NetworkClient {

  console.log("getNetworkClient: currentChainId",chainId)
  const network = Object.values(NETWORKS).find((net) => net.network.chainId && net.network.chainId === chainId);
  if (!network) {
    throw new Error(`Network with chainId ${chainId} not found`);
  }
  return network;
}



//todo:Number(0)
export function getSelectedClient() {

  return getNetworkClient(Number(0))
}
