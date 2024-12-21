import { TNetwork } from '#src/types/web3.types';
import { chiliz } from 'viem/chains';

export const ChilizMainnet: TNetwork = {
  chainId: chiliz.id,
  name: chiliz.name,
  currency: chiliz.nativeCurrency.symbol,
  explorerUrl: 'https://chiliscan.com/',
  rpcUrl: 'https://rpc.chiliz.com',
  image: '/chainsLogos/arbitrum-logo.svg',
};
