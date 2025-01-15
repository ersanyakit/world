import Leaflet from 'leaflet'
import { Compass } from 'lucide-react'
import { useEffect, useState } from 'react'

import useMapContext from '#components/Map/useMapContext'
import { useContributionContext } from '#src/context/GlobalStateContext'

const LatLngLogo = () => {
  const { map } = useMapContext()
  const {location, contributions, players, claims, assets,addLocation } = useContributionContext();
  const lat = location?.lat.toFixed(4)
  const lng = location?.lng.toFixed(4)


  useEffect(() => {
    if (!map) return undefined

    addLocation(map.getCenter())

    map?.on('move', () => {
      addLocation(map.getCenter())
    })


  }, [map])

  return (
    <div className="w-full flex flex-row gap-2 text-md font-black">
      <div className="flex items-center">
        <Compass size={24} className="text-lime-500 " />
      </div>
      <div className="flex items-center text-lime-500">
        {lat}<span>,</span>{lng} 
      </div>
    </div>
  )
}

export default LatLngLogo
