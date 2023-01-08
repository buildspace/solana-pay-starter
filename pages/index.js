import React, { useState, useEffect} from 'react';
import Footer from '../components/footer';
import CreateProduct from "../components/CreateProduct";
import Product from "../components/Product";
import HeadComponent from '../components/Head';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Spline from '@splinetool/react-spline';
import Link from 'next/link';

const SPLINE_SCENE = 'https://prod.spline.design/lwFGUGO5nCfnnDQU/scene.splinecode';

const App = () => {
  const { publicKey } = useWallet();
  const isOwner = ( publicKey ? publicKey.toString() === process.env.NEXT_PUBLIC_OG_PUBLIC_KEY : false );
  const [creating, setCreating] = useState(false);
  const [products, setProducts] = useState([]);

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
      fetch('/api/fetchProducts')
        .then(response => response.json())
        .then(data => {
          setProducts(data);
          console.log("Products", data);
        });
    }
  }, [publicKey]);

  const renderConnectedProfile = () => (
    <div className="row" style={{ justifyContent:'center' }}>
      <div className="button-container">
        <WalletMultiButton className="cta-button connect-wallet-button" />
      </div>
    </div>
  );

  const renderAdminPanel = () => (
    <div className="row" style={{ justifyContent:'center' }}>
      <div className="button-container">
      <td>
      <button className="cta-button admin-wallet-button">
        <Link href="/admin"><a>ADMIN</a></Link>
      </button>
      <tr>
      <button className="cta-button play-button">
        <Link href="/play"><a>PLAY🌑</a></Link>
      </button>
      </tr>
      </td>
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
            <p className="header">DarkMoon🌑Market</p>
              <header className="header-right">
                <tr>
                {publicKey ? renderConnectedProfile() : <></>}
                </tr>
              </header>
        </header>
        <Spline scene={SPLINE_SCENE} />
          <div className="middle-row">
            <tr>
            <button className="cta-button play-button">
              <Link href="/about"><a>ABOUT</a></Link></button>
              <td><p>A web3 effort that funds opensource projects.</p><br /></td>
              </tr>
              <div className="middle">
                {publicKey ? renderItemBuyContainer() : renderNotConnectedContainer()}
                {creating && <CreateProduct />}
              </div>
          </div>
        <Footer/>
      </div>
      </div>
  );
};

export default App;
