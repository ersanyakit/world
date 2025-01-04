import Head from 'next/head'
import Map from '#components/Map'
import { Alert, Button } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { getAssets, getClaimHistory, getContributors, getPlayers } from '#src/utils/web3/util'
import { useContributionContext } from '#src/context/GlobalStateContext'
import useInitContributors from '#src/hooks/useInitContributors'

const MapPage = () => {

  const [refreshTrigger, setRefreshTrigger] = useState(true);


  useInitContributors(refreshTrigger);

  useEffect(() => {
    if (refreshTrigger) {
      setRefreshTrigger(false); // Veriler yüklendikten sonra refreshTrigger'ı false yapıyoruz
    }
  }, [refreshTrigger]); // refreshTrigger değiştiğinde çalışacak

  
 
  return (
    <div>
      <div className="w-full">


       <Map /> 
    
      </div>
    </div>
  )
}

export default MapPage
