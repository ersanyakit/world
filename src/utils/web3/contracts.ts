import { TContract } from '#src/types/web3.types';
import { ChilizMainnet,HardhatTestnet } from './chains';
import WorldDiamondABI from "../../constants/abi/WorldDiamond.json"

export const DiamondAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

export const DiamondContract: TContract = {
  address: DiamondAddress,
  abi: WorldDiamondABI.abi,
  chainId: ChilizMainnet.chainId,
  rpcUrl: ChilizMainnet.rpcUrl,
};

export const HardhatContract: TContract = {
  address: DiamondAddress,
  abi: WorldDiamondABI.abi,
  chainId: HardhatTestnet.chainId,
  rpcUrl: HardhatTestnet.rpcUrl,
};
