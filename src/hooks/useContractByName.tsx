import { useEffect, useState } from 'react';
import { useChainId } from '#src/context/ChainIdProvider'; // Kullanıcıdan alınan chainId'yi sağlayacak context
import { TCustomContract, MultiContractConfig, ContractCallResponse, Token, NetworkClient, TNetwork } from '#src/types/web3.types';
import WorldDiamondABI from "../constants/abi/WorldDiamond.json";
import ERC20ABI from "../constants/abi/ERC20.json";
import { BrowserProvider, Contract, ethers, isAddress, JsonRpcProvider } from 'ethers';
import { createPublicClient, getContract, http, parseEther, parseUnits } from 'viem';
import { BalanceInfo, Contribution, ContributionInfo, PairInfo, Player, Router, SwapParam, TCustomPair } from '#src/types/Contribution';
import { AvaxMainnet, ChilizMainnet, ChilizSpicyTestNet, HardhatTestnet } from '#src/utils/web3/chains';
import { avalanche, chiliz, hardhat, spicy } from 'viem/chains';
import { getTokenAddressesByChainId } from '#src/utils/helpers';
import { Percent, Trade } from '#src/entities';
import { INITIAL_ALLOWED_SLIPPAGE } from '#src/entities/utils/misc';

const DiamondAddress = '0x3B86091793D1f732BBfCCF1269e471d5DF4eb350';

const ContractList: MultiContractConfig = {
    "DIAMOND": {
        abi: WorldDiamondABI.abi,
        contracts: {
            88888: {
                address: DiamondAddress,
            },
            31337: {
                address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
            },
            43114: {
                address: DiamondAddress,
            },
        },
    },
    "TOKEN": {
        abi: ERC20ABI.abi,
        contracts: {
            88888: {
                address: "0x570e91fe0D25D46C5e0C83aF6bc95afB0072C321",
            },
            43114: {
                address: "0x570e91fe0D25D46C5e0C83aF6bc95afB0072C321",
            },
            31337: {
                address: "0x570e91fe0D25D46C5e0C83aF6bc95afB0072C321",
            },
        },
    },
};

export const useContractByName = (contractName: string) => {
    const chainId = useChainId(); // ChainId'yi context'ten alıyoruz
    const [contract, setContract] = useState<TCustomContract | null>(null);

    useEffect(() => {
        if (!chainId) {
            console.error("Chain ID is not available.");
            return;
        }

        const contractGroup = ContractList[contractName];

        if (!contractGroup) {
            console.error(`Unknown contract name: ${contractName}`);
            return;
        }

        const contractAddress = contractGroup.contracts[chainId]?.address;

        if (!contractAddress) {
            console.error(`Contract address not found for chainId: ${chainId}`);
            return;
        }

        setContract({
            abi: contractGroup.abi,
            address: contractAddress,
        });
    }, [contractName, chainId]); // contractName veya chainId değişirse tekrar çalışır

    return contract;
};



export const chilizClient = createPublicClient({
    batch: {
        multicall: true,
    },
    cacheTime: 10_000,
    pollingInterval: 10_000,
    chain: chiliz,
    transport: http(ChilizMainnet.rpcUrl),
});

export const chilizSpicyClient = createPublicClient({
    batch: {
        multicall: true,
    },
    cacheTime: 10_000,
    pollingInterval: 10_000,
    chain: spicy,
    transport: http(ChilizSpicyTestNet.rpcUrl),
});


export const avaxClient = createPublicClient({
    batch: {
        multicall: true,
    },
    cacheTime: 10_000,
    pollingInterval: 10_000,
    chain: avalanche,
    transport: http(AvaxMainnet.rpcUrl),
});


export const hardhatClient = createPublicClient({
    batch: {
        multicall: true,
    },
    cacheTime: 10_000,
    pollingInterval: 10_000,
    chain: hardhat,
    transport: http(HardhatTestnet.rpcUrl),
});


export const NETWORKS: Record<string, NetworkClient> = {
    chiliz: { client: chilizClient, network: ChilizMainnet },
    spicy: { client: chilizSpicyClient, network: ChilizSpicyTestNet },
    hardhat: { client: hardhatClient, network: HardhatTestnet },
    avalanche: { client: avaxClient, network: AvaxMainnet }
}

