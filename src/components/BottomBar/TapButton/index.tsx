import { ContractCallResponse, Token } from '#src/types/web3.types'
import { Avatar, Button, form, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Slider, Textarea, useDisclosure, useDraggable, User } from '@nextui-org/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import useMapContext from '../../Map/useMapContext'
import L from 'leaflet'
import { useAppKitAccount, useAppKitProvider, useAppKit, useAppKitNetwork } from '@reown/appkit/react'
import { Contribution, ContributionInfo } from '#src/types/Contribution'
import { ethers, formatEther, formatUnits, parseEther, parseUnits } from 'ethers'
import LatLngLogo from '#components/TopBar/LatLngLogo'
import { forceFormatUnits, generateHexColorFromAddress, generateShareURL, getRandomUsers, randomUsers } from '#src/utils/helpers'
import Leaflet from 'leaflet'
import Geohash from 'ngeohash';
import useInitContributors from '#src/hooks/useInitContributors'
import { EMOJIS, TWEET_HEAD, TWEETS, TWITTER_USERS } from '#src/constants/constants'
import { Tokens } from '#src/constants/tokens'
import TokenChip from '../TokenChip'
import { useContributionContext } from '#src/context/GlobalStateContext'
import { approve, contribute, getContributionInfoByToken } from '#src/hooks/useContractByName'
import { useChainId } from '#src/context/ChainIdProvider'

export interface ChipProps {
  token: Token
}



