import { BrowserProvider, Contract, JsonRpcProvider } from 'ethers';
import { getContract } from 'viem';
import { chilizClient,hardhatClient } from './clients';
import { HardhatContract } from './contracts';

export const selectedClient = hardhatClient;

export function GetContractAt(contract) {
  return new Contract(
    contract.address,
    contract.abi,
    new JsonRpcProvider(contract.rpcUrl)
  );
}

export async function GetSigner(wallet) {
  const provider = new BrowserProvider(wallet);
  return await provider.getSigner();
}

export async function getERC20Balance(contractInformation, user) {
  let balance = '0';
  try {
    if (contractInformation && user) {
      const contract = getContract({
        address: contractInformation.address,
        abi: contractInformation.abi,
        client: {
          public: selectedClient,
        },
      });
      const res = await contract.read.balanceOf([user]);
      balance = res;
    }
    return balance;
  } catch (error) {
    console.log('getERC20Balance : ', error);
    return balance;
  }
}

export async function getERC20Allowance(contractInformation, user, to) {
  let allowance = '0';
  try {
    if (contractInformation && user) {
      const contract = getContract({
        address: contractInformation.address,
        abi: contractInformation.abi,
        client: {
          public: selectedClient,
        },
      });
      const res = await contract.read.allowance([user, to]);
      allowance = res;
    }
    return allowance;
  } catch (error) {
    console.log('getERC20Allowance : ', error);
    return allowance;
  }
}

export async function getERC20TotalSupply(contractInformation) {
  let totalSupply = '0';
  try {
    if (contractInformation) {
      const contract = getContract({
        address: contractInformation.address,
        abi: contractInformation.abi,
        client: {
          public: selectedClient,
        },
      });
      const res = await contract.read.totalSupply();
      totalSupply = res;
    }
    return totalSupply;
  } catch (error) {
    console.log('getERC20TotalSupply : ', error);
    return totalSupply;
  }
}


export async function getContributors() {
  let response = [];
  let contractInformation = HardhatContract
  console.log("contractInformation.address,",contractInformation)
  try {
    if (contractInformation) {
      const contract = getContract({
        address: contractInformation.address,
        abi: contractInformation.abi,
        client: {
          public: selectedClient,
        },
      });
      const res = await contract.read.getContributors();
      response = res;
    }
    return response;
  } catch (error) {
    console.log('getContributors : ', error);
    return response;
  }
}
