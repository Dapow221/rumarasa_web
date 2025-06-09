import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FoodImage from '../../assets/f2.jpg';
import FoodImage1 from '../../assets/f3.jpg';
import FoodImage2 from '../../assets/f4.jpg';
import FoodImage3 from '../../assets/f5.jpg';
import MenuPdf from "./RenderPdf";

const Menu = () => {
  const foodImages = [
    { src: FoodImage },
    { src: FoodImage1 },
    { src: FoodImage3 },
    { src: FoodImage2 },
    { src: FoodImage1 },
    { src: FoodImage3 },
    { src: FoodImage1 },
    { src: FoodImage3 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              className="inline-flex items-center gap-3 bg-orange-100 px-6 py-2 rounded-full mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="w-2 h-2 bg-orange-600 rounded-full animate-pulse"></span>
              <p className="text-orange-700 font-semibold text-sm uppercase tracking-wide">
                OUR MENU
              </p>
              <span className="w-2 h-2 bg-orange-600 rounded-full animate-pulse"></span>
            </motion.div>
            
            <motion.h2 
              className="text-5xl md:text-6xl lg:text-7xl font-serif text-gray-900 mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Rumarasa <motion.span 
                className="italic text-orange-600 relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Nusantara
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-300 to-transparent"></div>
              </motion.span>
            </motion.h2>
            
            <motion.div 
              className="flex items-center justify-center gap-4 mb-8"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-orange-600"></div>
              <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-orange-600"></div>
            </motion.div>
            
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Discover our authentic Indonesian cuisine crafted with traditional
              recipes and the finest local ingredients, bringing you the true taste of Nusantara
            </motion.p>
          </motion.div>

          {/* Food Gallery Preview */}
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="text-center mb-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl md:text-3xl font-serif text-gray-800 mb-4">
                Culinary Highlights
              </h3>
              <p className="text-gray-600">A glimpse of our signature dishes</p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {foodImages.slice(0, 8).map((image, index) => (
                <motion.div 
                  key={index} 
                  className="relative overflow-hidden rounded-lg aspect-square"
                  variants={imageVariants}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* PDF Menu Section */}
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl md:text-4xl font-serif text-gray-800 mb-4">
                Discover Our Menu
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Browse our full selection of traditional Indonesian dishes, carefully curated to offer you an authentic dining experience
              </p>
            </motion.div>
            
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="relative">
                <MenuPdf />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Removed the entire Image Modal section */}
      </section>
    </>
  );
};

export default Menu;