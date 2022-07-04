import React, { useState, useEffect} from "react";
import HeadComponent from '../../components/Head';
import Footer from '../../components/footer';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Link from 'next/link';

const AdminPage = () => {
  const { publicKey } = useWallet();
  const isOwner = ( publicKey ? publicKey.toString() === process.env.NEXT_PUBLIC_OWNER_PUBLIC_KEY : false );
  const isHodlr = ( publicKey );

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
        <Link href="/about"><a>ABOUT</a></Link>
      </button>
      <button className="cta-button market-wallet-button">
        <Link href="/"><a>MARKET</a></Link>
      </button>
      <button className="cta-button mint-button" disabled="true">
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
    if (publicKey) {
      console.log( {publicKey} );
    }
  }, [publicKey]);

  const renderAdminContainer = () => (
    <div className="middle-row">
      {publicKey ? <><p>Welcome Admins!</p>
            <button className="cta-button play-button">
            <Link href="/play">
            <a>PLAY ALPHA🌑</a>
              </Link>
            </button>
        </> : renderHome() }
    </div>
  );

  return (
    <div className="App">
      <HeadComponent/>
      <div className="container">
        <header className="header-container">
            <p className="header">DarkMoon🌑Admin</p>
            <header className="header-right">
                {isOwner && renderAdminPanel()}
                {publicKey ? renderConnectedProfile() : renderNotConnectedContainer()}
              </header>
        </header>
        <div className="middle">
          {isOwner ? renderAdminContainer() : <><p className="middle-row">You are not an Admin</p></>}
          {renderHome()}
        </div>
        <Footer/>
      </div>
    </div>
  );
};

export default AdminPage;
