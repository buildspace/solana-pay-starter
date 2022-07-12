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
  const isOwner = ( publicKey ? user.toString() === process.env.NEXT_PUBLIC_OWNER_PUBLIC_KEY : false );
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

  useEffect(() => {
    // Check if this address already has already purchased this item
    // If so, fetch the item and set paid to true
    // Async function to avoid blocking the UI?
    async function checkPurchased() {
      const purchased = await hasPurchased(publicKey, itemID);
      if (purchased) {
        setStatus(STATUS.Paid);
        console.log( `${publicKey} has purchased itemID#1 and can play!`);
      } else if (isOwner) {
        setStatus(STATUS.Paid);
        console.log( `${publicKey} admin has logged in - NOSUDO`);
      }
      }
      checkPurchased();
    }, [publicKey, itemID]);

  const renderGameContainer = () => (
    <div className="App">
      {publicKey ? <Lobby/> : <div className="middle-row">{renderNotConnectedContainer()}<p>You are logged out</p>{renderHome()}</div> }
    </div>
  );

  if (loading) {
    return <InfinitySpin color="green" />;
  }

  return (
    <div className="App">
      <div className="container">
        <header className="header">
            {isOwner && renderAdminPanel()}
            <header className="header-right">
                {publicKey ? renderConnectedProfile() : renderNotConnectedContainer()}
              </header>
        </header>
      {status === STATUS.Paid ? (
        <>
        {renderGameContainer()}
        </>
      ) : (
        <>
        <header className="header-container">
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
