import { Contribution, Player } from "#src/types/Contribution";
import { TweetIdComponents } from "#src/types/web3.types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isContribution = (location: Player | Contribution | null | undefined): location is Contribution => {
  // 'token' özelliği olup olmadığını kontrol eder
  return location ? 'token' in location : false;
}



export const extractTweetId = (url: string): string => {
  const regex = /^(https:\/\/(twitter\.com|x\.com)\/[^\/]+\/status\/(\d+))(?:\?[^\/]*)?$/;
  const match = url.match(regex);
  if (match && match[3]) {
    return match[3];  // match[3] => Tweet ID'si
  }
  return "";
};


// TypeScript Interface Definitions
export interface DecodedTweetID {
  timestamp: number;
  machineId: number;
  sequence: number;
}

export interface DecodedInput {
  tweetId: bigint;
  claimId: bigint;
  timestamp: number;
}

// Constants
const MASK_128_BITS = BigInt("0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"); // 128-bit mask
// Epoch Constant
const EPOCH = 1288834974657n; // Twitter Snowflake Epoch in milliseconds

// Function to decode tweet ID

// Function to decode tweet ID
export const decodeTweetId = (inputTweetId: string | number | bigint): TweetIdComponents => {
  // Ensure tweetId is of type BigInt
  const tweetId = typeof inputTweetId === "bigint" ? inputTweetId : BigInt(inputTweetId);

  // Decode components using BigInt operations
  const timestampBigInt = (tweetId >> 22n) + EPOCH; // Extract timestamp as BigInt
  const timestamp = Number(timestampBigInt); // Convert to number for compatibility

  const machineId = Number((tweetId & 0x3FF000n) >> 12n); // Extract Machine ID
  const sequence = Number(tweetId & 0xFFFn); // Extract Sequence Number

  return {
    timestamp,
    machineId,
    sequence,
    tweetId, // Return original tweetId as BigInt
  };
};

// Function to unpack packed data (equivalent to unpackTweetAndUserIds in Solidity)
export const unpackTweetAndContributionIds = (packedData: bigint): DecodedInput => {
  const tweetId = packedData >> 128n; // Extract the top 128 bits for tweetId
  const claimId = packedData & MASK_128_BITS; // Extract the bottom 128 bits for claimId

  // Decode the tweet ID to extract timestamp
  const decodedTweet = decodeTweetId(tweetId);

  return {
    tweetId,
    claimId,
    timestamp: decodedTweet.timestamp,
  };
};
 
export const packTweetAndContributionIds = (tweetId: bigint, claimId: bigint): bigint => {
  // Pack tweetId and claimId into a single BigInt (left shift tweetId by 128 bits and OR with claimId)
  const packedData = (tweetId << 128n) | claimId;
  return packedData;
};