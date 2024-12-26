import Leaflet, { PointExpression, DivIcon } from 'leaflet';
import { renderToString } from 'react-dom/server';
import { ReactElement } from 'react';  // Import ReactElement type

interface DivIconValues {
  source: string | ReactElement<any>;  // Use ReactElement<any> for JSX content
  anchor: PointExpression;  // The anchor point of the icon
}

const LeafletDivIcon = ({ source, anchor }: DivIconValues): DivIcon | null => {
  // Ensure we're in the browser environment
  if (typeof window !== 'undefined' && Leaflet) {
    let htmlContent: string;

    // Check if the source is a string (URL) or a ReactElement (JSX element)
    if (typeof source === 'string') {
      htmlContent = `<img src="${source}" style="width:32px; height:32px;" />`; // Image URL
    } else {
      // Cast source to ReactElement<any> to avoid the type error
      const reactElement :any = source as ReactElement<any>; // Type casting
      htmlContent = renderToString(reactElement); // Convert JSX to HTML string
    }

    return Leaflet.divIcon({
      html: htmlContent, // HTML string content
      iconAnchor: anchor, // Set the anchor point
    });
  }

  return null; // Return null if in a non-browser environment (like server-side)
};

export default LeafletDivIcon;