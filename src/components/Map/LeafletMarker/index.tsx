"use client"
import dynamic from 'next/dynamic';
import React, { useCallback, useMemo, useState } from 'react';
import { Marker as ReactMarker } from 'react-leaflet';

import { AppConfig } from '#lib/AppConfig';
import MarkerCategories from '#lib/MarkerCategories';
import { PlaceValues } from '#lib/Places';

import useMapContext from '../useMapContext';
import MarkerIconWrapper from './MarkerIconWrapper';
import { Contribution, ContributionInfo, Player } from '#src/types/Contribution';
import Geohash from 'ngeohash';
import { LatLngExpression } from 'leaflet';
import { decodeGeoHash } from '#lib/helper/geocoder';
import { claim, getContributionInfo } from '#src/utils/web3/util';
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react';

import LeafletDivIcon from '../LeafletDivIcon';
import { formatEther } from 'ethers';
import { useContributionContext } from '#src/context/GlobalStateContext';
import { generateAlphaColorFromIndex } from '#src/utils/helpers';
import { isContribution } from '#lib/utils';

const LeafletPopup = dynamic(() => import('../LeafletPopup'));


export interface CustomMarkerProps {
  place: Contribution | Player;
}

export const CustomMarker = ({ place }: CustomMarkerProps) => {
  const { map } = useMapContext();
  const { player } = useContributionContext();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const markerCategory = useMemo(() => {
      return isContribution(place) ? place.token : place.wallet;
    }, [place]);

  const handlePopupClose = useCallback(() => {
    if (!map) return;
    map?.closePopup();
  }, [map]);


 
  const handleMarkerClick = useCallback(() => {
    if (!map) return;
   // const clampZoom = map.getZoom();// <  AppConfig.maxZoom ? 14 : 14;
   // map.setView(decodeGeoHash(place.geohash), clampZoom, { animate: false });
    setIsModalOpen(true);

  }, [map]);



  return (
    <ReactMarker
    key={`entry${place.geohash}${place.index}${place.name}`}
      position={decodeGeoHash(place.geohash,isContribution(place) ? place.geohash : place.wallet)}
      // @ts-ignore
      icon={LeafletDivIcon({
        source: (
          <MarkerIconWrapper
            color={generateAlphaColorFromIndex(place.index)}
            contribution={place}
            player={player}
           
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
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        closeButton={false}
        contribution={place}
        handlePopupClose={handlePopupClose}
      />
    </ReactMarker>
  );
};
