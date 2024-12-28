import Head from 'next/head'
import Map from '#components/Map'
import { Button } from '@nextui-org/react'
import { useEffect } from 'react'
import { getAssets, getClaimHistory, getContributors, getPlayers } from '#src/utils/web3/util'
import { useContributionContext } from '#src/context/GlobalStateContext'

const MapPage = () => {
  const { contributions, addContributions, addPlayers , addAssets,addClaims} = useContributionContext();

  const initContributors = async () => {
    let _contributors = await getContributors()
    addContributions(_contributors)
    let _players = await getPlayers()
    addPlayers(_players)
    let _assets = await getAssets()
    addAssets(_assets)
    let _history = await getClaimHistory()
    addClaims(_history)
  }
  useEffect(() => {
    initContributors();
  }, [])

  return (
    <div>
      <Head>
        <title>KEWL WORLD 🤩</title>
        <meta property="og:title" content="KEWL World🤩" key="title" />
        <meta name="description" content="KEWL WORLD by KEWL EXCHANGE" />
      </Head>
      <div className="w-full">
       <Map /> 
      </div>
    </div>
  )
}

export default MapPage