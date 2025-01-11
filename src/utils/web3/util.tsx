import { BrowserProvider, Contract, ethers, formatUnits, isAddress, JsonRpcProvider, parseEther, parseUnits } from 'ethers';
import { getContract } from 'viem';
import { chilizClient, hardhatClient, NETWORKS } from './clients';
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react';
import { BalanceInfo, Contribution, ContributionInfo, Player } from '#src/types/Contribution';
import { useContributionContext } from '#src/context/GlobalStateContext';
import { ContractCallResponse, Token } from '#src/types/web3.types';
import { getContractByName } from './contracts';
import { getTokenAddressesByChainId } from '../helpers';


export let selectedNetwork = NETWORKS.chiliz; // Varsayılan ağ

export function GetContractAt(contract: any) {
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

export async function GetSigner(wallet: any) {
  const provider = new BrowserProvider(wallet);
  return await provider.getSigner();
}

export async function getERC20Balance(contractInformation: any, user: any) {
  let balance: any = 0;
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

export async function getERC20Allowance(contractInformation: any, user: any, to: any) {
  let allowance: any = 0;
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
  let response: any = [];
  let contractInformation = getContractByName("DIAMOND", selectedNetwork.network.chainId)
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

export async function getRegistrationFee() {
  let response: bigint = BigInt(0);
  let contractInformation = getContractByName("DIAMOND", selectedNetwork.network.chainId)
  try {
    if (contractInformation) {
      const contract = getContract({
        address: contractInformation.address,
        abi: contractInformation.abi,
        client: {
          public: selectedNetwork.client,
        },
      });
      const res: any = await contract.read.getRegistrationFee();
      response = res;
    }
  } catch (error) {
    console.log('getRegistrationFee : ', error);
  }
  return response;

}

export async function getPlayers() {
  let response: any = [];
  let contractInformation = getContractByName("DIAMOND", selectedNetwork.network.chainId)
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

export const getPlayer = async (address: any): Promise<Player | null> => {
  let response: Player | null = null;
  let contractInformation = getContractByName("DIAMOND", selectedNetwork.network.chainId)
  try {
    if (contractInformation) {
      const contract = getContract({
        address: contractInformation.address,
        abi: contractInformation.abi,
        client: {
          public: selectedNetwork.client,
        },
      });



      const res: Player | any = await contract.read.getPlayer([address]);
      console.log("getPlayerRes", address, res)
      response = res;
    }
    return response;
  } catch (error) {
    console.log('getPlayer : ', error);
    return response;
  }
}

export async function getAssets() {
  let response: any = [];
  let contractInformation = getContractByName("DIAMOND", selectedNetwork.network.chainId)
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
  let response: any = [];
  let contractInformation = getContractByName("DIAMOND", selectedNetwork.network.chainId)
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

export const claim = async (walletProvider: any, isConnected: any, address: any, index: any) => {

  return
  let contractInformation = getContractByName("DIAMOND", selectedNetwork.network.chainId)

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
    console.log("claimError", error)
    // close wait modal
    // error modal
  }
}

export const approve = async (walletProvider: any, isConnected: any, token: Token, amount: bigint): Promise<ContractCallResponse> => {
  let callResponse: ContractCallResponse = { success: false, transaction: null, error: null }

  if (!isConnected) {
    callResponse.success = false;
    callResponse.transaction = null;
    callResponse.error = { message: "You are not connected." };
    return callResponse;
  }

  if (token.address == ethers.ZeroAddress) {
    callResponse.success = true;
    callResponse.transaction = null;
    callResponse.error = null;
    return callResponse;
  }

  if (amount == BigInt(0)) {
    callResponse.success = false;
    callResponse.transaction = null;
    callResponse.error = { message: "Amount must greater than zero!" };
    return callResponse;
  }

  let erc20ContractABI = getContractByName("TOKEN", selectedNetwork.network.chainId).abi;
  let diamondContract = getContractByName("DIAMOND", selectedNetwork.network.chainId);

  try {
    let contractParams = {
      address: ethers.getAddress(token.address) as any,
      abi: erc20ContractABI,
      rpcUrl: selectedNetwork.network.rpcUrl
    }

    const erc20Contract: any = GetContractAt(contractParams);
    const signer = await GetSigner(walletProvider);

    const tx = await erc20Contract
      .connect(signer)
      // @ts-ignore
      .approve(diamondContract.address, amount);

    await tx.wait();
    callResponse.success = true;
    callResponse.error = null;
    callResponse.transaction = tx;
  }
  catch (exception: any) {
    callResponse.success = false;
    callResponse.error = { message: "Approval Failed!", exception: exception };
  }
  return callResponse
}

export const register = async (walletProvider: any, isConnected: any, referralAddress: any, fee: any): Promise<ContractCallResponse> => {

  let callResponse: ContractCallResponse = { success: false, transaction: null, error: null }

  if (!isConnected) {
    callResponse.success = false;
    callResponse.transaction = null;
    callResponse.error = { message: "You are not connected." };
    return callResponse;
  }

  if(!isAddress(referralAddress)){
    referralAddress = ethers.ZeroAddress;
  }

  let diamondContractParams = getContractByName("DIAMOND", selectedNetwork.network.chainId);

  try {
    let contractParams = {
      address: ethers.getAddress(diamondContractParams.address) as any,
      abi: diamondContractParams.abi,
      rpcUrl: selectedNetwork.network.rpcUrl
    }

    const overrides = {
      value: fee
    }


    const diamondContract: any = GetContractAt(contractParams);
    const signer = await GetSigner(walletProvider);

    const tx = await diamondContract
      .connect(signer)
      // @ts-ignore
      .register(referralAddress, overrides);

    await tx.wait();
    callResponse.success = true;
    callResponse.error = null;
    callResponse.transaction = tx;
  }
  catch (exception: any) {
    callResponse.success = false;
    callResponse.error = { message: "Register Failed!", exception: exception };
  }
  return callResponse
}

export const contribute = async (walletProvider: any, isConnected: any, address: any, contribution: Contribution): Promise<ContractCallResponse> => {
  let callResponse: ContractCallResponse = { success: false, transaction: null, error: null }

  if (!isConnected) {
    callResponse.success = false;
    callResponse.transaction = null;
    callResponse.error = { message: "You are not connected." };
    return callResponse;
  }

  if (contribution.deposit == BigInt(0)) {
    callResponse.success = false;
    callResponse.transaction = null;
    callResponse.error = { message: "Amount must greater than zero!" };
    return callResponse;
  }

  let diamondContractParams = getContractByName("DIAMOND", selectedNetwork.network.chainId);

  try {
    let contractParams = {
      address: ethers.getAddress(diamondContractParams.address) as any,
      abi: diamondContractParams.abi,
      rpcUrl: selectedNetwork.network.rpcUrl
    }

    const overrides = {
      value: ethers.getAddress(contribution.token) == ethers.getAddress(ethers.ZeroAddress) ? contribution.deposit : 0
    }

    const diamondContract: any = GetContractAt(contractParams);
    const signer = await GetSigner(walletProvider);

    const tx = await diamondContract
      .connect(signer)
      // @ts-ignore
      .contribute(contribution, overrides);

    await tx.wait();
    callResponse.success = true;
    callResponse.error = null;
    callResponse.transaction = tx;
  }
  catch (exception: any) {
    callResponse.success = false;
    callResponse.error = { message: "Approval Failed!", exception: exception };
  }
  return callResponse
}

export const getContributionInfo = async (contribution: Contribution, walletProvider: any, isConnected: any, address: any): Promise<ContributionInfo | null> => {

  let response: ContributionInfo | null = null;
  let contractInformation = getContractByName("DIAMOND", selectedNetwork.network.chainId)
  try {
    if (contractInformation) {
      const contract = getContract({
        address: contractInformation.address,
        abi: contractInformation.abi,
        client: {
          public: selectedNetwork.client,
        },
      });
      const res: any = await contract.read.getContributionInfo([contribution.index, contribution.token, address]);

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
  let contractInformation = getContractByName("DIAMOND", selectedNetwork.network.chainId)

  try {
    if (contractInformation) {
      const contract = getContract({
        address: contractInformation.address,
        abi: contractInformation.abi,
        client: {
          public: selectedNetwork.client,
        },
      });

      const res: any = await contract.read.getContributionInfo([
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
}

export const getContributionInfoByTokenEx = async (token: Token, walletProvider: any, isConnected: any, address: any): Promise<ContributionInfo | null> => {

  let response: ContributionInfo | null = null;
  let contractInformation = getContractByName("DIAMOND", selectedNetwork.network.chainId)
  try {
    if (contractInformation) {
      const contract = getContract({
        address: contractInformation.address,
        abi: contractInformation.abi,
        client: {
          public: selectedNetwork.client,
        },
      });
      const res: any = await contract.read.getContributionInfo([ethers.MaxUint256, token.address, address]);
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


export const getPlayerContributions = async (address: any): Promise<Contribution[]> => {
  let response: Contribution[]  = [];
  let contractInformation = getContractByName("DIAMOND", selectedNetwork.network.chainId)
  try {
    if (contractInformation) {
      const contract = getContract({
        address: contractInformation.address,
        abi: contractInformation.abi,
        client: {
          public: selectedNetwork.client,
        },
      });

      const res: Contribution | any = await contract.read.getPlayerContributions([address]);
      console.log("getPlayerContributions", address, res)
      response = res;
    }
    return response;
  } catch (error) {
    console.log('getPlayerContributions : ', error);
    return response;
  }
}



export const fetchBalances = async (address: any): Promise<BalanceInfo[]> => {
  let response: BalanceInfo[]  = [];
  let contractInformation = getContractByName("DIAMOND", selectedNetwork.network.chainId)
  let tokens = getTokenAddressesByChainId( selectedNetwork.network.chainId)
  console.log("tokens",tokens)
  try {
    if (contractInformation) {
      const contract = getContract({
        address: contractInformation.address,
        abi: contractInformation.abi,
        client: {
          public: selectedNetwork.client,
        },
      });

      const res: BalanceInfo | any = await contract.read.fetchBalances([tokens,address]);
      console.log("fetchBalances", address, res)
      response = res;
    }
    return response;
  } catch (error) {
    console.log('fetchBalances : ', error);
    return response;
  }
}
