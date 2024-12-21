import { LatLngExpression } from 'leaflet'
import { LocateFixed } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

import { AppConfig } from '#lib/AppConfig'
import { Category } from '#lib/MarkerCategories'

import { CustomMarker } from '../LeafletMarker'
import useMapContext from '../useMapContext'
import { Button } from '@nextui-org/react'

export const LocateButton = () => {
  const { map } = useMapContext()
  const [userPosition, setUserPosition] = useState<LatLngExpression | undefined>(undefined)

  const handleClick = useCallback(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        setUserPosition([position.coords.latitude, position.coords.longitude])
      })
    } else {
      setUserPosition(undefined)
    }
  }, [])

  useEffect(() => {
    if (userPosition) {
      map?.flyTo(userPosition)
    }
  }, [map, userPosition])

  return (
    <>
      <Button
          size='lg'
          color='primary'
          variant='shadow'
          isIconOnly
          radius='full'
        style={{ zIndex: 400 }}
        className=" absolute top-16 right-3 p-2  "
        onClick={() => handleClick()}
      >
        <LocateFixed size={AppConfig.ui.mapIconSize} />
      </Button>
      {userPosition && (
        <CustomMarker
          place={{
            id: 0,
            title: 'Your location',
            address: 'You are here',
            position: userPosition,
            category: Category.LOCATE,
          }}
        />
      )}
    </>
  )
}
