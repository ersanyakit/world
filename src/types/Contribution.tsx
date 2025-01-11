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
    index: bigint;  // `uint256` olarak karşılık gelir
    lastaccess: bigint;  // `uint256` olarak karşılık gelir
    wallet: string;  // `address` tipi Solidity'de string olarak karşılık gelir
    referral: string;  // `address` tipi Solidity'de string olarak karşılık gelir
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
    contributions: bigint[];  // `uint256[]` olarak karşılık gelir
    claims: bigint[];  // `uint256[]` olarak karşılık gelir
    followers: string[];  // `address[]` olarak karşılık gelir, string[] ile temsil edilir
    followings: string[];  // `address[]` olarak karşılık gelir, string[] ile temsil edilir
    referrals: string[];  // `address[]` olarak karşılık gelir, string[] ile temsil edilir
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