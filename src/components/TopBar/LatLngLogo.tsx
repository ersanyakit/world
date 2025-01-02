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
    <div className="flex gap-2 text-lg font-black leading-none  md:text-2xl md:leading-none">
      <div className="flex items-center">
        <Compass size={36} className="text-primary-500 " />
      </div>
      <div className="flex items-center">
        {lat}<span>,</span>{lng}
      </div>
    </div>
  )
}

export default LatLngLogo
