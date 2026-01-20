import { useState } from "react";

// Colors for players
const PLAYER_COLORS = ["red", "blue", "green", "yellow"];

function LudoGame() {
  // Each player has 4 tokens starting at position 0 (home)
  const [players, setPlayers] = useState(
    PLAYER_COLORS.map((color) => ({ color, tokens: [0, 0, 0, 0] }))
  );
  
  const [currentPlayer, setCurrentPlayer] = useState(0); // whose turn
  const [dice, setDice] = useState(1);
  const [message, setMessage] = useState("");

  // Roll dice
  const rollDice = () => {
    const value = Math.floor(Math.random() * 6) + 1;
    setDice(value);
    setMessage(`${PLAYER_COLORS[currentPlayer]} rolled ${value}`);
    moveToken(value);
  };

  // Move the first token that can move
  const moveToken = (diceValue) => {
    const updatedPlayers = [...players];
    const tokens = updatedPlayers[currentPlayer].tokens;

    // Find first token not finished
    const tokenIndex = tokens.findIndex((pos) => pos < 57); // 57 = finish
    if (tokenIndex === -1) {
      setMessage(`${PLAYER_COLORS[currentPlayer]} has no movable tokens`);
      nextTurn(diceValue);
      return;
    }

    // Only move out of home if dice = 6
    if (tokens[tokenIndex] === 0 && diceValue !== 6) {
      setMessage("Need 6 to start!");
      nextTurn(diceValue);
      return;
    }

    // Move token
    tokens[tokenIndex] += diceValue;
    if (tokens[tokenIndex] > 57) tokens[tokenIndex] = 57; // cap at finish

    setPlayers(updatedPlayers);

    // Check win
    if (tokens.every((pos) => pos === 57)) {
      setMessage(`${PLAYER_COLORS[currentPlayer]} wins! 🎉`);
      return;
    }

    // Next turn
    nextTurn(diceValue);
  };

  const nextTurn = (diceValue) => {
    // If rolled 6, same player plays again
    if (diceValue !== 6) {
      setCurrentPlayer((prev) => (prev + 1) % PLAYER_COLORS.length);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Ludo Game</h2>
      <p>Current Player: <b>{PLAYER_COLORS[currentPlayer]}</b></p>
      <p>Dice: <b>{dice}</b></p>
      <button onClick={rollDice} style={{ padding: "10px 20px", margin: "10px" }}>
        Roll Dice
      </button>
      <p>{message}</p>

      <div>
        {players.map((player) => (
          <div key={player.color} style={{ margin: "10px" }}>
            <h4 style={{ color: player.color }}>{player.color} Tokens:</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {player.tokens.map((pos, i) => (
                <li key={i}>Token {i + 1}: {pos === 0 ? "Home" : pos === 57 ? "Finished" : pos}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LudoGame;
