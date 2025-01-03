import { useContributionContext } from '#src/context/GlobalStateContext';
import { getAssets, getClaimHistory, getContributors, getPlayers } from '#src/utils/web3/util';
import { useEffect } from 'react';

const useInitContributors = (refreshTrigger: boolean) => {
  const { addContributions, addPlayers, addAssets, addClaims } = useContributionContext();

  useEffect(() => {
    const initContributors = async () => {
      try {
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