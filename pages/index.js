import React, { useEffect, useState } from 'react';
import HeadComponent from '../components/Head';
import Footer from '../components/footer';
import Product from "../components/Product";
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const App = () => {
  const { publicKey } = useWallet();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (publicKey) {
      fetch(`/api/fetchProducts`)
        .then(response => response.json())
        .then(data => {
          setProducts(data);
          console.log("Products", data);
        });
    }
  }, [publicKey]);

  const renderNotConnectedContainer = () => (
      <div style={{ display:'flex', justifyContent:'center' }}>
        <div className="card bg-blur">
        <div className="row" style={{ justifyContent:'center' }}>
          <p className="sub-text">CONNECT WALLET</p>
          <div className="button-container">
          <WalletMultiButton className="cta-button connect-wallet-button" />
        </div>
        </div>
       </div>
      </div>
  );

  const renderItemBuyContainer = () => (
    <div className="products-container">
      {products.map((product) => (
         <div className="products-card bg-blur">
        <Product key={product.id} product={product} />
        </div>
      ))}
    </div>
  );

  return (
    <div className="App">
      <HeadComponent/>
      <div className="container">
        <header className="header-container">
          <p className="header"> Dark Moon Market</p>
        </header>
        <main>
          {publicKey ? renderItemBuyContainer() : renderNotConnectedContainer()}
        </main>
        <Footer/>
      </div>
    </div>
  );
};

export default App;
