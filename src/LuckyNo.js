import React from "react";
import {useState,useEffect} from "react";

  function GuessNumberGame(){
  const [randomNumber, setRandomNumber] = useState(null);
  const [guess, setGuess] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const maxAttempts = 3;

  useEffect(()=> {
setLoading(true);
setTimeout(()=>{
    const number=Math.floor(Math.random()*10)+1;          //1-10
    setRandomNumber(number);
    setLoading(false);
},1000);
  },[])
   const checkGuess = () => {   
    if (attempts >= maxAttempts) {
      setMessage(`No more attempts left, ${name}! Better luck next time!`);
      return;
    }

    setAttempts(attempts + 1);

    if (parseInt(guess) === randomNumber) {
      setMessage(`Success, ${name}! You guessed the lucky number!`);
    } else if (attempts + 1 === maxAttempts) {
      setMessage(`Sorry, ${name}! Better luck next time! The lucky number was ${randomNumber}.`);
    } else {
      setMessage(`Wrong guess, ${name}! Try again (${maxAttempts - (attempts + 1)} left)`);
    }
    setGuess("");
  };

  if (loading) return <h3>Loading lucky number... </h3>; 

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Guess the Lucky Number (1–10)</h2>

      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
      <br /><br />

      <input type="number" value={guess} onChange={(e) => setGuess(e.target.value)}  placeholder="Enter your guess" />
      <button onClick={checkGuess}>Guess</button>

      <p>{message}</p>
      <p>Attempts used: {attempts} / {maxAttempts}</p>
    </div>
  );
}

export default GuessNumberGame;

  

