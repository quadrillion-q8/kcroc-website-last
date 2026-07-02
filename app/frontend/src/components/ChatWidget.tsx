// File: src/components/ChatWidget.tsx
import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{sender: 'user' | 'bot', text: string}[]>([
    { sender: 'bot', text: 'Hi! How can I help you with your computer repair today?' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { sender: 'user', text: input }]);
    const currentInput = input;
    setInput('');

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: currentInput })
    });
    const data = await res.json();
    setMessages(prev => [...prev, { sender: 'bot', text: data.reply }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button onClick={() => setIsOpen(true)} className="bg-brand-primary p-4 rounded-full shadow-lg">
          <MessageCircle className="text-black" />
        </button>
      ) : (
        <div className="w-80 h-96 bg-surface-default border border-surface-hover rounded-card shadow-2xl flex flex-col">
          <div className="p-4 border-b border-surface-hover flex justify-between">
            <span className="font-bold">KCROC Support</span>
            <button onClick={() => setIsOpen(false)}><X size={18}/></button>
          </div>
          <div className="flex-grow p-4 overflow-y-auto space-y-2">
            {messages.map((m, i) => <div key={i} className={`text-sm p-2 rounded ${m.sender === 'user' ? 'bg-brand-primary/20 text-right' : 'bg-surface-hover'}`}>{m.text}</div>)}
          </div>
          <div className="p-2 border-t border-surface-hover flex">
            <input value={input} onChange={(e) => setInput(e.target.value)} className="flex-grow bg-transparent p-1 outline-none" placeholder="Ask anything..." />
            <button onClick={sendMessage}><Send size={18}/></button>
          </div>
        </div>
      )}
    </div>
  );
};
