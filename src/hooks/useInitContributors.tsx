import { useContributionContext } from '#src/context/GlobalStateContext';
import { Player } from '#src/types/Contribution';
import { getAssets, getClaimHistory, getContributors, getPlayers,getPlayer } from '#src/utils/web3/util';
import { useAppKitAccount } from '@reown/appkit/react';
import { ethers } from 'ethers';
import { useEffect } from 'react';

const useInitContributors = (refreshTrigger: boolean) => {
  const { addContributions, addPlayers, addAssets, addClaims,addPlayer } = useContributionContext();
  const { address, isConnected } = useAppKitAccount();

  useEffect(() => {
    const initContributors = async () => {
      try {
        let _player : Player | null  = await getPlayer(isConnected ? address : ethers.ZeroAddress) ?? null;
        addPlayer(_player);
        let _contributors = await getContributors();
        addContributions(_contributors);

        let _players = await getPlayers();
        addPlayers(_players);

        let _assets = await getAssets();
        addAssets(_assets);

        let _history = await getClaimHistory();
        addClaims(_history);
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