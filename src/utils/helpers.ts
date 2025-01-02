import { keccak256 } from "ethers";

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
