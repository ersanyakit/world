import { Bird, ChevronLeft, ChevronRight, X } from 'lucide-react'
import dynamic from 'next/dynamic'
import { Popup, PopupProps } from 'react-leaflet'

import { AppConfig } from '#lib/AppConfig'
import { MarkerCategoriesValues } from '#lib/MarkerCategories'
import { Contribution, ContributionInfo, Player } from '#src/types/Contribution'
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ScrollShadow, Tab, Tabs, Textarea, useDisclosure, useDraggable } from '@nextui-org/react'
import { MapIcon } from '#components/Icons'
import { useEffect, useRef, useState } from 'react'
import { formatEther } from 'viem'
import { ethers } from 'ethers'
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react'
import { claim, getContributionInfo } from '#src/utils/web3/util'
import { generateTweetIntentByContribution, generateTweetIntentURL, getAvatar, getTokenByAddress } from '#src/utils/helpers'
import { Unicon } from '#components/Unicon'
import { useContributionContext } from '#src/context/GlobalStateContext'
import { decodeTweetId, extractTweetId, isContribution, packTweetAndContributionIds, unpackTweetAndContributionIds } from '#lib/utils'
import { ContractCallResponse, TweetIdComponents } from '#src/types/web3.types'


interface LeafletPopupProps extends PopupProps {
  handlePopupClose: (active?: boolean) => void
  contribution: Contribution | Player
  isOpen: boolean // pass this from parent
  onOpenChange: (open: boolean) => void // pass this from parent
}


