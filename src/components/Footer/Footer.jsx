import React from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Mail } from "lucide-react";
import { InstagramIcon } from "../Icon/Instagram";
import { TiktokIcon } from "../Icon/Tiktok";
import { WhatsAppIcon } from "../Icon/WhatsApp";
import { GoogleMapsIcon } from "../Icon/GoogleMaps";

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const socialIconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.1,
      y: -2,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  const mapVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const iconVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <footer className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.9), rgba(0,0,0,2)), url('/images/venue/IMG_5664.jpg')`,
        }}
      />

      <div className="relative z-10 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* Restaurant Info */}
            <motion.div className="space-y-6" variants={itemVariants}>
              <div>
                <motion.h3
                  className="text-3xl md:text-4xl font-serif text-white mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  RUMARASA{" "}
                  <span className="italic font-light text-orange-400">
                    NUSANTARA
                  </span>
                </motion.h3>
                <motion.div
                  className="w-20 h-px bg-orange-400 mb-4"
                  initial={{ width: 0 }}
                  whileInView={{ width: 80 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                ></motion.div>
                <motion.p
                  className="text-gray-300 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Experience the authentic flavors of Indonesia in the heart of
                  Jakarta. A culinary journey through Southeast Asian
                  traditions.
                </motion.p>
              </div>
            </motion.div>

            <motion.div className="space-y-6" variants={itemVariants}>
              <motion.h4
                className="text-xl font-serif text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Contact Information
              </motion.h4>
              <div className="space-y-4">
                <motion.div
                  className="flex items-start gap-3 text-gray-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <motion.div variants={iconVariants}>
                    <MapPin
                      size={18}
                      className="text-orange-400 mt-1 flex-shrink-0"
                    />
                  </motion.div>
                  <div>
                    <p className="font-medium text-white mb-1">Address</p>
                    <p className="text-sm leading-relaxed">
                      Jl. Taman Mpu Sendok No.45, Selong Jakarta Selatan
                      <br />
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center gap-3 text-gray-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <motion.div variants={iconVariants}>
                    <Phone size={18} className="text-orange-400" />
                  </motion.div>
                  <div>
                    <p className="font-medium text-white mb-1">Phone</p>
                    <p className="text-sm">+62 8111 0065 589</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center gap-3 text-gray-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <motion.div variants={iconVariants}>
                    <Mail size={18} className="text-orange-400" />
                  </motion.div>
                  <div>
                    <p className="font-medium text-white mb-1">Email</p>
                    <p className="text-sm">rumarasanusantara@gmail.com</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div className="space-y-6" variants={itemVariants}>
              <div>
                <motion.h4
                  className="text-xl font-serif text-white mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  Opening Hours
                </motion.h4>
                <motion.div
                  className="flex items-center gap-3 text-gray-300 mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <motion.div variants={iconVariants}>
                    <Clock size={18} className="text-orange-400" />
                  </motion.div>
                  <div>
                    <p className="text-sm">
                      <span className="text-white font-medium">Daily:</span>{" "}
                      10:00 AM - 22:00 PM
                    </p>
                  </div>
                </motion.div>
              </div>

              <div>
                <motion.h4
                  className="text-xl font-serif text-white mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Find Us
                </motion.h4>
                <motion.div
                  className="flex gap-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {/* Instagram */}
                  <motion.a
                    href="https://www.instagram.com/rumarasa.nusantara"
                    target="_blank"
                    className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-orange-400 hover:text-white transition-all duration-300 group"
                    variants={socialIconVariants}
                    initial="hidden"
                    whileInView="visible"
                    whileHover="hover"
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    <InstagramIcon />
                  </motion.a>

                  {/* TikTok */}
                  <motion.a
                    href="https://www.tiktok.com/@rumarasanusantara_"
                    target="_blank"
                    className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-orange-400 hover:text-white transition-all duration-300"
                    variants={socialIconVariants}
                    initial="hidden"
                    whileInView="visible"
                    whileHover="hover"
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <TiktokIcon />
                  </motion.a>

                  {/* WhatsApp */}
                  <motion.a
                    href="https://wa.me/6281110065589"
                    target="_blank"
                    className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-orange-400 hover:text-white transition-all duration-300"
                    variants={socialIconVariants}
                    initial="hidden"
                    whileInView="visible"
                    whileHover="hover"
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <WhatsAppIcon />
                  </motion.a>

                  {/* Google Maps */}
                  <motion.a
                    href="https://maps.app.goo.gl/4RbY7djGJQiQFs8J9"
                    target="_blank"
                    className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-orange-400 hover:text-white transition-all duration-300"
                    variants={socialIconVariants}
                    initial="hidden"
                    whileInView="visible"
                    whileHover="hover"
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    <GoogleMapsIcon />
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>

            {/* Google Maps Section */}
            <motion.div className="space-y-6" variants={itemVariants}>
              <motion.h4
                className="text-xl font-serif text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Our Location
              </motion.h4>
              <motion.div
                className="relative group"
                variants={mapVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="relative overflow-hidden rounded-lgborder border-white/20 backdrop-blur-sm">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2369042503838!2d106.80981227583807!3d-6.232469293755726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1ba037e27b7%3A0x91ed7440c2e1644a!2sRumarasa%20Nusantara!5e0!3m2!1sid!2snl!4v1749199164352!5m2!1sid!2snl"
                    width="100%"
                    height="280"
                    style={{
                      border: 0,
                      filter: "grayscale(20%) contrast(1.1)",
                    }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="transition-all duration-300 hover:filter-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                </div>
                <div className="mt-3 text-center">
                  <a
                    href="https://goo.gl/maps/your-restaurant-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors"
                  ></a>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Bottom Bar */}
          <motion.div
            className="border-t border-white/10 pt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                © 2025 Rumarasa Nusantara. All rights reserved.
              </motion.p>
              <motion.div
                className="flex gap-6"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <motion.a
                  href="#"
                  className="hover:text-orange-400 transition-colors"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  Privacy Policy
                </motion.a>
                <motion.a
                  href="#"
                  className="hover:text-orange-400 transition-colors"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  Terms of Service
                </motion.a>
                <motion.a
                  href="#"
                  className="hover:text-orange-400 transition-colors"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  Contact
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
