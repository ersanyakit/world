import { createPublicClient, http } from 'viem';
import { chiliz } from 'viem/chains';
import { ChilizMainnet } from './chains';

export const chilizClient = createPublicClient({
  batch: {
    multicall: true,
  },
  cacheTime: 10_000,
  pollingInterval: 10_000,
  chain: chiliz,
  transport: http(ChilizMainnet.rpcUrl),
});
