import BottomBar from '#components/BottomBar';
import MarkerCategories, { Category } from '#lib/MarkerCategories';
import { Places } from '#lib/Places';
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
  const { contributions, addContributions } = useContributionContext();

  const {
    width: viewportWidth,
    height: viewportHeight,
    ref: viewportRef,
  } = useResizeDetector({
    refreshMode: 'debounce',
    refreshRate: 200,
  });

  const { clustersByCategory, allMarkersBoundCenter } = useMarkerData({
    locations: contributions,
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
        {true && allMarkersBoundCenter && clustersByCategory && (
          <LeafletMapContainer
            center={allMarkersBoundCenter.centerPos}
            zoom={allMarkersBoundCenter.minZoom}
            maxZoom={AppConfig.maxZoom}
            minZoom={AppConfig.minZoom}
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

                {Object.values(clustersByCategory).map((item) => (
                  <LeafletCluster
                    key={item.category}
                    icon={MarkerCategories[Category.CAT1].icon}
                    color={MarkerCategories[Category.CAT1].color}
                    chunkedLoading
                  >
                    {item.markers.map((marker) => (
                      <CustomMarker place={marker} key={marker.index} />
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
