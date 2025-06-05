import React, { useState } from "react";
import { Download, Eye, X } from 'lucide-react';
import FoodImage from '../../assets/f2.jpg';
import FoodImage1 from '../../assets/f3.jpg';
import FoodImage2 from '../../assets/f4.jpg';
import FoodImage3 from '../../assets/f5.jpg';
import MenuPdf from "./RenderPdf";



const Menu = () => {
  const [showPDFViewer, setShowPDFViewer] = useState(false);

  const foodImages = [
    { src: FoodImage },
    { src: FoodImage1 },
    { src: FoodImage3 },
    { src: FoodImage2 },
    { src: FoodImage1 },
    { src: FoodImage3 },
    { src: FoodImage1 },
    { src: FoodImage2 },
    { src: FoodImage1 },
    { src: FoodImage3 },
    { src: FoodImage1 },
    { src: FoodImage2 }
  ];

  const galleryStyles = `
    .gallery-container {
      width: 100vw;
      margin-left: calc(-50vw + 50%);
      overflow: hidden;
    }
    
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0;
      width: 100%;
    }
    
    @media (min-width: 640px) {
      .gallery-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    
    @media (min-width: 768px) {
      .gallery-grid {
        grid-template-columns: repeat(4, 1fr);
      }
    }
    
    @media (min-width: 1024px) {
      .gallery-grid {
        grid-template-columns: repeat(5, 1fr);
      }
    }
    
    @media (min-width: 1280px) {
      .gallery-grid {
        grid-template-columns: repeat(6, 1fr);
      }
    }
    
    .gallery-item {
      position: relative;
      overflow: hidden;
      aspect-ratio: 1;
      cursor: pointer;
      transition: transform 0.3s ease;
    }
    
    .gallery-item:hover {
      transform: scale(1.05);
      z-index: 10;
    }
    
    .gallery-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: filter 0.3s ease;
    }
    
    .gallery-item:hover img {
      filter: brightness(0.8);
    }
    
    .gallery-overlay {
      position: absolute;
      inset: 0;
      opacity: 0;
      transition: opacity 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .gallery-item:hover .gallery-overlay {
      opacity: 1;
    }
    
    .gallery-label {
      color: white;
      font-weight: 600;
      font-size: 0.875rem;
      text-align: center;
      padding: 0.5rem;
      text-shadow: 0 2px 4px rgba(0,0,0,0.5);
    }
    
    .scrollbar-hide {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    
    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: galleryStyles }} />
      
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-16">
            <p className="text-orange-600 font-medium text-sm uppercase tracking-wider mb-2">
              OUR MENU
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 mb-6">
              Rumarasa <span className="italic text-orange-600">Nusantara</span>
            </h2>
            <div className="w-24 h-px bg-orange-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our authentic Indonesian cuisine crafted with traditional
              recipes and the finest local ingredients
            </p>
          </div>

          {/* Full Width Food Gallery */}
          {/* <div className="gallery-container mb-12">
            <div className="gallery-grid">
              {foodImages.map((image, index) => (
                <div key={index} className="gallery-item">
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                  />
                  <div className="gallery-overlay">
                    <span className="gallery-label">
                      {image.alt}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div> */}

          {/* <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => setShowPDFViewer(true)}
              className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Eye size={20} />
              View Full Menu
            </button>
            
            <button
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-8 py-4 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Download size={20} />
              Download Menu
            </button>
          </div> */}
        </div>

              <MenuPdf/>
      </section>
    </>
  );
};

export default Menu;