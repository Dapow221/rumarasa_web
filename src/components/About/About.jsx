import React from "react";

const About = () => {
  return (
    <section className="py-20 pb-32 relative overflow-hidden">
      {/* Background Image with Overlay - Dark overlay with wider bottom */}
      <div 
        className="absolute inset-0 bg-cover bg-top bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url('./src/assets/1.jpg')`
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
                Inspired by the region's culinary wealth,{" "}
                <span className="font-semibold text-white">Taste of Bali (One Thousand Flavors)</span>{" "}
                offers delectable local dishes and seafood that embody the richness of 
                Southeast Asian and Indonesian Flavors.
              </p>
              
              <p className="text-base">
                Each traditional recipe is prepared with the freshest ingredients and refined by 
                our Chef's culinary skills, bringing our customers to fascinating gastronomic 
                journey of <span className="font-semibold text-white">"One Thousand Flavors"</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;