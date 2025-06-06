import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Logo from '../../assets/logo_rumarasa.png'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navItems = [
    { name: 'PROMOTIONS', href: '#promotions' },
    { name: 'ABOUT US', href: '#about' },
    { name: 'MENU', href: '#menu' },
    { name: 'NEWS', href: '#news' },
    { name: 'EVENTS', href: '#events' },
    { name: 'LOCATION', href: '#location' }
  ];

  // Variants untuk logo animation
  const logoVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // Variants untuk text logo
  const textVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.2 }
    }
  };

  // Variants untuk nav items
  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + 0.3,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  // Variants untuk mobile menu
  const mobileMenuVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.95,
      y: -10
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: {
        duration: 0.15
      }
    }
  };

  // Variants untuk mobile menu items
  const mobileItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3
      }
    })
  };

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            {/* PNG Logo with motion */}
            <motion.img 
              src={Logo}
              alt="Rumarasa Nusantara Logo" 
              className="w-10 h-10 object-contain mr-3"
              variants={logoVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ 
                scale: 1.1,
                rotate: 5,
                transition: { duration: 0.2 }
              }}
            />
            <motion.div 
              className="text-white text-2xl font-serif"
              variants={textVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.span 
                className="italic"
                whileHover={{ 
                  scale: 1.05,
                  color: "#fed7aa",
                  transition: { duration: 0.2 }
                }}
              >
                Rumarasa
              </motion.span>
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-white text-sm font-medium hover:text-orange-300 transition-colors duration-300 border-b-2 border-transparent hover:border-orange-300"
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                custom={index}
                whileHover={{ 
                  scale: 1.05,
                  y: -2,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
              </motion.a>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-orange-300 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={{ rotate: isMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="lg:hidden bg-black/80 backdrop-blur-sm rounded-lg mt-2 p-4"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="block text-white text-sm font-medium py-2 hover:text-orange-300 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                  variants={mobileItemVariants}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                  whileHover={{ 
                    x: 10,
                    color: "#fed7aa",
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;