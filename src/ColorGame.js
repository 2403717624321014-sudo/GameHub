import React, { useState, useEffect } from "react";

function ColorGuessGame() {
  const [colors, setColors] = useState([]);
  const [target, setTarget] = useState("");
  const [message, setMessage] = useState("");

  // Generate random color in RGB format
  const randomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }


const startGame =()=>{
    const newColors=Array.from({length:6},()=>randomColor());
    const newTarget=newColors[Math.floor(Math.random()*6)]
    setColors(newColors);
    setTarget(newTarget)
    setMessage("")
  }
  useEffect(()=>{
    startGame()
  
  },[])

  const handleGuess = (color) => {
    if (color === target) {
      setMessage("🎉 Correct! You guessed it!");
    } else {
      setMessage("❌ Try again!");
    }
  };

  return (
    <div>
      <h1>Color Guess Game</h1>
      <p>
        Guess which color matches: <b>{target}</b>
      </p>
      <div>
        {colors.map((color, index) => (
          <button
            key={index}
            onClick={() => handleGuess(color)}
            style={{backgroundColor: color, width: "50px", height: "50px",  margin: "5px" }}
          ></button>
        ))}
      </div>
      <p>{message}</p>
      <button onClick={startGame}>New Game</button>
    </div>
  );
}
  
  export default ColorGuessGame