import React from 'react';
import { MessageSquare } from 'lucide-react';

const WhatsAppButton = () => {
  const whatsappNumber = "256726627892";
  const defaultMessage = encodeURIComponent("Hello AnsoTech Company, I would like to inquire about your digital services.");

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${defaultMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
      aria-label="Chat on WhatsApp"
    >
      <MessageSquare className="w-7 h-7 fill-current" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out text-sm font-bold pl-0 group-hover:pl-2">
        Chat with Us
      </span>
    </a>
  );
};

export default WhatsAppButton;