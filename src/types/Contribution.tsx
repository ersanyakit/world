export interface Contribution {
  valid: boolean;
  index: bigint; // uint256 için bigint kullanılır
  deposit: bigint;
  withdraw: bigint;
  claims: bigint;
  limit: bigint;
  timestamp: bigint | number | any;
  contributor: string; // Solidity address -> string
  token: string;
  geohash: string;
  name: string;
  url: string;
  description: string;
  color: string;
  image: string;
  claimers: string[]; // Solidity address[] -> string[]
}

  export interface Claim {
    timestamp: number;         // uint256
    contributionId: number;    // uint256
    amount: number;            // uint256
    fee: number;               // uint256
    token: string;             // address
    player: string;            // address
  }
  
  export interface Player {
    valid: boolean;
    registered: boolean;
    index: bigint;  // Use `bigint` for uint256 type
    lastaccess: bigint;  // Use `bigint` for uint256 type
    wallet: string;  // Address type in Solidity maps to a string in TypeScript
    referral: string;  // Address type in Solidity maps to a string in TypeScript
    avatar: string;
    cover: string;
    name: string;
    bio: string;
    twitter: string;
    telegram: string;
    instagram: string;
    youtube: string;
    facebook: string;
    discord: string;
    tiktok: string;
    website: string;
    geohash: string;
    contributions: bigint[];  // Use `bigint[]` for uint256[] array
    claims: bigint[];  // Use `bigint[]` for uint256[] array
    followers: string[];  // Address array in Solidity maps to a string[] in TypeScript
    followings: string[];  // Address array in Solidity maps to a string[] in TypeScript
    referrals: string[];  // Address array in Solidity maps to a string[] in TypeScript
  }
  
  export interface Asset {
    valid: boolean;
    index: number;            // uint256
    deposit: number;          // uint256
    withdraw: number;         // uint256
    token: string;            // address
  }

  export interface ContributionInfo {
    totalContribution: bigint; // uint256'i temsil eder
    playerContribution: bigint;
    minimumContributionAmount: bigint;
    nextContributionAmount:bigint;
    playerBalance : bigint;
    playerAllowance:bigint;
}

export interface BalanceInfo {
  token: string;      // address'ler genellikle string olarak temsil edilir
  balance: bigint;    // Solidity'deki uint256 tipi büyük sayılar içerdiği için string olarak saklanması önerilir
  decimals: bigint;   // uint256 tipindeki decimals'ı number olarak alıyoruz
}