import React from "react";
import { motion } from 'framer-motion';
import { Calendar, Users, Clock } from 'lucide-react';
import FoodImage from '../../assets/f2.jpg'

const Card = () => {
  const events = [
    {
      id: 1,
      title: 'Lunch Package',
      subtitle: 'Nice package for your lunch',
      description: 'Indulge in our authentic rijsttafel featuring 12 traditional Balinese dishes served with aromatic jasmine rice. A complete culinary journey through Indonesia.',
      price: 'Starting from $45',
      originalPrice: '$65',
      discount: '30% OFF',
      image: FoodImage,
      validity: 'Valid until Dec 31, 2025',
      featured: true
    },
    {
      id: 2,
      type: 'EVENT',
      title: 'Dinner Package',
      subtitle: 'Learn from Master Chef Wayan',
      description: 'Join our head chef for an interactive cooking class where you\'ll learn to prepare authentic Balinese dishes using traditional techniques and spices.',
      price: '$85 per person',
      date: 'Every Saturday 2PM - 5PM',
      image: FoodImage,
      featured: false
    },
    {
      id: 3,
      title: 'Idul Fitri Package',
      subtitle: 'Romantic Evening for Two',
      description: 'Enjoy a romantic 5-course dinner with our carefully curated wine pairing as you watch the sunset from our terrace dining area.',
      price: '$120 for couple',
      originalPrice: '$150',
      discount: '20% OFF',
      image: FoodImage,
      validity: 'Available daily 6PM - 8PM',
      featured: false
    },
  ];

  // Variants untuk section header
  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      }
    }
  };

  // Variants untuk subtitle
  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        delay: 0.3
      }
    }
  };

  // Variants untuk card animation
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.2 + 0.5,
        duration: 0.8,
        ease: "easeOut",
        type: "spring",
        stiffness: 100
      }
    })
  };

  // Variants untuk card content
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  // Variants untuk title animation
  const titleVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut"
      }
    }
  };

  // Variants untuk subtitle dalam card
  const cardSubtitleVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        delay: 0.1
      }
    }
  };

  // Variants untuk description
  const descriptionVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  // Variants untuk event details
  const detailItemVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.3 + (i * 0.1),
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-serif text-gray-900 mb-4"
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
          >
            Discover Our 
          </motion.h2>
          <motion.h3 
            className="text-3xl md:text-4xl font-serif italic text-orange-600 mb-6"
            variants={subtitleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ 
              scale: 1.05,
              color: "#ea580c",
              transition: { duration: 0.2 }
            }}
          >
            Ongoing Promotion
          </motion.h3>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              className={`group relative bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden`}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={index}
              whileHover={{ 
                scale: 1.03,
                y: -10,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.4)), url('${event.image}')`
                  }}
                />
              </div>

              {/* Content */}
              <motion.div 
                className="p-6"
                variants={contentVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="mb-4">
                  <motion.h4 
                    className="text-xl font-serif text-gray-900 mb-2 group-hover:text-orange-600 transition-colors"
                    variants={titleVariants}
                    whileHover={{ 
                      x: 5,
                      color: "#ea580c",
                      transition: { duration: 0.2 }
                    }}
                  >
                    {event.title}
                  </motion.h4>
                  
                  <motion.p 
                    className="text-sm text-orange-600 font-medium italic mb-3"
                    variants={cardSubtitleVariants}
                    whileHover={{ 
                      x: 3,
                      fontWeight: "600",
                      transition: { duration: 0.2 }
                    }}
                  >
                    {event.subtitle}
                  </motion.p>
                  
                  <motion.p 
                    className="text-gray-600 text-sm leading-relaxed line-clamp-3"
                    variants={descriptionVariants}
                    whileHover={{ 
                      color: "#374151",
                      transition: { duration: 0.2 }
                    }}
                  >
                    {event.description}
                  </motion.p>
                </div>

                {/* Event Details */}
                <div className="space-y-2 mb-4">
                  {event.date && (
                    <motion.div 
                      className="flex items-center gap-2 text-sm text-gray-600"
                      variants={detailItemVariants}
                      custom={0}
                      whileHover={{ 
                        x: 5,
                        color: "#ea580c",
                        transition: { duration: 0.2 }
                      }}
                    >
                      <motion.div
                        whileHover={{ rotate: 15, scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Calendar size={14} />
                      </motion.div>
                      <motion.span
                        whileHover={{ fontWeight: "500" }}
                        transition={{ duration: 0.2 }}
                      >
                        {event.date}
                      </motion.span>
                    </motion.div>
                  )}
                  
                  {event.capacity && (
                    <motion.div 
                      className="flex items-center gap-2 text-sm text-gray-600"
                      variants={detailItemVariants}
                      custom={1}
                      whileHover={{ 
                        x: 5,
                        color: "#ea580c",
                        transition: { duration: 0.2 }
                      }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Users size={14} />
                      </motion.div>
                      <motion.span
                        whileHover={{ fontWeight: "500" }}
                        transition={{ duration: 0.2 }}
                      >
                        {event.capacity}
                      </motion.span>
                    </motion.div>
                  )}
                  
                  {event.validity && (
                    <motion.div 
                      className="flex items-center gap-2 text-sm text-gray-600"
                      variants={detailItemVariants}
                      custom={2}
                      whileHover={{ 
                        x: 5,
                        color: "#ea580c",
                        transition: { duration: 0.2 }
                      }}
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Clock size={14} />
                      </motion.div>
                      <motion.span
                        whileHover={{ fontWeight: "500" }}
                        transition={{ duration: 0.2 }}
                      >
                        {event.validity}
                      </motion.span>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Card;