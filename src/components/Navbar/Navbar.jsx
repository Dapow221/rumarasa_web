import React, { useState } from 'react';
import { Menu, X, MapPin, Phone, Clock } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navItems = [
    { name: 'PROMOTIONS', href: '#promotions' },
    { name: 'ABOUT US', href: '#about' },
    { name: 'MENU', href: '#menu' },
    { name: 'LOCATION', href: '#location' },
    { name: 'NEWS', href: '#news' },
    { name: 'EVENT & CATERING', href: '#events' }
  ];

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-white text-2xl font-serif">
              <span className="italic">Rumarasa Nusantara</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white text-sm font-medium hover:text-orange-300 transition-colors duration-300 border-b-2 border-transparent hover:border-orange-300"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-orange-300 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-black/80 backdrop-blur-sm rounded-lg mt-2 p-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-white text-sm font-medium py-2 hover:text-orange-300 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar