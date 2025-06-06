import React, { useState } from "react";
import FoodImage from '../../assets/f2.jpg';
import FoodImage1 from '../../assets/f3.jpg';
import FoodImage2 from '../../assets/f4.jpg';
import FoodImage3 from '../../assets/f5.jpg';
import MenuPdf from "./RenderPdf";



const Menu = () => {
  const [selectedImage, setSelectedImage] = useState(null);

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

;

return (
  <>
    <section className="py-20 bg-gradient-to-b from-gray-50 via-white to-orange-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 bg-orange-100 px-6 py-2 rounded-full mb-4">
            <span className="w-2 h-2 bg-orange-600 rounded-full animate-pulse"></span>
            <p className="text-orange-700 font-semibold text-sm uppercase tracking-wide">
              OUR MENU
            </p>
            <span className="w-2 h-2 bg-orange-600 rounded-full animate-pulse"></span>
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-gray-900 mb-8 leading-tight">
            Rumarasa <span className="italic text-orange-600 relative">
              Nusantara
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-300 to-transparent"></div>
            </span>
          </h2>
          
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-orange-600"></div>
            <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-orange-600"></div>
          </div>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our authentic Indonesian cuisine crafted with traditional
            recipes and the finest local ingredients, bringing you the true taste of Nusantara
          </p>
        </div>

        {/* Food Gallery Preview */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-serif text-gray-800 mb-4">
              Culinary Highlights
            </h3>
            <p className="text-gray-600">A glimpse of our signature dishes</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
            {foodImages.slice(0, 8).map((image, index) => (
              <div 
                key={index} 
                className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-semibold text-sm md:text-base">
                      {image.alt}
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 ring-2 ring-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              </div>
            ))}
          </div>
        </div>

        {/* PDF Menu Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-serif text-gray-800 mb-4">
              Complete Menu
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse our full selection of traditional Indonesian dishes, carefully curated to offer you an authentic dining experience
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-orange-100 via-amber-50 to-orange-100 rounded-3xl opacity-50 blur-xl"></div>
            <div className="relative">
              <MenuPdf />
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-full object-contain rounded-2xl"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <p className="text-white text-lg font-semibold bg-black/50 backdrop-blur-sm rounded-full px-6 py-2 inline-block">
                {selectedImage.alt}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  </>
);
};

export default Menu;