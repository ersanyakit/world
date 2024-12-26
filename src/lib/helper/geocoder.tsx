import { LatLngExpression } from 'leaflet';
import Geohash from 'ngeohash';

export const decodeGeoHash = (geoHash: string): LatLngExpression => {
    console.log("decodeGeoHash",geoHash)
  const decodedGeoHash = Geohash.decode(geoHash);
  return [decodedGeoHash.latitude, decodedGeoHash.longitude];
};

export const encodeGeoHash = (position: LatLngExpression): string => {
    console.log("encodeGeoHash",position)

    if (!Array.isArray(position) || position.length !== 2) {
      throw new Error("Invalid LatLngExpression format. Expected [latitude, longitude].");
    }
    const [latitude, longitude] = position;
    const encodedHash = Geohash.encode(latitude, longitude);

    return encodedHash;
  };
  

export const generateLogo = (chainId: number, asset:string): string => {
    return "https://raw.githubusercontent.com/kewlexchange/assets/main/chiliz/tokens/0xed5740209fcf6974d6f3a5f11e295b5e468ac27c/logo.svg"
  };