import { useContributionContext } from '#src/context/GlobalStateContext';
import { Player } from '#src/types/Contribution';
import { useAppKitAccount, useAppKitNetwork } from '@reown/appkit/react';
import { ethers } from 'ethers';
import { useEffect } from 'react';
import { fetchBalances, getAssets, getClaimHistory, getContributors, getPlayer, getPlayerContributions, getPlayers, getRegistrationFee } from './useContractByName';

const useInitContributors = (chainIdInput:number, refreshTrigger: boolean) => {
  const { addContributions, addPlayers, addAssets, addClaims,addPlayer,addRegistrationFee,addPlayerContributions,addBalances } = useContributionContext();
  const {address, isConnected } = useAppKitAccount();
  const { chainId: chainIdProvider } = useAppKitNetwork();
  
  const chainId : number = chainIdProvider ? Number(chainIdProvider) : chainIdInput

  useEffect(() => {
    const initContributors = async () => {
      try {
        let _fee : bigint = await getRegistrationFee(chainId);
        addRegistrationFee(_fee)

        let _player : Player | null  = await getPlayer(chainId,isConnected ? address : ethers.ZeroAddress) ?? null;
        addPlayer(_player);

        let _balances   = await fetchBalances(chainId,isConnected ? address : ethers.ZeroAddress) ?? null;
        addBalances(_balances);

        let _contributors = await getContributors(chainId);
        addContributions(_contributors);

        let _players = await getPlayers(chainId);
        addPlayers(_players);

        let _assets = await getAssets(chainId);
        addAssets(_assets);

        let _history = await getClaimHistory(chainId);
        addClaims(_history);

        let _userContributions = await getPlayerContributions(chainId,isConnected ? address : ethers.ZeroAddress) ?? null;
        addPlayerContributions(_userContributions)
      } catch (error) {
        console.error('Error initializing contributors:', error);
      }
    };

    if (refreshTrigger) {
      initContributors();
    }
  }, [refreshTrigger, addContributions, addPlayers, addAssets, addClaims]);
};

export default useInitContributors;