export interface Contribution {
    valid: boolean;
    index: bigint;
    deposit: bigint;
    withdraw: bigint;
    claims: bigint;
    limit: bigint;
    timestamp: number;
    contributor: string; // Contributor adresi
    token: string; // Token adresi
    geohash: string;
    name: string;
    url: string;
    description: string;
    color: string;
    image: string;
    claimers: string[]; // Claim yapan adreslerin listesi
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
    index: number;             // uint256
    lastaccess: number;        // uint256
    wallet: string;            // address
    referral: string;            // address
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
    website: string;
    geohash: string;
    followers: number[];      // uint256[]
    followings: number[];     // uint256[]
  }
  
  export interface Asset {
    valid: boolean;
    index: number;            // uint256
    deposit: number;          // uint256
    withdraw: number;         // uint256
    token: string;            // address
  }

  export interface ContributionInfo {
    totalContribution: number; // uint256'i temsil eder
    playerContribution: number;
    minimumContributionAmount: number;
    nextContributionAmount:number;
    playerBalance : number;
    playerAllowance:number;
}