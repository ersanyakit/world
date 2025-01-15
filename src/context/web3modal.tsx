'use client';

import { EthersAdapter } from '@reown/appkit-adapter-ethers';
import { chiliz, hardhat,avalanche } from '@reown/appkit/networks';
import { createAppKit } from '@reown/appkit/react';
import { ReactNode } from 'react';

const projectId = '041abdda4ad706f9d40a41491d39737c';

const metadata = {
  name: 'MillionarMap',
  description: 'MillionarMap Dapp on Blockchain 🌐 Users leave tokens on the map 🗺️ Discoverers can claim the tokens 💰',
  url: 'https://millionarmap.com',
  icons: ['/assets/map.svg'],
};

createAppKit({
  adapters: [new EthersAdapter()],
  metadata:metadata,
  networks: [chiliz,avalanche],
  defaultNetwork: chiliz,
  chainImages:{
    88888:"/assets/chains/chz.svg"
  },
  projectId,
  themeMode:"dark",
  features: {
    email: false,
    socials:false,
    allWallets: true,
    swaps:false,
    history:false,
    analytics:false,
    onramp:false,
  },
  featuredWalletIds: [
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96', // Metamask
    'f323633c1f67055a45aac84e321af6ffe46322da677ffdd32f9bc1e33bafe29c',
    '971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709',
    '8a0ee50d1f22f6651afcae7eb4253e52a3310b90af5daef78a8c4929a9bb99d4',
    '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0',
    '971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709',
    'e7c4d26541a7fd84dbdfa9922d3ad21e936e13a7a0e44385d44f006139e44d3b', // WalletConnect
  ],
});

export function Web3Provider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return <>{children}</>; // Ensure it returns a valid JSX element
}
