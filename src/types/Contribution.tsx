export interface Contribution {
    valid: boolean;
    index: number;
    deposit: number;
    withdraw: number;
    claims: number;
    limit: number;
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