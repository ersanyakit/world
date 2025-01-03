import { Token } from '#src/types/web3.types'
import { Avatar, Button, form, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Slider, useDisclosure, useDraggable, User } from '@nextui-org/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import useMapContext from '../../Map/useMapContext'
import L from 'leaflet'
import { contribute, getContributionInfoByToken } from '#src/utils/web3/util'
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react'
import { Contribution, ContributionInfo } from '#src/types/Contribution'
import { ethers, formatEther, formatUnits, parseEther, parseUnits } from 'ethers'
import LatLngLogo from '#components/TopBar/LatLngLogo'
import { forceFormatUnits, generateHexColorFromAddress } from '#src/utils/helpers'
import Leaflet from 'leaflet'
import Geohash from 'ngeohash';
import useInitContributors from '#src/hooks/useInitContributors'

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
  const { address, isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider('eip155');
  const [contributionInfo, setContributionInfo] = useState<ContributionInfo | null>(null);



  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("")
  const [url, setURL] = useState("");
  const [depositAmount, setDepositAmount]  = useState<number>(0);


    const [location, setLocation] = useState<Leaflet.LatLng | undefined>()
    const lat = location?.lat
    const lng = location?.lng
    const [refreshTrigger, setRefreshTrigger] = useState(false);

    useInitContributors(refreshTrigger);

  
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

    const _contributionInfo = await getContributionInfoByToken(token, walletProvider, isConnected, address)
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


  await contribute(walletProvider,isConnected,address,contribution)
  //setRefreshTrigger(!refreshTrigger)
  }


  return (

    <>

      <Modal ref={targetRef} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader {...moveProps} className="flex flex-col gap-1 items-start justify-center">
                <User name={`Contribute with ${token.symbol}`}
                  description={token.name}
                  avatarProps={{
                    className: "w-6 h-6",
                    src: token.logoURI
                  }} />
              </ModalHeader>
              <ModalBody>
                <div className='w-full'>


                  <div className='flex flex-col gap-2'>

                    <div className='mt-2 w-full grid grid-cols-2 gap-2 text-xs py-2 border border-1 rounded-lg p-2' >
                      <div className='w-full flex flex-col'>
                        <span className='font-bold'>Token</span>
                        <span>{token.name}</span>
                      </div>
                      <div className='w-full flex flex-col'>
                        <span className='font-bold'>Symbol</span>
                        <span>{token.symbol}</span>
                      </div>
                      <div className='w-full flex flex-col'>
                        <span className='font-bold'>Decimals</span>
                        <span>{token.decimals}</span>
                      </div>

                      <div className='w-full flex flex-col'>
                        <span className='font-bold'>Balance</span>
                        <span>{contributionInfo && contributionInfo.playerBalance ? formatUnits(contributionInfo.playerBalance, token.decimals) : "0.0000"}</span>
                      </div>


                    </div>

                    <div className='w-full flex flex-col gap-2'>
                      <Input  value={title} onValueChange={setTitle} isClearable label="Title" placeholder="Enter title" size={"lg"} type="text" />
                      <Input  value={description} onValueChange={setDescription} isClearable label="Description" placeholder="Enter description" size={"lg"} type="text" />
                      <Input  value={url} onValueChange={setURL} isClearable  label="URL" placeholder="Enter URL" size={"lg"} type="text" />

                      <Slider
                       value={depositAmount}
                       onChange={(value) => {
                        if (typeof value === "number") {
                          setDepositAmount(value);
                        } else if (Array.isArray(value)) {
                          setDepositAmount(value[0]); // İlk değeri alıyoruz.
                        }
                      }}
                        className="w-full"
                        size='lg'
                        label="Amount"
                        getValue={(amount) => `${amount} ${token.symbol}`}
                        maxValue={forceFormatUnits(contributionInfo?.playerBalance, token)}
                        minValue={forceFormatUnits(contributionInfo?.nextContributionAmount, token)}
                        step={0.1}
                      />

                    </div>

                  </div>


                </div>

              </ModalBody>
              <ModalFooter>
                <div className='w-full grid grid-cols-2 justify-center'>
                  <div className='w-full flex flex-row items-center justify-start'>
                    <LatLngLogo />
                  </div>
                  <div className='w-full flex flex-row gap-2 justify-end'>
                    <Button className='text-white' color="success" onPress={()=>{
                      handleContribute()
                    }}>
                      Contribute
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
      </div>

    </>

  )
}

export default TokenChip

