import Head from 'next/head'
import Map from '#components/Map'
import { Button } from '@nextui-org/react'
import { useEffect } from 'react'
import { getContributors } from '#src/utils/web3/util'
import { useContributionContext } from '#src/context/GlobalStateContext'

const MapPage = () => {
  const { contributions, addContribution, addContributions, addClaimer } = useContributionContext();

  const initContributors = async () => {
    let data = await getContributors()
    addContributions(data)
    console.log("contributors",data)
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
      <ul>
        {contributions.map((contribution, index) => (
          <li key={contribution.index}>
            <h2>{contribution.name}</h2>
            <p>{contribution.description}</p>
            <p>Claims: {contribution.claimers.length}</p>
            <button onClick={() => addClaimer(index, '0x4567...')}>Add Claimer</button>
          </li>
        ))}
      </ul>
       <Map /> 
      </div>
    </div>
  )
}

export default MapPage