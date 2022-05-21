import React, { useMemo } from "react";
import "../styles/globals.css";
import "../styles/App.css";

const App = ({ Component, pageProps }) => {

  return (
    <Component {...pageProps} />
  );
};

export default App;
