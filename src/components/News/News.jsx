import React from "react";
import ImageBanner1 from '../../assets/2.jpg'
import ImageBanner2 from '../../assets/1.jpg'
import BackgroundImage from '../../assets/3.jpg'


const LatestNews = () => {
  const newsItems = [
    {
      id: 1,
      date: "07 Juni 2025",
      category: "Rumarasa Nusantara",
      title: "Restoran Seribu Rasa Layak Menjadi Alternatif Utama Untuk Menggelar Acara Buka Puasa Bersama",
      image: ImageBanner1,
      link: "#"
    },
    {
      id: 2,
      date: "04 Mei 2025",
      category: "Rumarasa Nusantara",
      title: "Seribu Rasa, Salah Satu Rekomendasi Restoran Terbaik Untuk Venue Wedding di Jakarta",
      image: ImageBanner2,
      link: "#"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url('${BackgroundImage}')`
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-orange-300 font-medium text-sm uppercase tracking-wider mb-4">
            Keep Up with Our
          </p>
          <h3 className="text-4xl md:text-5xl lg:text-4xl font-serif text-white leading-tight">
            LATEST NEWS AND EVENT
          </h3>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {newsItems.map((item) => (
            <div key={item.id} className="group cursor-pointer">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 hover:transform hover:scale-105">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                    style={{
                      backgroundImage: `url(${item.image})`
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6 text-white">
                  {/* Date and Category */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-orange-300">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                      <span>{item.category}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold mb-6 leading-tight group-hover:text-orange-300 transition-colors duration-300">
                    {item.title}
                  </h3>

                  {/* See Detail Button */}
                  {/* <div className="flex items-center justify-between">
                    <button className="flex items-center gap-2 text-orange-300 hover:text-orange-200 font-medium transition-colors duration-300 group">
                      <span>See Detail</span>
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNews;