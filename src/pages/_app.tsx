import 'leaflet/dist/leaflet.css';
import { NextUIProvider } from '@nextui-org/react';
import type { AppProps } from 'next/app';
import { Catamaran } from 'next/font/google';
import '#components/Map/leaflet-custom.css';
import '#src/globals.css';
import { Web3Provider } from '#src/context/web3modal';
import { ContributionProvider } from '#src/context/GlobalStateContext';


 

const App = ({ Component, pageProps }: AppProps) => (
  <>
        <NextUIProvider>
        <ContributionProvider>

    <Web3Provider>

        <main className={`text-base`}>
          <Component {...pageProps} />
        </main>
        </Web3Provider>

      </ContributionProvider>
    </NextUIProvider>
  </>
);

export default App;
