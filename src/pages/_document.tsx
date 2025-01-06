import { Head, Html, Main, NextScript } from 'next/document';


export default function Document(){
   
  return (
    <Html lang="en">
      <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap" rel="stylesheet" />
        <title>{"MILLIONARMAP - Your Map to Financial Freedom"}</title>
        <meta name="description" content="Join MillionarMap today and start building your wealth—one token at a time." />

        {/* Standard Meta Tags */}
        <meta name="description" content="Discover and contribute on MillionarMap by pinning tokens and earning rewards!" />
        <meta name="keywords" content="wealth, map, tokens, contribute, rewards" />
        <meta name="author" content="MillionarMap" />

      </Head>
      <body >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}