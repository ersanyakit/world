import LatLngLogo from '#components/TopBar/LatLngLogo'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Link, useDisclosure, useDraggable, ModalContent, ModalHeader, ModalBody, ModalFooter, Modal } from '@nextui-org/react'
import { Tokens } from "../../constants/tokens"
import dynamic from 'next/dynamic';
import React, { useEffect, useRef } from 'react';
import { useAppKitNetwork } from '@reown/appkit/react';
import TapButton from './TapButton';
import TreasuryButton from './TreasuryButton';
import HealthButton from './HealthButton';
import GemsButton from './GemsButton';
import { Settings } from 'lucide-react';
import SettingsButton from './SettingsButton';
import { useChainId } from '#src/context/ChainIdProvider';

const TokenChip = dynamic(() => import('./TokenChip'), {
  ssr: false, // Disable SSR for TokenChip component
});

const BottomBar = () =>  {

   const chainId = useChainId()

  useEffect(()=>{

  },[chainId])
  return (
    <>
        {/* {Tokens.map((token, index) => (
          token.chainId == chainId &&  <TokenChip  key={index} token={token} />
        ))} */}

   <div className='fixed bottom-0 w-screen z-40 h-200 min-h-200'>
    <div className="h-[96px]">
      <div className="rounded-lg flex w-full gap-2 items-center justify-center  overflow-x-auto">
        <HealthButton/>
        <TreasuryButton/>
        <TapButton/>
        <GemsButton/>
        <SettingsButton/>
      </div>
    </div>
  </div>

  </> )


      }

export default BottomBar