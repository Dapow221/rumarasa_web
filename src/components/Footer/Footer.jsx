import React from 'react';
import { MapPin, Clock, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative overflow-hidden">
      {/* Background Image with Darkening Gradient */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.9), rgba(0,0,0,2)), url('../public/2.jpg')`
        }}
      />

      {/* Content */}
      <div className="relative z-10 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
            
            {/* Restaurant Info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl md:text-4xl font-serif text-white mb-2">
                  RUMARASA <span className="italic font-light text-orange-400">NUSANTARA</span>
                </h3>
                <div className="w-20 h-px bg-orange-400 mb-4"></div>
                <p className="text-gray-300 leading-relaxed">
                  Experience the authentic flavors of Indonesia in the heart of Jakarta. 
                  A culinary journey through Southeast Asian traditions.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <h4 className="text-xl font-serif text-white mb-4">Contact Information</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3 text-gray-300">
                  <MapPin size={18} className="text-orange-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-white mb-1">Address</p>
                    <p className="text-sm leading-relaxed">
                      Jl. Panglima Polim Raya No. 123<br />
                      Jakarta Selatan 12160<br />
                      Indonesia
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone size={18} className="text-orange-400" />
                  <div>
                    <p className="font-medium text-white mb-1">Phone</p>
                    <p className="text-sm">+62 21 7221 8888</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-300">
                  <Mail size={18} className="text-orange-400" />
                  <div>
                    <p className="font-medium text-white mb-1">Email</p>
                    <p className="text-sm">info@rumarasanusantara.co.id</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hours & Social Media */}
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-serif text-white mb-4">Opening Hours</h4>
                <div className="flex items-center gap-3 text-gray-300 mb-6">
                  <Clock size={18} className="text-orange-400" />
                  <div>
                    <p className="text-sm">
                      <span className="text-white font-medium">Daily:</span> 11:00 AM - 11:00 PM
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-serif text-white mb-4">Find Us</h4>
                <div className="flex gap-4">
                  {/* Instagram */}
                  <a 
                    href="#" 
                    className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-orange-400 hover:text-white transition-all duration-300 group"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>

                  {/* TikTok */}
                  <a 
                    href="#" 
                    className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-orange-400 hover:text-white transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                  </a>

                  {/* WhatsApp */}
                  <a 
                    href="#" 
                    className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-orange-400 hover:text-white transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                  </a>

                  {/* Google Maps */}
                  <a 
                    href="#" 
                    className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-orange-400 hover:text-white transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
              <p>© 2025 Rumarasa Nusantara. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-orange-400 transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-orange-400 transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;