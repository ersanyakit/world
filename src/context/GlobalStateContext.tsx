// context/GlobalStateContext.tsx
import { Asset, BalanceInfo, Claim, Contribution, Player } from '#src/types/Contribution';
import React, { createContext, useReducer, useContext, ReactNode, useState } from 'react';
import Leaflet from 'leaflet'
import { Token } from '#src/types/web3.types';


interface ContributionContextType {
  baseToken : Token | null;
  quoteToken:Token | null;
  baseBalance:BalanceInfo | null
  quoteBalance:BalanceInfo | null
  swapInputAmount:string;

  registrationFee:bigint;
  contributions: Contribution[];
  claims:Claim[];
  players:Player[];
  assets:Asset[];
  balances:BalanceInfo[];
  player:Player | null;
  currentChainId : number | null;
  location: Leaflet.LatLng | undefined;
  playerContributions: Contribution[];


  addClaims: (claims: Claim[]) => void;  // Toplu ekleme fonksiyonu
  addAssets: (assets: Asset[]) => void;  // Toplu ekleme fonksiyonu
  addPlayers: (players: Player[]) => void;  // Toplu ekleme fonksiyonu
  addContributions: (contributions: Contribution[]) => void;  // Toplu ekleme fonksiyonu
  addPlayer : (player:Player | null) => void
  addRegistrationFee : (fee:bigint) => void
  addLocation : (_location:Leaflet.LatLng | undefined) => void
  storeChainData : (_chainId:number|any) => void
  addPlayerContributions:(contributions: Contribution[]) => void; 
  addBalances:(balances: BalanceInfo[]) => void; 

  addBaseToken : (token:Token | null) => void
  addQuoteToken : (token:Token | null) => void
  addSwapInputValue:(amount:string) => void

  addBaseTokenBalance : (token:BalanceInfo | null) => void
  addQuoteTokenBalance : (token:BalanceInfo | null) => void
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
  const [playerContributions, setUserContributions] = useState<Contribution[]>([]);
  const [balances, setBalances] = useState<BalanceInfo[]>([]);

  const [baseToken, setBaseToken] =  useState<Token | null>(null);
  const [quoteToken, setQuoteToken] =  useState<Token | null>(null);

  const [baseBalance, setBaseBalance] =  useState<BalanceInfo | null>(null);
  const [quoteBalance, setQuoteBalance] =  useState<BalanceInfo | null>(null);

  const [swapInputAmount,setSwapInputAmount] = useState<string>("");


 
  const addContributions = (contributions: Contribution[]) => {
    setContributions(contributions);
  };

  const addPlayerContributions = (contributions: Contribution[]) => {
    setUserContributions(contributions);
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

  const addBalances = (balances: BalanceInfo[]) => {
    setBalances(balances);
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

  const addBaseToken = (_token : Token | null) => {
    setBaseToken(_token)
  }
  const addQuoteToken = (_token : Token | null) => {
    setQuoteToken(_token)
  }

  const addSwapInputValue = (_input : string) => {
    setSwapInputAmount(_input)
  }
 
  const addBaseTokenBalance = (_balance : BalanceInfo | null) => {
    setBaseBalance(_balance)
  }

  const addQuoteTokenBalance = (_balance : BalanceInfo | null) => {
    setQuoteBalance(_balance)
  }



  return (
    <ContributionContext.Provider value={{baseBalance,quoteBalance,addBaseTokenBalance, addQuoteTokenBalance, baseToken,quoteToken,swapInputAmount, balances,playerContributions,currentChainId,location,registrationFee, player, contributions,claims,players,assets,storeChainData,addRegistrationFee ,addPlayer,addContributions, addClaims, addPlayers,addAssets,addLocation,addPlayerContributions,addBalances,addBaseToken,addQuoteToken,addSwapInputValue }}>
      {children}
    </ContributionContext.Provider>
  );
};