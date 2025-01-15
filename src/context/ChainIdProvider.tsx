import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAppKitNetwork } from '@reown/appkit/react';
import { avalanche } from 'viem/chains';

// ChainIdContext'te varsayılan olarak Avalanche'ın chainId'sini belirtiyoruz.
const ChainIdContext = createContext<number>(avalanche.id); // Avalanche chainId (43114) varsayılan olarak ayarlanıyor.

export const ChainIdProvider = ({ children }: { children: React.ReactNode }) => {
  const { chainId } = useAppKitNetwork(); // chainId: string | number
  const [currentChainId, setCurrentChainId] = useState<number>(avalanche.id); // Varsayılan olarak Avalanche chainId (43114)

  useEffect(() => {
    if (chainId) {
      // chainId'yi bir number'a dönüştür
      const parsedChainId = typeof chainId === 'number' ? chainId : parseInt(chainId, 10);
      
      // Eğer geçerli bir number ise, state'e atıyoruz
      if (!isNaN(parsedChainId)) {
        setCurrentChainId(parsedChainId);
      } else {
        console.error("Geçersiz chainId, varsayılan Avalanche chainId (43114) kullanılacak.");
        setCurrentChainId(avalanche.id); // Geçersiz chainId durumunda AVAX chainId'yi kullanıyoruz
      }
    } else {
      // chainId yoksa, varsayılan olarak AVAX chainId'yi kullan
      setCurrentChainId(avalanche.id);
    }
  }, [chainId]);

  return (
    // currentChainId'yi sağlıyoruz, bu da her zaman bir number olacak
    <ChainIdContext.Provider value={currentChainId}>
      {children}
    </ChainIdContext.Provider>
  );
};

// useChainId hook'u her zaman bir number döner.
export const useChainId = () => useContext(ChainIdContext);