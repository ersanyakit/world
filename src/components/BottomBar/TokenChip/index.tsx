import { Token } from '#src/types/web3.types'
import { Avatar, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure, useDraggable, User } from '@nextui-org/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import useMapContext from '../../Map/useMapContext'
import L from 'leaflet'
import { getContributionInfoByToken } from '#src/utils/web3/util'
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react'
import { ContributionInfo } from '#src/types/Contribution'
import { formatEther, formatUnits } from 'ethers'
import LatLngLogo from '#components/TopBar/LatLngLogo'

export interface ChipProps {
  token: Token
}

// TokenChip component
const TokenChip = ({ token }: ChipProps) => {
  // Access map context
  const { map } = useMapContext()
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const targetRef = useRef(null);
  const {moveProps} = useDraggable({targetRef, isDisabled: !isOpen});
  const { address, isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider('eip155');
  const [contributionInfo, setContributionInfo] = useState<ContributionInfo | null>(null);


  const initDefaults = async () => {
    
    const _contributionInfo = await getContributionInfoByToken(token,walletProvider,isConnected,address)
    setContributionInfo(_contributionInfo)
    console.log("getContributionInfoByToken",_contributionInfo,token,isConnected,address)
  }

  useEffect(()=>{
    initDefaults();
  },[isOpen])

  
    const handleClick = () => {
      onOpen()
    //   if (map) {
    //     // Zoom in
      
    //   const currentCenter = map.getCenter()

    //   // Check if currentCenter is valid
    //   if (currentCenter && currentCenter.lat && currentCenter.lng) {
        

    //    const customIcon = L.divIcon({
    //     className: 'custom-icon', // A custom class for styling
    //     html: `<img src="${token.logoURI}" alt="icon" class="w-32 h-32 rounded-full" />`, // Insert the image inside the div
    //     iconSize: [32, 32], // Size of the icon (adjust based on your needs)
    //     iconAnchor: [16, 16], // Point where the icon will be anchored
    //   });

    //     L.marker([currentCenter.lat, currentCenter.lng], { icon: customIcon })
    //     .addTo(map)
    //     .bindPopup(`<b>${token.name}</b><br/>Balance: ${balance}`)
    //     .openPopup();
    //   } else {
    //     console.error('Unable to get current center coordinates')
    //   }
    // }
  }



  return (

    <>
    
    <Modal  ref={targetRef} isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader {...moveProps} className="flex flex-col gap-1 items-start justify-center">
                    <User name={`Contribute with ${token.symbol}`} 
                    description={token.name}    
                    avatarProps={{
                      className:"w-6 h-6",
                      src: token.logoURI}} />
                  </ModalHeader>
                  <ModalBody>
                    <div className='w-full'>
                      <div className='w-full'>
                        <LatLngLogo/>
                      </div>

      
            <div className='mt-2 w-full grid grid-cols-2 gap-2 text-xs py-2 border border-1 rounded-lg p-2' >
            <div className='w-full flex flex-col'>
              <span  className='font-bold'>Token</span>
              <span>{token.name}</span>
            </div>
            <div className='w-full flex flex-col'>
              <span  className='font-bold'>Symbol</span>
              <span>{token.symbol}</span>
            </div>
            <div className='w-full flex flex-col'>
            <span  className='font-bold'>Decimals</span>
            <span>{token.decimals}</span>
            </div>
           
            <div className='w-full flex flex-col'>
            <span  className='font-bold'>Balance</span>
            <span>{contributionInfo && contributionInfo.playerBalance && formatUnits(contributionInfo.playerBalance,token.decimals)}</span>
            </div>
           
           
          </div>

                    </div>
          
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button className='text-white' color="success" onPress={onClose}>
                      Contribute
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
          <Button 
      className="w-full" 
      size="lg" 
      isIconOnly 
      radius="full"
      style={{ width: '64px', height: '64px' }} 
      onPress={handleClick}
    >
      <Avatar
        className="group transition-transform duration-300 ease-in-out transform group-hover:scale-110"
        size="lg" 
        src={token.logoURI} 
      />
    </Button>
    
    </>

  )
}

export default TokenChip