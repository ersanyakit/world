import Leaflet, { PointExpression, DivIcon } from 'leaflet';
import { renderToString } from 'react-dom/server';

interface DivIconValues {
  source: JSX.Element; // İkonun JSX içeriği
  anchor: PointExpression; // İkonun anchor noktası
}

const LeafletDivIconEx = ({ source, anchor }: DivIconValues): DivIcon | null => {
  // Tarayıcı ortamını kontrol et
  if (typeof window !== 'undefined' && Leaflet) {
    return Leaflet.divIcon({
      // @ts-ignore
      html: renderToString(source), // JSX içeriğini stringe dönüştür
      iconAnchor: anchor, // Anchor noktasını ayarla
    });
  }

  return null; // Sunucu ortamında `null` döndür
};

const LeafletDivIcon = ({ source, anchor }: DivIconValues): DivIcon | null => {
  if (typeof window !== 'undefined' && Leaflet) {
    const html =
      typeof source === 'string'
        ? `<img src="${source}" style="width:32px; height:32px;" />` // URL için img etiketi
        : renderToString(source); // JSX içeriğini stringe dönüştür

    return Leaflet.divIcon({
      html, // HTML içeriği
      iconAnchor: anchor, // Anchor noktası
    });
  }

  return null; // Sunucu ortamında `null` döndür
};

export default LeafletDivIcon;
