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

        <title>KEWL WORLD 🤩</title>
        <meta property="og:title" content="KEWL World🤩" key="title" />
        <meta name="description" content="KEWL WORLD by KEWL EXCHANGE" />
    </Head>
    <body className="bg-white">
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
