import 'leaflet/dist/leaflet.css';
import { NextUIProvider } from '@nextui-org/react';
import type { AppProps } from 'next/app';
import { Catamaran } from 'next/font/google';
import '#components/Map/leaflet-custom.css';
import '#src/globals.css';
import { Web3Provider } from '#src/context/web3modal';
import { ContributionProvider } from '#src/context/GlobalStateContext';

const catamaran = Catamaran({
  subsets: ['latin'],
  variable: '--font-catamaran',
});

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Web3Provider>
      <ContributionProvider>
      <NextUIProvider>
        <main className={`${catamaran.variable} font-sans text-base`}>
          <Component {...pageProps} />
        </main>
      </NextUIProvider>
      </ContributionProvider>
    </Web3Provider>
  </>
);

export default App;
