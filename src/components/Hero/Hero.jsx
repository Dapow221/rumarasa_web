import { MapPin, Clock } from 'lucide-react';
import BackgroundImage from '../../assets/2.jpg'
import LogoImage from '../../assets/logo_rumarasa.png'


const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Main Hero Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url(${BackgroundImage})`
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        {/* Restaurant Name */}
        <div className="mb-8">
          <div className="mb-6 flex justify-center">
            <img 
              src={LogoImage}
              alt="Rumarasa Nusantara Logo" 
              className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain drop-shadow-2xl"
            />
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif tracking-wider text-white mb-4 drop-shadow-2xl">
            TASTE <span className="italic font-light">OF</span> BALI
          </h1>
          <div className="w-32 h-px bg-white mx-auto mb-6"></div>
          <p className="text-lg md:text-xl font-light tracking-widest text-gray-200 uppercase">
            Authentic Indonesian Cuisine
          </p>
        </div>

        {/* Description */}
        <div className="mb-12 max-w-2xl mx-auto">
          <p className="text-lg md:text-xl leading-relaxed text-gray-300 font-light">
            Experience the rich flavors and aromatic spices of Bali in every bite. 
            Our authentic dishes celebrate Indonesia's culinary heritage with fresh, locally-sourced ingredients.
          </p>
        </div>

        {/* Info Bar */}
        <div className="mt-16 flex flex-col sm:flex-row justify-center items-center gap-8 text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>Open Daily 11:00 AM - 11:00 PM</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>Panglima Polim, Jakarta Selatan</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
