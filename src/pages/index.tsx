import Head from 'next/head'
import Map from '#components/Map'
import { Alert, Button } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { getAssets, getClaimHistory, getContributors, getPlayers } from '#src/utils/web3/util'
import { useContributionContext } from '#src/context/GlobalStateContext'
import useInitContributors from '#src/hooks/useInitContributors'
import { useAppKitAccount } from '@reown/appkit/react'
import { toast } from "sonner"
import { Toaster } from '#components/ui/sonner'



const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * 11);
  const imageURL = `https://millionarmap.com/assets/og/${randomIndex}.webp`
  return imageURL
};

const getTitle = () => {
  return "MILLIONARMAP - Your Map to Financial Freedom";
};

const MapPage = () => {
  const { address, isConnected } = useAppKitAccount();
  const title = getTitle();
  const randomImage = getRandomImage(); // Get a random image URL

  const [refreshTrigger, setRefreshTrigger] = useState(true);

  useInitContributors(refreshTrigger);

  useEffect(() => {
    if (refreshTrigger) {
      setRefreshTrigger(false); // Veriler yüklendikten sonra refreshTrigger'ı false yapıyoruz
    }
  }, [refreshTrigger]); // refreshTrigger değiştiğinde çalışacak

  useEffect(() => {
    if (isConnected) {
      setRefreshTrigger(!refreshTrigger)
    }
  }, [isConnected, address])



  return (
    <>
    <Head>
      <title>{"MILLIONARMAP - Your Map to Financial Freedom"}</title>
        <meta name="description" content="Join MillionarMap today and start building your wealth—one token at a time." />

        {/* Standard Meta Tags */}
        <meta name="description" content="Discover and contribute on MillionarMap by pinning tokens and earning rewards!" />
        <meta name="keywords" content="wealth, map, tokens, contribute, rewards" />
        <meta name="author" content="MillionarMap" />
        {/* Open Graph Tags */}
        <meta property="og:title" content={title} key="title" />
        <meta property="og:description" content="Join MillionarMap today to pin tokens on the map, claim rewards, and build your wealth!" />
        <meta property="og:image" content={randomImage} />
        <meta property="og:url" content="https://millionarmap.com" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="MillionarMap" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@millionarmap" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content="Join MillionarMap today to pin tokens on the map, claim rewards, and build your wealth!" />
        <meta name="twitter:image" content={randomImage} />
        <meta name="twitter:url" content="https://millionarmap.com" />
    </Head>
      <div>
        <div className="w-full">
           <Map /> 
        </div>
      </div>
      {/* <Toaster visibleToasts={5} className='!bottom-[120px] !z-1' expand={false} position='bottom-left' richColors={true} /> */}

    </>
  )

}

export default MapPage
