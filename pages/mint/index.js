import React, { useState, useEffect} from "react";
import HeadComponent from '../../components/Head';
import Footer from '../../components/footer';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Spline from '@splinetool/react-spline';
import Link from 'next/link';
import '../../styles/CandyMachine.module.css';
import CandyMachine from './Minter';

const SPLINE_SCENE = 'https://prod.spline.design/lwFGUGO5nCfnnDQU/scene.splinecode';

const MintPage = () => {
  const  { publicKey } = useWallet();
  const isOwner = ( publicKey ? publicKey.toString() === process.env.NEXT_PUBLIC_OWNER_PUBLIC_KEY : false );

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

  const renderMarket = () => (
  <div className="row" style={{ justifyContent:'center' }}>
    <div className="button-container">
      <button className="cta-button market-wallet-button">
        <Link href="/"><a>MARKET</a></Link>
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
    if (publicKey) {
    }
  }, [publicKey]);

  const renderItemMintContainer = () => (
    <div className="middle-row">
      <h2>Minting is currently enabled for testing while contract is on DEVNET!</h2>
    </div>
  );

  return (
    <div className="App">
      <HeadComponent/>
      <div className="container">
        <header className="header-container">
            <p className="header">DarkMoon🌑Mint</p>
              <header className="header-right">
                {isOwner && renderAdminPanel()}
                {renderMarket()}
                {publicKey ? renderConnectedProfile() : renderNotConnectedContainer()}
              </header>
        </header>
        <Spline scene={SPLINE_SCENE} />
        <div className="middle">
         {renderItemMintContainer()}
        </div>
        <Footer/>
      </div>
    </div>
  );
};

export default MintPage;
