'use client'

import { createAppKit } from '@reown/appkit/react'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { mainnet, arbitrum,chiliz } from '@reown/appkit/networks'

// 1. Get projectId at https://cloud.reown.com
const projectId = '041abdda4ad706f9d40a41491d39737c'

// 2. Create a metadata object
const metadata = {
  name: 'KEWL',
  description: 'KEWL WORLD',
  url: 'https://kewl.exchange', // origin must match your domain & subdomain
  icons: ['https://raw.githubusercontent.com/kewlexchange/assets/main/chiliz/tokens/0xed5740209fcf6974d6f3a5f11e295b5e468ac27c/logo.svg']
}

// 3. Create the AppKit instance
createAppKit({
  adapters: [new EthersAdapter()],
  metadata,
  networks: [chiliz, mainnet, arbitrum],
  projectId,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
})

