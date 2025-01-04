import { Tokens } from "#src/constants/tokens";
import { Token } from "#src/types/web3.types";
import { formatUnits, keccak256, parseEther, parseUnits } from "ethers";

// Interface definition
export interface TimestampDetails {
  hour: string;       // Hour (HH:mm)
  date: string;       // Date (DD-MM-YYYY)
  dayName: string;    // Day name (e.g., "Sat")
  dayNumber: string;  // Day number (e.g., "04")
  month: string;      // Short month name (Jan, Feb, etc.)
}

// Arrays for month and day names
const MONTH_NAMES: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY_NAMES: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Function definition
export const unixToTimestampDetails = (unixTimestamp: number): TimestampDetails => {
  const date = new Date(Number(unixTimestamp) * 1000); // Convert Unix timestamp to milliseconds

  const hour = date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
  const dayName = DAY_NAMES[date.getDay()];
  const dayNumber = date.getDate().toString().padStart(2, "0"); // Ensure two digits (e.g., "04")
  const month = MONTH_NAMES[date.getMonth()];
  const dateFormatted = `${dayName}, ${month} ${dayNumber}`;

  return { 
      hour, 
      date: dateFormatted, 
      dayName, 
      dayNumber, 
      month 
  };
}

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

export const getTokenByAddress = (address: string) : Token | null => {
  const tokenInfo = Object.values(Tokens).find((token) => token.address && address);
  if (!tokenInfo) {
    return null
  }
  return tokenInfo;
}
