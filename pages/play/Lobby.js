import React from "react";
import styles from "../../styles/Game.module.css";

const Lobby = () => {

  const loadGame = () => {
    console.log("Loading game!")
  }

  return (
    <div className="App">
      <div className={styles.game_sesh_container}>
        <div className={styles.game_sesh_form}>
          <header className={styles.header}>
            <h2>Welcome Space Cadet!</h2>
          </header>
          </div>
        </div>
      </div>
  );
};

export default Lobby;