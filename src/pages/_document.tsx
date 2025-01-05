import { Html, Head, Main, NextScript } from 'next/document';

const getRandomImage = () => {
  const images = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/SabanciUniversity_DormView.jpg/440px-SabanciUniversity_DormView.jpg", // Image 1
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Phnom_Penh_Skyline_2017.jpg/440px-Phnom_Penh_Skyline_2017.jpg", // Image 2
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Golden_Gate_Bridge.jpg/440px-Golden_Gate_Bridge.jpg", // Image 3
    // Add more images here (up to 50 or however many you need)
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Colosseum_in_Rome.jpg/440px-Colosseum_in_Rome.jpg", // Example Image 4
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Eiffel_Tower_from_the_Seine_2020.jpg/440px-Eiffel_Tower_from_the_Seine_2020.jpg", // Image 5
    // Continue adding URLs...
  ];

  const randomIndex = Math.floor(Math.random() * images.length); // Random index between 0 and the length of images array
  return images[randomIndex]; // Return the randomly selected image URL
};

const getTitle = () => {
  return "MILLIONARMAP - Your Map to Financial Freedom";
};


export default function Document(){
  const randomImage = getRandomImage(); // Get a random image URL
  const title = getTitle();

  return (
    <Html lang="en">
      <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap" rel="stylesheet" />
        <title>{title}</title>
        <meta property="og:title" content={title} key="title" />
        <meta name="description" content="Join MillionarMap today and start building your wealth—one token at a time." />

        {/* Standard Meta Tags */}
        <meta name="description" content="Discover and contribute on MillionarMap by pinning tokens and earning rewards!" />
        <meta name="keywords" content="wealth, map, tokens, contribute, rewards" />
        <meta name="author" content="MillionarMap Team" />

        {/* Open Graph Tags */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content="Join MillionarMap today to pin tokens on the map, claim rewards, and build your wealth!" />
        <meta property="og:image" content={randomImage} />
        <meta property="og:url" content="https://millionarmap.com" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="MillionarMap" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@millionarmap" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content="Join MillionarMap today to pin tokens on the map, claim rewards, and build your wealth!" />
        <meta name="twitter:image" content={randomImage} />
        <meta name="twitter:url" content="https://millionarmap.com" />
      </Head>
      <body className="bg-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}