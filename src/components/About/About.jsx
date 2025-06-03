import React from "react";

const About = () => {
  const stats = [
    {
      number: "15",
      label: "Years of Excellence",
      position: "top-left"
    },
    {
      number: "2009",
      label: "Year Established", 
      position: "top-right"
    },
    {
      number: "500+",
      label: "Seating Capacity",
      position: "bottom-left"
    },
    {
      number: "25 USD",
      label: "Average Spend",
      position: "bottom-right"
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="space-y-6">
            {/* Section Header */}
            <div className="mb-8">
              <p className="text-orange-600 font-medium text-sm uppercase tracking-wider mb-2">
                ABOUT RUMARASA NUSANTARA
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-gray-900 leading-tight">
                A Gastronomic Journey to{" "}
                <span className="italic text-orange-600">"One Thousand Flavors"</span>{" "}
                of Southeast Asian Culinary Tradition
              </h2>
            </div>

            {/* Description */}
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p className="text-lg">
                Inspired by the region's culinary wealth,{" "}
                <span className="font-semibold text-gray-900">Taste of Bali (One Thousand Flavors)</span>{" "}
                offers delectable local dishes and seafood that embody the richness of 
                Southeast Asian and Indonesian Flavors.
              </p>
              
              <p className="text-base">
                Each traditional recipe is prepared with the freshest ingredients and refined by 
                our Chef's culinary skills, bringing our customers to fascinating gastronomic 
                journey of <span className="font-semibold text-gray-900">"One Thousand Flavors"</span>.
              </p>
            </div>
          </div>

          {/* Right Side - Restaurant Image with Stats */}
          <div className="relative">
            {/* Main Restaurant Image */}
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url('./src/assets/2.jpg')`
                }}
              />
              {/* Overlay for better contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-10 right-10 w-32 h-32 border border-orange-200 rounded-full opacity-20"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 border border-orange-200 rounded-full opacity-20"></div>
    </section>
  );
};


export default About;
