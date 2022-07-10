
import React from "react";
import HeadComponent from '../../components/Head';
import Footer from '../../components/footer';
import Spline from '@splinetool/react-spline';
import Link from 'next/link';

const SPLINE_SCENE = 'https://prod.spline.design/lwFGUGO5nCfnnDQU/scene.splinecode';

const AboutPage = () => {

  const renderHome = () => (
  <div className="row" style={{ justifyContent:'center' }}>
    <div className="button-container">
      <button className="cta-button market-wallet-button">
        <Link href="/"><a>MARKET</a></Link>
      </button>
      <button className="cta-button market-wallet-button" disabled="true">
        <a>MINT</a>
      </button>
    </div>
  </div>
);

  return (
    <div className="App">
      <HeadComponent/>
      <div className="container">
        <header className="header-container">
            <p className="header">DarkMoon🌑About</p>
            <header className="header-right">
                {renderHome()}
              </header>
        </header>
        <Spline scene={SPLINE_SCENE} />
        <div className="middle-row">
                <h2> About DarkMoon🌑Market</h2>
            <p>80% of proceeds go to open sourced + software used in this repo</p>
            <p>Minting contract will be designed to disperse funds towards repos used in R+D</p>
            <p>spline.design + enable3d + others! Lets support our developers in web3!</p>
        </div>
        <Footer/>
      </div>
    </div>
  );
};

export default AboutPage;