import React, { useState, useEffect} from "react";
import HeadComponent from '../../components/Head';
import Footer from '../../components/footer';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Spline from '@splinetool/react-spline';
import Link from 'next/link';

const SPLINE_SCENE = `https://prod.spline.design/lwFGUGO5nCfnnDQU/scene.splinecode`;

const MintPage = () => {
  const { publicKey } = useWallet();
  const isOwner = ( publicKey ? publicKey.toString() === process.env.NEXT_PUBLIC_OWNER_PUBLIC_KEY : false );
  const [minting, setMinting] = useState(false);

  const renderNotConnectedContainer = () => (
    <div style={{ display:'flex', justifyContent:'center' }}>
      <div className="card bg-blur">
      <div className="row" style={{ justifyContent:'center' }}>
        <div className="button-container">
        <WalletMultiButton className="cta-button connect-wallet-button" />
      </div>
      </div>
     </div>
    </div>
  );

  useEffect(() => {
    if (publicKey) {
    }
  }, [publicKey]);

  const renderItemMintContainer = () => (
    <div className="products-container">
    </div>
  );

  return (
    <div className="App">
      <HeadComponent/>
      <div className="container">
        <header className="header-container">
            <p className="header">DarkMoon🌑Mint</p>
            <header className="header-right">
            <button className="cta-button connect-wallet-button">
                    <Link href="/"><a>MARKET</a></Link>  
            </button>
        </header>
        </header>
        <Spline scene={SPLINE_SCENE} />
        <div className="middle">
        {publicKey ? renderItemMintContainer() : renderNotConnectedContainer()}
        </div>
        <div className="middle-row">
        {isOwner && (<button className="cta-button connect-wallet-button" onClick={() => setMinting(!minting)}>
          {minting ? "CANCEL" : "MINT"}
        </button>)}
        </div>
        <Footer/>
      </div>
    </div>
  );
};

export default MintPage;
