import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import dynamic from 'next/dynamic'
import { Popup, PopupProps } from 'react-leaflet'

import { AppConfig } from '#lib/AppConfig'
import { MarkerCategoriesValues } from '#lib/MarkerCategories'
import { Contribution, ContributionInfo } from '#src/types/Contribution'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ScrollShadow, useDisclosure, useDraggable } from '@nextui-org/react'
import { MapIcon } from '#components/Icons'
import { useEffect, useRef, useState } from 'react'
import { formatEther } from 'viem'
import { ethers } from 'ethers'
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react'
import { claim, getContributionInfo } from '#src/utils/web3/util'
import { generateTweetIntentByContribution, generateTweetIntentURL, getTokenByAddress } from '#src/utils/helpers'
import { Unicon } from '#components/Unicon'
import { useContributionContext } from '#src/context/GlobalStateContext'


interface LeafletPopupProps extends PopupProps {
  handlePopupClose: (active?: boolean) => void
  contribution: Contribution
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
  const { name, description } = contribution
  const targetRef = useRef(null);
  const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });
  const { address, isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider('eip155');
  const [contributionInfo, setContributionInfo] = useState<ContributionInfo | null>(null);
  const [isShared, setShared] = useState<boolean>(false)
  const [isShareLoading, setShareLoading] = useState<boolean>(false)
  const [isClaimLoading, setClaimLoading] = useState<boolean>(false)
  const { player } = useContributionContext();

  useEffect(() => {
    if (isOpen) {
      loadData(contribution);
      setShared(false)
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

  const handleShare = async () => {
    setShareLoading(true)
    let url = generateTweetIntentByContribution(contribution)
    window.open(url, '_blank'); // Open the URL in a new tab
    setTimeout(() => {
      setShared(true);
      setShareLoading(false)
    }, 10000);
  }


  const handleClaim = async () => {
    setShared(false)
    //export const claim = async (walletProvider: any, isConnected: any, address: any, index: any) => {
    setClaimLoading(true)
    await claim(walletProvider, isConnected, address, contribution.index);
    setClaimLoading(false)


  }



  return (
    <Modal scrollBehavior='inside' className='bg-black/30' ref={targetRef} size='lg' backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader  {...moveProps} className="flex flex-row items-center justify-start gap-1 text-lime-500">
              <MapIcon player={null} contribution={contribution} width={64} height={86} />


              <span>{contribution.name}</span>
            </ModalHeader>
            <ModalBody className='flex flex-col gap-2'>
              <p className='text-red-500 text-center bg-black/50 p-2 rounded-lg'>
                {contribution.description}
              </p>

              <div className='w-full flex flex-col gap-2 rounded-lg bg-black/50'>
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
                        <span className='text-purple-500 text-xs  text-center'>{contributionInfo ? ethers.formatUnits(contributionInfo?.totalContribution,getTokenByAddress(contribution.token)?.decimals) : ""}</span>
                      </div>
                
                      
                    </div>
                   
                  </>
                }
             
              </div>
              <div className='w-full p-2 rounded-lg bg-danger/50 hidden'>
                      <span className=' text-white text-center text-sm'>Total number of contributions must be greater than total number of claims.</span>
                    </div>
              {
                contribution?.index < ethers.MaxUint256 &&
                <div className='w-full flex flex-col gap-2 bg-black/50 rounded-lg p-2'>
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
              }

            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              {
                contribution?.index < ethers.MaxUint256 && (
                  <>
                    <Button
                      isLoading={isShareLoading}
                      isDisabled={isShared}
                      className="text-white"
                      variant="shadow"
                      color="success"
                      onPress={handleShare}
                    >
                      {isShareLoading ?  "Verifying..." : "Tweet to Claim"}
                    </Button>
                    <Button
                      isDisabled={!isShared}
                      isLoading={isClaimLoading}
                      className="text-white"
                      variant="shadow"
                      color="success"
                      onPress={handleClaim}
                    >
                      Claim
                    </Button>
                  </>
                )
              }

            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default LeafletPopup
