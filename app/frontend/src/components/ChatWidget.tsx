// File: src/components/ChatWidget.tsx
import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, Trash2 } from 'lucide-react';

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Load initial state from LocalStorage
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('kcroc-chat-history');
    return saved ? JSON.parse(saved) : [{ sender: 'bot', text: 'Hi! How can I help you with your computer repair today?' }];
  });

  const [input, setInput] = useState('');

  // Persist messages to LocalStorage whenever they change
  useEffect(() => {
    localStorage.setItem('kcroc-chat-history', JSON.stringify(messages));
  }, [messages]);

  const clearChat = () => {
    setMessages([{ sender: 'bot', text: 'Hi! How can I help you with your computer repair today?' }]);
    localStorage.removeItem('kcroc-chat-history');
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { sender: 'user', text: input }]);
    const currentInput = input;
    setInput('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: currentInput })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { sender: 'bot', text: data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Sorry, I am having trouble connecting right now. Please call us at 55301913.' }]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)} 
          className="bg-brand-primary p-4 rounded-full shadow-lg hover:scale-105 transition-transform duration-200"
        >
          <MessageCircle className="text-black" />
        </button>
      ) : (
        <div className="w-80 h-96 bg-surface-default border border-surface-hover rounded-card shadow-2xl flex flex-col transition-all duration-300 ease-in-out opacity-100 scale-100">
          <div className="p-4 border-b border-surface-hover flex justify-between items-center">
            <span className="font-bold">KCROC Support</span>
            <div className="flex gap-2">
              <button onClick={clearChat} className="hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
              <button onClick={() => setIsOpen(false)} className="hover:text-brand-primary transition-colors"><X size={18}/></button>
            </div>
          </div>
          <div className="flex-grow p-4 overflow-y-auto space-y-2">
            {messages.map((m, i) => (
              <div key={i} className={`text-sm p-2 rounded ${m.sender === 'user' ? 'bg-brand-primary/20 text-right' : 'bg-surface-hover'}`}>
                {m.text}
              </div>
            ))}
          </div>
          <div className="p-2 border-t border-surface-hover flex">
            <input 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-grow bg-transparent p-1 outline-none text-white" 
              placeholder="Ask anything..." 
            />
            <button onClick={sendMessage} className="text-brand-primary hover:text-white transition-colors"><Send size={18}/></button>
          </div>
        </div>
      )}
    </div>
  );
};
