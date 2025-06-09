import { motion } from 'framer-motion';
import { MapPin, Clock } from 'lucide-react';
import BackgroundImage from '../../assets/2.jpg'
import LogoImage from '../../assets/logo_rumarasa.png'

const Hero = () => {
  // Variants untuk logo animation
  const logoVariants = {
    hidden: { opacity: 0, scale: 0.5, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        duration: 1.2, 
        ease: "easeOut",
        type: "spring",
        stiffness: 100
      }
    }
  };

  // Variants untuk title animation
  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        delay: 0.5
      }
    }
  };

  // Variants untuk divider line
  const dividerVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: { 
      width: "100%", 
      opacity: 1,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        delay: 0.8
      }
    }
  };

  // Variants untuk description
  const descriptionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        delay: 1.0
      }
    }
  };

  // Variants untuk info bar items
  const infoItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.3 + (i * 0.2),
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  // Variants untuk word animation in title
  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + (i * 0.1),
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

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
        <div className="mb-6 sm:mb-8">
          <div className="mb-4 sm:mb-6 flex justify-center">
            <motion.img 
              src={LogoImage}
              alt="Rumarasa Nusantara Logo" 
              className="w-40 h-40 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 object-contain drop-shadow-2xl"
              variants={logoVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ 
                scale: 1.05,
                rotate: 2,
                transition: { duration: 0.3 }
              }}
            />
          </div>
          
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-serif tracking-wider text-white mb-3 sm:mb-4 drop-shadow-2xl leading-tight"
            variants={titleVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span
              variants={wordVariants}
              initial="hidden"
              animate="visible"
              custom={0}
              className="inline-block"
            >
              Taste
            </motion.span>
            {' '}
            <motion.span 
              variants={wordVariants}
              initial="hidden"
              animate="visible"
              custom={1}
              className="italic font-light inline-block"
            >
              Of
            </motion.span>
            {' '}
            <motion.span
              variants={wordVariants}
              initial="hidden"
              animate="visible"
              custom={2}
              className="inline-block"
            >
              Authenticity
            </motion.span>
          </motion.h1>
          
          <div className="w-24 sm:w-32 h-px bg-white mx-auto mb-4 sm:mb-6 overflow-hidden">
            <motion.div 
              className="h-full bg-white"
              variants={dividerVariants}
              initial="hidden"
              animate="visible"
            />
          </div>
        </div>

        {/* Description */}
        <motion.div 
          className="mb-8 sm:mb-12 max-w-2xl mx-auto"
          variants={descriptionVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p 
            className="text-sm sm:text-base md:text-xl leading-relaxed text-gray-300 font-light"
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
          >
            Rumarasa Nusantara adalah Rumah makan keluarga yang menyajikan hidangan Nusantara. Rumarasa Nusantara juga menjadi pusat kuliner terbaik yang menghadirkan pengalaman unik dengan cita rasa dari berbagai tempat. Kami memperkaya hubungan sosial dan kebersamaan di setiap kesempatan, sambil memberikan hidangan inovatif, ruang yang nyaman, serta kopi berkualitas. Dengan oleh-oleh khas dan layanan untuk acara spesial, kami menjadi bagian dari setiap momen kebahagiaan pelanggan kami.
          </motion.p>
        </motion.div>

        {/* Info Bar */}
        <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-xs sm:text-sm text-gray-300">
          <motion.div 
            className="flex items-center gap-2"
            variants={infoItemVariants}
            initial="hidden"
            animate="visible"
            custom={0}
            whileHover={{ 
              scale: 1.05,
              color: "#fed7aa",
              transition: { duration: 0.2 }
            }}
          >
            <motion.div
              whileHover={{ rotate: 15 }}
              transition={{ duration: 0.2 }}
            >
              <Clock size={14} className="sm:w-4 sm:h-4" />
            </motion.div>
            <motion.span 
              className="text-center"
              whileHover={{ letterSpacing: "0.05em" }}
              transition={{ duration: 0.2 }}
            >
              Open Daily 10:00 AM - 22:00 PM
            </motion.span>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-2"
            variants={infoItemVariants}
            initial="hidden"
            animate="visible"
            custom={1}
            whileHover={{ 
              scale: 1.05,
              color: "#fed7aa",
              transition: { duration: 0.2 }
            }}
          >
            <motion.div
              whileHover={{ scale: 1.2, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <MapPin size={14} className="sm:w-4 sm:h-4" />
            </motion.div>
            <motion.span 
              className="text-center sm:text-left"
              whileHover={{ letterSpacing: "0.02em" }}
              transition={{ duration: 0.2 }}
            >
              Jl. Taman Mpu Sendok No.45, Selong Jakarta Selatan
            </motion.span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;