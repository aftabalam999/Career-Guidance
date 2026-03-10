import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

const AICareerAdvisor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your AI Career Advisor. Ask me anything about colleges, careers, or eligibility.", sender: 'ai' }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: 'user' }]);
    setInput("");
    
    // Fake AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { text: "That's a great question! I'm currently gathering insights based on your profile to answer that.", sender: 'ai' }]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Button */}
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-primary)',
          color: 'white',
          border: 'none',
          boxShadow: '0 4px 12px rgba(124, 58, 237, 0.4)',
          display: isOpen ? 'none' : 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          zIndex: 1000,
          transition: 'transform 0.2s ease'
        }}
      >
        <MessageSquare size={28} />
      </button>

      {/* Chat Window */}
      <div 
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '350px',
          height: '500px',
          backgroundColor: 'var(--color-card-bg)',
          borderRadius: '0.75rem',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          border: '1px solid var(--color-border)',
          display: isOpen ? 'flex' : 'none',
          flexDirection: 'column',
          zIndex: 1000,
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MessageSquare size={20} />
            <h3 style={{ margin: 0, fontSize: '16px' }}>AI Career Advisor</h3>
          </div>
          <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><X size={20} /></button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: 'var(--color-background)' }}>
          {messages.map((msg, idx) => (
            <div key={idx} style={{
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              backgroundColor: msg.sender === 'user' ? 'var(--color-primary)' : 'white',
              color: msg.sender === 'user' ? 'white' : 'var(--text-primary)',
              padding: '0.75rem 1rem',
              borderRadius: '1rem',
              borderBottomRightRadius: msg.sender === 'user' ? '0' : '1rem',
              borderBottomLeftRadius: msg.sender === 'ai' ? '0' : '1rem',
              maxWidth: '80%',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              border: msg.sender === 'ai' ? '1px solid var(--color-border)' : 'none',
              fontSize: '14px',
              lineHeight: '1.4'
            }}>
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input */}
        <div style={{ padding: '1rem', borderTop: '1px solid var(--color-border)', display: 'flex', gap: '0.5rem', backgroundColor: 'white' }}>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..." 
            style={{ flex: 1, padding: '0.75rem', borderRadius: '2rem', border: '1px solid var(--color-border)', outline: 'none' }}
          />
          <button 
            onClick={handleSend}
            style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: 'white', border: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </>
  );
};

export default AICareerAdvisor;
