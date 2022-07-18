import React, { useState, useEffect} from "react";
import Footer from '../../components/footer';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { InfinitySpin } from 'react-loader-spinner';
import { hasPurchased } from '../../lib/api';
import Lobby from "./game/Lobby.js";
import Spline from '@splinetool/react-spline';
import Link from 'next/link';

// CONSTANTS
const SPLINE_SCENE = `https://prod.spline.design/lwFGUGO5nCfnnDQU/scene.splinecode`;
const itemID = 1;
const STATUS = {
  Initial: 'Initial',
  Paid: 'Paid'
};

const GamePage = () => {
  const { publicKey } = useWallet();
  const user = useWallet().toString();
  const isOwner = false;
  /* const isOwner = ( publicKey ? user.toString() === process.env.NEXT_PUBLIC_OWNER_PUBLIC_KEY : false ); */
  // const isHodlr = ( publicKey );
  const [status, setStatus] = useState(STATUS.Initial); // Tracking transaction status
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);

  const renderNotConnectedContainer = () => (
    <div className="row" style={{ justifyContent:'center' }}>
      <div className="button-container">
        <WalletMultiButton className="cta-button connect-wallet-button" />
      </div>
    </div>
);

const renderConnectedProfile = () => (
  <div className="row" style={{ justifyContent:'center' }}>
    <div className="button-container">
      <WalletMultiButton className="cta-button connect-wallet-button" />
    </div>
  </div>
);

const renderHome = () => (
<div className="row" style={{ justifyContent:'center' }}>
  <div className="button-container">
    <button className="cta-button market-wallet-button">
      <Link href="/"><a>MARKET</a></Link>
    </button>
    <button className="cta-button market-wallet-button" disabled="Initial">
        <a>MINT</a>
    </button>
  </div>
</div>
);

const renderAdminPanel = () => (
<div className="row" style={{ justifyContent:'center' }}>
  <div className="button-container">
  <button className="cta-button admin-wallet-button">
    <Link href="/admin"><a>ADMIN</a></Link>
  </button>
</div>
</div>
);

  const renderGameContainer = () => (
    <div className="App">
      <Lobby/>
    </div>
  );

  if (loading) {
    return <InfinitySpin color="green" />;
  }

  return (
    <div className="App">
      <div className="container">
        <header className="header">
            <header className="header-right">
            {isOwner && renderAdminPanel()}
            {publicKey ? renderConnectedProfile() : renderNotConnectedContainer()}
            </header>
        </header>
      {status === STATUS.Initial ? (
        <>
        {renderGameContainer()}
        </>
      ) : (
        <>
        <header className="header-container">
          <header className="header-left">
            <Link href="/play"><h1>PLAY🌑</h1></Link>
          </header>
        </header>
        <Spline scene={SPLINE_SCENE} />
        <div className="middle-row">
            <p>Please make a donation first!</p>
          {renderHome()}
            <p>Mint donation contract is being built!</p>
        </div>
        <Footer/>
        </>
      )}
      </div>
    </div>
  );
};

export default GamePage;
