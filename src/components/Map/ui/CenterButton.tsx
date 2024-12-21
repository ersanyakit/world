import { Button } from '@nextui-org/react'

import { LatLngExpression } from 'leaflet'
import { Shrink } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useMapEvents } from 'react-leaflet'

import { AppConfig } from '#lib/AppConfig'

import useMapContext from '../useMapContext'

interface CenterButtonProps {
  center: LatLngExpression
  zoom: number
}

export const CenterButton = ({ center, zoom }: CenterButtonProps) => {
  const [isTouched, setIsTouched] = useState(false)
  const { map } = useMapContext()

  const touch = useCallback(() => {
    if (!isTouched && map) {
      setIsTouched(true)
    }
  }, [isTouched, map])

  useMapEvents({
    move() {
      touch()
    },
    zoom() {
      touch()
    },
  })

  const handleClick = useCallback(() => {
    if (!isTouched || !map) return

    map.flyTo(center, zoom)
    map.once('moveend', () => {
      setIsTouched(false)
    })
  }, [map, isTouched, zoom, center])

  return (
    <Button
    isIconOnly
    size='lg'
    color='primary'
    variant='shadow'
    radius='full'
    style={{ zIndex: 400 }}

      className={`absolute top-2 right-3   p-2 `}
      onPress={() => handleClick()}
    >
      <Shrink size={AppConfig.ui.mapIconSize} />
    </Button>
  )
}
