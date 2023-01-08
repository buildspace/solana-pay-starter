
import React from "react";
import HeadComponent from '../../components/Head';
import Footer from '../../components/footer';
import Spline from '@splinetool/react-spline';
import Link from 'next/link';

const SPLINE_SCENE = 'https://prod.spline.design/lwFGUGO5nCfnnDQU/scene.splinecode';

const AboutPage = () => {

  return (
    <div className="App">
      <HeadComponent/>
      <div className="container">
        <header className="header-container">
            <p className="header">DarkMoon🌑About</p>
        </header>
        <Spline scene={SPLINE_SCENE} />
        <div className="middle-row">
        <div className="button-container">
            <button className="cta-button market-wallet-button">
              <Link href="/"><a>DarkMoon🌑Market</a></Link>
            </button>
            </div>
            <p>View our code: <button className="purp-wallet"><Link href="https://github.com/Nitsuah-Labs/darkmoon/" target="_blank" rel="noopener noreferrer">R+D services</Link></button></p>
            <p>Our devs: <button className="admin-wallet-button"><Link href="https://nitsuah.io" target="_blank" rel="noopener noreferrer">nitsuah.io</Link></button></p>
            <br />
            <button className="cta-button market-wallet-button">
            <Link href="/mint"><a>DarkMoon🌑Mint</a></Link>
            </button>
            <p>Minting on: DEVNET</p>
            <br />
            <button className="cta-button market-wallet-button" disabled="true">
              <a>DarkMoon🌑Play</a>
            </button>
            <p>web3 game</p>
            <br />
            <h3><button className="cta-button market-wallet-button" disabled="true">
              <a>DarkMoon🌑DAO</a>
            </button></h3>
            <p>The initial mint + Cosmetics will fund treasury.</p>
            <p>DAO will select which repos and proposals to fund</p>
            <p> + 80% of mint proceeds go to DAO treasury</p>
            <p> - 5% of royalties go to DAO treasury</p>
            <p>Lets support our developers in web3!</p>
        </div>
        <Footer/>
      </div>
    </div>
  );
};

export default AboutPage;