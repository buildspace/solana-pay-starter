import React from "react";
import Head from "next/head";

export default function HeadComponent() {
  return (
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="theme-color" content="#000000" />

      <title>Dark Moon🌑Market</title>
      <meta name="title" content="Dark Moon 🌑 Market" />
      <meta name="description" content="Buy items on my store using Solana Pay!" />

      {/* Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://darkmoon.dev" />
      <meta property="og:title" content="Dark Moon 🌑 Market" />
      <meta property="og:description" content="Buy items on my store using Solana Pay!" />
      <meta property="og:image" content="https://gateway.pinata.cloud/ipfs/QmeJtqtvnETJeRUdYbndGFn9A327dQKZ5xfstDPUpefRVx" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://twitter.com/nitsuahlabs" />
      <meta property="twitter:title" content="Dark Moon 🌑 Market" />
      <meta property="twitter:description" content="Buy items on my store using Solana Pay!" />
      <meta property="twitter:image" content="https://gateway.pinata.cloud/ipfs/QmeJtqtvnETJeRUdYbndGFn9A327dQKZ5xfstDPUpefRVxg" />
    </Head>
  );
}
