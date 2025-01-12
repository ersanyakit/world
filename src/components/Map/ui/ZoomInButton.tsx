import { LatLngExpression } from 'leaflet'
import { LocateFixed, ZoomIn } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

import { AppConfig } from '#lib/AppConfig'
import { Category } from '#lib/MarkerCategories'

import { CustomMarker } from '../LeafletMarker'
import useMapContext from '../useMapContext'
import { Button } from '@nextui-org/react'

export const ZoomInButton = () => {
  const { map } = useMapContext()
  const [userPosition, setUserPosition] = useState<LatLngExpression | undefined>(undefined)

  const handleClick = useCallback(() => {
    map?.zoomIn()
  }, [])

  useEffect(() => {
    if (userPosition) {
      map?.flyTo(userPosition,undefined,{animate:false})
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
        className=" absolute top-[264px] right-3 p-2  "
        onPress={() => handleClick()}
      >
        <ZoomIn size={AppConfig.ui.mapIconSize} />
      </Button>
    </>
  )
}