export function getNetworkClient(chainId: number): NetworkClient {

    console.log("getNetworkClient: currentChainId", chainId)
    const network = Object.values(NETWORKS).find((net) => net.network.chainId && net.network.chainId === chainId);
    if (!network) {
        throw new Error(`Network with chainId ${chainId} not found`);
    }
    return network;
}

export function GetContractAt(contract: any) {
    return new Contract(
        contract.address,
        contract.abi,
        new JsonRpcProvider(contract.rpcUrl)
    );
}

export function getContractInstance(chainId: number, address: string, abi: any) {
    let selectedNetwork = getNetworkClient(chainId);
    const provider = new JsonRpcProvider(selectedNetwork.network.rpcUrl);
    return new Contract(address, abi, provider);
}

export const getContractByName = (contractName: string, chainId: number): TCustomContract => {
    const contractGroup = ContractList[contractName];
    if (!contractGroup) {
        throw new Error(`Unknown contract name: ${contractName}`);
    }
    let contract: TCustomContract = {
        abi: contractGroup.abi,
        address: contractGroup.contracts[chainId].address
    }
    return contract;
}

export async function GetSigner(wallet: any) {
    const provider = new BrowserProvider(wallet);
    return await provider.getSigner();
}

export async function getERC20Balance(chainId: number, contractInformation: any, user: any) {
    let selectedNetwork = getNetworkClient(chainId);
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

export async function getERC20Allowance(chainId: number, contractInformation: any, user: any, to: any) {
    let selectedNetwork = getNetworkClient(chainId);
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

export async function getContributors(chainId: number) {
    let selectedNetwork = getNetworkClient(chainId);
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

export async function getRegistrationFee(chainId: number) {
    let selectedNetwork = getNetworkClient(chainId);
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

export async function getPlayers(chainId: number) {
    let selectedNetwork = getNetworkClient(chainId);
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

export const getPlayer = async (chainId: number, address: any): Promise<Player | null> => {
    let selectedNetwork = getNetworkClient(chainId);
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

export async function getAssets(chainId: number) {
    let selectedNetwork = getNetworkClient(chainId);
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

export async function getClaimHistory(chainId: number) {
    let selectedNetwork = getNetworkClient(chainId);
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

export const claim = async (chainId: number, walletProvider: any, isConnected: any, address: any, index: any): Promise<ContractCallResponse> => {
    let selectedNetwork = getNetworkClient(chainId);
    let callResponse: ContractCallResponse = { success: false, transaction: null, error: null }
    if (!isConnected) {
        callResponse.success = false;
        callResponse.transaction = null;
        callResponse.error = { message: "You are not connected." };
        return callResponse;
    }


    let contractInformation = getContractByName("DIAMOND", selectedNetwork.network.chainId)


    try {
        const contract = GetContractAt(contractInformation);
        const signer = await GetSigner(walletProvider);

        const tx = await contract
            .connect(signer)
            // @ts-ignore
            .claim(index);

        await tx.wait();

        callResponse.success = true;
        callResponse.error = null;
        callResponse.transaction = tx;
    }
    catch (exception: any) {
        callResponse.success = false;
        callResponse.error = { message: "Claim Failed!", exception: exception };
    }
    return callResponse
}

export const approve = async (chainId: number, walletProvider: any, isConnected: any, token: Token, amount: bigint): Promise<ContractCallResponse> => {
    let selectedNetwork = getNetworkClient(chainId);
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

export const register = async (chainId: number, walletProvider: any, isConnected: any, referralAddress: any, fee: any): Promise<ContractCallResponse> => {
    let selectedNetwork = getNetworkClient(chainId);
    let callResponse: ContractCallResponse = { success: false, transaction: null, error: null }

    if (!isConnected) {
        callResponse.success = false;
        callResponse.transaction = null;
        callResponse.error = { message: "You are not connected." };
        return callResponse;
    }

    if (!isAddress(referralAddress)) {
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

export const contribute = async (chainId: number, walletProvider: any, isConnected: any, address: any, contribution: Contribution): Promise<ContractCallResponse> => {
    let selectedNetwork = getNetworkClient(chainId);
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

export const getContributionInfo = async (chainId: number, contribution: Contribution, walletProvider: any, isConnected: any, address: any): Promise<ContributionInfo | null> => {
    let selectedNetwork = getNetworkClient(chainId);
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
    chainId: number,
    token: Token,
    walletProvider: any,
    isConnected: any,
    address: any
): Promise<ContributionInfo | null> => {
    let selectedNetwork = getNetworkClient(chainId);
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

export const getContributionInfoByTokenEx = async (chainId: number, token: Token, walletProvider: any, isConnected: any, address: any): Promise<ContributionInfo | null> => {
    let selectedNetwork = getNetworkClient(chainId);
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

export const updateProfile = async (chainId: number, walletProvider: any, isConnected: any, player: Player | null): Promise<ContractCallResponse> => {
    let selectedNetwork = getNetworkClient(chainId);
    let callResponse: ContractCallResponse = { success: false, transaction: null, error: null }

    if (!isConnected) {
        callResponse.success = false;
        callResponse.transaction = null;
        callResponse.error = { message: "You are not connected." };
        return callResponse;
    }

    if (!player) {
        callResponse.success = false;
        callResponse.transaction = null;
        callResponse.error = { message: "Invalid player!" };
        return callResponse;
    }


    if (!player.valid) {
        callResponse.success = false;
        callResponse.transaction = null;
        callResponse.error = { message: "Invalid player!" };
        return callResponse;
    }



    let diamondContractParams = getContractByName("DIAMOND", selectedNetwork.network.chainId);

    try {
        let contractParams = {
            address: ethers.getAddress(diamondContractParams.address) as any,
            abi: diamondContractParams.abi,
            rpcUrl: selectedNetwork.network.rpcUrl
        }



        const diamondContract: any = GetContractAt(contractParams);
        const signer = await GetSigner(walletProvider);
        console.log("diamondContractParams", diamondContractParams)

        console.log("player", player)


        const overrides = {
            value: 0
        }
        const tx = await diamondContract
            .connect(signer)
            // @ts-ignore
            .setProfile(player, overrides);

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


export const getPlayerContributions = async (chainId: number, address: any): Promise<Contribution[]> => {
    let selectedNetwork = getNetworkClient(chainId);
    let response: Contribution[] = [];
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



export const fetchBalances = async (chainId: number, address: any): Promise<BalanceInfo[]> => {
    let selectedNetwork = getNetworkClient(chainId);
    let response: BalanceInfo[] = [];
    let contractInformation = getContractByName("DIAMOND", selectedNetwork.network.chainId)
    let tokens = getTokenAddressesByChainId(selectedNetwork.network.chainId)
    console.log("tokens", tokens)
    try {
        if (contractInformation) {
            const contract = getContract({
                address: contractInformation.address,
                abi: contractInformation.abi,
                client: {
                    public: selectedNetwork.client,
                },
            });

            const res: BalanceInfo | any = await contract.read.fetchBalances([tokens, address]);
            console.log("fetchBalances", address, res)
            response = res;
        }
        return response;
    } catch (error) {
        console.log('fetchBalances : ', error);
        return response;
    }
}


 

export const fetchPairs = async (chainId: number, routers: Router[],wrapper:string, base: Token, quote:Token, amount:bigint): Promise<PairInfo[]> => {
    let selectedNetwork = getNetworkClient(chainId);
    let response: PairInfo[] = [];
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



            const res: PairInfo[] | any = await contract.read.fetchPairs([routers,wrapper,base.address,quote.address,amount]);
            console.log("fetchPairs", res)
            response = res;
        }
        return response;
    } catch (error) {
        console.log('fetchPairs : ', error);
        return response;
    }
}



export const swap = async (chainId: number, walletProvider: any, isConnected: any, address: any, tradeInfo: TCustomPair,wrapper:string, base: Token, quote:Token, amountIn:bigint,amountOut:bigint): Promise<ContractCallResponse> => {
    let selectedNetwork = getNetworkClient(chainId);
    let callResponse: ContractCallResponse = { success: false, transaction: null, error: null }

    if (!isConnected) {
        callResponse.success = false;
        callResponse.transaction = null;
        callResponse.error = { message: "You are not connected." };
        return callResponse;
    }

    if (amountIn == BigInt(0)) {
        callResponse.success = false;
        callResponse.transaction = null;
        callResponse.error = { message: "Amount must greater than zero!" };
        return callResponse;
    }

    if (amountOut == BigInt(0)) {
        callResponse.success = false;
        callResponse.transaction = null;
        callResponse.error = { message: "Output amount must greater than zero!" };
        return callResponse;
    }

    let diamondContractParams = getContractByName("DIAMOND", selectedNetwork.network.chainId);

    try {
        let contractParams = {
            address: ethers.getAddress(diamondContractParams.address) as any,
            abi: diamondContractParams.abi,
            rpcUrl: selectedNetwork.network.rpcUrl
        }

        let IS_NATIVE =  ethers.getAddress(base.address) == ethers.getAddress(ethers.ZeroAddress)
        let INPUT_TOKEN = IS_NATIVE ? tradeInfo.pair.weth : base.address;

              
        let swapParam: SwapParam = {
            amountIn: amountIn,
            amountOut: amountOut,
            weth9: tradeInfo.pair.weth,
            wrapper: wrapper,
            pair: tradeInfo.pair.pair,
            input: INPUT_TOKEN
        };
              
               const overrides = {
                   value:IS_NATIVE ? amountIn : 0
               }

               console.log('swapParam',address,wrapper,swapParam)
 

        const diamondContract: any = GetContractAt(contractParams);
        const signer = await GetSigner(walletProvider);

        const tx = await diamondContract
            .connect(signer)
            // @ts-ignore
            .swap(swapParam, overrides);

        await tx.wait();
        callResponse.success = true;
        callResponse.error = null;
        callResponse.transaction = tx;
    }
    catch (exception: any) {
        callResponse.success = false;
        callResponse.error = { message: "Swap Failed!", exception: exception };
    }
    return callResponse
}

export const swapAll = async (chainId: number, walletProvider: any, isConnected: any, address: any, tradeInfo: TCustomPair[],wrapper:string, base: Token, quote:Token, amountIn:bigint): Promise<ContractCallResponse> => {
    let selectedNetwork = getNetworkClient(chainId);
    let callResponse: ContractCallResponse = { success: false, transaction: null, error: null }

    if (!isConnected) {
        callResponse.success = false;
        callResponse.transaction = null;
        callResponse.error = { message: "You are not connected." };
        return callResponse;
    }

    if (amountIn == BigInt(0)) {
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

        let IS_NATIVE =  ethers.getAddress(base.address) == ethers.getAddress(ethers.ZeroAddress)

        let swapParams : SwapParam[] = []

        let depositAmount = parseEther("0")
        for(let i = 0; i < tradeInfo.length;i++){
            let trade = tradeInfo[i];
            let INPUT_TOKEN = IS_NATIVE ? trade.pair.weth : base.address;

            let amountOut = parseUnits(trade.outputAmount,quote.decimals)
            let swapParam: SwapParam = {
                amountIn: amountIn,
                amountOut: amountOut,
                weth9: trade.pair.weth,
                wrapper: wrapper,
                pair: trade.pair.pair,
                input: INPUT_TOKEN
            };
            depositAmount = depositAmount+amountIn
            swapParams.push(swapParam)
        }
        
        const overrides = {
            value:IS_NATIVE ? depositAmount : 0
        }

               console.log('swapParam',address,wrapper,swapParams)
 

        const diamondContract: any = GetContractAt(contractParams);
        const signer = await GetSigner(walletProvider);

        const tx = await diamondContract
            .connect(signer)
            // @ts-ignore
            .swapAll(swapParams, overrides);

        await tx.wait();
        callResponse.success = true;
        callResponse.error = null;
        callResponse.transaction = tx;
    }
    catch (exception: any) {
        callResponse.success = false;
        callResponse.error = { message: "Swap Failed!", exception: exception };
    }
    return callResponse
}



