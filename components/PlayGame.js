import React, { useState } from "react";
import styles from "../styles/CreateProduct.module.css";

const BlastOff = () => {
  const [playing, setPlaying] = useState(false);

  const loadGame = () => {
    console.log("Loading game!")
  }

  return (
    <div className={styles.background_blur}>
      <div className={styles.create_product_container}>
        <div className={styles.create_product_form}>
          <header className={styles.header}>
            <h2>Welcome Space Cadet!</h2>
          </header>
            <button
              className={styles.button}
              onClick={() => {
                setCreating(!creating);
                loadGame();
              }}
            >
              PLAY GAME
            </button>
          </div>
        </div>
      </div>
  );
};

export default BlastOff;