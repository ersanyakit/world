import { Tokens } from '#src/constants/tokens';
import { ethers } from 'ethers';
import { LatLngExpression } from 'leaflet';
import Geohash from 'ngeohash';



function hashStringToNumber(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0; // Bitwise OR ile 32-bit tamsayıya çevir
  }
  return Math.abs(hash);
}

function getLatitudeFromHash(hash: number): number {
  // Enlem aralığı -90 ile 90 arasında
  return (hash % 180) - 90;
}

function getLongitudeFromHash(hash: number): number {
  // Boylam aralığı -180 ile 180 arasında
  return (hash % 360) - 180;
}

function getGeoPointFromWallet(walletAddress: string): { latitude: number; longitude: number } {
  const hash = hashStringToNumber(walletAddress);
  const latitude = getLatitudeFromHash(hash);
  const longitude = getLongitudeFromHash(hash);
  return { latitude, longitude };
}

export const decodeGeoHash = (geoHash: string,hash : string = ""): LatLngExpression => {
  if(geoHash == ""){
    let randGeoHash = getGeoPointFromWallet(hash);
    return [randGeoHash.latitude, randGeoHash.longitude];
  }
  const decodedGeoHash = Geohash.decode(geoHash);
  return [decodedGeoHash.latitude, decodedGeoHash.longitude];
};

export const encodeGeoHash = (position: LatLngExpression): string => {

    if (!Array.isArray(position) || position.length !== 2) {
      throw new Error("Invalid LatLngExpression format. Expected [latitude, longitude].");
    }
    const [latitude, longitude] = position;
    const encodedHash = Geohash.encode(latitude, longitude);

    return encodedHash;
  };
  

  export const generateLogo = (chainId: number, address: string): string => {
    
    if(ethers.getAddress("0x570e91fe0D25D46C5e0C83aF6bc95afB0072C321") == ethers.getAddress(address)){
      address = ethers.ZeroAddress
    }
    
    const token = Tokens.find(
      (t) => t.address.toLowerCase() === address.toLowerCase()
    );
   
    return token?.logoURI ||  "/assets/chains/error.svg";
  };