import React from "react";
import HeadComponent from '../components/Head';

// Constants
<<<<<<< HEAD
const BLOG_LINK = `https://rebeccaandmatt.com`;
const FOODBLOG_LINK = `https://rebeccacoady.com`;
export const GRAPHCMS_TOKEN = process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN;
export const WEB3STORAGE_TOKEN = process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN;

const App = () => {
  const { publicKey } = useWallet();
  const isOwner = ( publicKey ? publicKey.toString() === process.env.NEXT_PUBLIC_OWNER_PUBLIC_KEY : false );
  
  const [creating, setCreating] = useState(false);
  const [products, setProducts] = useState([]);
=======
const TWITTER_HANDLE = "_buildspace";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
>>>>>>> fe464ae96c99ef068db6c271b78f2cd30d8e8f2b
  
  
  return (
    <div className="App">
      <HeadComponent/>
      <div className="container">
        <header className="header-container">
          <p className="header"> 😳 Buildspace Emoji Store 😈</p>
          <p className="sub-text">The only emoji store that accepts sh*tcoins</p>
        </header>

        <main>
          <img src="https://media.giphy.com/media/eSwGh3YK54JKU/giphy.gif" alt="emoji" />
        </main>

        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src="twitter-logo.svg" />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
