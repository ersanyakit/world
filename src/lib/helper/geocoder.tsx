import { Tokens } from '#src/constants/tokens';
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
  

  export const generateLogo = (chainId: number, address: string): string => {
    console.log("generateLogo:Provided chainId:", chainId);
    console.log("generateLogo:Provided address:", address.toLowerCase());
    const token = Tokens.find(
      (t) => t.address.toLowerCase() === address.toLowerCase()
    );
    console.log("generateLogo:Matched token:", token);
    return token?.logoURI || "https://raw.githubusercontent.com/kewlexchange/assets/main/default-logo.svg";
  };