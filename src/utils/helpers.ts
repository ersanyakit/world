import { EMOJIS, TWEET_HEAD, TWEETS, TWITTER_USERS } from "#src/constants/constants";
import { Tokens } from "#src/constants/tokens";
import { Contribution } from "#src/types/Contribution";
import { Token } from "#src/types/web3.types";
import { ethers, formatUnits, isAddress, keccak256, parseEther, parseUnits } from "ethers";

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
  endChars = 4
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
  let randNum = bigNumber % 1515;
  return `/assets/players/${randNum}.png`
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
  if(ethers.getAddress(address) == ethers.getAddress("0x570e91fe0D25D46C5e0C83aF6bc95afB0072C321")){
    address = ethers.ZeroAddress
  }

  const tokenInfo = Object.values(Tokens).find((token) => token.address == address);
  if (!tokenInfo) {
    return null
  }
  return tokenInfo;
}

export const getTokenLogoByAddressAndChainID = (address: string, chainId: number): string => {
  let tokenInfo = Object.values(Tokens).find((token) => token.address === address && token.chainId === chainId);

  if (!tokenInfo) {
    tokenInfo = Object.values(Tokens).find((token) => token.address === ethers.ZeroAddress && token.chainId === chainId);
  }

  return tokenInfo ? tokenInfo.logoURI : '';  // Return an empty string if no token info found
};

export const getTokenDecimalsByAddress = (address: string) : number => {
  const tokenInfo = Object.values(Tokens).find((token) => token.address == address);
  console.log("address",address,tokenInfo)
  if (!tokenInfo) {
    return 18
  }
  return tokenInfo.decimals;
}

export const generateShareURL = (address : any, contributionId : any) : string => {
  let url : string = ""
  if(!isAddress(address)){
    url = "https://millionarmap.com"
  }else if(contributionId){
    url = `https://millionarmap.com/ref/${address}/cid/${contributionId}`
  }else{
    url = `https://millionarmap.com/ref/${address}`
  }
  return url;
} 


const getRandomUsers = (users: string[], count: number): string[] => {
  const shuffled = [...users].sort(() => Math.random() - 0.5); // Shuffle the array
  const selectedUsers = shuffled.slice(0, count); // Select the first `count` users
  return selectedUsers.map(user => `@${user}`); // Add "@" to the beginning of each username
};


export const generateTweetIntentURL = (address: any, contributionId: any): string => {
  const shareURL = generateShareURL(address, contributionId);
  let randomUsers : string = getRandomUsers(TWITTER_USERS,5).join(' ').concat(" @alex_dreyfus @millionarmap");
  const randomEmoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];

  const randomTweet = TWEETS[Math.floor(Math.random() * TWEETS.length)];

  const randomHead = TWEET_HEAD[Math.floor(Math.random() * TWEET_HEAD.length)];
  const tweetText = `🥇${randomHead} ${randomEmoji}\n\n🥈${randomTweet}\n\n🚀🚀🚀${shareURL}\n\n🥉Shoutout to: ${randomUsers}`;

  const encodedTweetText = encodeURIComponent(tweetText);

  return `https://twitter.com/intent/tweet?text=${encodedTweetText}`;
};

export const generateTweetIntentByContribution = (contributionObject: Contribution): string => {
  const shareURL = contributionObject.url.replace('www.', '');

  let randomUsers : string = getRandomUsers(TWITTER_USERS,5).join(' ').concat(" @alex_dreyfus @millionarmap");
 
  const tweetText = `${contributionObject.description}\n\n${shareURL}/cid/${Number(contributionObject.index)}`;

  const encodedTweetText = encodeURIComponent(tweetText);

  return `https://twitter.com/intent/tweet?text=${encodedTweetText}`;
};

export const  getTokenAddressesByChainId = (chainId: number): string[] => {
  return Tokens
      .filter(token => token.chainId === chainId)
      .map(token => token.address);
}