import React from "react";
import backgroundImage from "../../assets/1.jpg";

const About = () => {
  return (
    <section className="py-20 pb-16 relative overflow-hidden">
      {/* Background Image with Overlay - Dark overlay with wider bottom */}
      <div 
        className="absolute inset-0 bg-cover bg-top bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url(${backgroundImage})`
        }}
      />

      {/* Content - Made relative with z-index for layering */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          {/* Content */}
          <div className="space-y-6">
            {/* Section Header */}
            <div className="mb-8">
              <p className="text-orange-400 font-medium text-sm uppercase tracking-wider mb-2">
                ABOUT RUMARASA NUSANTARA
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white leading-tight">
                A Gastronomic Journey to{" "}
                <span className="italic text-orange-400">"One Thousand Flavors"</span>{" "}
                of Southeast Asian Culinary Tradition
              </h2>
            </div>

            {/* Description */}
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p className="text-lg">
                Rumarasa Nusantara adalah Rumah makan keluarga yang menyajikan hidangan Nusantara. Rumarasa Nusantara juga menjadi pusat kuliner terbaik yang menghadirkan pengalaman unik dengan cita rasa dari berbagai tempat. Kami memperkaya hubungan sosial dan kebersamaan di setiap kesempatan, sambil memberikan hidangan inovatif, ruang yang nyaman, serta kopi berkualitas. Dengan oleh-oleh khas dan layanan untuk acara spesial, kami menjadi bagian dari setiap momen kebahagiaan pelanggan kami.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;