import { ContractCallResponse, Token } from '#src/types/web3.types'
import { Avatar, Button, form, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Slider, useDisclosure, useDraggable, User } from '@nextui-org/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import useMapContext from '../../Map/useMapContext'
import L from 'leaflet'
import { approve, contribute, getContributionInfoByToken } from '#src/utils/web3/util'
import { useAppKitAccount, useAppKitProvider, useAppKit, useAppKitNetwork } from '@reown/appkit/react'
import { Contribution, ContributionInfo } from '#src/types/Contribution'
import { ethers, formatEther, formatUnits, parseEther, parseUnits } from 'ethers'
import LatLngLogo from '#components/TopBar/LatLngLogo'
import { forceFormatUnits, generateHexColorFromAddress, generateShareURL } from '#src/utils/helpers'
import Leaflet from 'leaflet'
import Geohash from 'ngeohash';
import useInitContributors from '#src/hooks/useInitContributors'
import { TWEET_HEAD, TWEETS } from '#src/constants/constants'
import { Tokens } from '#src/constants/tokens'
import { useContributionContext } from '#src/context/GlobalStateContext'
import { ProfileTAB } from '#components/Map/ui/DrawerPanel/Tabs/Profile'

export interface ChipProps {
  token: Token
}



// TokenChip component
const SettingsButton = () => {
  // Access map context
  const { map } = useMapContext()
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const targetRef = useRef(null);
  const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });


 
  const { chainId } = useAppKitNetwork()

  const handleClick = () => {
    onOpen()
  }

 
  return (

    <>




<Modal className='bg-black/30' size='lg'  backdrop='blur' ref={targetRef} isOpen={isOpen} onOpenChange={onOpenChange}>
<ModalContent>
          {(onClose) => (
            <>
              <ModalHeader {...moveProps} className="flex flex-col gap-1 items-start justify-center">
                <User name={`Settings`}
                classNames={{base:"text-lime-500"}}
                  description={"Access your account settings, view your followers, followings, and manage your profile all in one place."}
                  avatarProps={{
                    className: "w-16 h-16 bg-transparent",
                    src: "/assets/settings.png"
                  }} />
              </ModalHeader>
              <ModalBody>
             
                  <div className='w-full'>
                    <ProfileTAB/>
                
                  </div>

               

              </ModalBody>
              <ModalFooter>
                <div className='w-full grid grid-cols-2 justify-center'>
                  <div className='w-full flex flex-row items-center justify-start'>
                    <LatLngLogo />
                  </div>
                  <div className='w-full flex flex-row gap-2 justify-end'>
                   
                    <Button
                      className='text-white' color="danger" onPress={() => {
                        onClose()
                      }}>
                      Close
                    </Button>
                  </div>


                </div>

              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>


      <div>

        <Button
          className="w-full bg-purple-500/30"

          size="lg"
          isIconOnly
          radius="full"
          style={{ width: '64px', height: '64px' }}
          onPress={handleClick}
        >
          <Avatar
            className="group bg-purple-900/40 hover:bg-purple-900/90 transition-transform   group-hover:scale-90"
            size="lg"
            src={"/assets/settings.png"}
          />
        </Button>
      </div>

    </>

  )
}

export default SettingsButton;

