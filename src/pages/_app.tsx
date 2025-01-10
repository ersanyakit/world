import 'leaflet/dist/leaflet.css';
import { NextUIProvider } from '@nextui-org/react';
import type { AppProps } from 'next/app';
import { Catamaran } from 'next/font/google';
import '#components/Map/leaflet-custom.css';
import '#src/globals.css';
import { Web3Provider } from '#src/context/web3modal';
import { ContributionProvider } from '#src/context/GlobalStateContext';
import { QueryProvider } from '#src/context/GlobalQueryContext'; // Adjust the path as necessary
import React from 'react';




const App = ({ Component, pageProps }: AppProps) => (
  <>
    <NextUIProvider>
      <QueryProvider>
        <Web3Provider> {/* Daha üstte olması gerekebilir */}
          <ContributionProvider>
            <main className={`text-base`}>
              <Component {...pageProps} />
            </main>
          </ContributionProvider>
        </Web3Provider>
      </QueryProvider>
    </NextUIProvider>
  </>
);

export default App;
