import { Leaf } from 'lucide-react'
import Head from 'next/head'
import Link from 'next/link'

import NavMenu from '#components/common/NavMenu'
import { AppConfig } from '#lib/AppConfig'

const Home = () => (
  <div className="container mx-auto max-w-2xl p-3 max-md:max-w-none">
    <Head>
      <title>KEWL WORLD 🤩</title>
      <meta
        property="og:title"
        content="KEWL WORLD🤩"
        key="title"
      />
      <meta
        name="description"
        content="KEWL WORLD."
      />
    </Head>
    <header className="items-top mt-10 gap-4 md:flex">
      <span className="text-primary">
        <Leaf size={AppConfig.ui.bigIconSize} className="mt-2" />
      </span>
      <div>
        <h2 className="text-4xl font-bold ">KEWL WORLD</h2>
        <h3 className="mb-16 text-3xl">KEWL WORLD by KEWL EXCHANGE</h3>
      </div>
    </header>
    <section>
 
      <p className="my-3">
        <span> 🤝 Feel free to contribute on </span>
        <Link
          href="https://github.com/kewlexchange/world"
          className="text-primary"
        >
          Github
        </Link>
      </p>
    </section>
    <section className="grid grid-cols-1 md:grid-cols-2">
      <div>
        <h3 className="my-5 text-xl">Demo Content</h3>
        <NavMenu />
      </div>
    </section>
    <footer className="mt-16 flex justify-between rounded bg-light p-3 text-sm">
      <div>
        2024, KEWL EXCHANGE
        <br />
        <Link
          href="https://github.com/kewlexchange/world"
          className="text-primary"
        >
          KEWL WORLD
        </Link>
      </div>
      <div className="text-primary">
        <Leaf size={AppConfig.ui.mapIconSize} className="mt-1" />
      </div>
    </footer>
  </div>
)

export default Home
