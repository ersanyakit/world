import Head from 'next/head'

import Map from '#components/Map'
import { Button } from '@nextui-org/react'

const MapPage = () => (
  <div>
    <Head>
      <title>KEWL WORLD 🤩</title>
      <meta
        property="og:title"
        content="KEWL World🤩"
        key="title"
      />
      <meta
        name="description"
        content="KEWL WORLD by KEWL EXCHANGE"
      />
    </Head>


    <div className='w-full'>

    <Map />
    </div>

  </div>
)

export default MapPage
