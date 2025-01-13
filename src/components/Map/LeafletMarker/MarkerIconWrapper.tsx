"use client"
import { Contribution, Player } from '#src/types/Contribution'

import { MapIcon } from '#components/Icons';


export interface MarkerIconWrapperProps {
  contribution?: Contribution
  player: Player | null
  color: string
  label?: string
}


const MarkerIconWrapper = ({ contribution,player, color, label }: MarkerIconWrapperProps) => {

  return (
    <div className="relative m-0 inline-flex p-0">
     
        <span className="absolute -inset-2 rounded-full opacity-40" style={{ backgroundColor: color }} />
   
      <div
        className="relative inline-block rounded-full  p-2 text-white"
        style={{ backgroundColor: color }}
      >
        {contribution  && <MapIcon player={player} width={64} height={86} contribution={contribution} />}
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

export default MarkerIconWrapper
