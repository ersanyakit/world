import Leaflet, { PointExpression, DivIcon } from 'leaflet';
import { renderToString } from 'react-dom/server';

interface DivIconValues {
  source: JSX.Element; // İkonun JSX içeriği
  anchor: PointExpression; // İkonun anchor noktası
}

const LeafletDivIcon = ({ source, anchor }: DivIconValues): DivIcon | null => {
  // Tarayıcı ortamını kontrol et
  if (typeof window !== 'undefined' && Leaflet) {
    return Leaflet.divIcon({
      html: renderToString(source), // JSX içeriğini stringe dönüştür
      iconAnchor: anchor, // Anchor noktasını ayarla
    });
  }

  return null; // Sunucu ortamında `null` döndür
};

export default LeafletDivIcon;