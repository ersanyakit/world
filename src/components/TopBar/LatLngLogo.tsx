import Leaflet from 'leaflet'
import { Compass } from 'lucide-react'
import { useEffect, useState } from 'react'

import useMapContext from '#components/Map/useMapContext'

const LatLngLogo = () => {
  const { map } = useMapContext()
  const [location, setLocation] = useState<Leaflet.LatLng | undefined>()
  const lat = location?.lat.toFixed(4)
  const lng = location?.lng.toFixed(4)

  useEffect(() => {
    if (!map) return undefined

    setLocation(map.getCenter())

    map?.on('move', () => {
      setLocation(map.getCenter())
    })


  }, [map])

  return (
    <div className="w-full flex flex-row gap-2 text-md font-black">
      <div className="flex items-center">
        <Compass size={24} className="text-primary-500 " />
      </div>
      <div className="flex items-center text-primary">
        {lat}<span>,</span>{lng}
      </div>
    </div>
  )
}

export default LatLngLogo
