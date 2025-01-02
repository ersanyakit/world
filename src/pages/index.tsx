import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react';
import { AppConfig } from '#lib/AppConfig';
import { DiamondContract } from '#src/utils/web3/contracts';
import { GetContractAt, GetSigner } from '#src/utils/web3/util';
import { Leaf } from 'lucide-react';
import Head from 'next/head';
import Link from 'next/link';

const Home = () => {
  const { address, isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider('eip155');

 

  return (
    <div className="dark container mx-auto max-w-2xl p-3 max-md:max-w-none">
      <Head>
        <title>KEWL WORLD 🤩</title>
        <meta property="og:title" content="KEWL WORLD🤩" key="title" />
        <meta name="description" content="KEWL WORLD." />
      </Head>
      <header className="items-top mt-10 gap-4 md:flex">
        <span className="text-primary">
          {/** @ts-ignore */}
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
          {/** @ts-ignore */}

          <Link
            href="https://github.com/kewlexchange/world"
            className="text-primary"
          >
            Github
          </Link>
        </p>
      </section>

      <footer className="mt-16 flex justify-between rounded bg-light p-3 text-sm">
        <div>
          2024, KEWL EXCHANGE
          <br />
          {/** @ts-ignore */}
          <Link
            href="https://github.com/kewlexchange/world"
            className="text-primary"
          >
            KEWL WORLD
          </Link>
        </div>

        <div className="text-primary">
          {/** @ts-ignore */}

          <Leaf size={AppConfig.ui.mapIconSize} className="mt-1" />
        </div>
      </footer>
    </div>
  );
};

export default Home;
