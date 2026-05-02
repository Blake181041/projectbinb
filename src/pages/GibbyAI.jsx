import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Link } from "react-router-dom";
import { Send, Bot, User, ChevronLeft } from 'lucide-react';
import Nav from '../layouts/Nav';

export default function GibbyAI() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hello! I am Gibby AI, your smart proxy companion. How can I help you today?' }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = apiKey ? new GoogleGenAI({ apiKey }) : null;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    if (!genAI) {
      setMessages(prev => [...prev, { role: 'user', text: input }, { role: 'bot', text: 'Error: Gemini API Key is not configured. Please add it to your environment variables.' }]);
      setInput('');
      return;
    }

    const userMessage = input;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setLoading(true);

    try {
      const response = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userMessage,
        config: {
          systemInstruction: "You are Gibby AI, a helpful and witty companion for users of ProjectBinB, a web proxy application. You should be friendly, tech-savvy, and occasionaly use internet slang. Keep your responses relatively concise."
        }
      });

      const botResponse = response.text;
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    } catch (error) {
      console.error("Gemini AI Error:", error);
      setMessages(prev => [...prev, { role: 'bot', text: "Sorry, I encountered an error. Is the API response valid?" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#09121e] text-[#a0b0c8] font-sans">
      <Nav />
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full p-4 overflow-hidden">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/" className="p-2 hover:bg-[#1f2937] rounded-full transition-colors">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
             Gibby AI <span className="text-xs bg-blue-600 px-2 py-0.5 rounded text-white font-normal uppercase tracking-wider">Beta</span>
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto pr-4 mb-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-700" ref={scrollRef}>
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl flex gap-3 ${msg.role === 'user' ? 'bg-blue-700 text-white rounded-br-none' : 'bg-[#1f2937] text-gray-100 rounded-bl-none border border-gray-700'}`}>
                <div className="shrink-0 mt-1">
                  {msg.role === 'user' ? <User size={18} /> : <Bot size={18} className="text-blue-400" />}
                </div>
                <div className="whitespace-pre-wrap">{msg.text}</div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-[#1f2937] p-4 rounded-2xl border border-gray-700 flex gap-2 items-center">
                 <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                 <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                 <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSend} className="relative mb-4">
          <input
            type="text"
            className="w-full bg-[#111827] border border-gray-700 rounded-xl py-4 pl-6 pr-14 text-white focus:outline-none focus:border-blue-500 transition-all placeholder:text-gray-500"
            placeholder="Ask Gibby something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-colors ${input.trim() && !loading ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'text-gray-600 cursor-not-allowed'}`}
            disabled={!input.trim() || loading}
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}
