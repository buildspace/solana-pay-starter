import React from "react";
import HeadComponent from '../components/Head';
import Footer from '../components/footer';

const App = () => {

  return (
    <div className="App">
      <HeadComponent/>
      <div className="container">
        <header className="header-container">
          <p className="header"> Dark Moon Market</p>
        </header>

        <main>
          <div style={{ display:'flex', justifyContent:'center' }}>
        <div className="card bg-blur">
            <p className="sub-text">Simple trade. Your sh*tcoins. For NFTs.</p>
            </div>
            <div className="card bg-blur">
          <img className="cat-logo" src="cat-logo.png" alt="cat" />
          </div>
          </div>
        </main>
        <Footer/>
      </div>
    </div>
  );
};

export default App;
