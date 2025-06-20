import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import { Edit, Save, X } from 'lucide-react';
import ImageBanner1 from '../../assets/2.jpg'
import ImageBanner2 from '../../assets/1.jpg'
import BackgroundImage from '../../assets/3.jpg'
import { fetchEvents, updateEvent } from '../../store/eventAction'

const LatestNews = () => {
  const dispatch = useDispatch();
  
  const { events, loading, error, updateLoading } = useSelector(state => state.event);
  
  const [authToken] = useState(localStorage.getItem('authToken'));
  const fileInputRef = useRef({});
  const [isEditing, setIsEditing] = useState(false);
  const [editingEventId, setEditingEventId] = useState(null);
  
  const isAdmin = authToken !== null;
  
  // Refs for editable content
  const titleRefs = useRef({});
  const descriptionRefs = useRef({});

  // Default events structure (fallback if no events from API)
  const defaultEvents = [
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

  // Use events from Redux or fallback to default
  const newsItems = events && events.length > 0 ? events : defaultEvents;

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
                  className="flex-shrink-0 w-96 group relative"
                >
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

                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl">
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
                          backgroundImage: `url(${typeof item.image === 'string' && item.image.includes('/') ? `http://localhost:3030/${item.image}` : item.image})`
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
                      className="p-6 text-white"
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
                        className={`text-base text-gray-200 leading-relaxed ${
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
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
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