import { TContract,MultiContractConfig, TCustomContract } from '#src/types/web3.types';
import WorldDiamondABI from "../../constants/abi/WorldDiamond.json"
import ERC20ABI from "../../constants/abi/ERC20.json"


export const DiamondAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

export const ContractList: MultiContractConfig = {
  "DIAMOND": {
    abi:WorldDiamondABI.abi,
    contracts:{
      88888: {
        address: DiamondAddress, 
      },
      31337:{
        address: DiamondAddress, 
      },
      43114:{
        address: DiamondAddress, 
      }
    }
  },
  "TOKEN": {
    abi:ERC20ABI.abi,
    contracts:{
    88888: {
      address: "0xTokenMainnetAddress",
    },
    43114:{
      address: DiamondAddress, 
    }
  }
  },
};


export const getContractByName = (contractName: string, chainID: number): TCustomContract => {
  console.log("chainId",chainID)
  const contractGroup = ContractList[contractName];
  if (!contractGroup) {
    throw new Error(`Unknown contract name: ${contractName}`);
  }
  let contract: TCustomContract = {
    abi : contractGroup.abi,
    address : contractGroup.contracts[chainID].address
  }
  return contract;
}