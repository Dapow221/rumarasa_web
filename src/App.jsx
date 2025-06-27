import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { X } from "lucide-react";

// WhatsApp SVG Icon Component
const WhatsAppIcon = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
  </svg>
);

// Custom Floating WhatsApp Component
const FloatingWhatsApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  
  // WhatsApp configuration
  const phoneNumber = "6281110065589"; // Replace with your WhatsApp number
  const accountName = "Admin Rumarasa Nusantara"; // Your business name
  const statusMessage = "Available"; // Status message
  const initialMessage = "Hallo! Saya ingin reservasi tempat dan paket makanan untuk acara weeding bisa?";
  
  const handleSendMessage = () => {
    const finalMessage = message.trim() || initialMessage;
    const encodedMessage = encodeURIComponent(finalMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
    setMessage("");
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-green-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <WhatsAppIcon size={24} className="text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">{accountName}</h3>
                <p className="text-xs text-green-100">{statusMessage}</p>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="text-white hover:text-green-200 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="p-4">
            <div className="bg-gray-100 rounded-lg p-3 mb-4">
              <p className="text-sm text-gray-700">
                Hi there! 👋 How can I assist you today?
              </p>
            </div>

            {/* Message Input */}
            <div className="space-y-3">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={initialMessage}
                className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                rows="3"
              />
              
              <button
                onClick={handleSendMessage}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <WhatsAppIcon size={18} />
                Start Chat
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-3">
              We typically reply within minutes
            </p>
          </div>
        </div>
      )}

      {/* Floating Button with Text */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className={`flex items-center gap-3 transition-all duration-300 ${isOpen ? 'scale-0' : 'scale-100'}`}>
          {/* Text */}
          <div className="bg-white text-gray-800 px-4 py-2 rounded-full shadow-lg border border-gray-200 whitespace-nowrap">
            <span className="text-sm font-medium">Need Help? Chat with us</span>
          </div>
          
          {/* Button */}
          <button
            onClick={toggleChat}
            className="w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
          >
            <WhatsAppIcon 
              size={24} 
              className="transition-transform duration-300 group-hover:scale-110" 
            />
          </button>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-20 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

const App = () => {
  React.useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <>
      <Outlet />
      <FloatingWhatsApp />
    </>
  );
};

export default App;