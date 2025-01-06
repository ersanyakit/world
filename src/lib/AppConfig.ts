import { LatLngExpression } from 'leaflet'

// FIXME: naming and structure
export const AppConfig = {
  minZoom: 10,
  maxZoom: 18, // max zoom level of CARTO: 18
  ui: {
    topBarHeight: 0,
    bigIconSize: 48,
    mapIconSize: 32,
    markerIconSize: 32,
    menuIconSize: 16,
    topBarIconSize: 24,
  },
  baseCenter: [41.9029, 12.4534] as LatLngExpression, // bielefeld lol
}

export enum NavMenuVariant {
  INTRO = 'vertical',
  TOPNAV = 'horizontal',
}
