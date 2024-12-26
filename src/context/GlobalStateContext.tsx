// context/GlobalStateContext.tsx
import { Contribution } from '#src/types/Contribution';
import React, { createContext, useReducer, useContext, ReactNode, useState } from 'react';




interface ContributionContextType {
  contributions: Contribution[];
  addContribution: (contribution: Contribution) => void;
  addContributions: (contributions: Contribution[]) => void;  // Toplu ekleme fonksiyonu
  addClaimer: (contributionIndex: number, claimer: string) => void;
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

  // Tek bir katkı ekleme fonksiyonu
  const addContribution = (contribution: Contribution) => {
    setContributions((prevContributions) => [...prevContributions, contribution]);
  };

  // Birden fazla katkıyı topluca ekleme fonksiyonu
  const addContributions = (contributions: Contribution[]) => {
    setContributions(contributions);
  };

  const addClaimer = (contributionIndex: number, claimer: string) => {
    setContributions((prevContributions) => {
      const updatedContributions = [...prevContributions];
      updatedContributions[contributionIndex].claimers.push(claimer);
      return updatedContributions;
    });
  };

  return (
    <ContributionContext.Provider value={{ contributions, addContribution, addContributions, addClaimer }}>
      {children}
    </ContributionContext.Provider>
  );
};