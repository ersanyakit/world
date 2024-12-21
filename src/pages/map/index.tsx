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
        content="next-leaflet-starter-typescript is an extensible next.js starter template for the leaflet-maps-react plugin. Written in typescript,
      visually enhanced by tailwind and lucide-react icons."
      />
    </Head>


    <div className='w-full'>

    <Map />
    </div>

  </div>
)

export default MapPage
