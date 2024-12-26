import { createPublicClient, http } from 'viem';
import { chiliz, hardhat } from 'viem/chains';
import { ChilizMainnet, HardhatTestnet } from './chains';

export const chilizClient = createPublicClient({
  batch: {
    multicall: true,
  },
  cacheTime: 10_000,
  pollingInterval: 10_000,
  chain: chiliz,
  transport: http(ChilizMainnet.rpcUrl),
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

