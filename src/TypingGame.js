import { useEffect, useState } from "react";

function TypingGame() 
{
  const words = ["Goa", "Pune","Ooty", "Delhi","Mumbai","Jaipur",  "Chennai" , "Kolkata", "Bengaluru", "Hyderabad"];
  const [index, setIndex] = useState(0); // track current word index
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [correctWords, setCorrectWords] = useState([]);

  useEffect(()=>{
    const interval=setInterval(()=>{
        setIndex((prevIndex)=>{
            if(prevIndex<words.length-1)return prevIndex+1
            else return 0;
        })
        setMessage("")
        setInput("")
    },5000)
    return()=>clearInterval(interval)
  },[words.length])

    const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (value.toLowerCase() === words[index].toLowerCase()) {
      setMessage("Great Skill!");
      if (!correctWords.includes(words[index])) {
        setCorrectWords((prev) => [...prev, words[index]]);
      }
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Typing Game</h2>
      <p>
        Current word: <b>{words[index]}</b>
      </p>
      <p>(Next word appears every 5 seconds!)</p>
      <input value={input} onChange={handleInputChange} placeholder="Enter the word"  />
      <p>{message}</p>

      {correctWords.length > 0 && (
        <div>
          <h3>Correct Words:</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {correctWords.map((word, i) => (
              <li key={i}>{word}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

}

export default TypingGame

     