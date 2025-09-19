import { X } from "lucide-react";
import React, { useState } from "react";
import { WhatsAppIcon } from "./Icon/WhatsApp";

export const FloatingWhatsApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const phoneNumber = "6281110065589";
  const accountName = "Admin Rumarasa Nusantara";
  const statusMessage = "Available";
  const initialMessage =
    "Hallo! Saya ingin reservasi tempat dan paket makanan untuk acara weeding bisa?";

  const handleSendMessage = () => {
    const finalMessage = message.trim() || initialMessage;
    const encodedMessage = encodeURIComponent(finalMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");

    setIsOpen(false);
    setMessage("");
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-24 right-4 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
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

          <div className="p-4">
            <div className="bg-gray-100 rounded-lg p-3 mb-4">
              <p className="text-sm text-gray-700">
                Hi there! 👋 How can I assist you today?
              </p>
            </div>

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

      <div className="fixed bottom-4 right-4 z-50">
        <div
          className={`flex items-center gap-3 transition-all duration-300 ${
            isOpen ? "scale-0" : "scale-100"
          }`}
        >
          <div className="bg-white text-gray-800 px-4 py-2 rounded-full shadow-lg border border-gray-200 whitespace-nowrap">
            <span className="text-sm font-medium">Need Help? Chat with us</span>
          </div>

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

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
