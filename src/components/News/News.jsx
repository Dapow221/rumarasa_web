import React from "react";
import { motion } from "framer-motion";
import ImageBanner1 from '../../assets/2.jpg'
import ImageBanner2 from '../../assets/1.jpg'
import BackgroundImage from '../../assets/3.jpg'

const LatestNews = () => {
  const newsItems = [
    {
      id: 1,
      title: "Corporate",
      description: "RumaRasa adalah pilihan tepat untuk mengadakan acara korporat dengan suasana eksklusif dan hidangan berkualitas.",
      image: ImageBanner1,
    },
    {
      id: 2,
      title: "Wedding",
      description: "Rayakan hari istimewa Anda di Seribu Rasa, tempat ideal untuk menggelar resepsi pernikahan yang elegan dan berkesan.",
      image: ImageBanner2,
    },
    {
      id: 3,
      title: "Birthday",
      description: "Buat momen ulang tahun Anda lebih spesial di Seribu Rasa dengan suasana hangat dan menu istimewa.",
      image: ImageBanner2,
    },
    {
      id: 4,
      title: "Community",
      description: "RumaRasa adalah tempat yang cocok untuk berkumpul bersama komunitas, berbagi cerita dan cita rasa Nusantara.",
      image: ImageBanner2,
    },
    {
      id: 5,
      title: "Artisan",
      description: "Rasakan sentuhan seni kuliner di Seribu Rasa, di mana cita rasa tradisional bertemu dengan presentasi modern.",
      image: ImageBanner2,
    },
    
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        duration: 0.6
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.85)), url('${BackgroundImage}')`
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.p 
            className="text-orange-300 font-medium text-sm uppercase tracking-wider mb-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Keep Up with Our
          </motion.p>
          <motion.h3 
            className="text-4xl md:text-5xl lg:text-4xl font-serif text-white leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            EVENT AND ACTIVITIES
          </motion.h3>
        </motion.div>

        {/* News Slider */}
        <motion.div 
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-6 pb-4" style={{ width: 'max-content' }}>
              {newsItems.map((item, index) => (
                <motion.div 
                  key={item.id}
                  variants={cardVariants}
                  className="flex-shrink-0 w-96"
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl">
                    {/* Image */}
                    <motion.div 
                      className="relative h-64 overflow-hidden"
                      initial={{ opacity: 0, scale: 1.1 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <div 
                        className="w-full h-full bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${item.image})`
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </motion.div>

                    {/* Content */}
                    <motion.div 
                      className="p-6 text-white"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                    >
                      <motion.h1 
                        className="text-xl font-semibold mb-3 leading-tight"
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                      >
                        {item.title}
                      </motion.h1>

                      <motion.h3 
                        className="text-base text-gray-200 leading-relaxed"
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                      >
                        {item.description}
                      </motion.h3>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestNews;