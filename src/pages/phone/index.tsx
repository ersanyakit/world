import Head from 'next/head'
import Map from '#components/Map'
import { Alert, Button } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useContributionContext } from '#src/context/GlobalStateContext'
import useInitContributors from '#src/hooks/useInitContributors'
import { useAppKitAccount } from '@reown/appkit/react'
import { toast } from "sonner"
import { Toaster } from '#components/ui/sonner'
import { decodeTweetId } from '#lib/utils'
import { useChainId } from '#src/context/ChainIdProvider'
import MapTopBar from '#components/TopBar'




const PhonePage = () => {
  const { address, isConnected } = useAppKitAccount();
 
  const [refreshTrigger, setRefreshTrigger] = useState(true);
   const chainId = useChainId()

  useInitContributors(chainId,refreshTrigger);

  useEffect(() => {
    if (refreshTrigger) {
      setRefreshTrigger(false); // Veriler yüklendikten sonra refreshTrigger'ı false yapıyoruz
    }
  }, [refreshTrigger]); // refreshTrigger değiştiğinde çalışacak

  useEffect(() => {
    if (isConnected) {
      setRefreshTrigger(!refreshTrigger)
    }

  }, [isConnected, address,chainId])



  return (
    <>
     
        <div className="w-full">
          
        </div>

    </>
  )

}

export default PhonePage;
