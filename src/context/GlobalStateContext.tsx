// context/GlobalStateContext.tsx
import { Asset, Claim, Contribution, Player } from '#src/types/Contribution';
import React, { createContext, useReducer, useContext, ReactNode, useState } from 'react';


interface ContributionContextType {
  contributions: Contribution[];
  claims:Claim[];
  players:Player[];
  assets:Asset[];
  player:Player | null
  addClaims: (claims: Claim[]) => void;  // Toplu ekleme fonksiyonu
  addAssets: (assets: Asset[]) => void;  // Toplu ekleme fonksiyonu
  addPlayers: (players: Player[]) => void;  // Toplu ekleme fonksiyonu
  addContributions: (contributions: Contribution[]) => void;  // Toplu ekleme fonksiyonu
  addPlayer : (player:Player) => void
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


  const addPlayer = (player:Player) => {
    setPlayer(player)
  }

  return (
    <ContributionContext.Provider value={{ player, contributions,claims,players,assets,addPlayer,addContributions, addClaims, addPlayers,addAssets }}>
      {children}
    </ContributionContext.Provider>
  );
};