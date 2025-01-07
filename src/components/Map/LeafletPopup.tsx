import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import dynamic from 'next/dynamic'
import { Popup, PopupProps } from 'react-leaflet'

import { AppConfig } from '#lib/AppConfig'
import { MarkerCategoriesValues } from '#lib/MarkerCategories'
import { Contribution, ContributionInfo } from '#src/types/Contribution'
import { Button } from '@nextui-org/react'
import { MapIcon } from '#components/Icons'
import { useEffect } from 'react'
import { formatEther } from 'viem'
import { ethers } from 'ethers'


interface LeafletPopupProps extends PopupProps {
  handlePopupClose: (active?: boolean) => void
  handleOpenLocation: () => void
  contribution: Contribution,
  contributionInfo: ContributionInfo | null
}

const LeafletPopup = ({
  handlePopupClose,
  handleOpenLocation,
  contribution,
  contributionInfo,
  ...props
}: LeafletPopupProps) => {
  const { name, description } = contribution



  return (
    <Popup {...props}>
      <div
        className="absolute bg-white shadow rounded-lg shadow-lg p-2"
        style={{
          marginLeft: `calc(-150px + ${AppConfig.ui.markerIconSize - 5}px)`,
          marginTop: -140,
        }}
      >
        <div className="flex flex-row justify-center pt-3" style={{ width: '300px' }}>
          <Button
            radius='full'
            isIconOnly
            variant='light'
            className="absolute right-3 top-3 inline-block text-dark z-[99999]"
            onPress={() => handlePopupClose(false)}
            size='sm'>
            <X className='z-1' size={AppConfig.ui.markerIconSize} />
          </Button>
          <div className="absolute left-0 top-0 mt-5 flex w-full justify-center">
            <div className='w-full flex items-center justify-center gap-2'>
              <MapIcon player={null} contribution={contribution} width={64} height={86}/>
            </div>
          </div>
         
          <div
            className="flex w-full flex-col justify-center p-3 pt-10 font-orbitron"
            style={{ marginTop: AppConfig.ui.markerIconSize * 2 + 8 }}>
              <div className='w-full text-center'>
            <h3 className="m-0 text-lg font-bold leading-none">{name}</h3>
            <p className="m-0 text-secondary">{description}</p>
            </div>

            {
               contribution?.index < ethers.MaxUint256 && <>
                      <div className='mt-2 w-full grid grid-cols-2 gap-2 text-xs py-2 border border-1 rounded-lg p-2' >
                        <div className='w-full flex flex-col'>
                        <span  className='font-bold'>Total Claims</span>
                        <span>{Number(contribution.claims)}</span>
                        </div>
                        <div className='w-full flex flex-col'>
                        <span  className='font-bold'>Maximum Claims</span>
                        <span>{Number(contribution.limit)}</span>
                        </div>
                        <div className='w-full flex flex-col'>
                        <span className='font-bold'>Total Contribution</span>
                        <span>{contributionInfo ?  ethers.formatEther(contributionInfo?.totalContribution) : ""}</span>
                        </div>
                        <div className='w-full flex flex-col hidden' >
                        <span  className='font-bold'>Your Contribution</span>
                        <span>{contributionInfo ? ethers.formatEther(contributionInfo?.playerContribution) :""}</span>
                        </div>
                        </div>
               </>
            }
     
          

            <div className="mt-6 flex flex-row justify-between gap-2 p-2">
              <Button variant='shadow' className="gap-2 bg-danger text-white" onPress={() => handlePopupClose()} size='md'>
                <ChevronLeft size={AppConfig.ui.menuIconSize} />
                Close
              </Button>
              {
               contribution?.index < ethers.MaxUint256 && <Button variant='shadow' color='success' className="gap-2 text-white" onPress={() => handleOpenLocation()} size='md'>
               Open
               <ChevronRight size={AppConfig.ui.menuIconSize} />
             </Button>
              }
              
            </div>
          </div>
        </div>
      </div>
    </Popup>
  )
}

export default LeafletPopup
