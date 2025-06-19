import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Coffee, UtensilsCrossed } from "lucide-react";
import MenuPdf from './RenderPdf'
import ReservationForm from './ReservationForm'
import MembershipForm from './MemberForm'
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenus, createMenu, updateMenu } from '../../store/menuAction';


const Menu = () => {
  const foodImages = [
    { src: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&h=500&fit=crop"},
    { src: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&h=500&fit=crop"},
    { src: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=500&h=500&fit=crop"},
    { src: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&h=500&fit=crop"},
    { src: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=500&h=500&fit=crop"},
    { src: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&h=500&fit=crop"},
  ];

  const beverageImages = [
    { src: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500&h=500&fit=crop"},
    { src: "https://images.unsplash.com/photo-1546173159-315724a31696?w=500&h=500&fit=crop"},
    { src: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500&h=500&fit=crop"},
    { src: "https://images.unsplash.com/photo-1546173159-315724a31696?w=500&h=500&fit=crop"},
    { src: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500&h=500&fit=crop"},
    { src: "https://images.unsplash.com/photo-1546173159-315724a31696?w=500&h=500&fit=crop"},
  ];

  const [currentFoodIndex, setCurrentFoodIndex] = useState(0);
  const [currentBeverageIndex, setCurrentBeverageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // Calculate items per view based on screen size
  const getItemsPerView = useCallback(() => {
    if (windowWidth < 640) return 1; // mobile
    if (windowWidth < 1024) return 2; // tablet
    return 4; // desktop
  }, [windowWidth]);

  const itemsPerView = getItemsPerView();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate max index based on items per view
  const getMaxIndex = (imagesLength) => {
    return Math.max(0, imagesLength - itemsPerView);
  };

  // Auto-slide functionality with pause on hover
  useEffect(() => {
    if (isPaused) return;

    const foodInterval = setInterval(() => {
      setCurrentFoodIndex((prev) => {
        const maxIndex = getMaxIndex(foodImages.length);
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 4000);

    const beverageInterval = setInterval(() => {
      setCurrentBeverageIndex((prev) => {
        const maxIndex = getMaxIndex(beverageImages.length);
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 4500);

    return () => {
      clearInterval(foodInterval);
      clearInterval(beverageInterval);
    };
  }, [isPaused, foodImages.length, beverageImages.length, itemsPerView]);

  const nextFoodSlide = () => {
    const maxIndex = getMaxIndex(foodImages.length);
    setCurrentFoodIndex((prev) => prev >= maxIndex ? 0 : prev + 1);
  };

  const prevFoodSlide = () => {
    const maxIndex = getMaxIndex(foodImages.length);
    setCurrentFoodIndex((prev) => prev <= 0 ? maxIndex : prev - 1);
  };

  const nextBeverageSlide = () => {
    const maxIndex = getMaxIndex(beverageImages.length);
    setCurrentBeverageIndex((prev) => prev >= maxIndex ? 0 : prev + 1);
  };

  const prevBeverageSlide = () => {
    const maxIndex = getMaxIndex(beverageImages.length);
    setCurrentBeverageIndex((prev) => prev <= 0 ? maxIndex : prev - 1);
  };

  const SliderComponent = ({ images, currentIndex, nextSlide, prevSlide, title, icon: Icon }) => {
    const maxIndex = getMaxIndex(images.length);
    const translateX = currentIndex * (100 / itemsPerView);

    return (
      <div className="mb-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-orange-100 px-6 py-3 rounded-full mb-6">
            <Icon className="w-5 h-5 text-orange-600" />
            <h3 className="text-2xl md:text-3xl font-serif text-orange-700">{title}</h3>
            <Icon className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {title === "Foods" 
              ? "Authentic Indonesian dishes prepared with traditional recipes and premium ingredients"
              : "Refreshing beverages to complement your dining experience, from traditional drinks to modern favorites"
            }
          </p>
        </div>

        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-700 ease-out"
              style={{ 
                transform: `translateX(-${translateX}%)`,
                gap: windowWidth < 640 ? '16px' : '24px'
              }}
            >
              {images.map((image, index) => (
                <div 
                  key={index}
                  className={`
                    flex-shrink-0 relative overflow-hidden rounded-sm shadow-md hover:shadow-lg transition-all duration-300 group cursor-pointer
                    ${windowWidth < 640 ? 'w-full aspect-[4/3]' : 
                      windowWidth < 1024 ? 'w-[calc(50%-12px)] aspect-square' : 
                      'w-[calc(25%-18px)] aspect-square'}
                  `}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-3 left-3 right-3">
                      <h4 className="text-white font-medium text-sm md:text-base mb-1">{image.alt}</h4>
                      <div className="w-8 h-0.5 bg-orange-500 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons - Only show if there are more slides */}
          {maxIndex > 0 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 md:p-3 shadow-md hover:shadow-lg transition-all duration-200 z-10"
              >
                <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 md:p-3 shadow-md hover:shadow-lg transition-all duration-200 z-10"
              >
                <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
              </button>
            </>
          )}

          {/* Dots Indicator - Only show if there are multiple slides */}
          {maxIndex > 0 && (
            <div className="flex justify-center mt-6 gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => title === "Foods" ? setCurrentFoodIndex(index) : setCurrentBeverageIndex(index)}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors duration-200 ${
                    currentIndex === index ? 'bg-orange-600' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-3 bg-orange-100 px-6 py-3 rounded-full mb-6">
            <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
            <p className="text-orange-700 font-bold text-xs md:text-sm uppercase tracking-wider">
              OUR MENU
            </p>
            <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-gray-900 mb-6 md:mb-8 leading-tight">
            Rumarasa{" "}
            <span className="italic text-orange-600 relative inline-block">
              Nusantara
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent rounded-full" />
            </span>
          </h1>
          
          <div className="flex items-center justify-center gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="w-12 md:w-20 h-px bg-gradient-to-r from-transparent to-orange-600"></div>
            <div className="w-3 h-3 md:w-4 md:h-4 bg-orange-600 rounded-full"></div>
            <div className="w-12 md:w-20 h-px bg-gradient-to-l from-transparent to-orange-600"></div>
          </div>
          
          <p className="text-base md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
            Discover our authentic Indonesian cuisine crafted with traditional
            recipes and the finest local ingredients, bringing you the true taste of Nusantara
          </p>
        </div>

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
        <div className="mb-16 md:mb-24">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-3 bg-orange-100 px-6 py-3 rounded-full mb-6">
              <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif text-orange-700">Complete Menu</h3>
              <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
              Browse our full selection of traditional Indonesian dishes, carefully curated to offer you an authentic dining experience
            </p>
          </div>
          
          <div className="relative">
            <MenuPdf />
          </div>

          <div className="mt-12" id="reservation">
            <ReservationForm/>
          </div>

          <div id="member">
            <MembershipForm/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;