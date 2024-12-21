import 'leaflet/dist/leaflet.css'
import {NextUIProvider} from "@nextui-org/react";

import type { AppProps } from 'next/app'
import { Catamaran } from 'next/font/google'
import Head from 'next/head'

import '#components/Map/leaflet-custom.css'
import '#src/globals.css'

const catamaran = Catamaran({
  subsets: ['latin'],
  variable: '--font-catamaran',
})

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <NextUIProvider>
    <Head>
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <main className={`${catamaran.variable} font-sans text-base`}>
      <Component {...pageProps} />
    </main>
    </NextUIProvider>
  </>
)

export default App
