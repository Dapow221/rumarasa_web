import React from "react";
import { motion } from "framer-motion";
import backgroundImage from "../../assets/1.jpg";

const About = () => {
  return (
    <section className="py-20 pb-16 relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-top bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url(${backgroundImage})`
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="max-w-4xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Content */}
          <div className="space-y-6">
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.p 
                className="text-orange-400 font-medium text-sm uppercase tracking-wider mb-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                ABOUT RUMARASA NUSANTARA
              </motion.p>
              <motion.h2 
                className="text-3xl md:text-4xl lg:text-5xl font-serif text-white leading-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                A Gastronomic Journey to{" "}
                <motion.span 
                  className="italic text-orange-400"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  "One Thousand Flavors"
                </motion.span>{" "}
                of Southeast Asian Culinary Tradition
              </motion.h2>
            </motion.div>

            {/* Description */}
            <motion.div 
              className="space-y-4 text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <motion.p 
                className="text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                Rumarasa Nusantara adalah Rumah makan keluarga yang menyajikan hidangan Nusantara. Rumarasa Nusantara juga menjadi pusat kuliner terbaik yang menghadirkan pengalaman unik dengan cita rasa dari berbagai tempat. Kami memperkaya hubungan sosial dan kebersamaan di setiap kesempatan, sambil memberikan hidangan inovatif, ruang yang nyaman, serta kopi berkualitas. Dengan oleh-oleh khas dan layanan untuk acara spesial, kami menjadi bagian dari setiap momen kebahagiaan pelanggan kami.
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;