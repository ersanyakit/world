import { TNetwork } from '#src/types/web3.types';
import { chiliz,spicy,hardhat,avalanche } from 'viem/chains';

export const ChilizMainnet: TNetwork = {
  chainId: chiliz.id,
  name: chiliz.name,
  currency: chiliz.nativeCurrency.symbol,
  explorerUrl: 'https://chiliscan.com/',
  rpcUrl: 'https://rpc.chiliz.com',
  image: 'https://millionarmap.com/assets/chains/chz.svg',
};


export const ChilizSpicyTestNet: TNetwork = {
  chainId: spicy.id,
  name: spicy.name,
  currency: spicy.nativeCurrency.symbol,
  explorerUrl: 'https://testnet.chiliscan.com',
  rpcUrl: 'https://spicy-rpc.chiliz.com',
  image: 'https://millionarmap.com/assets/chains/chz.svg',
};


export const AvaxMainnet: TNetwork = {
  chainId: avalanche.id,
  name: avalanche.name,
  currency: avalanche.nativeCurrency.symbol,
  explorerUrl: 'https://snowtrace.io/',
  rpcUrl: 'https://rpc.ankr.com/avalanche',
  image: 'https://millionarmap.com/assets/chains/avax.svg',
};


export const HardhatTestnet: TNetwork = {
  chainId: hardhat.id,
  name: hardhat.name,
  currency: hardhat.nativeCurrency.symbol,
  explorerUrl: 'https://chiliscan.com/',
  rpcUrl: 'http://127.0.0.1:8545',
  image: 'https://millionarmap.com/assets/chains/error.svg',
};


