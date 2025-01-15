"use client"
import { Contribution, Player } from '#src/types/Contribution'

import { MapIcon } from '#components/Icons';
import { isContribution } from '#lib/utils';
import { Image } from '@nextui-org/react';


export interface MarkerIconWrapperProps {
  contribution?: Contribution | Player
  player: Player | null
  color: string
  label?: string
  chainId:number
}


const PlayerIcon = ({ chainId, player }: { chainId:number, player: Player }) => {
  return (
    <MapIcon chainId={chainId} player={null} width={64} height={86} contribution={player} />
  )
}

const ContributionIcon = ({ chainId,contribution, player, color, label }: {chainId:number, contribution: Contribution, player: Player | null, color: string, label: string | undefined }) => {
  return (
    <div className="relative m-0 inline-flex p-0">

      <span className="absolute -inset-2 rounded-full opacity-40" style={{ backgroundColor: color }} />

      <div
        className="relative inline-block rounded-full  p-2 text-white"
        style={{ backgroundColor: color }}
      >
        {contribution && <MapIcon chainId={chainId} player={player} width={64} height={86} contribution={contribution} />}
        {label && (
          <span className="absolute -top-2 -right-2 flex h-7 w-7 flex-col items-center rounded-full border-2 border-white bg-red-500 pt-1 text-xs">
            {label}
          </span>
        )}
      </div>
      <span className={`absolute ${label ? '-inset-2' : '-inset-1'} rounded-full shadow-md`} />
    </div>
  )
}


const MarkerIconWrapper = ({chainId, contribution, player, color, label }: MarkerIconWrapperProps) => {

  const checkIsContribution = isContribution(contribution);

  return (
  checkIsContribution ? <ContributionIcon chainId={chainId} key={`rand${contribution.contributor}-${contribution.index}`} contribution={contribution} player={player} color={color} label={label}/> : <PlayerIcon chainId={chainId} key={`play${player?.wallet}-${player?.index}`} player={contribution as Player}/>

  )
}

export default MarkerIconWrapper
/*


    <div>

      <div className="shadow"></div>
      <div className="pulse"></div>
      <div className="pin-wrap">
        <div className="pin">
          
        </div>
        <img className='pin-image' src={"/assets/icons/0.png"}/>

      </div>
    </div>
*/
 