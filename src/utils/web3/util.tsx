import { BrowserProvider, Contract, ethers, JsonRpcProvider } from 'ethers';
import { getContract } from 'viem';
import { chilizClient,hardhatClient } from './clients';
import { HardhatContract } from './contracts';
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react';

export const selectedClient = hardhatClient;

export function GetContractAt(contract:any) {
  return new Contract(
    contract.address,
    contract.abi,
    new JsonRpcProvider(contract.rpcUrl)
  );
}

export async function GetSigner(wallet : any) {
  const provider = new BrowserProvider(wallet);
  return await provider.getSigner();
}

export async function getERC20Balance(contractInformation : any , user : any) {
  let balance : any = 0;
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

export async function getERC20Allowance(contractInformation : any , user : any , to: any) {
  let allowance : any = 0;
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



export async function getContributors() {
  let response : any = [];
  let contractInformation = HardhatContract
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


export async function getPlayers() {
  let response : any = [];
  let contractInformation = HardhatContract
  try {
    if (contractInformation) {
      const contract = getContract({
        address: contractInformation.address,
        abi: contractInformation.abi,
        client: {
          public: selectedClient,
        },
      });
      const res = await contract.read.getPlayers();
      response = res;
    }
    return response;
  } catch (error) {
    console.log('getPlayers : ', error);
    return response;
  }
}

export async function getAssets() {
  let response : any = [];
  let contractInformation = HardhatContract
  try {
    if (contractInformation) {
      const contract = getContract({
        address: contractInformation.address,
        abi: contractInformation.abi,
        client: {
          public: selectedClient,
        },
      });
      const res = await contract.read.getAssets();
      response = res;
    }
    return response;
  } catch (error) {
    console.log('getAssets : ', error);
    return response;
  }
}


export const claim = async (walletProvider:any, isConnected:any, address:any, index:any) => {


    let contractInformation = HardhatContract

  if (isConnected === false) {
    return;
  }
  // wait modal
  try {
    const contract = GetContractAt(contractInformation);
    const signer = await GetSigner(walletProvider);

    const tx = await contract
      .connect(signer)
      // @ts-ignore
      .claim(index);

    await tx.wait(1);
    // close wait modal
    // success modal
  } catch (error) {
    console.log("claimError",error)
    // close wait modal
    // error modal
  }
};