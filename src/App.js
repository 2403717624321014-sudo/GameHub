// App.js
import React, { useState } from "react";
import ColorGame from "./ColorGame";
import FootballGame from "./FootballGame";
import LudoGame from "./LudoGame";
import TypingGame from "./TypingGame";
import LuckyNo from "./LuckyNo";

function App() {
  const [currentGame, setCurrentGame] = useState(null);

  const renderGame = () => {
    switch (currentGame) {
      case "color":
        return <ColorGame />;
      case "football":
        return <FootballGame />;
      case "ludo":
        return <LudoGame />;
      case "typing":
        return <TypingGame />;
      case "lucky":
        return <LuckyNo />;
      default:
        return <h2>Please select a game to play!</h2>;
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>🎮 Game Hub 🎮</h1>
      <div style={{ margin: "20px" }}>
        <button onClick={() => setCurrentGame("color")}>Color Game 🎨</button>
        <button onClick={() => setCurrentGame("football")}>Football Game ⚽</button>
        <button onClick={() => setCurrentGame("ludo")}>Ludo Game 🎲</button>
        <button onClick={() => setCurrentGame("typing")}>Typing Game ⌨️</button>
        <button onClick={() => setCurrentGame("lucky")}>Lucky Number 🍀</button>
      </div>
      <div style={{ marginTop: "30px" }}>{renderGame()}</div>
    </div>
  );
}

export default App;
