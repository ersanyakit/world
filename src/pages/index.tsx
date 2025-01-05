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


const MapPage = () => {
  const { address, isConnected } = useAppKitAccount();

  const [refreshTrigger, setRefreshTrigger] = useState(true);

/* 
  const showToast = () => {
    let messages: string[] = [
      "A new millionaire candidate registered.",
      "A new pin was added to the map.",
      "A location has been marked.",
      "Congrats! A user joined the millionaire network.",
      "A new milestone reached.",
      "A profile was updated.",
      "New opportunities are available.",
      "A new candidate joined a referral network.",
      "The map is updated with new millionaire locations.",
      "A user’s status upgraded.",
      "A new referral was added.",
      "A referral network expanded.",
      "The community is growing.",
      "New candidates registered today.",
      "A new achievement unlocked.",
      "A location is now visible.",
      "A user earned a new achievement.",
      "A new referral milestone reached.",
      "A referral chain grew by 5.",
      "A pin was updated.",
      "A map position verified.",
      "A new millionaire tier unlocked.",
      "A user promoted to the next level.",
      "A reward earned for leveling up.",
      "Another candidate joined!",
      "A profile shows progress now.",
      "A referral added their pin.",
      "A network is in the top 10.",
      "A new message in inbox.",
      "A user earned a new badge.",
      "A candidate reached the top tier.",
      "A user reached the first millionaire level.",
      "The community is expanding globally.",
      "A user is eligible for rewards.",
      "A status was updated.",
      "New profiles added today.",
      "A new referral promotion unlocked.",
      "A user featured as a top user.",
      "A pin is visible to more people.",
      "A new milestone added.",
      "A referral strategy paid off.",
      "New features unlocked.",
      "A profile is now complete.",
      "A user reached a new goal.",
      "Many new pins added to the map.",
      "A milestone achieved by the network.",
      "A rank improved.",
      "A user is closer to top millionaire status.",
      "A referral chain growing fast.",
      "A user helped new candidates register.",
      "A profile featured on the homepage.",
      "A new feature added for a user.",
      "A special promotion unlocked.",
      "A map position is more prominent.",
      "A new referral gained.",
      "A referral status upgraded.",
      "A profile highlighted for achievements.",
      "A referral chain is now huge."
    ];
    const message = messages[Math.floor(Math.random() * messages.length)];


    const promise = () => new Promise((resolve) => setTimeout(() => resolve({ message: message }), 2000));

    toast.promise(promise, {
      loading: 'Loading...',
      success: (data : any) => {
        return `${data.message}`;
      },
      error: 'Error',
    });
    //toast.info(message)
  }

  useEffect(() => {
    // İlk çağrı
    showToast();

    // Her 5 saniyede bir tekrar çağırmak için interval ayarlıyoruz
    const interval = setInterval(showToast, 2500);

    // Temizleme fonksiyonu
    return () => clearInterval(interval);
  }, []);
 */
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
