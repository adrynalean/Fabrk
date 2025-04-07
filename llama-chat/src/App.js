import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [transitioning, setTransitioning] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hello! I'm Fabrk. How can I help you today?",
      timestamp: new Date().toLocaleTimeString(),
      show: false
    }
  ]);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (showChat && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (showChat && inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages, loading, showChat]);

  const startTransition = () => {
    setTransitioning(true);
    setTimeout(() => {
      setShowChat(true);
    }, 1200);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = {
      sender: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString(),
      show: false
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const loadingMsg = {
      sender: 'bot',
      text: 'Weaving a response...',
      loading: true,
      timestamp: new Date().toLocaleTimeString(),
      show: false
    };

    setMessages(prev => [...prev, loadingMsg]);

    try {
      const res = await axios.post('http://localhost:8000/generate', {
        prompt: input,
        max_length: 100,
      });

      const botText = res.data.response.trim();

      setMessages(prev => [
        ...prev.slice(0, -1),
        {
          sender: 'bot',
          text: botText || '🤖 ...',
          timestamp: new Date().toLocaleTimeString(),
          show: false
        }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev.slice(0, -1),
        {
          sender: 'bot',
          text: "Hmm... couldn't weave that one. Try again?",
          timestamp: new Date().toLocaleTimeString(),
          show: false
        }
      ]);
    }

    setLoading(false);
  };

  const showTimestampTemporarily = (index) => {
    setMessages(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], show: true };
      return updated;
    });

    setTimeout(() => {
      setMessages(prev => {
        const updated = [...prev];
        if (updated[index]) {
          updated[index] = { ...updated[index], show: false };
        }
        return updated;
      });
    }, 3000);
  };

  return (
    <div className={`root-container ${transitioning ? 'transitioning' : ''} ${showChat ? 'chat-mode' : ''}`}>
      <h1 className={`fabrk-title ${transitioning || showChat ? 'top-left' : 'centered'}`}>
        Fabrk
      </h1>

      {!transitioning && !showChat && (
        <div className="home-content">
          <p className="home-sub">We didn’t copy. We Fabrk’d</p>
          <button className="home-button" onClick={startTransition}>
            Let’s Fabrk
          </button>
        </div>
      )}

      {showChat && (
        <div className="chat-container fade-in">
          <main className="chat-window">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`message ${msg.sender} ${msg.loading ? 'loading' : ''}`}
                onClick={() => showTimestampTemporarily(idx)}
              >
                <div className="text">{msg.text}</div>
                <div className={`timestamp ${msg.show ? 'show' : ''}`}>{msg.timestamp}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </main>

          <footer className="footer">
            <textarea
              ref={inputRef}
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              rows={1}
            />
            <button onClick={sendMessage} disabled={loading}>
              {loading ? '...' : 'Send'}
            </button>
          </footer>
        </div>
      )}
    </div>
  );
}

export default App;
