import Head from 'next/head';

const SharePage = () => {
  return (
    <>
      <Head>
        {/* Standard Meta Tags */}
        <meta name="description" content="Discover and contribute on MillionarMap by pinning tokens and earning rewards!" />
        <meta name="keywords" content="wealth, map, tokens, contribute, rewards" />
        <meta name="author" content="MillionarMap Team" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="MillionarMap - Your Map to Financial Freedom" />
        <meta property="og:description" content="Join MillionarMap today to pin tokens on the map, claim rewards, and build your wealth!" />
        <meta property="og:image" content="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/SabanciUniversity_DormView.jpg/440px-SabanciUniversity_DormView.jpg" />
        <meta property="og:url" content="https://millionarmap.com" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="MillionarMap" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@millionarmap" />
        <meta name="twitter:title" content="MillionarMap - Your Map to Financial Freedom" />
        <meta name="twitter:description" content="Join MillionarMap today to pin tokens on the map, claim rewards, and build your wealth!" />
        <meta name="twitter:image" content="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/SabanciUniversity_DormView.jpg/440px-SabanciUniversity_DormView.jpg" />
        <meta name="twitter:url" content="https://millionarmap.com" />

        {/* Favicon and other tags */}
        <link rel="icon" href="/favicon.ico" />
        <title>MillionarMap - Share Your Wealth</title>
      </Head>

      <main>
        {/* Your content here */}
        <h1>Welcome to MillionarMap!</h1>
        <p>Start pinning tokens and explore opportunities to build your fortune.</p>
      </main>
    </>
  );
};

export default SharePage;