import React, { useState } from "react";
import "../styles/NumberGuesser.css";

const MAX_ATTEMPTS = 7;

const getRandomNumber = () => Math.floor(Math.random() * 100) + 1;

export default function NumberGuesser() {
  const [secretNumber, setSecretNumber] = useState(getRandomNumber());
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState("");

  const handleGuess = () => {
    const num = parseInt(guess);

    if (isNaN(num)) {
      setMessage("❌ Enter a valid number!");
      return;
    }

    if (num < 1 || num > 100) {
      setMessage("⚠️ Must be between 1 and 100!");
      return;
    }
    if (message.includes("Correct") || message.includes("Game Over")) return;

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (num === secretNumber) {
      setMessage(`🎉 ${secretNumber} is Correct! You won in ${newAttempts} tries!`);
    } else if (newAttempts >= MAX_ATTEMPTS) {
      setMessage(`😢 Game Over! It was ${secretNumber}`);
    } else if (num < secretNumber) {
      setMessage("📈 Too low!");
    } else {
      setMessage("📉 Too high!");
    }

    setGuess("");
  };

  const restartGame = () => {
    setSecretNumber(getRandomNumber());
    setGuess("");
    setAttempts(0);
    setMessage("");
  };

  return (
    <div className="ng-container">
      <h2 className="ng-title"><svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect x="2" y="6" width="20" height="12" rx="2" />
  <path d="M6 12h4" />
  <path d="M8 10v4" />
  <circle cx="17" cy="11" r="1" />
  <circle cx="17" cy="13" r="1" />
</svg> Number Guesser</h2>
      
      <p className="ng-subtext">
        Guess a number between <strong>1–100</strong>
      </p>

      <p className="ng-attempts">
        Attempts: {attempts}/{MAX_ATTEMPTS}
      </p>

      <input
        type="number"
        className="ng-input"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleGuess();
          }
        }}
        placeholder="Enter guess..."
      />

      <div className="ng-buttons">
        <button onClick={handleGuess}>Guess</button>
        <button onClick={restartGame}>Restart</button>
      </div>

      {message && <p className="ng-message">{message}</p>}
    </div>
  );
}