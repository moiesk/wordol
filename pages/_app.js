import "../styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Wordol: Serverless Wordle on DigitalOcean</title>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@digitalocean" />
        <meta
          name="twitter:title"
          content="Wordol: Serverless Wordle on DigitalOcean"
        />
        <meta
          property="og:description"
          content="Wordle game for DigitalOcean Cloud Functions"
        />
        <meta
          property="og:image"
          content="/card.png"
        />
        <meta
          name="twitter:image"
          content="/card.png"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
