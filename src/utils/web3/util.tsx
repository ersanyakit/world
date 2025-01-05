import { BrowserProvider, Contract, ethers, JsonRpcProvider, parseEther } from 'ethers';
import { getContract } from 'viem';
import { chilizClient,hardhatClient, NETWORKS } from './clients';
import { HardhatContract } from './contracts';
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react';
import { Contribution, ContributionInfo, Player } from '#src/types/Contribution';
import { useContributionContext } from '#src/context/GlobalStateContext';
import { Token } from '#src/types/web3.types';


export let selectedNetwork = NETWORKS.hardhat; // Varsayılan ağ

export function GetContractAt(contract:any) {
  return new Contract(
    contract.address,
    contract.abi,
    new JsonRpcProvider(contract.rpcUrl)
  );
}

export function getContractInstance(address: string, abi: any) {
  const provider = new JsonRpcProvider(selectedNetwork.network.rpcUrl);
  return new Contract(address, abi, provider);
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
          public: selectedNetwork.client,
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
          public: selectedNetwork.client,
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
          public: selectedNetwork.client,
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
          public: selectedNetwork.client,
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

export const getPlayer = async (address:any) : Promise<Player | null>  => {
  let response : Player | null = null;
  let contractInformation = HardhatContract
  try {
    if (contractInformation) {
      const contract = getContract({
        address: contractInformation.address,
        abi: contractInformation.abi,
        client: {
          public: selectedNetwork.client,
        },
      });


    
      const res : Player | any = await contract.read.getPlayer([address]);
      console.log("getPlayerRes",res)
      response = res;
    }
    return response;
  } catch (error) {
    console.log('getPlayer : ', error);
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
          public: selectedNetwork.client,
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

export async function getClaimHistory() {
  let response : any = [];
  let contractInformation = HardhatContract
  try {
    if (contractInformation) {
      const contract = getContract({
        address: contractInformation.address,
        abi: contractInformation.abi,
        client: {
          public: selectedNetwork.client,
        },
      });
      const res = await contract.read.getClaimHistory();
      response = res;
    }
    return response;
  } catch (error) {
    console.log('getClaimHistory : ', error);
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


export const contribute = async (walletProvider:any, isConnected:any, address:any, contribution:Contribution) => {
  let contractInformation = HardhatContract
  if (isConnected === false) {
    return;
  }
try {
  const contract = GetContractAt(contractInformation);
  const signer = await GetSigner(walletProvider);

  const overrides = {
    value:ethers.getAddress(contribution.token) == ethers.getAddress(ethers.ZeroAddress) ? contribution.deposit : 0
  }

  console.log("Token Address:", ethers.getAddress(contribution.token));
  console.log("Zero Address:", ethers.ZeroAddress);

  const tx = await contract
    .connect(signer)
    // @ts-ignore
    .contribute(contribution,overrides);

  await tx.wait();
  // close wait modal
  // success modal
} catch (error) {
  console.log("contributeError",error)
  // close wait modal
  // error modal
}
};

export const getContributionInfo = async (contribution:Contribution, walletProvider:any, isConnected:any, address:any) : Promise<ContributionInfo | null>  => {

  let response: ContributionInfo | null = null;
  let contractInformation = HardhatContract
  try {
    if (contractInformation) {
      const contract = getContract({
        address: contractInformation.address,
        abi: contractInformation.abi,
        client: {
          public: selectedNetwork.client,
        },
      });
      const res : any = await contract.read.getContributionInfo([contribution.index,contribution.token,address]);

      response = {
        totalContribution: res.totalContribution, // BigNumber'dan sayıya dönüştürme
        playerContribution: res.playerContribution,
        minimumContributionAmount: res.minimumContributionAmount,
        nextContributionAmount: res.nextContributionAmount,
        playerBalance: res.playerBalance,
        playerAllowance: res.playerAllowance,
      } as ContributionInfo;
    }
    return response;
  } catch (error) {
    console.log('getContributionInfo : ', error);
    return response;
  }
 
}


export const getContributionInfoByToken = async (
  token: Token,
  walletProvider: any,
  isConnected: any,
  address: any
): Promise<ContributionInfo | null> => {
  let response: ContributionInfo | null = null;
  const contractInformation = HardhatContract;

  try {
    if (contractInformation) {
      const contract = getContract({
        address: contractInformation.address,
        abi: contractInformation.abi,
        client: {
          public: selectedNetwork.client,
        },
      });

      const res : any = await contract.read.getContributionInfo([
        ethers.MaxUint256, // ethers.MaxUint256 yerine bu kullanılır
        token.address,
        address,
      ]);


      response = {
        totalContribution: res.totalContribution, // BigNumber'dan sayıya dönüştürme
        playerContribution: res.playerContribution,
        minimumContributionAmount: res.minimumContributionAmount,
        nextContributionAmount: res.nextContributionAmount,
        playerBalance: res.playerBalance,
        playerAllowance: res.playerAllowance,
      } as ContributionInfo;
    }
  } catch (error) {
    console.log("getContributionInfoByToken : ", error);
  }

  return response; // Eğer hata oluşursa veya yanıt geçersizse null dönecek.
};

export const getContributionInfoByTokenEx = async (token:Token, walletProvider:any, isConnected:any, address:any) :  Promise<ContributionInfo | null>  => {

  let response: ContributionInfo | null = null;
  let contractInformation = HardhatContract
  try {
    if (contractInformation) {
      const contract = getContract({
        address: contractInformation.address,
        abi: contractInformation.abi,
        client: {
          public: selectedNetwork.client,
        },
      });
      const res : any = await contract.read.getContributionInfo([ethers.MaxUint256,token.address,address]);
      response = {
        totalContribution: res.totalContribution, // BigNumber'dan sayıya dönüştürme
        playerContribution: res.playerContribution,
        minimumContributionAmount: res.minimumContributionAmount,
        nextContributionAmount: res.nextContributionAmount,
        playerBalance: res.playerBalance,
        playerAllowance: res.playerAllowance,
      } as ContributionInfo;
    }
    return response;
  } catch (error) {
    console.log('getContributionInfoByToken : ', error);
    return null;
  }
 
}
