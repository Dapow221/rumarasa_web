import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Coffee, UtensilsCrossed, Wifi, Car, CreditCard, Users } from "lucide-react";
import MenuPdf from './RenderPdf'

const Menu = () => {
  // Using placeholder images - replace with your actual imports
  const foodImages = [
    { src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500&h=500&fit=crop", alt: "Nasi Gudeg" },
    { src: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&h=500&fit=crop", alt: "Rendang" },
    { src: "https://images.unsplash.com/photo-1559847844-d721426d6edc?w=500&h=500&fit=crop", alt: "Gado-gado" },
    { src: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&h=500&fit=crop", alt: "Sate Ayam" },
    { src: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=500&h=500&fit=crop", alt: "Nasi Padang" },
    { src: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&h=500&fit=crop", alt: "Ayam Bakar" },
    { src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500&h=500&fit=crop", alt: "Soto Ayam" },
    { src: "https://images.unsplash.com/photo-1559847844-d721426d6edc?w=500&h=500&fit=crop", alt: "Pecel Lele" },
  ];

  const beverageImages = [
    { src: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500&h=500&fit=crop", alt: "Es Teh Manis" },
    { src: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500&h=500&fit=crop", alt: "Kopi Tubruk" },
    { src: "https://images.unsplash.com/photo-1546173159-315724a31696?w=500&h=500&fit=crop", alt: "Es Cendol" },
    { src: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500&h=500&fit=crop", alt: "Jus Alpukat" },
    { src: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500&h=500&fit=crop", alt: "Es Campur" },
    { src: "https://images.unsplash.com/photo-1546173159-315724a31696?w=500&h=500&fit=crop", alt: "Wedang Jahe" },
  ];

  const facilities = [
    { icon: Wifi, title: "Free WiFi", description: "High-speed internet access" },
    { icon: Car, title: "Parking Area", description: "Spacious parking for cars & motorcycles" },
    { icon: CreditCard, title: "Cashless Payment", description: "Accept all major cards & e-wallets" },
    { icon: Users, title: "Private Dining", description: "Perfect for family gatherings" },
  ];

  const [currentFoodIndex, setCurrentFoodIndex] = useState(0);
  const [currentBeverageIndex, setCurrentBeverageIndex] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    const foodInterval = setInterval(() => {
      setCurrentFoodIndex((prev) => (prev + 1) % Math.max(1, foodImages.length - 3));
    }, 4000);

    const beverageInterval = setInterval(() => {
      setCurrentBeverageIndex((prev) => (prev + 1) % Math.max(1, beverageImages.length - 3));
    }, 4500);

    return () => {
      clearInterval(foodInterval);
      clearInterval(beverageInterval);
    };
  }, [foodImages.length, beverageImages.length]);

  const nextFoodSlide = () => {
    setCurrentFoodIndex((prev) => (prev + 1) % Math.max(1, foodImages.length - 3));
  };

  const prevFoodSlide = () => {
    setCurrentFoodIndex((prev) => (prev - 1 + Math.max(1, foodImages.length - 3)) % Math.max(1, foodImages.length - 3));
  };

  const nextBeverageSlide = () => {
    setCurrentBeverageIndex((prev) => (prev + 1) % Math.max(1, beverageImages.length - 3));
  };

  const prevBeverageSlide = () => {
    setCurrentBeverageIndex((prev) => (prev - 1 + Math.max(1, beverageImages.length - 3)) % Math.max(1, beverageImages.length - 3));
  };

  const SliderComponent = ({ images, currentIndex, nextSlide, prevSlide, title, icon: Icon }) => (
    <motion.div 
      className="mb-20"
      transition={{ duration: 0.8 }}
    >
      <motion.div 
        className="text-center mb-12"
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-3 bg-orange-100 px-6 py-3 rounded-full mb-6">
          <Icon className="w-5 h-5 text-orange-600" />
          <h3 className="text-2xl md:text-3xl font-serif text-orange-700">{title}</h3>
          <Icon className="w-5 h-5 text-orange-600" />
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {title === "Signature Foods" 
            ? "Authentic Indonesian dishes prepared with traditional recipes and premium ingredients"
            : "Refreshing beverages to complement your dining experience, from traditional drinks to modern favorites"
          }
        </p>
      </motion.div>

      <div className="relative">
        <div className="overflow-hidden">
          <div 
            className="flex gap-6 transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100/4)}%)` }}
          >
            {images.map((image, index) => (
              <div 
                key={index}
                className="min-w-[calc(25%-18px)] aspect-square relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="text-white font-semibold text-lg mb-1">{image.alt}</h4>
                    <div className="w-12 h-1 bg-orange-500 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-colors duration-200 z-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-colors duration-200 z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: Math.max(1, images.length - 3) }).map((_, index) => (
            <button
              key={index}
              onClick={() => title === "Signature Foods" ? setCurrentFoodIndex(index) : setCurrentBeverageIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                currentIndex === index ? 'bg-orange-600' : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-20">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-24"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className="inline-flex items-center gap-3 bg-orange-100 px-8 py-3 rounded-full mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="w-3 h-3 bg-orange-600 rounded-full animate-pulse"></span>
            <p className="text-orange-700 font-bold text-sm uppercase tracking-wider">
              OUR MENU
            </p>
            <span className="w-3 h-3 bg-orange-600 rounded-full animate-pulse"></span>
          </motion.div>
          
          <motion.h1 
            className="text-6xl md:text-7xl lg:text-8xl font-serif text-gray-900 mb-8 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Rumarasa{" "}
            <motion.span 
              className="italic text-orange-600 relative inline-block"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Nusantara
              <motion.div 
                className="absolute -bottom-3 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-orange-400 to-transparent rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.8 }}
              />
            </motion.span>
          </motion.h1>
          
          <motion.div 
            className="flex items-center justify-center gap-6 mb-8"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-orange-600"></div>
            <div className="w-4 h-4 bg-orange-600 rounded-full animate-pulse"></div>
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-orange-600"></div>
          </motion.div>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Discover our authentic Indonesian cuisine crafted with traditional
            recipes and the finest local ingredients, bringing you the true taste of Nusantara
          </motion.p>
        </motion.div>

        {/* Food Slider */}
        <SliderComponent 
          images={foodImages}
          currentIndex={currentFoodIndex}
          nextSlide={nextFoodSlide}
          prevSlide={prevFoodSlide}
          title="Foods"
          icon={UtensilsCrossed}
        />

        {/* Beverage Slider */}
        <SliderComponent 
          images={beverageImages}
          currentIndex={currentBeverageIndex}
          nextSlide={nextBeverageSlide}
          prevSlide={prevBeverageSlide}
          title="Beverages"
          icon={Coffee}
        />

        {/* PDF Menu Section */}
        <motion.div 
          className="mb-24"
          // initial={{ opacity: 0, y: 50 }}
          // whileInView={{ opacity: 1, y: 0 }}
          // viewport={{ once: true, margin: "-50px" }}
          // transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-3 bg-orange-100 px-6 py-3 rounded-full mb-6">
              <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
              <h3 className="text-3xl md:text-4xl font-serif text-orange-700">Complete Menu</h3>
              <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Browse our full selection of traditional Indonesian dishes, carefully curated to offer you an authentic dining experience
            </p>
          </motion.div>
          
          <div className="relative">
            <MenuPdf />
          </div>
                      

        </motion.div>

        {/* Facilities Section */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-3 bg-orange-100 px-6 py-3 rounded-full mb-6">
              <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
              <h3 className="text-3xl md:text-4xl font-serif text-orange-700">Our Facilities</h3>
              <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Experience comfort and convenience with our modern amenities designed for your perfect dining experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {facilities.map((facility, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-2xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6 group-hover:bg-orange-200 transition-colors duration-300">
                  <facility.icon className="w-8 h-8 text-orange-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">{facility.title}</h4>
                <p className="text-gray-600">{facility.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Menu;