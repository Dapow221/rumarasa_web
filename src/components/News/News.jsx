import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import { Edit, Save, X, ChevronLeft, ChevronRight } from 'lucide-react';
import BackgroundImage from '../../assets/VENUE/IMG_5671.jpg'
import { fetchEvents, updateEvent } from '../../store/eventAction'

const LatestNews = () => {
  const dispatch = useDispatch();
  
  const { events, loading, error, updateLoading } = useSelector(state => state.event);
  
  const [authToken] = useState(localStorage.getItem('authToken'));
  const fileInputRef = useRef({});
  const [isEditing, setIsEditing] = useState(false);
  const [editingEventId, setEditingEventId] = useState(null);
  
  // Auto slider states
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoSlideRef = useRef(null);
  
  const isAdmin = authToken !== null;
  
  // Refs for editable content
  const titleRefs = useRef({});
  const descriptionRefs = useRef({});

  const whatsappNumber = "6281110065589";

  // Use events from Redux or fallback to default
  const newsItems = events && events.length > 0 ? events : [];

  // Auto slider configuration
  const slidesToShow = 3; // Number of cards to show at once
  const slideInterval = 4000; // 4 seconds
  const totalSlides = Math.max(0, newsItems.length - slidesToShow + 1);

  // Auto slider effect
  useEffect(() => {
    if (isAutoPlaying && newsItems.length > slidesToShow) {
      autoSlideRef.current = setInterval(() => {
        setCurrentSlide(prev => {
          const nextSlide = prev + 1;
          return nextSlide >= totalSlides ? 0 : nextSlide;
        });
      }, slideInterval);
    }

    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, [isAutoPlaying, newsItems.length, slidesToShow, totalSlides]);

  // Pause auto-play when editing
  useEffect(() => {
    if (isEditing) {
      setIsAutoPlaying(false);
    } else {
      setIsAutoPlaying(true);
    }
  }, [isEditing]);

  // Manual navigation functions
  const goToSlide = (index) => {
    setCurrentSlide(Math.max(0, Math.min(index, totalSlides - 1)));
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);
  };

  // Pause auto-play on hover
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    if (!isEditing) {
      setIsAutoPlaying(true);
    }
  };

  // Fetch events on component mount
  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  // Update refs when events change
  useEffect(() => {
    if (!isEditing) {
      newsItems.forEach(event => {
        if (titleRefs.current[event.id]) {
          titleRefs.current[event.id].textContent = event.title || '';
        }
        if (descriptionRefs.current[event.id]) {
          descriptionRefs.current[event.id].textContent = event.description || '';
        }
      });
    }
  }, [events, isEditing, newsItems]);

  // WhatsApp click handler
  const handleWhatsAppClick = (eventTitle) => {
    const message = `Halo! Saya berminat booking tempat untuk keperluan "${eventTitle}". Bisakah memberikan detail atau ketentuan nya kepada saya?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  // Start editing a specific event
  const startEditing = (eventId) => {
    setIsEditing(true);
    setEditingEventId(eventId);
  };

  // Save content for a specific event
  const saveContent = async (eventId) => {
    const event = newsItems.find(e => e.id === eventId);
    if (!event) {
      alert('Event not found. Please refresh the page and try again.');
      return;
    }

    const updatedContent = {
      title: titleRefs.current[eventId]?.textContent || '',
      description: descriptionRefs.current[eventId]?.textContent || ''
    };
    
    try {
      const result = await dispatch(updateEvent(eventId, updatedContent));
      
      if (result.success) {
        setIsEditing(false);
        setEditingEventId(null);
        console.log('Event updated successfully');
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
    setEditingEventId(null);
    
    // Reset content to saved version
    newsItems.forEach(event => {
      if (titleRefs.current[event.id]) {
        titleRefs.current[event.id].textContent = event.title || '';
      }
      if (descriptionRefs.current[event.id]) {
        descriptionRefs.current[event.id].textContent = event.description || '';
      }
    });
  };

  const handleImageClick = (eventId) => {
    if (isAdmin && editingEventId === eventId && fileInputRef.current[eventId]) {
      fileInputRef.current[eventId].click();
    }
  };

  const handleFileChange = async (event, eventId) => {
    const file = event.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        alert('Please select a valid image file (JPEG, PNG, or GIF)');
        return;
      }
  
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
  
      const formData = new FormData();
      formData.append('image', file);
      
      try {
        const result = await dispatch(updateEvent(eventId, formData));
        if (result.success) {
          console.log('Image updated successfully');
          dispatch(fetchEvents());
        } else {
          alert('Failed to update image: ' + (result.error || 'Unknown error'));
        }
      } catch (error) {
        console.error('Error updating image:', error);
        alert('Failed to update image. Please try again.');
      }
    }
  };

  const handleKeyPress = (e, eventId) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      saveContent(eventId);
    }
    if (e.key === 'Escape') {
      cancelEdit();
    }
  };

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

  // Show loading state
  if (loading) {
    return (
      <section className="py-20 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.85)), url('${BackgroundImage}')`
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
            <p className="text-xl text-white">Loading events...</p>
          </div>
        </div>
      </section>
    );
  }

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

        {/* Carousel Container */}
        <motion.div 
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Navigation Arrows */}
          {newsItems.length > slidesToShow && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-orange-400/80 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 backdrop-blur-sm"
                style={{ marginLeft: '-20px' }}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-orange-400/80 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 backdrop-blur-sm"
                style={{ marginRight: '-20px' }}
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Carousel Viewport */}
          <div className="overflow-hidden rounded-lg">
            <motion.div 
              className="flex transition-transform duration-700 ease-in-out"
              animate={{ 
                x: newsItems.length > slidesToShow ? `${-currentSlide * (100 / slidesToShow)}%` : '0%' 
              }}
              style={{ 
                width: newsItems.length > slidesToShow ? `${(newsItems.length / slidesToShow) * 100}%` : '100%'
              }}
            >
              {newsItems.map((item, index) => (
                <motion.div 
                  key={item.id}
                  variants={cardVariants}
                  className="flex-shrink-0 px-3"
                  style={{ 
                    width: newsItems.length > slidesToShow ? `${100 / newsItems.length}%` : `${100 / Math.min(newsItems.length, slidesToShow)}%`
                  }}
                >
                  <div className="group relative h-full">
                    {/* Admin Edit Controls */}
                    {isAdmin && (
                      <div className="absolute top-2 right-2 z-10 flex gap-1">
                        {editingEventId !== item.id ? (
                          <motion.button
                            onClick={() => startEditing(item.id)}
                            className="bg-orange-600 hover:bg-orange-700 text-white p-1.5 rounded-full shadow-lg transition-colors duration-200 opacity-0 group-hover:opacity-100"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Edit size={12} />
                          </motion.button>
                        ) : (
                          <div className="flex gap-1">
                            <motion.button
                              onClick={() => saveContent(item.id)}
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

                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl h-full flex flex-col">
                      {/* Image */}
                      <motion.div 
                        className={`relative h-64 overflow-hidden ${isAdmin && editingEventId === item.id ? 'cursor-pointer' : ''}`}
                        initial={{ opacity: 0, scale: 1.1 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        onClick={() => handleImageClick(item.id)}
                      >
                        <div 
                          className="w-full h-full bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${typeof item.image === 'string' && item.image.includes('/') ? item.image : item.image})`
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        {isAdmin && editingEventId === item.id && (
                          <input 
                            type="file" 
                            ref={el => fileInputRef.current[item.id] = el} 
                            className="hidden" 
                            onChange={(e) => handleFileChange(e, item.id)} 
                          />
                        )}
                      </motion.div>

                      {/* Content */}
                      <motion.div 
                        className="p-6 text-white flex-1 flex flex-col"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                      >
                        <motion.h1 
                          ref={el => titleRefs.current[item.id] = el}
                          contentEditable={isAdmin && editingEventId === item.id}
                          suppressContentEditableWarning={true}
                          onKeyDown={(e) => handleKeyPress(e, item.id)}
                          className={`text-xl font-semibold mb-3 leading-tight ${
                            isAdmin && editingEventId === item.id 
                              ? 'bg-blue-600/50 border border-blue-400 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400' 
                              : ''
                          }`}
                          initial={{ opacity: 0, y: 15 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                        >
                          {item.title}
                        </motion.h1>

                        <motion.h3 
                          ref={el => descriptionRefs.current[item.id] = el}
                          contentEditable={isAdmin && editingEventId === item.id}
                          suppressContentEditableWarning={true}
                          onKeyDown={(e) => handleKeyPress(e, item.id)}
                          className={`text-base text-gray-200 leading-relaxed mb-4 flex-1 ${
                            isAdmin && editingEventId === item.id 
                              ? 'bg-blue-600/50 border border-blue-400 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400' 
                              : ''
                          }`}
                          initial={{ opacity: 0, y: 15 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                        >
                          {item.description}
                        </motion.h3>

                        {/* WhatsApp Book Now Button */}
                        <motion.button
                          onClick={() => handleWhatsAppClick(item.title)}
                          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg hover:shadow-xl"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <motion.svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            initial={{ rotate: 0 }}
                            whileHover={{ rotate: 10 }}
                            transition={{ duration: 0.3 }}
                          >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                          </motion.svg>
                          <span>Book Now</span>
                        </motion.button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Dots Indicator */}
          {newsItems.length > slidesToShow && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index 
                      ? 'bg-orange-400 scale-125' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </motion.div>

        {/* Error State */}
        {error && (
          <div className="text-center mt-8">
            <p className="text-red-400 mb-4">Error loading events: {error}</p>
            <button 
              onClick={() => dispatch(fetchEvents())}
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

export default LatestNews;