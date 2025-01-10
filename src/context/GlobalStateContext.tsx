// context/GlobalStateContext.tsx
import { Asset, Claim, Contribution, Player } from '#src/types/Contribution';
import React, { createContext, useReducer, useContext, ReactNode, useState } from 'react';
import Leaflet from 'leaflet'


interface ContributionContextType {
  registrationFee:bigint;
  contributions: Contribution[];
  claims:Claim[];
  players:Player[];
  assets:Asset[];
  player:Player | null;
  currentChainId : number | null;
  location: Leaflet.LatLng | undefined
  addClaims: (claims: Claim[]) => void;  // Toplu ekleme fonksiyonu
  addAssets: (assets: Asset[]) => void;  // Toplu ekleme fonksiyonu
  addPlayers: (players: Player[]) => void;  // Toplu ekleme fonksiyonu
  addContributions: (contributions: Contribution[]) => void;  // Toplu ekleme fonksiyonu
  addPlayer : (player:Player | null) => void
  addRegistrationFee : (fee:bigint) => void
  addLocation : (_location:Leaflet.LatLng | undefined) => void
  storeChainData : (_chainId:number|any) => void

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
  const [location, setLocation] = useState<Leaflet.LatLng | undefined>(undefined)
  const [currentChainId,setChainId] = useState<number | null>(null);

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

  const addLocation = (_location:Leaflet.LatLng | undefined) => {
    setLocation(_location)
  }

  const storeChainData = (_chainId : number | null) => {
    setChainId(_chainId)
  }

  return (
    <ContributionContext.Provider value={{currentChainId,location,registrationFee, player, contributions,claims,players,assets,storeChainData,addRegistrationFee ,addPlayer,addContributions, addClaims, addPlayers,addAssets,addLocation }}>
      {children}
    </ContributionContext.Provider>
  );
};