const LeafletPopup = ({
  handlePopupClose,
  contribution,
  isOpen,
  onOpenChange,
  ...props
}: LeafletPopupProps) => {

  const [name, setName] = useState<string>("")
  const [description, setDescription] = useState<string>("")

  const targetRef = useRef(null);
  const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });
  const { address, isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider('eip155');
  const [contributionInfo, setContributionInfo] = useState<ContributionInfo | null>(null);

  const { player } = useContributionContext();

  useEffect(() => {
    if (isOpen) {

      if (isContribution(contribution)) {
        setName(contribution.name)
        setDescription(contribution.description)
        loadData(contribution);
      } else {
        setName((contribution as Player).name)
        setDescription((contribution as Player).wallet)
      }
    }
  }, [isOpen])



  const loadContributionInfo = async (place: Contribution) => {
    const _contributionInfo = await getContributionInfo(place, walletProvider, isConnected, address)
    setContributionInfo(_contributionInfo)
    console.log("getContributionInfo", _contributionInfo);
    if (_contributionInfo) {
      console.log("minimumContributionAmount", formatEther(_contributionInfo.minimumContributionAmount))
      console.log("playerContribution", formatEther(_contributionInfo.minimumContributionAmount))
      console.log("totalContribution", formatEther(_contributionInfo.totalContribution))
      console.log("nextContributionAmount", formatEther(_contributionInfo.nextContributionAmount))
    }
  }

  const loadData = async (place: Contribution) => {
    await loadContributionInfo(place)
  }



  interface PlayerContentProps {
    player: Player | null;
  }

  const PlayerContent: React.FC<PlayerContentProps> = ({ player }) => {

    return (<div className='w-full p-2 rounded-lg'>

      <div className="flex flex-col gap-2 items-center justify-center">
        <img
          src={getAvatar(player ? player?.wallet : ethers.ZeroAddress)}
          alt="Map Icon"
          className={"w-[250px] h-full"}
        />
      </div>
    </div>)

  }

  interface ContributionContentProps {
    contribution: Contribution;
  }

  const ContributionContent: React.FC<ContributionContentProps> = ({ contribution }) => {
    const [tweetURL, setTweetURL] = useState("");
    const [isShared, setShared] = useState<boolean>(false)
    const [isShareLoading, setShareLoading] = useState<boolean>(false)
    const [isClaimLoading, setClaimLoading] = useState<boolean>(false)
    const [statusText, setStatusText] = useState("A tweet is awaited…")
    const [decodedTweet, setDecodedTweet] = useState<TweetIdComponents | null>(null); // Initialize with `null` or an empty object
    const handleShare = async () => {
      setShareLoading(true)
      let url = generateTweetIntentByContribution(contribution)
      window.open(url, '_blank'); // Open the URL in a new tab
      setTimeout(() => {
        setShared(true);
        setShareLoading(false)
      }, 1000);
      setStatusText("Tweet has been sent. Please enter the link.")
    }

    useEffect(() => {
      if (tweetURL.length > 0) {
        if (extractTweetId(tweetURL).length > 0) {
          setDecodedTweet(decodeTweetId(extractTweetId(tweetURL)))
          setStatusText("You can claim now.")
        } else {
          setStatusText("Invalid Tweet!")
          setDecodedTweet(null)
        }
      }

    }, [tweetURL])


    const isTweetExpired = (timestamp: any) => {
      const fiveMinutesInMs = 5 * 60 * 1000; // 5 minutes in milliseconds
      const currentTime = Date.now(); // Current time in milliseconds
      return currentTime - timestamp > fiveMinutesInMs; // Check if tweet is older than 5 minutes
    };

    const handleClaim = async () => {

      if (!decodedTweet || !decodedTweet.timestamp) {
        setStatusText("Please tweet!");
        return;
      }

      if (isTweetExpired(decodedTweet.timestamp)) {
        setStatusText("Tweet is expired, please resend.");
        return;
      }
      let contributionIndex = packTweetAndContributionIds(decodedTweet?.tweetId, contribution.index).toString()
      setShared(false)
      //export const claim = async (walletProvider: any, isConnected: any, address: any, index: any) => {
      setClaimLoading(true)

      let response: ContractCallResponse;
      setStatusText("Please wait...")
      if (isConnected) {
        try {
          response = await claim(walletProvider, isConnected, address, contributionIndex);

          if (response.success) {
            setStatusText("Claimed.")
          }else{
            setStatusText(response.error.message)
          }
        } catch (error) {
          setStatusText("Exception!")

        }
      } else {
        setStatusText("Wallet is not connected.");
      }
      setClaimLoading(false)
    }
    return (
      <>
        <Tabs color='success' variant='light'>
          <Tab key={"info"} title={"Task"}>
            <div className='w-full p-0 flex flex-col gap-2'>
              <div className='w-full flex flex-col gap-2 rounded-lg '>
                {
                  contribution?.index < ethers.MaxUint256 && <>
                    <div className='mt-2 w-full grid grid-cols-3 gap-2 text-xs py-2 rounded-lg p-2' >
                      <div className='w-full flex flex-col'>
                        <span className='font-bold text-lime-500'>Total Claims</span>
                        <span className='text-purple-500 text-xs  text-center'>{Number(contribution.claims)}</span>
                      </div>
                      <div className='w-full flex flex-col'>
                        <span className='font-bold text-lime-500'>Maximum Claims</span>
                        <span className='text-purple-500 text-xs text-center'>{Number(contribution.limit)}</span>
                      </div>
                      <div className='w-full flex flex-col'>
                        <span className='font-bold text-lime-500'>Total Contribution</span>
                        <span className='text-purple-500 text-xs  text-center'>{contributionInfo ? ethers.formatUnits(contributionInfo?.totalContribution, getTokenByAddress(contribution.token)?.decimals) : ""}</span>
                      </div>


                    </div>

                  </>
                }



                <div className='w-full p-2 gap-2 flex flex-col'>

                  <Textarea
                    maxRows={3}
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
                    isReadOnly={true} label="Task" value={contribution.description} endContent={
                      <Button
                        isLoading={isShareLoading}
                        className="text-white"
                        variant="shadow"
                        size='sm'
                        color="danger"
                        onPress={handleShare}
                      >
                        {isShareLoading ? "Verifying..." : "Send Tweet"}
                      </Button>
                    } />




                  <Input
                    size='lg'
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
                    startContent={<Bird />} label="Tweet URL" placeholder="Enter tweet URL" value={tweetURL} onValueChange={setTweetURL} />




                  <div className='w-full flex flex-row gap-2 items-center justify-between'>
                    <div className='w-full flex flex-col gap-2'>
                      <span className='text-lime-500 text-xs'>{extractTweetId(tweetURL)}</span>
                      <div className='w-full flex  flex-col gap-2'>
                        <span className='text-danger text-xs'>Status:</span>
                        <span className='text-success text-xs'>{statusText}</span>
                      </div>
                      <div className='w-full flex flex-col gap-2 hidden'>
                        <div className='w-full flex  flex-col gap-2'>
                          <span className='text-danger text-xs'>Tweet:</span>
                          <span className='text-success text-xs'>{decodedTweet?.tweetId.toString()}</span>
                        </div>
                        <div className='w-full flex  flex-col gap-2'>
                          <span className='text-danger text-xs'>Timestamp:</span>
                          <span className='text-success text-xs'>{decodedTweet?.timestamp}</span>
                        </div>
                        <div className='w-full flex  flex-col gap-2'>
                          <span className='text-danger text-xs'>sequence:</span>
                          <span className='text-success text-xs'>{decodedTweet?.sequence}</span>
                        </div>
                        <div className='w-full flex  flex-col gap-2'>
                          <span className='text-danger text-xs'>machineId:</span>
                          <span className='text-success text-xs'>{decodedTweet?.machineId}</span>
                        </div>

                        <div className='w-full flex  flex-col gap-2'>
                          <span className='text-danger text-xs'>packedData: Tweet{Number(contribution.index)}</span>
                          {
                            decodedTweet && <span className='text-success text-xs'>{packTweetAndContributionIds(decodedTweet?.tweetId, contribution.index).toString()}</span>
                          }
                          <span className='text-danger text-xs'>unpacked CID:</span>
                          {
                            decodedTweet && <span className='text-success text-xs'>{unpackTweetAndContributionIds(packTweetAndContributionIds(decodedTweet?.tweetId, contribution.index)).claimId.toString()}</span>
                          }
                          <span className='text-danger text-xs'>unpacked TweetID:</span>
                          {
                            decodedTweet && <span className='text-success text-xs'>{unpackTweetAndContributionIds(packTweetAndContributionIds(decodedTweet?.tweetId, contribution.index)).tweetId.toString()}</span>
                          }
                        </div>

                      </div>
                    </div>


                    <Button
                      size='md'

                      isDisabled={extractTweetId(tweetURL).length == 0}
                      isLoading={isClaimLoading}
                      className="text-white min-w-[120px]"
                      variant="shadow"
                      color="success"
                      onPress={handleClaim}
                    >
                      Claim Reward
                    </Button>
                  </div>


                </div>

              </div>

            </div>

          </Tab>
          <Tab key={"claims"} title={"Claims"}>
            <div className='w-full flex flex-col gap-2 rounded-lg p-2'>
              <span className='w-full text-lime-500'>Claimers</span>

              <ScrollShadow className='max-h-[200px]' hideScrollBar={true}>
                <div className='flex flex-col gap-2 p-2'>
                  {contribution.claimers.map((claimer, index) => (
                    <div className='w-full flex flex-row gap-2 items-center justify-center bg-black p-2 rounded-lg' key={`claim${index}`}>
                      <div className="w-full flex flex-row gap-2 items-center justify-start">
                        <div className="animate-spin bg-black/20 shadow-small border-1 border-success-100 rounded-full p-2">
                          <Unicon size={24} address={claimer} randomSeed={Number(index)} />
                        </div>
                        <div className="w-full flex flex-col gap-1">
                          <span className='text-sm font-bold text-lime-500'>{"Millionarie"}</span>
                          <span className='text-xs font-sans  text-fuchsia-400'>{claimer}</span>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              </ScrollShadow>

            </div>
          </Tab>
        </Tabs>


      </>
    )
  }



  return (
    <Modal scrollBehavior='inside' className='bg-black/50' ref={targetRef} size='lg' backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader  {...moveProps} className="flex flex-row items-center justify-start gap-1 text-lime-500">
              <MapIcon player={null} contribution={contribution} width={64} height={86} />


              <span>{contribution.name}</span>
            </ModalHeader>
            <ModalBody className='flex flex-col gap-2'>
              {
                isContribution(contribution) ? <ContributionContent contribution={contribution} />
                  : <PlayerContent player={contribution} />
              }



            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>


            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default LeafletPopup