// TokenChip component
const TapButton = () => {
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

   const chainId = useChainId()

  const [title, setTitle] = useState(TWEET_HEAD[Math.floor(Math.random() * TWEET_HEAD.length)]);
  const [description, setDescription] = useState(TWEETS[Math.floor(Math.random() * TWEETS.length)])
  const [url, setURL] = useState(generateShareURL(address, undefined));
  const [depositAmount, setDepositAmount] = useState<string>("0");


  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const { location, contributions, players, claims, assets, addLocation } = useContributionContext();




  useInitContributors(chainId,refreshTrigger);




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
      let approvalResponse = await approve(chainId,walletProvider, isConnected, token, ethers.MaxUint256)
      if (!approvalResponse.success) {
        setError(approvalResponse.error)
        setLoaded(false)
        return
      }
    }


    let contributeResponse = await contribute(chainId,walletProvider, isConnected, address, contribution)
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

    let shareURL = generateShareURL(address, undefined)
    const randomEmoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    const randomTweet = TWEETS[Math.floor(Math.random() * TWEETS.length)];
    const randomHead = TWEET_HEAD[Math.floor(Math.random() * TWEET_HEAD.length)];
    const tweetText = `🥇${randomHead} ${randomEmoji}\n\n🥈${randomTweet}\n\n🚀🚀🚀${shareURL}\n\n🥉Shoutout to: ${randomUsers}`;

    setTitle(randomHead);
    setDescription(tweetText)
    setURL(shareURL);
    setToken(_token);
  }

  const fetchContributionData = async (_token: Token) => {
    const _contributionInfo = await getContributionInfoByToken(chainId,_token, walletProvider, isConnected, address)
    setContributionInfo(_contributionInfo)
    console.log("getContributionInfoByToken", _contributionInfo, _token, isConnected, address)
  }

  const handleApprove = async () => {
    if (!token) {
      return;
    }
    let response: ContractCallResponse = await approve(chainId,walletProvider, isConnected, token, ethers.MaxUint256)
    console.log(response);
  }


  useEffect(() => {
    if (token) {
      fetchContributionData(token)
    }

  }, [token])


  return (

    <>




      <Modal className='bg-black/30' size='lg' backdrop='blur' ref={targetRef} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader {...moveProps} className="flex flex-col gap-1 items-start justify-center">
                <User name={`Contribute`}
                  classNames={{ base: "text-lime-500" }}
                  description={"Contribute to claim others’ assets."}
                  avatarProps={{
                    className: "bg-transparent",
                    src: "/assets/finger.png"
                  }} />
              </ModalHeader>
              <ModalBody>
                {
                  <div className='w-full'>
                    {
                      !token && <div className='w-full grid grid-cols-3 gap-2 items-center justify-center'>
                        {Tokens.map((token, index) => (
                          token.chainId == chainId && 
                            <div key={`token${index}`} className='w-full flex items-center justify-center'>

                              <Button
                                className="w-full bg-lime-500/40"
                                size="lg"
                                isIconOnly
                                radius="full"
                                style={{ width: '64px', height: '64px' }}
                                onPress={() => {
                                  handleSelectToken(token)
                                }}
                              >
                                <Avatar
                                  className="group  transition-transform duration-300 ease-in-out transform group-hover:scale-90"
                                  size="lg"
                                  src={token.logoURI}
                                />
                              </Button>
                            </div>
                        
                        ))}
                      </div>
                    }


                    {
                      token && <>
                        <div className='flex flex-col gap-2'>
                          <div className='w-full flex flex-row gap-2'>
                            <div className='flex items-center justify-center flex flex-col gap-2'>
                              <Button
                                className="w-full bg-lime-500/40"
                                size="lg"
                                isIconOnly
                                radius="full"
                                style={{ width: '64px', height: '64px' }}
                                onPress={() => {
                                  setToken(null)
                                }}
                              >
                                <Avatar
                                  className="group  transition-transform duration-300 ease-in-out transform group-hover:scale-90"
                                  size="lg"
                                  src={token.logoURI}
                                />
                              </Button>
                              <span className='text-xs text-lime-500 font-bold'>SELECT</span>

                            </div>
                            <div className='mt-2 w-full grid grid-cols-2 gap-2 text-xs py-2 border border-1 border-white/30  rounded-lg p-2' >
                              <div className='w-full flex flex-col'>
                                <span className='font-bold text-lime-500'>Token</span>
                                <span className='text-white'>{token.name}</span>
                              </div>
                              <div className='w-full flex flex-col'>
                                <span className='font-bold   text-lime-500'>Symbol</span>
                                <span className='text-white'>{token.symbol}</span>
                              </div>
                              <div className='w-full flex flex-col'>
                                <span className='font-bold   text-lime-500'>Decimals</span>
                                <span className='text-white'>{token.decimals}</span>
                              </div>

                              <div className='w-full flex flex-col'>
                                <span className='font-bold   text-lime-500'>Balance</span>
                                <span className='text-white'>{contributionInfo && contributionInfo.playerBalance ? parseFloat(formatUnits(contributionInfo.playerBalance, token.decimals)).toFixed(4) : "0.0000"}</span>
                              </div>

                            </div>
                          </div>



                          <div className='w-full flex flex-col gap-2'>
                            <Input
                              classNames={{
                                label: "text-black/50 dark:text-white/90",
                                input: [
                                  "bg-transparent",
                                  "text-black/90 dark:text-white/90",
                                  "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                                ],
                                innerWrapper: "bg-transparent",
                                inputWrapper: [
                                  "shadow-sm",
                                  "bg-default-200/50",
                                  "dark:bg-default/60",
                                  "backdrop-blur-xl",
                                  "backdrop-saturate-200",
                                  "hover:bg-default-200/70",
                                  "dark:hover:bg-default/70",
                                  "group-data-[focus=true]:bg-default-200/50",
                                  "dark:group-data-[focus=true]:bg-default/60",
                                  "!cursor-text",
                                ],
                              }}
                              value={title} onValueChange={setTitle} isClearable label="Title" placeholder="Enter title" size={"lg"} type="text" />
                            
                            
                            
                            <Textarea 
                            cols={2}
                            
                            classNames={{
                              label: "text-black/50 dark:text-white/90",
                              input: [
                                "bg-transparent",
                                "text-black/90 dark:text-white/90",
                                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                              ],
                              innerWrapper: "bg-transparent",
                              inputWrapper: [
                                "shadow-sm",
                                "bg-default-200/50",
                                "dark:bg-default/60",
                                "backdrop-blur-xl",
                                "backdrop-saturate-200",
                                "hover:bg-default-200/70",
                                "dark:hover:bg-default/70",
                                "group-data-[focus=true]:bg-default-200/50",
                                "dark:group-data-[focus=true]:bg-default/60",
                                "!cursor-text",
                              ],
                            }}
                            isClearable={true}
                            value={description} onValueChange={setDescription} 
                            label="Description" placeholder="Enter your description" />

                             <Input
                              classNames={{
                                label: "text-black/50 dark:text-white/90",
                                input: [
                                  "bg-transparent",
                                  "text-black/90 dark:text-white/90",
                                  "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                                ],
                                innerWrapper: "bg-transparent",
                                inputWrapper: [
                                  "shadow-sm",
                                  "bg-default-200/50",
                                  "dark:bg-default/60",
                                  "backdrop-blur-xl",
                                  "backdrop-saturate-200",
                                  "hover:bg-default-200/70",
                                  "dark:hover:bg-default/70",
                                  "group-data-[focus=true]:bg-default-200/50",
                                  "dark:group-data-[focus=true]:bg-default/60",
                                  "!cursor-text",
                                ],
                              }}
                              value={url} onValueChange={setURL} isClearable label="URL" placeholder="Enter URL" size={"lg"} type="text" />


                            <Input
                              classNames={{
                                label: "text-lime-500/50 dark:text-lime-500/90",
                                input: [
                                  "bg-transparent",
                                  "text-lime-500/90 dark:text-lime-500/90",
                                  "placeholder:text-lime-500/50 dark:placeholder:text-lime-500/60",
                                ],
                                innerWrapper: "bg-transparent",
                                inputWrapper: [
                                  "shadow-sm",

                                  "bg-default-200/50",
                                  "dark:bg-default/60",
                                  "backdrop-blur-xl",
                                  "backdrop-saturate-200",
                                  "hover:bg-default-200/70",
                                  "dark:hover:bg-default/70",
                                  "group-data-[focus=true]:bg-default-200/50",
                                  "dark:group-data-[focus=true]:bg-default/60",
                                  "!cursor-text",
                                ],
                              }}
                              value={depositAmount.toString()}
                              inputMode='decimal'
                              autoComplete="off" autoCorrect="off" type="text"
                              placeholder="Please enter amount" minLength={0} maxLength={100} spellCheck="false"
                              onValueChange={(value) => {
                                let e = value;
                                console.log(value)
                                const regex = /^[0-9]*\.?[0-9]*$/;
                                e = e.replace(",", ".")
                                if (regex.test(e)) {
                                  setDepositAmount(e)
                                }

                              }}
                              isClearable
                              label="Amount"
                              size={"lg"}
                            />

                            <Slider
                              value={isNaN(parseFloat(depositAmount)) ? 0 : parseFloat(depositAmount)} // NaN kontrolü ve geçerli sayı
                              onChange={(value) => {
                                if (typeof value === "number") {
                                  setDepositAmount(value.toFixed(4).toString());  // Sayıyı string'e dönüştürerek set ediyoruz
                                } else if (Array.isArray(value)) {
                                  setDepositAmount(value[0].toFixed(4).toString()); // Array ise ilk değeri alıyoruz ve string'e dönüştürüyoruz
                                }
                              }}
                              className="w-full"
                              size='lg'
                              getValue={(amount) => {
                                // Eğer amount bir dizi ise, ilk değeri alıyoruz ve formatlıyoruz
                                const value = Array.isArray(amount) ? amount[0] : amount;
                                return `${value.toFixed(4)} ${token.symbol}`;
                              }} maxValue={
                                contributionInfo?.playerBalance && contributionInfo.playerBalance > 0
                                  ? forceFormatUnits(contributionInfo.playerBalance, token)
                                  : 99999999 // Unlimited olarak ayarlanır
                              }
                              minValue={0}
                              step={0.1}
                            />

                          </div>

                        </div>
                      </>
                    }


                  </div>

                }

              </ModalBody>
              <ModalFooter>
                <div className='w-full grid grid-cols-2 justify-center'>
                  <div className='w-full flex flex-row items-center justify-start'>
                    <LatLngLogo />
                  </div>
                  <div className='w-full flex flex-row gap-2 justify-end'>

                    <Button isLoading={isLoading} isDisabled={!token || !depositAmount || parseFloat(depositAmount) === 0}
                      className='text-white' color="success" onPress={() => {
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
          className="w-full bg-lime-500/30"

          size="lg"
          isIconOnly
          radius="full"
          style={{ width: '84px', height: '84px' }}
          onPress={handleClick}
        >
          <Avatar
            classNames={{
              base: "p-2"

            }}
            className="group bg-lime-900/40 hover:bg-lime-900/90 transition-transform animate-wiggle  group-hover:scale-90"
            size="lg"
            src={"/assets/finger.png"}
          />
        </Button>
      </div>

    </>

  )
}

export default TapButton;

