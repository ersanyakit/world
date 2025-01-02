import { createPublicClient, http, PublicClient } from 'viem';
import { avalanche, chiliz, hardhat } from 'viem/chains';
import { AvaxMainnet, ChilizMainnet, HardhatTestnet } from './chains';
import { NetworkClient, TNetwork } from '#src/types/web3.types';



export const chilizClient = createPublicClient({
  batch: {
    multicall: true,
  },
  cacheTime: 10_000,
  pollingInterval: 10_000,
  chain: chiliz,
  transport: http(ChilizMainnet.rpcUrl),
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
  hardhat:{client:hardhatClient,network:HardhatTestnet},
  avalanche:{client:avaxClient,network:AvaxMainnet}
}

export function getNetworkClient(chainId: number) : NetworkClient {
  const network = Object.values(NETWORKS).find((net) => net.network.chainId && net.network.chainId === chainId);
  if (!network) {
    throw new Error(`Network with chainId ${chainId} not found`);
  }
  return network;
}

// Varsayılan Seçili Ağ
let selectedNetwork = NETWORKS.chiliz;

// Seçili Ağı Getiren Fonksiyon
export function getSelectedClient() {
  return selectedNetwork.client;
}

// Ağ Değiştirme Fonksiyonu
export function setSelectedNetwork(chainId: number) {
  const network = Object.values(NETWORKS).find((net) => net.client.chain && net.client.chain.id === chainId);
  if (!network) {
    throw new Error(`Network with chainId ${chainId} not found`);
  }
  selectedNetwork = network; 
}