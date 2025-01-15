import BottomBar from '#components/BottomBar';
import MarkerCategories, { Category } from '#lib/MarkerCategories';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { AppConfig } from '../../lib/AppConfig';
import MapTopBar from '../TopBar';
import LeafleftMapContextProvider from './LeafletMapContextProvider';
import DrawerPanel from './ui/DrawerPanel';
import useMapContext from './useMapContext';
import useMarkerData from './useMarkerData';
import { useContributionContext } from '#src/context/GlobalStateContext';
import { useChainId } from '#src/context/ChainIdProvider';

const LeafletCluster = dynamic(
  async () => (await import('./LeafletCluster')).LeafletCluster(),
  {
    ssr: false,
  }
);
const CenterToMarkerButton = dynamic(
  async () => (await import('./ui/CenterButton')).CenterButton,
  {
    ssr: false,
  }
);
const CustomMarker = dynamic(
  async () => (await import('./LeafletMarker')).CustomMarker,
  {
    ssr: false,
  }
);
const LocateButton = dynamic(
  async () => (await import('./ui/LocateButton')).LocateButton,
  {
    ssr: false,
  }
);
const LeafletMapContainer = dynamic(
  async () => (await import('./LeafletMapContainer')).LeafletMapContainer,
  {
    ssr: false,
  }
);

const ZoomInButton = dynamic(
  async () => (await import('./ui/ZoomInButton')).ZoomInButton,
  {
    ssr: false,
  }
);

const ZoomOutButton = dynamic(
  async () => (await import('./ui/ZoomOutButton')).ZoomOutButton,
  {
    ssr: false,
  }
);

const LeafletMapInner = () => {
  const { map } = useMapContext();
  const { contributions,players, addContributions } = useContributionContext();

  const {
    width: viewportWidth,
    height: viewportHeight,
    ref: viewportRef,
  } = useResizeDetector({
    refreshMode: 'debounce',
    refreshRate: 200,
  });

  const locations = [...contributions]; // contributions ve players birleştirildi

  const { clustersByCategory, allMarkersBoundCenter } = useMarkerData({
    locations: locations,
    map,
    viewportWidth,
    viewportHeight,
  });

  const isLoading = !map || !viewportWidth || !viewportHeight;

  /** watch position & zoom of all markers */
  useEffect(() => {
    if (!allMarkersBoundCenter || !map) return;

    const moveEnd = () => {
      map.off('moveend', moveEnd);
    };

    try {
      map.flyTo(
        allMarkersBoundCenter.centerPos,
        allMarkersBoundCenter.minZoom,
        { animate: false }
      );
      map.once('moveend', moveEnd);
    } catch (e) {}
  }, [allMarkersBoundCenter, map]);

  return (
    <div
      className="w-screen h-screen h-full  w-full overflow-hidden"
      ref={viewportRef}
    >
      <MapTopBar />

      <div
        className={`w-screen h-screen z-20 absolute top-0 left-0 w-full transition-opacity `}
        style={{
          width: viewportWidth ?? '100%',
          height: viewportHeight
            ? viewportHeight - AppConfig.ui.topBarHeight
            : '100%',
        }}
      >
        {allMarkersBoundCenter && clustersByCategory && (
          <LeafletMapContainer
            center={allMarkersBoundCenter.centerPos}
            zoom={allMarkersBoundCenter.minZoom}
            maxZoom={AppConfig.maxZoom}
            minZoom={AppConfig.minZoom}
            zoomAnimation={true}
            fadeAnimation={true}
          >
            {!isLoading ? (
              <>
                <LocateButton />
                <CenterToMarkerButton
                  center={allMarkersBoundCenter.centerPos}
                  zoom={allMarkersBoundCenter.minZoom}
                />
                <ZoomInButton />
                <ZoomOutButton />



                {Object.values(clustersByCategory).map((item,index) => (
                  <LeafletCluster
                    key={`cluster${item.category}${index}`}
                    icon={MarkerCategories[item.category as Category].icon}
                    color={MarkerCategories[item.category as Category].color}
                    chunkedLoading={true}
                  
                  >
                    {item.markers.map((marker,markerIndex) => (
                      <CustomMarker place={marker} key={`marker${markerIndex}${marker.name}${marker.index}`} />
                    ))}
                  </LeafletCluster>
                ))}
              </>
            ) : (
              // we have to spawn at least one element to keep it happy
              // eslint-disable-next-line react/jsx-no-useless-fragment
              <></>
            )}
          </LeafletMapContainer>
        )}
      </div>
      <BottomBar />
    </div>
  );
};

// pass through to get context in <MapInner>
const Map = () => (
  <LeafleftMapContextProvider>
    <LeafletMapInner />
  </LeafleftMapContextProvider>
);

export default Map;
