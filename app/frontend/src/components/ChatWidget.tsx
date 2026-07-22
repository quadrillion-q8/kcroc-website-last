// File: src/components/ChatWidget.tsx
import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Trash2 } from 'lucide-react';

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // PRIVACY FIX: Swapped localStorage to sessionStorage so conversations 
  // are wiped securely when the user closes the browser tab.
  const [messages, setMessages] = useState(() => {
    const saved = sessionStorage.getItem('kcroc-chat-history');
    return saved ? JSON.parse(saved) : [{ sender: 'bot', text: 'Hi! How can I help you with your computer repair today?' }];
  });

  useEffect(() => {
    sessionStorage.setItem('kcroc-chat-history', JSON.stringify(messages));
    // Auto-scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const clearChat = () => {
    setMessages([{ sender: 'bot', text: 'Hi! How can I help you with your computer repair today?' }]);
    sessionStorage.removeItem('kcroc-chat-history');
  };

  const sendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;
    
    const userMessage = { sender: 'user' as const, text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      
      const data = await res.json();
      
      const botReply = data.reply || "I'm sorry, I didn't receive a response. Could you try again?";
      setMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
    } catch (error) {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Sorry, I am having trouble connecting. Please contact us via WhatsApp or call 55301913.' }]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)} 
          className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 p-4 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:scale-110 transition-all duration-300 group"
          aria-label="Open support chat"
        >
          <MessageCircle className="w-7 h-7 transition-transform group-hover:-rotate-12" />
        </button>
      ) : (
        <div className="w-[340px] sm:w-[400px] h-[550px] max-h-[80vh] bg-slate-950/95 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl flex flex-col transition-all duration-300 ease-in-out opacity-100 scale-100 overflow-hidden">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-800 flex justify-between items-center bg-slate-900/80">
            <div className="flex items-center gap-3">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </div>
              <span className="font-black text-white tracking-tight">KCROC Assistant</span>
            </div>
            <div className="flex gap-1 sm:gap-2">
              <button onClick={clearChat} className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-full transition-colors" title="Clear Chat">
                <Trash2 size={18} />
              </button>
              <button onClick={() => setIsOpen(false)} className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-full transition-colors" title="Close Chat">
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-grow p-4 overflow-y-auto space-y-4 scroll-smooth">
            {messages.map((m, i) => (
              <div 
                key={i} 
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div 
                  className={`text-[13px] sm:text-sm p-3.5 sm:p-4 max-w-[85%] leading-relaxed ${
                    m.sender === 'user' 
                      ? 'bg-cyan-500 text-slate-950 font-medium rounded-2xl rounded-tr-sm shadow-[0_0_15px_rgba(6,182,212,0.15)]' 
                      : 'bg-slate-800 border border-slate-700 text-slate-200 rounded-2xl rounded-tl-sm'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <div className="p-3 sm:p-4 border-t border-slate-800 bg-slate-900/80">
            <form 
              onSubmit={sendMessage}
              className="flex items-center bg-slate-950 border border-slate-700 rounded-full p-1 pl-4 focus-within:border-cyan-500/50 focus-within:ring-1 focus-within:ring-cyan-500/50 transition-all"
            >
              <input 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                className="flex-grow bg-transparent outline-none text-white placeholder-slate-500 text-[13px] sm:text-sm" 
                placeholder="Describe your device issue..." 
              />
              <button 
                type="submit"
                disabled={!input.trim()}
                className="bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 p-2 sm:p-2.5 rounded-full transition-colors ml-2 shrink-0 shadow-md"
              >
                <Send size={16} className="ml-0.5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
