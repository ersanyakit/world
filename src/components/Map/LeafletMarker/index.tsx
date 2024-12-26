import dynamic from 'next/dynamic';
import React, { useCallback, useMemo } from 'react';
import { Marker as ReactMarker } from 'react-leaflet';

import { AppConfig } from '#lib/AppConfig';
import MarkerCategories from '#lib/MarkerCategories';
import { PlaceValues } from '#lib/Places';

import LeafletDivIcon from '../LeafletDivIcon';
import useMapContext from '../useMapContext';
import MarkerIconWrapper from './MarkerIconWrapper';
import { Contribution } from '#src/types/Contribution';
import Geohash from 'ngeohash';
import { LatLngExpression } from 'leaflet';
import { decodeGeoHash } from '#lib/helper/geocoder';

const LeafletPopup = dynamic(() => import('../LeafletPopup'));

export interface CustomMarkerProps {
  place: Contribution;
}

export const CustomMarker = ({ place }: CustomMarkerProps) => {
  const { map } = useMapContext();
  const markerCategory = useMemo(
    () => place.token,
    [place.token]
  );

  const handlePopupClose = useCallback(() => {
    if (!map) return;
    map?.closePopup();
  }, [map]);

  const handleMarkerClick = useCallback(() => {
    if (!map) return;
    const clampZoom = map.getZoom() < 14 ? 14 : undefined;
    map.setView(decodeGeoHash(place.geohash), clampZoom);
  }, [map, place.geohash]);

  // some event for the inner popup cta
  const handleOpenLocation = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log('open location');
  }, []);

  return (
    <ReactMarker
      position={decodeGeoHash(place.geohash)}
      // @ts-ignore
      icon={LeafletDivIcon({
        source: (
          <MarkerIconWrapper
            color={place.color}
            icon={MarkerCategories[1].icon}
          />
        ),
        anchor: [
          AppConfig.ui.markerIconSize / 2,
          AppConfig.ui.markerIconSize / 2,
        ],
      })}
      eventHandlers={{ click: handleMarkerClick }}
      autoPan={false}
      autoPanOnFocus={false}
    >
      <LeafletPopup
        autoPan={false}
        autoClose
        closeButton={false}
        item={place}
        color={place.color}
        icon={MarkerCategories[1].icon}
        handleOpenLocation={handleOpenLocation}
        handlePopupClose={handlePopupClose}
      />
    </ReactMarker>
  );
};
