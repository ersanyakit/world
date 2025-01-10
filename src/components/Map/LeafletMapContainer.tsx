import { MapOptions } from 'leaflet'
import { useEffect } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'

import useMapContext from './useMapContext'

interface LeafletMapContainerProps extends MapOptions {
  children: JSX.Element | JSX.Element[]
}

export const LeafletMapContainer = ({ children, ...props }: LeafletMapContainerProps) => {
  const { setMap, setLeafletLib } = useMapContext()

  useEffect(() => {
    if (!setLeafletLib) return
    import('leaflet').then(leaflet => {
      setLeafletLib(leaflet)
    })
  }, [setLeafletLib])

  return (
    <MapContainer
      zoomControl={false}
      ref={e => setMap && setMap(e || undefined)}
      className="absolute h-full w-full text-white outline-0"
      {...props}
    >
 


    


    
 <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
 

    <TileLayer
      attribution=''
      url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
    />

    



      {children}
    </MapContainer>
  )
}
