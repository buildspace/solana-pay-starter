import React from "react";
import Head from "next/head";

export default function HeadComponent() {
  return (
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="theme-color" content="#000000" />

      <title>Buy Recipes with Solana Pay</title>
      <meta name="title" content="Buy Recipes with Solana Pay" />
      <meta name="description" content="Buy Becca's Vegetarian recipes on my store using Solana Pay!" />

      {/* Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://rebeccaandmatt.com/" />
      <meta property="og:title" content="Buy Recipes with Solana Pay" />
      <meta property="og:description" content="Buy items on my store using Solana Pay!" />
      <meta property="og:image" content="https://bafybeib6f6homda3hddo6lzs4vtxi3pqcp3ebvv3ovyvxcyoxnqr5qv4ae.ipfs.infura-ipfs.io/" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://rebeccaandmatt.com/" />
      <meta property="twitter:title" content="Buy Recipes with Solana Pay" />
      <meta property="twitter:description" content="Buy items on my store using Solana Pay!" />
      <meta property="twitter:image" content="https://bafybeib6f6homda3hddo6lzs4vtxi3pqcp3ebvv3ovyvxcyoxnqr5qv4ae.ipfs.infura-ipfs.io/" />
    </Head>
  );
}
