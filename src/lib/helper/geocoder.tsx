import { Tokens } from '#src/constants/tokens';
import { getNetworkClient } from '#src/utils/web3/clients';
import { ethers } from 'ethers';
import { LatLngExpression } from 'leaflet';
import Geohash from 'ngeohash';

export const decodeGeoHash = (geoHash: string): LatLngExpression => {
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
   
    console.log("generateLogo:Matched token:",chainId, token);
    return token?.logoURI ||  "/assets/chains/error.svg";
  };