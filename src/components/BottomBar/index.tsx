import LatLngLogo from '#components/TopBar/LatLngLogo'
import { NavMenuVariant } from '#lib/AppConfig'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Link, useDisclosure, useDraggable, ModalContent, ModalHeader, ModalBody, ModalFooter, Modal } from '@nextui-org/react'
import { Tokens } from "../../constants/tokens"
import dynamic from 'next/dynamic';
import React, { useEffect, useRef } from 'react';
import { useAppKitNetwork } from '@reown/appkit/react';

const TokenChip = dynamic(() => import('./TokenChip'), {
  ssr: false, // Disable SSR for TokenChip component
});

const BottomBar = () =>  {

  const {chainId} = useAppKitNetwork()

  useEffect(()=>{

  },[chainId])
  return (
    <>


   <div className='absolute bottom-0 w-full z-40 h-200 min-h-200'>
    <div className="h-[96px]">
      <div className="rounded-lg flex w-full gap-4 px-5 items-center sm:justify-center justify-start overflow-x-auto">
        {Tokens.map((token, index) => (
          token.chainId == chainId &&  <TokenChip  key={index} token={token} />
        ))}
      </div>
    </div>
  </div>

  </> )


      }

export default BottomBar