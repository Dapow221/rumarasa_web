import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Calendar, Users, Clock, Edit, Save, X } from 'lucide-react';
import { fetchPromotions, updatePromotion } from '../../store/promotionAction';
import FoodImage from '../../assets/f2.jpg'

const Card = () => {
  const dispatch = useDispatch();
  
  const { promotions, loading, error, updateLoading } = useSelector(state => state.promotions);
  
  const [authToken] = useState(localStorage.getItem('authToken'));
  const [isEditing, setIsEditing] = useState(false);
  const [editingPromotionId, setEditingPromotionId] = useState(null);
  
  const isAdmin = authToken !== null;
  
  // Refs for editable content
  const titleRefs = useRef({});
  const subtitleRefs = useRef({});
  const descriptionRefs = useRef({});
  const validityRefs = useRef({});

  // Default events structure (fallback if no promotions from API)
  const defaultEvents = [
    {
      id: 1,
      title: 'Lunch Package',
      subtitle: 'Nice package for your lunch',
      description: 'Indulge in our authentic rijsttafel featuring 12 traditional Balinese dishes served with aromatic jasmine rice. A complete culinary journey through Indonesia.',
      image: FoodImage,
      validity: 'Valid until Dec 31, 2025',
    },
    {
      id: 2,
      type: 'EVENT',
      title: 'Dinner Package',
      subtitle: 'Learn from Master Chef Wayan',
      description: 'Join our head chef for an interactive cooking class where you\'ll learn to prepare authentic Balinese dishes using traditional techniques and spices.',
      image: FoodImage,
      validity: 'Valid until Dec 31, 2025',
    },
    {
      id: 3,
      title: 'Idul Fitri Package',
      subtitle: 'Romantic Evening for Two',
      description: 'Enjoy a romantic 5-course dinner with our carefully curated wine pairing as you watch the sunset from our terrace dining area.',
      image: FoodImage,
      validity: 'Available daily 6PM - 8PM',
    },
  ];

  // Use promotions from Redux or fallback to default
  const events = promotions && promotions.length > 0 ? promotions : defaultEvents;

  // Fetch promotions on component mount
  useEffect(() => {
    dispatch(fetchPromotions());
  }, [dispatch]);

  // Update refs when promotions change
  useEffect(() => {
    if (!isEditing) {
      events.forEach(event => {
        if (titleRefs.current[event.id]) {
          titleRefs.current[event.id].textContent = event.title || '';
        }
        if (subtitleRefs.current[event.id]) {
          subtitleRefs.current[event.id].textContent = event.subtitle || '';
        }
        if (descriptionRefs.current[event.id]) {
          descriptionRefs.current[event.id].textContent = event.description || '';
        }
        if (validityRefs.current[event.id]) {
          validityRefs.current[event.id].textContent = event.validity || '';
        }
      });
    }
  }, [promotions, isEditing, events]);

  // Start editing a specific promotion
  const startEditing = (promotionId) => {
    setIsEditing(true);
    setEditingPromotionId(promotionId);
  };

  // Save content for a specific promotion
  const saveContent = async (promotionId) => {
    const promotion = events.find(e => e.id === promotionId);
    if (!promotion) {
      alert('Promotion not found. Please refresh the page and try again.');
      return;
    }

    const updatedContent = {
      title: titleRefs.current[promotionId]?.textContent || '',
      subtitle: subtitleRefs.current[promotionId]?.textContent || '',
      description: descriptionRefs.current[promotionId]?.textContent || '',
      validity: validityRefs.current[promotionId]?.textContent || ''
    };
    
    try {
      const result = await dispatch(updatePromotion(promotionId, updatedContent));
      
      if (result.success) {
        setIsEditing(false);
        setEditingPromotionId(null);
        console.log('Promotion updated successfully');
      } else {
        alert('Failed to save changes: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Failed to save changes. Please try again.');
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    setIsEditing(false);
    setEditingPromotionId(null);
    
    // Reset content to saved version
    events.forEach(event => {
      if (titleRefs.current[event.id]) {
        titleRefs.current[event.id].textContent = event.title || '';
      }
      if (subtitleRefs.current[event.id]) {
        subtitleRefs.current[event.id].textContent = event.subtitle || '';
      }
      if (descriptionRefs.current[event.id]) {
        descriptionRefs.current[event.id].textContent = event.description || '';
      }
      if (validityRefs.current[event.id]) {
        validityRefs.current[event.id].textContent = event.validity || '';
      }
    });
  };

  // Handle key press for contenteditable elements
  const handleKeyPress = (e, promotionId) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      saveContent(promotionId);
    }
    if (e.key === 'Escape') {
      cancelEdit();
    }
  };

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

  // Variants untuk card animation (removed hover effects)
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

  // Show loading state
  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">Loading promotions...</p>
          </div>
        </div>
      </section>
    );
  }

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
              {/* Admin Edit Controls */}
              {isAdmin && (
                <div className="absolute top-2 right-2 z-10 flex gap-1">
                  {editingPromotionId !== event.id ? (
                    <motion.button
                      onClick={() => startEditing(event.id)}
                      className="bg-orange-600 hover:bg-orange-700 text-white p-1.5 rounded-full shadow-lg transition-colors duration-200 opacity-0 group-hover:opacity-100"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Edit size={12} />
                    </motion.button>
                  ) : (
                    <div className="flex gap-1">
                      <motion.button
                        onClick={() => saveContent(event.id)}
                        disabled={updateLoading}
                        className={`${
                          updateLoading 
                            ? 'bg-gray-600 cursor-not-allowed' 
                            : 'bg-green-600 hover:bg-green-700'
                        } text-white p-1.5 rounded-full shadow-lg transition-colors duration-200`}
                        whileHover={!updateLoading ? { scale: 1.1 } : {}}
                        whileTap={!updateLoading ? { scale: 0.9 } : {}}
                      >
                        {updateLoading ? (
                          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                        ) : (
                          <Save size={12} />
                        )}
                      </motion.button>
                      <motion.button
                        onClick={cancelEdit}
                        disabled={updateLoading}
                        className="bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-full shadow-lg transition-colors duration-200"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X size={12} />
                      </motion.button>
                    </div>
                  )}
                </div>
              )}

              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.4)), url('${event.image || FoodImage}')`
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
                    ref={el => titleRefs.current[event.id] = el}
                    contentEditable={isAdmin && editingPromotionId === event.id}
                    suppressContentEditableWarning={true}
                    onKeyDown={(e) => handleKeyPress(e, event.id)}
                    className={`text-xl font-serif text-gray-900 mb-2 group-hover:text-orange-600 transition-colors ${
                      isAdmin && editingPromotionId === event.id 
                        ? 'bg-blue-100 border border-blue-400 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400' 
                        : ''
                    }`}
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
                    ref={el => subtitleRefs.current[event.id] = el}
                    contentEditable={isAdmin && editingPromotionId === event.id}
                    suppressContentEditableWarning={true}
                    onKeyDown={(e) => handleKeyPress(e, event.id)}
                    className={`text-sm text-orange-600 font-medium italic mb-3 ${
                      isAdmin && editingPromotionId === event.id 
                        ? 'bg-blue-100 border border-blue-400 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400' 
                        : ''
                    }`}
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
                    ref={el => descriptionRefs.current[event.id] = el}
                    contentEditable={isAdmin && editingPromotionId === event.id}
                    suppressContentEditableWarning={true}
                    onKeyDown={(e) => handleKeyPress(e, event.id)}
                    className={`text-gray-600 text-sm leading-relaxed ${
                      editingPromotionId === event.id ? '' : 'line-clamp-3'
                    } ${
                      isAdmin && editingPromotionId === event.id 
                        ? 'bg-blue-100 border border-blue-400 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400' 
                        : ''
                    }`}
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
                        ref={el => validityRefs.current[event.id] = el}
                        contentEditable={isAdmin && editingPromotionId === event.id}
                        suppressContentEditableWarning={true}
                        onKeyDown={(e) => handleKeyPress(e, event.id)}
                        className={`${
                          isAdmin && editingPromotionId === event.id 
                            ? 'bg-blue-100 border border-blue-400 rounded px-1 focus:outline-none focus:ring-2 focus:ring-blue-400' 
                            : ''
                        }`}
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

        {/* Error State */}
        {error && (
          <div className="text-center mt-8">
            <p className="text-red-600 mb-4">Error loading promotions: {error}</p>
            <button 
              onClick={() => dispatch(fetchPromotions())}
              className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded text-white"
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Card;