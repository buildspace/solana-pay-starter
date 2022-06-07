import React, { useState, useEffect} from "react";
import CreateProduct from "../components/CreateProduct";
import Product from "../components/Product";
import HeadComponent from '../components/Head';
import { Connection, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { resolveToWalletAddress, getParsedNftAccountsByOwner,isValidSolanaAddress, createConnectionConfig,} from "@nfteyez/sol-rayz";

// Constants
const BLOG_LINK = `https://rebeccaandmatt.com`;
const FOODBLOG_LINK = `https://rebeccacoady.com`;
export const GRAPHCMS_TOKEN = process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN;
export const WEB3STORAGE_TOKEN = process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN;


const App = () => {
  const { publicKey } = useWallet();
  let accessGranted = false;
  let ownedNfts = [];
  const isOwner = ( publicKey ? publicKey.toString() === process.env.NEXT_PUBLIC_OWNER_PUBLIC_KEY : false );
  // const nftOwner = ( ownedNfts[0].data.symbol === process.env.NEXT_PUBLIC_OWNER_PUBLIC_KEY : false );
  const { connection } = useConnection();
  const [creating, setCreating] = useState(false);
  const [products, setProducts] = useState([]);

  const renderNotConnectedContainer = () => (
    <div>
      <img className="gif" src="https://media.giphy.com/media/yWTrzwWVS9x1zHPIwT/giphy.gif" alt="emoji" />
      <h3>Make sure you have a NOOT in this wallet!</h3>
      <div className="button-container">
      <WalletMultiButton className="cta-button connect-wallet-button" /> <br /> 
      </div>    
    </div>
  );

  // Checks to see if NFT is in wallet
  async function checkOwnership() {
    console.log("testing the truthy1", accessGranted);
    const address = publicKey.toString();
    const publicAddress = await resolveToWalletAddress({
      text: address
    });
    const nftArray = await getParsedNftAccountsByOwner({
      publicAddress,
    });
    // console.log("nftArray", nftArray[4].data.symbol);
    for (let i = 0; i < nftArray.length; i++) {
    
      if (nftArray[i].data.symbol === "GORE") {
        console.log("found one!")
        ownedNfts.push(nftArray[i]);
        accessGranted = true;
        return accessGranted;
      } else {
        // console.log("no NOOTs found");
        i++;
      } 
    }
    console.log("testing the truthy2", accessGranted);
    if(!accessGranted){
      alert("You do not have a NOOT in this wallet!");
    }
  }

  useEffect(() => {
    
    if (publicKey) {
      // getTokenAccountBalance(new PublicKey('DjdF3JdTBY9UTy47PHFXbTnhuQxdDi87SunVARBMnteY'));
      checkOwnership()
      .then(console.log("ownedNfts", ownedNfts))
    }
  }, [publicKey]);

  useEffect(() => {
    setTimeout(() => {
      // do something here 1 sec after current has changed
      if(publicKey && accessGranted){
        fetch(`/api/fetchProducts`)
        .then(response => response.json())
        .then(data => {
          setProducts(data);
          // console.log("Products", data);
        });
      }
    }, 2000)
  }, [publicKey])


  const renderItemBuyContainer = () => (
    <div className="products-container">
      <img className="banner-container" src="https://bafybeic5pee4axu2ghufdjmdbs4bvwhjwbzid6agalpvxk5ux3s67vh7w4.ipfs.infura-ipfs.io/" alt="emoji" />
      <h3>DATABASE IS BEING WORKED ON, PURCHASES WILL NOT PERSIST ATM, VISIT LINKS FOR FREE RECIPES</h3>
      {publicKey && products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
        


  return (
    <div className="App">
      <HeadComponent/>
      <div className="container">
        <header className="header-container">
          <p className="header"> 🥑<span className="gradient-text">Becca's Veggies Recipes</span>🥕</p>
          <p className="sub-text">The only recipe store that accepts s̶h̶i̶t̶c̶o̶i̶n̶s̶ the future of currency!</p>

          {isOwner && (
            <button className="create-product-button" onClick={() => setCreating(!creating)}>
              {creating ? "Close" : "Create Product"}
            </button>
          )}
        </header>

        <main>
          {creating && <CreateProduct />}
          {publicKey ? renderItemBuyContainer() : renderNotConnectedContainer()}
          
        </main>

        <div className="footer-container">
          <a
            className="footer-text"
            href={BLOG_LINK}
            target="_blank"
            rel="noreferrer"
          >Travel Blog    |</a>
          
          <a
            className="footer-text"
            href={FOODBLOG_LINK}
            target="_blank"
            rel="noreferrer"
          >|    Food Blog</a>
        </div>
      </div>
    </div>
  );
};

export default App;