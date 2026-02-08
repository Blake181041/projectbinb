import React, { useState } from "react";
import "./GibbyAI.css";

export default function GibbyAI() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hey! I’m Gibby AI 👋" }
  ]);

  function think(text) {
    const t = text.toLowerCase();
    if (t.includes("hello")) return "Hello there!";
    if (t.includes("github")) return "Looks like you like GitHub 👀";
    if (t.includes("search")) return "Try typing into the main search bar.";
    return "I’m here.";
  }

  function send() {
    if (!input.trim()) return;

    setMessages(m => [
      ...m,
      { sender: "user", text: input },
      { sender: "ai", text: think(input) }
    ]);

    setInput("");
  }

  return (
    <div className="gibby-ai-wrapper">
      <button className="ai-button" onClick={() => setOpen(!open)}>
        Gibby AI
      </button>

      {open && (
        <div className="ai-panel">
          <div className="ai-header">Gibby AI</div>

          <div className="ai-messages">
            {messages.map((m, i) => (
              <div key={i} className={m.sender}>
                {m.text}
              </div>
            ))}
          </div>

          <input
            placeholder="Ask Gibby…"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send()}
          />
        </div>
      )}
    </div>
  );
}
