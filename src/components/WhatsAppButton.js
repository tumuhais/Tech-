import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';

// Optional: Import Firebase Firestore if fetching dynamic replies
import { db } from './firebase'; 
import { collection, onSnapshot } from 'firebase/firestore';

const DEFAULT_QUICK_REPLIES = [
  {
    label: "🛒 E-Commerce / Web App",
    message: "Hello AnsoTech, I would like to inquire about building an E-Commerce or Custom Web Application."
  },
  {
    label: "💰 Microfinance / Loan System",
    message: "Hello AnsoTech, I am interested in your Loan Management and Microfinance software."
  },
  {
    label: "🎓 School / Hospital EHR System",
    message: "Hello AnsoTech, I want to inquire about custom Enterprise Management Systems (School/Hospital)."
  },
  {
    label: "🛡️ Network Infrastructure & Security",
    message: "Hello AnsoTech, I need assistance with Network Infrastructure, VLAN setup, or SIEM Monitoring."
  }
];

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const [quickReplies, setQuickReplies] = useState(DEFAULT_QUICK_REPLIES);

  const whatsappNumber = "256726627892";

  // Optional: Listen to dynamic quick replies from Firestore
  useEffect(() => {
    const repliesRef = collection(db, 'quick_replies');
    const unsubscribe = onSnapshot(repliesRef, (snapshot) => {
      if (!snapshot.empty) {
        const fetchedReplies = snapshot.docs.map(doc => doc.data());
        setQuickReplies(fetchedReplies);
      }
    }, (err) => {
      console.warn("Using fallback quick replies due to Firestore state:", err);
    });

    return () => unsubscribe();
  }, []);

  const handleSend = (text) => {
    if (!text || !text.trim()) return;
    const encodedMessage = encodeURIComponent(text.trim());
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
    setCustomMessage('');
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    handleSend(customMessage);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      
      {/* Interactive Popup Box */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
          
          {/* Header */}
          <div className="bg-emerald-600 p-4 text-white flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg border border-white/20">
                AT
              </div>
              <div>
                <h4 className="font-bold text-sm">AnsoTech Support</h4>
                <p className="text-[11px] text-emerald-100 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 mr-1.5 animate-pulse"></span>
                  Typically replies within minutes
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-lg transition-colors"
              aria-label="Close widget"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-slate-900 space-y-3">
            <div className="bg-slate-800/80 border border-slate-700/60 p-3 rounded-xl text-xs text-slate-300 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>👋 Hi there! Select an option below to start an instant inquiry on WhatsApp:</span>
            </div>

            {/* Quick Reply Buttons */}
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
              {quickReplies.map((reply, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(reply.message)}
                  className="w-full text-left p-3 rounded-xl bg-slate-800/50 hover:bg-emerald-600/20 border border-slate-700/50 hover:border-emerald-500/50 text-xs text-slate-200 font-medium flex items-center justify-between group transition-all"
                >
                  <span className="pr-2">{reply.label}</span>
                  <Send className="w-3.5 h-3.5 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </button>
              ))}
            </div>

            {/* Direct Message Input */}
            <form onSubmit={handleCustomSubmit} className="pt-2 flex gap-2">
              <input
                type="text"
                placeholder="Type a custom message..."
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                disabled={!customMessage.trim()}
                className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white p-2 rounded-xl transition"
                aria-label="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Footer Direct Message */}
          <div className="p-3 bg-slate-950 border-t border-slate-800 text-center">
            <button
              onClick={() => handleSend("Hello AnsoTech Company, I would like to inquire about your digital services.")}
              className="text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              Or send a general inquiry →
            </button>
          </div>

        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center group"
        aria-label="Chat on WhatsApp"
      >
        <MessageSquare className="w-6 h-6 fill-current" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out text-sm font-bold pl-0 group-hover:pl-2">
          Chat with Us
        </span>
      </button>

    </div>
  );
}