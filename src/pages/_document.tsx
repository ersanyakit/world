import { Head, Html, Main, NextScript } from 'next/document';

const Document = () => (
  <Html lang="en">
    <Head>
    <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link
            href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap"
            rel="stylesheet"
          />

        <title>MILLIONARMAP</title>
        <meta property="og:title" content="MILLIONARMAP - Your Map to Financial Freedom" key="title" />
        <meta name="description" content="Join MillionarMap today and start building your wealth—one token at a time." />
    </Head>
    <body className="bg-white">
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
