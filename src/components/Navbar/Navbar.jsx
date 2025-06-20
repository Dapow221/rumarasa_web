import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut } from 'lucide-react';
import LogoRumarasa from '../../assets/logo_rumarasa.png'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const navItems = [
    { name: 'PROMOTIONS', href: '#promotions' },
    { name: 'ABOUT US', href: '#about' },
    { name: 'MENU', href: '#menu' },
    { name: 'ACTIVITY', href: '#news' },
    { name: 'RESERVATION', href: '#reservation' },
    { name: 'BECOME MEMBER', href: '#member' },
    { name: 'LOCATION', href: '#location' }
  ];

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    window.location.href = '/';
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }, []);

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

  // Variants untuk logout button
  const logoutButtonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.2 }
    }
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
              src={LogoRumarasa}
              className="w-12 h-12 object-contain mr-3"
              variants={logoVariants}
              initial="hidden"
              animate="visible"
            />
            <motion.div 
              className="text-white text-2xl font-['Playfair_Display']"
              variants={textVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.span 
                whileHover={{ 
                  scale: 1.05,
                  color: "#fed7aa",
                  transition: { duration: 0.2 }
                }}
              >
                Rumarasa Nusantara
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
            
            {/* Logout button - only show if authenticated */}
            {isAuthenticated && (
              <motion.button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-white text-sm font-medium hover:text-red-300 transition-colors duration-300 bg-red-600/20 hover:bg-red-600/30 px-3 py-2 rounded-lg border border-red-400/30 ml-4"
                variants={logoutButtonVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut size={16} />
                <span>LOGOUT</span>
              </motion.button>
            )}
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
              
              {/* Mobile Logout Button - only show if authenticated */}
              {isAuthenticated && (
                <div className="border-t border-white/20 mt-3 pt-3">
                  <motion.button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 text-white text-sm font-medium hover:text-red-300 transition-colors w-full py-2"
                    variants={mobileItemVariants}
                    initial="hidden"
                    animate="visible"
                    custom={navItems.length}
                    whileHover={{ 
                      x: 10,
                      color: "#fca5a5",
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <LogOut size={16} />
                    <span>LOGOUT</span>
                  </motion.button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;