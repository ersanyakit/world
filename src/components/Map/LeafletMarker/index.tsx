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

const LeafletPopup = dynamic(() => import('../LeafletPopup'));


export interface CustomMarkerProps {
  place: Contribution;
}

export const CustomMarker = ({ place }: CustomMarkerProps) => {
  const { map } = useMapContext();
      const { address, isConnected } = useAppKitAccount();
      const { walletProvider } = useAppKitProvider('eip155');
      const [contributionInfo, setContributionInfo] = useState<ContributionInfo | null>(null);

  const markerCategory = useMemo(
    () => place.token,
    [place.token]
  );

  const handlePopupClose = useCallback(() => {
    if (!map) return;
    map?.closePopup();
  }, [map]);

  const loadContributionInfo = async(place:Contribution)=>{
    const _contributionInfo = await getContributionInfo(place,walletProvider,isConnected,address)
    setContributionInfo(_contributionInfo)
    console.log("getContributionInfo",_contributionInfo);
    if(_contributionInfo){
      console.log("minimumContributionAmount",formatEther(_contributionInfo.minimumContributionAmount))
      console.log("playerContribution",formatEther(_contributionInfo.minimumContributionAmount))
      console.log("totalContribution",formatEther(_contributionInfo.totalContribution))
      console.log("nextContributionAmount",formatEther(_contributionInfo.nextContributionAmount))
    }
  }

  const handleMarkerClick = useCallback(() => {
    if (!map) return;
    loadContributionInfo(place);
    const clampZoom = map.getZoom() < 14 ? 14 : undefined;
    map.setView(decodeGeoHash(place.geohash), clampZoom);
  }, [map, place.geohash]);

  const handleOpenLocation = useCallback(() => {
    const openLocation = async () => {
      try {
        await claim(walletProvider, isConnected, address, place.index);
        console.log('open location');
      } catch (error) {
        console.error('Error in open location:', error);
      }
    };
  
    openLocation();
  }, [place.index, claim]);

  return (
    <ReactMarker
      position={decodeGeoHash(place.geohash)}
      // @ts-ignore
      icon={LeafletDivIcon({
        source: (
          <MarkerIconWrapper
            color={place.color}
            contribution={place}
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
        contribution={place}
        contributionInfo={contributionInfo}
        handleOpenLocation={handleOpenLocation}
        handlePopupClose={handlePopupClose}
      />
    </ReactMarker>
  );
};
