'use client';

import { EthersAdapter } from '@reown/appkit-adapter-ethers';
import { chiliz } from '@reown/appkit/networks';
import { createAppKit } from '@reown/appkit/react';
import { ReactNode } from 'react';

const projectId = 'projectId';

const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'website linki',
  icons: ['https://avatars.mywebsite.com/'],
};

createAppKit({
  adapters: [new EthersAdapter()],
  metadata,
  networks: [chiliz],
  defaultNetwork: chiliz,
  projectId,
  features: {
    email: false,
    allWallets: false,
  },

  allWallets: 'HIDE',
  featuredWalletIds: [
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96', // Metamask
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
