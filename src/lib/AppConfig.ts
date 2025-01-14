import { LatLngExpression } from 'leaflet'

// FIXME: naming and structure
export const AppConfig = {
  minZoom: 3,
  maxZoom: 18, // max zoom level of CARTO: 18
  ui: {
    topBarHeight: 0,
    bigIconSize: 48,
    mapIconSize: 32,
    markerIconSize: 32,
    menuIconSize: 16,
    topBarIconSize: 24,
  },
  baseCenter: [-37.8199,144.9834] as LatLngExpression, // bielefeld lol
}

