import { LatLngExpression } from 'leaflet'
import { LocateFixed } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

import { AppConfig } from '#lib/AppConfig'
import { Category } from '#lib/MarkerCategories'

import { CustomMarker } from '../LeafletMarker'
import useMapContext from '../useMapContext'
import { Button } from '@nextui-org/react'
import { encodeGeoHash } from '#lib/helper/geocoder'
import { ethers } from 'ethers'

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
        className=" absolute top-[138px] right-3 p-2  "
        onPress={() => handleClick()}
      >
        <LocateFixed size={AppConfig.ui.mapIconSize} />
      </Button>
      {userPosition && (
        <CustomMarker
          place={{
            valid: true,
            index: 0,
            deposit: 0,
            withdraw: 0,
            claims: 0,
            limit: 0,
            timestamp: Date.now(),
            contributor: ethers.ZeroAddress, // Varsayılan contributor adresi
            token: ethers.ZeroAddress, // Varsayılan token adresi
            geohash: encodeGeoHash(userPosition),
            name: 'Your Location',
            url: '', // Varsayılan URL
            description: 'You are here.',
            color: '#000000', // Varsayılan renk
            image: '', // Varsayılan görsel
            claimers: [], // Başlangıçta boş claimers
          }}
        />
      )}
    </>
  )
}
