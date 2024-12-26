import { LatLngExpression, Map } from 'leaflet'
import { useEffect, useMemo, useState } from 'react'
import Geohash from 'ngeohash';

import useMapContext from '#components/Map/useMapContext'
import { AppConfig } from '#lib/AppConfig'
import { PlacesClusterType, PlacesType } from '#lib/Places'
import { Contribution } from '#src/types/Contribution'

interface useMapDataValues {
  locations?: Contribution[]
  map?: Map
  viewportWidth?: number
  viewportHeight?: number
}

interface allMarkerPosValues {
  minZoom: number
  centerPos: LatLngExpression
}

const useMarkerData = ({ locations, map, viewportWidth, viewportHeight }: useMapDataValues) => {
  const [allMarkersBoundCenter, setAllMarkersBoundCenter] = useState<allMarkerPosValues>({
    minZoom: AppConfig.minZoom - 5,
    centerPos: AppConfig.baseCenter,
  })
  const { leafletLib } = useMapContext()

  // get bounds of all markers
  const allMarkerBounds = useMemo(() => {
    if (!locations || !leafletLib) return undefined

    const coordsSum: LatLngExpression[] = []
    locations.forEach(item => {
      let decodedGeoHash = Geohash.decode(item.geohash)
      let position: LatLngExpression = [decodedGeoHash.latitude, decodedGeoHash.longitude];
      coordsSum.push(position)
    })
    return leafletLib.latLngBounds(coordsSum)
  }, [leafletLib, locations])

  const clustersByCategory = useMemo(() => {
    if (!locations) return undefined

    const groupedLocations = locations.reduce<PlacesClusterType>((acc, location) => {
      const { token } = location
      if (!acc[token]) {
        acc[token] = []
      }
      acc[token].push(location)
      return acc
    }, {})

    const mappedClusters = Object.keys(groupedLocations).map(key => ({
      category: Number(key),
      markers: groupedLocations[key],
    }))

    return mappedClusters
  }, [locations])

  // auto resize map to fit all markers on viewport change
  // it's crucial to set viewport size as dependecy to trigger the map resize
  useEffect(() => {
    if (!allMarkerBounds || !map) return
    if (!viewportWidth || !viewportHeight) return


    try{
      map.invalidateSize()
      setAllMarkersBoundCenter({
        minZoom: map.getBoundsZoom(allMarkerBounds),
        centerPos: [allMarkerBounds.getCenter().lat, allMarkerBounds.getCenter().lng],
      })
  } catch (error) {
    console.error("Error in map or bounds handling:", error);
  }

 
  }, [allMarkerBounds, map, viewportWidth, viewportHeight])

  return { clustersByCategory, allMarkersBoundCenter }
}

export default useMarkerData
