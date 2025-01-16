import { Token } from '#src/types/web3.types'
import { Avatar, Button, form, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Slider, useDisclosure, useDraggable, User } from '@nextui-org/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import useMapContext from '../../Map/useMapContext'
import L from 'leaflet'
import { useAppKitAccount, useAppKitProvider,useAppKit, useAppKitNetwork } from '@reown/appkit/react'
import { Contribution, ContributionInfo } from '#src/types/Contribution'
import { ethers, formatEther, formatUnits, parseEther, parseUnits } from 'ethers'
import LatLngLogo from '#components/TopBar/LatLngLogo'
import { forceFormatUnits, generateHexColorFromAddress, generateShareURL } from '#src/utils/helpers'
import Leaflet from 'leaflet'
import Geohash from 'ngeohash';
import useInitContributors from '#src/hooks/useInitContributors'
import { TWEET_HEAD, TWEETS } from '#src/constants/constants'
import { contribute, getContributionInfoByToken } from '#src/hooks/useContractByName'
import { useChainId } from '#src/context/ChainIdProvider'

export interface ChipProps {
  token: Token
}



// TokenChip component
const TokenChip = ({ token }: ChipProps) => {
  // Access map context
  const { map } = useMapContext()
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const targetRef = useRef(null);
  const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });
  const { address, isConnected} = useAppKitAccount();
  const { walletProvider } = useAppKitProvider('eip155');
  const [contributionInfo, setContributionInfo] = useState<ContributionInfo | null>(null);



  const [title, setTitle] = useState(TWEET_HEAD[Math.floor(Math.random() * TWEET_HEAD.length)]);
  const [description, setDescription] = useState(TWEETS[Math.floor(Math.random() * TWEETS.length)])
  const [url, setURL] = useState(generateShareURL(address,undefined));
  const [depositAmount, setDepositAmount]  = useState<number>(0);


    const [location, setLocation] = useState<Leaflet.LatLng | undefined>()
    const lat = location?.lat
    const lng = location?.lng
    const [refreshTrigger, setRefreshTrigger] = useState(false);
   const chainId = useChainId()

    useInitContributors(chainId,refreshTrigger);

  
    useEffect(() => {
      if (!isOpen) return undefined

      if (!map) return undefined
  
      setLocation(map.getCenter())
  
      map?.on('move', () => {
        if (!isOpen) return 
        setLocation(map.getCenter())
      })
  
  
    }, [map])
  

  const initDefaults = async () => {

    const _contributionInfo = await getContributionInfoByToken(chainId,token, walletProvider, isConnected, address)
    setContributionInfo(_contributionInfo)
    console.log("getContributionInfoByToken", _contributionInfo, token, isConnected, address)
  }

  useEffect(() => { }, [contributionInfo?.playerBalance])
  useEffect(() => {
    if (isOpen) {
      initDefaults();
    } else {
      console.log("Closed,TokenChip")
    }

  }, [isOpen])


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


  const handleContribute = async () => {


    const encodedGeohash = Geohash.encode(Number(lat ? lat :  21.4225), Number(lng ? lng : 39.8262));
    let contribution : Contribution = {
      valid: false,
      index: BigInt(0),
      deposit: parseUnits(depositAmount.toString(),token.decimals),
      withdraw: BigInt(0),
      claims: BigInt(0),
      limit: BigInt(0),
      timestamp: BigInt(0),
      contributor: address || ethers.ZeroAddress,
      token: token.address,
      geohash: encodedGeohash,
      name: title,
      url: url,
      description: description,
      color: generateHexColorFromAddress(address ? address : ethers.ZeroAddress),
      image: "",
      claimers: [],
    };
  
  
    await contribute(chainId,walletProvider,isConnected,address,contribution)
    //setRefreshTrigger(!refreshTrigger)
    }
  

  return (

    <>

      <div>
 
      <Button
        className="w-full"
        size="lg"
        isIconOnly
        radius="full"
        style={{ width: '64px', height: '64px' }}
        onPress={handleClick}
      >
        <Avatar
          className="group  transition-transform duration-300 ease-in-out transform group-hover:scale-90"
          size="lg"
          src={token.logoURI}
        />
      </Button>
      </div>

    </>

  )
}

export default TokenChip

