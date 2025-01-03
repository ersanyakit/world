import { TContract } from '#src/types/web3.types';
import { ChilizMainnet,HardhatTestnet } from './chains';
import WorldDiamondABI from "../../constants/abi/WorldDiamond.json"

export const DiamondAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

export const DiamondContract: TContract = {
  address: DiamondAddress,
  abi: WorldDiamondABI.abi,
  chainId: ChilizMainnet.chainId,
  rpcUrl: ChilizMainnet.rpcUrl,
};

export const HardhatContract: TContract = {
  address:  DiamondAddress,
  abi: WorldDiamondABI.abi,
  chainId: HardhatTestnet.chainId,
  rpcUrl: HardhatTestnet.rpcUrl,
};
