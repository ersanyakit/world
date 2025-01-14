import { LatLngExpression } from 'leaflet'

import { Category } from './MarkerCategories'
import { Contribution, Player } from '#src/types/Contribution'

export interface PlaceValues {
  id: number
  position: LatLngExpression
  category: Category
  title: string
  address: string
}
export type PlacesType = PlaceValues[]
export type PlacesClusterType = Record<string, (Contribution | Player)[]>

