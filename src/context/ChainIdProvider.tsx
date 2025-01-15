import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAppKitNetwork } from '@reown/appkit/react';
import { avalanche } from 'viem/chains';

const ChainIdContext = createContext<number>(avalanche.id); // Varsayılan olarak Avalanche'ın chainId'si

export const ChainIdProvider = ({ children }: { children: React.ReactNode }) => {
  const { chainId } = useAppKitNetwork(); // ChainId burada alınır.
  const [currentChainId, setCurrentChainId] = useState<number>(avalanche.id);

  useEffect(() => {
    // chainId geldiğinde, eğer geçerli bir sayıya dönüştürülebiliyorsa güncelleme yapılır.
    const parsedChainId = typeof chainId === 'number' ? chainId :avalanche.id;

    if (!isNaN(parsedChainId)) {
      setCurrentChainId(parsedChainId);
    } else {
      console.error("Geçersiz chainId, varsayılan Avalanche chainId (43114) kullanılacak.");
      setCurrentChainId(avalanche.id); // Geçersiz chainId durumunda AVAX chainId'yi kullanıyoruz.
    }
  }, [chainId]); // chainId değiştiğinde sadece çalışacak şekilde bağımlılığı ekliyoruz.

  return (
    <ChainIdContext.Provider value={currentChainId}>
      {children}
    </ChainIdContext.Provider>
  );
};

export const useChainId = () => useContext(ChainIdContext);