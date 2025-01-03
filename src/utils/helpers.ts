import { Token } from "#src/types/web3.types";
import { formatUnits, keccak256, parseEther, parseUnits } from "ethers";

export function FormatAddressDesign(
  address: string | `0x${string}`,
  startChars = 6,
  endChars = 6
) {
  if (address.length <= startChars + endChars) {
    return address;
  }

  const visiblePart =
    address.substring(0, startChars) +
    '...' +
    address.substring(address.length - endChars);
  return visiblePart;
}

export const getAvatar = (address : string) : string => {
  const hash = keccak256(address);
  const hashSegment = hash.slice(2, 10); // "0x" kısmını atla ve 8 karakter al
  const bigNumber = parseInt(hashSegment, 16); // 16 tabanından 10 tabanına dönüştür
  let randNum = bigNumber % 57;
  return `https://raw.githubusercontent.com/ersanyakit/maggoo/refs/heads/main/maggoo-app/public/full/Worm_${randNum}.png`
}

export const forceFormatUnits = (value:any,token:Token): any => {
  if(!value){
    value = parseUnits("0",token.decimals);
  }
  return parseFloat(formatUnits(value,token.decimals));
}

export const generateHexColorFromAddress = (address: string): string => {
  const cleanAddress = address.toLowerCase().replace(/^0x/, "");
  const color = `#${cleanAddress.slice(0, 6)}`;
  return color;
}