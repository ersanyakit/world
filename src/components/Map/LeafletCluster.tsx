import {
  createElementObject,
  createPathComponent,
  extendContext,
  LeafletContextInterface,
} from '@react-leaflet/core';
import Leaflet, { LeafletMouseEventHandlerFn } from 'leaflet';

import 'leaflet.markercluster';

import { LucideProps } from 'lucide-react';
import React, { FunctionComponent } from 'react';

import { AppConfig } from '#lib/AppConfig';

import MarkerIconWrapper from './LeafletMarker/MarkerIconWrapper';
import { ethers, parseEther } from 'ethers';
import LeafletDivIcon from './LeafletDivIcon';

type ClusterEvents = {
  onClick?: LeafletMouseEventHandlerFn;
  onDblClick?: LeafletMouseEventHandlerFn;
  onMouseDown?: LeafletMouseEventHandlerFn;
  onMouseUp?: LeafletMouseEventHandlerFn;
  onMouseOver?: LeafletMouseEventHandlerFn;
  onMouseOut?: LeafletMouseEventHandlerFn;
  onContextMenu?: LeafletMouseEventHandlerFn;
};

type MarkerClusterControl = Leaflet.MarkerClusterGroupOptions & {
  children: React.ReactNode;
  icon: FunctionComponent<LucideProps>;
  color: string;
} & ClusterEvents;

const CreateMarkerClusterGroup = (
  props: MarkerClusterControl,
  context: LeafletContextInterface
) => {
  const markerClusterGroup = new Leaflet.MarkerClusterGroup({
    removeOutsideVisibleBounds: false,
    spiderLegPolylineOptions: {
      className: 'hidden',
    },
    zoomToBoundsOnClick: true,
    // @ts-ignore
    iconCreateFunction: (cluster) =>
      LeafletDivIcon({
        source: (
          <MarkerIconWrapper
            color={props.color}
            player={null}
            contribution={{
                        valid: true,
                        index: BigInt(cluster.getChildCount()),
                        deposit: parseEther("0"),
                        withdraw: parseEther("0"),
                        claims: parseEther("0"),
                        limit: parseEther("0"),
                        timestamp: Date.now(),
                        contributor: ethers.ZeroAddress, // Varsayılan contributor adresi
                        token: ethers.ZeroAddress, // Varsayılan token adresi
                        geohash: "",
                        name: '',
                        url: '', // Varsayılan URL
                        description: '',
                        color: '#000000', // Varsayılan renk
                        image: '', // Varsayılan görsel
                        claimers: [], // Başlangıçta boş claimers
                      }}
            label={`${cluster.getChildCount()}`}
          />
        ),
        anchor: [
          AppConfig.ui.markerIconSize / 2,
          AppConfig.ui.markerIconSize / 2,
        ],
      }),
    ...props,
  });

  return createElementObject(
    markerClusterGroup,
    extendContext(context, { layerContainer: markerClusterGroup })
  );
};

export const LeafletCluster = () =>
  createPathComponent<Leaflet.MarkerClusterGroup, MarkerClusterControl>(
    CreateMarkerClusterGroup
  );
