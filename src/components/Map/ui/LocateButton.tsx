import { LatLngExpression } from 'leaflet'
import { LocateFixed } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

import { AppConfig } from '#lib/AppConfig'
import { Category } from '#lib/MarkerCategories'

import { CustomMarker } from '../LeafletMarker'
import useMapContext from '../useMapContext'
import { Button } from '@nextui-org/react'
import { encodeGeoHash } from '#lib/helper/geocoder'
import { ethers, parseEther } from 'ethers'
import { useAppKitAccount } from '@reown/appkit/react'
import { useContributionContext } from '#src/context/GlobalStateContext'
import { useChainId } from '#src/context/ChainIdProvider'

export const LocateButton = () => {
  const { map } = useMapContext()
  const [userPosition, setUserPosition] = useState<LatLngExpression | undefined>(undefined)
  const { address, isConnected } = useAppKitAccount();
  const {player, balances, location, contributions, players, claims, assets,addLocation } = useContributionContext();
  const chainId = useChainId()
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
  }, [map, userPosition,player])

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
      {userPosition && player && (
        <CustomMarker
        chainId={chainId}
          place={player}
        />
      )}
    </>
  )
}
