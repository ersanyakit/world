// context/GlobalStateContext.tsx
import { Asset, Claim, Contribution, Player } from '#src/types/Contribution';
import React, { createContext, useReducer, useContext, ReactNode, useState } from 'react';


interface ContributionContextType {
  registrationFee:bigint;
  contributions: Contribution[];
  claims:Claim[];
  players:Player[];
  assets:Asset[];
  player:Player | null
  addClaims: (claims: Claim[]) => void;  // Toplu ekleme fonksiyonu
  addAssets: (assets: Asset[]) => void;  // Toplu ekleme fonksiyonu
  addPlayers: (players: Player[]) => void;  // Toplu ekleme fonksiyonu
  addContributions: (contributions: Contribution[]) => void;  // Toplu ekleme fonksiyonu
  addPlayer : (player:Player | null) => void
  addRegistrationFee : (fee:bigint) => void

}

const ContributionContext = createContext<ContributionContextType | undefined>(undefined);

export const useContributionContext = () => {
  const context = useContext(ContributionContext);
  if (!context) {
    throw new Error('useContributionContext must be used within a ContributionProvider');
  }
  return context;
};

interface ContributionProviderProps {
  children: ReactNode;
}

export const ContributionProvider: React.FC<ContributionProviderProps> = ({ children }) => {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [player, setPlayer] = useState<Player | null>(null);
  const [registrationFee, setRegistrationFee] = useState<bigint>(BigInt(0));

  const addContributions = (contributions: Contribution[]) => {
    setContributions(contributions);
  };

  const addClaims = (claims: Claim[]) => {
    setClaims(claims);
  };

  const addAssets = (assets: Asset[]) => {
    setAssets(assets);
  };

  const addPlayers = (players: Player[]) => {
    setPlayers(players);
  };


  const addPlayer = (player:Player | null) => {
    setPlayer(player)
  }

  const addRegistrationFee = (fee:bigint) => {
    setRegistrationFee(fee)
  }

  return (
    <ContributionContext.Provider value={{registrationFee, player, contributions,claims,players,assets,addRegistrationFee ,addPlayer,addContributions, addClaims, addPlayers,addAssets }}>
      {children}
    </ContributionContext.Provider>
  );
};