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
import TokenChip from '../TokenChip'
import { useContributionContext } from '#src/context/GlobalStateContext'
import ContributionCard from '#components/ContributionCard'
import NoItemAvailable from '#components/NoItemAvailable'

export interface ChipProps {
  token: Token
}



// TokenChip component
const HealthButton = () => {
  // Access map context
  const { map } = useMapContext()
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const targetRef = useRef(null);
  const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });
  const { address, isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider('eip155');
  const [contributionInfo, setContributionInfo] = useState<ContributionInfo | null>(null);
  const [token, setToken] = useState<Token | null>(null)
  const [error, setError] = useState<any>(null)
  const [isLoading, setLoaded] = useState<boolean>(false)



  const [title, setTitle] = useState(TWEET_HEAD[Math.floor(Math.random() * TWEET_HEAD.length)]);
  const [description, setDescription] = useState(TWEETS[Math.floor(Math.random() * TWEETS.length)])
  const [url, setURL] = useState(generateShareURL(address, undefined));
  const [depositAmount, setDepositAmount] = useState<number>(0);


  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const { location, playerContributions, contributions, players, claims, assets, addLocation } = useContributionContext();


  const { chainId } = useAppKitNetwork()


  useInitContributors(refreshTrigger);



  useEffect(() => { }, [contributionInfo?.playerBalance])


  const handleContribute = async () => {
    setLoaded(true)
    if (!token) {
      setError({ message: "Please select token!", exception: "Please select token!" })
      return
    }

    if (!location) {
      setError({ message: "Invalid Location!", exception: "Invalid Location!" })
      return
    }


    const encodedGeohash = Geohash.encode(Number(location?.lat), Number(location?.lng));
    let contribution: Contribution = {
      valid: false,
      index: BigInt(0),
      deposit: parseUnits(depositAmount.toString(), token.decimals),
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


    let playerAllowance: bigint = contributionInfo ? contributionInfo.playerAllowance : BigInt(0)
    if (contribution.deposit > playerAllowance) {
      let approvalResponse = await approve(walletProvider, isConnected, token, ethers.MaxUint256)
      if (!approvalResponse.success) {
        setError(approvalResponse.error)
        setLoaded(false)
        return
      }
    }


    let contributeResponse = await contribute(walletProvider, isConnected, address, contribution)
    if (!contributeResponse.success) {
      setError(contributeResponse.error)
      setLoaded(false)
      return
    }
    setLoaded(false)
  }


  const handleClick = async () => {
    setToken(null)
    onOpen()
  }

  const handleSelectToken = async (_token: Token) => {
    setToken(_token);
  }

  const fetchContributionData = async (_token: Token) => {
    const _contributionInfo = await getContributionInfoByToken(_token, walletProvider, isConnected, address)
    setContributionInfo(_contributionInfo)
    console.log("getContributionInfoByToken", _contributionInfo, _token, isConnected, address)
  }

  const handleApprove = async () => {
    if (!token) {
      return;
    }
    let response: ContractCallResponse = await approve(walletProvider, isConnected, token, ethers.MaxUint256)
    console.log(response);
  }


  useEffect(() => {
    if (token) {
      fetchContributionData(token)
    }

  }, [token])


  return (

    <>




      <Modal className='bg-black/30' size='lg' scrollBehavior='inside' backdrop='blur' ref={targetRef} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader {...moveProps} className="flex flex-col gap-1 items-start justify-center">
                <User name={`My Contributions`}
                  classNames={{ base: "text-lime-500" }}
                  description={"Track your personal contributions, rewards, and progress within the MillionarMap ecosystem."}
                  avatarProps={{
                    className: "w-16 h-16 bg-transparent",
                    src: "/assets/health.png"
                  }} />
              </ModalHeader>
              <ModalBody>


                <div className="flex flex-col w-full justify-center items-center pt-4 gap-2">


                  {
                    playerContributions.length > 0 ?
                  playerContributions.slice().reverse().map((contribution, index) => (
                    <ContributionCard key={index} contribution={contribution} />
                  ))

                  :<NoItemAvailable icon={"/assets/health-full.png"} title={"You haven’t placed any pins on the map."} description={"Please contribute to the map to maximize revenue and reach a larger audience, it is essential to implement effective strategies that engage more users and encourage greater spending."} />
                
                }




                </div>
              </ModalBody>
              <ModalFooter>
                <div className='w-full  justify-center'>

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
          className="w-full bg-red-500/30"

          size="lg"
          isIconOnly
          radius="full"
          style={{ width: '64px', height: '64px' }}
          onPress={handleClick}
        >
          <Avatar
            className="group bg-red-900/40 hover:bg-red-900/90 transition-transform   group-hover:scale-90"
            size="lg"
            src={"/assets/health.png"}
          />
        </Button>
      </div>

    </>

  )
}

export default HealthButton;

