// File: app/frontend/src/components/ChatWidget.tsx
import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Trash2, Loader2 } from 'lucide-react';

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // 1. DEFENSIVE PARSING & SSG SAFETY: 
  // We check typeof window !== 'undefined' so Node.js doesn't crash during the Vite SSG build.
  const [messages, setMessages] = useState(() => {
    if (typeof window === 'undefined') {
      return [{ sender: 'bot', text: 'Hi! How can I help you with your computer repair today?' }];
    }
    
    try {
      const saved = sessionStorage.getItem('kcroc-chat-history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (error) {
      console.warn('Corrupted chat history detected. Resetting to default.');
      sessionStorage.removeItem('kcroc-chat-history');
    }
    return [{ sender: 'bot', text: 'Hi! How can I help you with your computer repair today?' }];
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem('kcroc-chat-history', JSON.stringify(messages));
      } catch (e) {
        console.warn('Failed to save chat history.');
      }
    }
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  // Cleanup abort controller on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const clearChat = () => {
    setMessages([{ sender: 'bot', text: 'Hi! How can I help you with your computer repair today?' }]);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('kcroc-chat-history');
    }
  };

  const sendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;
    
    // 2. INPUT VALIDATION: Prevent massive payloads from hitting your API
    if (trimmedInput.length > 500) {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Your message is too long. Please keep it under 500 characters or contact us on WhatsApp.' }]);
      return;
    }
    
    const userMessage = { sender: 'user' as const, text: trimmedInput };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // 3. ABORT CONTROLLER: Prevent hanging requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmedInput }),
        signal: abortControllerRef.current.signal
      });
      
      if (!res.ok) {
        if (res.status === 429) throw new Error('RATE_LIMIT');
        throw new Error(`Server responded with status: ${res.status}`);
      }
      
      const data = await res.json();
      const botReply = data.reply || "I'm sorry, I didn't receive a response. Could you try again?";
      setMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
      
    } catch (error: any) {
      if (error.name === 'AbortError') return; // Ignore aborted requests
      
      const errorMessage = error.message === 'RATE_LIMIT' 
        ? 'We are receiving too many messages right now. Please try again in a minute, or contact us via WhatsApp.'
        : 'Sorry, I am having trouble connecting right now. Please contact us via WhatsApp or call 55301913.';
        
      setMessages(prev => [...prev, { sender: 'bot', text: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Bottom offset is larger on mobile (bottom-24) to clear the fixed
    // StickyMobileCTA bar, now mounted globally in RootLayout for every
    // route below md, which would otherwise sit directly under/behind
    // this button and get covered by it.
    <div className="fixed bottom-24 right-4 md:bottom-6 md:right-6 z-50 font-sans">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)} 
          className="bg-brand-primary hover:bg-brand-accent text-brand-dark p-4 rounded-button shadow-lg hover:scale-110 transition-all duration-300 group"
          aria-label="Open support chat"
        >
          <MessageCircle className="w-7 h-7 transition-transform group-hover:-rotate-12" aria-hidden="true" />
        </button>
      ) : (
        <div className="w-[calc(100vw-3rem)] max-w-[340px] sm:w-[400px] sm:max-w-[400px] h-[min(550px,75vh)] max-h-[80vh] bg-surface-default backdrop-blur-xl border border-surface-hover rounded-card shadow-2xl flex flex-col transition-all duration-300 ease-in-out opacity-100 scale-100 overflow-hidden">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-surface-hover flex justify-between items-center bg-surface-glass">
            <div className="flex items-center gap-3">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-status-success"></span>
              </div>
              <span className="font-black text-white tracking-tight">KCROC Assistant</span>
            </div>
            <div className="flex gap-1 sm:gap-2">
              <button onClick={clearChat} aria-label="Clear chat history" title="Clear Chat" className="p-2 text-gray-400 hover:text-status-danger hover:bg-surface-hover rounded-button transition-colors">
                <Trash2 size={18} aria-hidden="true" />
              </button>
              <button onClick={() => setIsOpen(false)} aria-label="Close support chat" title="Close Chat" className="p-2 text-gray-400 hover:text-brand-primary hover:bg-surface-hover rounded-button transition-colors">
                <X size={20} aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-grow p-4 overflow-y-auto space-y-4 scroll-smooth" aria-live="polite">
            {messages.map((m, i) => (
              <div 
                key={i} 
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div 
                  className={`text-[13px] sm:text-sm p-3.5 sm:p-4 max-w-[85%] leading-relaxed ${
                    m.sender === 'user' 
                      ? 'bg-brand-primary text-brand-dark font-medium rounded-2xl rounded-tr-sm shadow-md' 
                      : 'bg-surface-elevated border border-surface-hover text-white rounded-2xl rounded-tl-sm'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex flex-col items-start">
                <div className="p-3.5 bg-surface-elevated border border-surface-hover rounded-2xl rounded-tl-sm">
                  <Loader2 className="w-5 h-5 text-brand-primary animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <div className="p-3 sm:p-4 border-t border-surface-hover bg-surface-glass">
            <form 
              onSubmit={sendMessage}
              className="flex items-center bg-surface-default border border-surface-hover rounded-button p-1 pl-4 focus-within:border-brand-primary focus-within:ring-1 focus-within:ring-brand-primary transition-all"
            >
              <input 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                disabled={isLoading}
                maxLength={500}
                className="flex-grow bg-transparent outline-none text-white placeholder-gray-500 text-base sm:text-sm disabled:opacity-50" 
                placeholder={isLoading ? "Please wait..." : "Describe your device issue..."} 
                aria-label="Chat message input"
              />
              <button 
                type="submit"
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
                className="bg-brand-primary hover:bg-brand-accent disabled:bg-surface-elevated disabled:text-gray-500 text-brand-dark p-2 sm:p-2.5 rounded-button transition-colors ml-2 shrink-0 shadow-md flex items-center justify-center min-w-[40px]"
              >
                {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} className="ml-0.5" aria-hidden="true" />}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
