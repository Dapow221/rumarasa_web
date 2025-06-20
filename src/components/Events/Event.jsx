import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { Edit, Save, X } from 'lucide-react';
import { fetchBooking, updateBooking } from '../../store/bookingAction';
import BackgroundImage from '../../assets/VENUE/IMG_5666.jpg';

const EventCatering = () => {
  const dispatch = useDispatch();
  
  const { booking, isLoading, isUpdating, error } = useSelector(state => state.booking);
  
  const [authToken] = useState(localStorage.getItem('authToken'));
  const [isEditing, setIsEditing] = useState(false);
  
  const isAdmin = authToken !== null;
  
  // Refs for contenteditable elements
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const subDescriptionRef = useRef(null);

  // Default content structure
  const defaultContent = {
    title: 'EVENT, MEETING, WEEDINGS & CATERING',
    subtitle: 'Great Venue for Any Occasion',
    description: 'Rumarasa Nusantara menyediakan ruang makan yang fleksibel dengan suasana hangat dan nyaman, dirancang khusus untuk berbagai jenis acara dan pertemuan – mulai dari perayaan ulang tahun yang meriah hingga rapat bisnis yang santai dan peluncuran produk yang sukses.',
    sub_description: 'Kami juga siap memenuhi kebutuhan katering Anda untuk setiap acara spesial. Temukan berbagai pilihan menu autentik Indonesia, hidangan laut segar, dan makanan tradisional Nusantara yang dapat disesuaikan dengan kebutuhan acara Anda, termasuk pernikahan, arisan, meeting kantor, dan acara keluarga lainnya.'
  };

  // Get current content from booking data
  const getCurrentContent = () => {
    if (!booking) return defaultContent;
    
    return {
      title: booking.title || defaultContent.title,
      subtitle: booking.subtitle || defaultContent.subtitle,
      description: booking.description || defaultContent.description,
      sub_description: booking.sub_description || defaultContent.sub_description
    };
  };

  const content = getCurrentContent();

  // Fetch booking data on component mount
  useEffect(() => {
    dispatch(fetchBooking());
  }, [dispatch]);

  // Update refs when content changes
  useEffect(() => {
    if (!isEditing) {
      if (titleRef.current) titleRef.current.textContent = content.title;
      if (subtitleRef.current) subtitleRef.current.textContent = content.subtitle;
      if (descriptionRef.current) descriptionRef.current.textContent = content.description;
      if (subDescriptionRef.current) subDescriptionRef.current.textContent = content.sub_description;
    }
  }, [booking, isEditing]);

  // Save content
  const saveContent = async () => {
    if (!booking?.id) {
      alert('Booking ID not found. Please refresh the page and try again.');
      return;
    }

    const newContent = {
      title: titleRef.current?.textContent || '',
      subtitle: subtitleRef.current?.textContent || '',
      description: descriptionRef.current?.textContent || '',
      sub_description: subDescriptionRef.current?.textContent || ''
    };
    
    try {
      const result = await dispatch(updateBooking(booking.id, newContent));
      
      if (result.success) {
        setIsEditing(false);
        console.log('Booking content updated successfully');
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
    // Reset content to saved version
    if (titleRef.current) titleRef.current.textContent = content.title;
    if (subtitleRef.current) subtitleRef.current.textContent = content.subtitle;
    if (descriptionRef.current) descriptionRef.current.textContent = content.description;
    if (subDescriptionRef.current) subDescriptionRef.current.textContent = content.sub_description;
  };

  // Handle key press for contenteditable elements
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      saveContent();
    }
    if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const fadeInUpVariants = {
    hidden: { 
      opacity: 0, 
      y: 60 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const fadeInLeftVariants = {
    hidden: { 
      opacity: 0, 
      x: -40 
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const paragraphVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const whatsappVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8 
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  const underlineVariants = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: {
        duration: 0.8,
        delay: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <section className="py-20 pb-32 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-top bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.9)), url(${BackgroundImage})`
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[400px]">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-xl">Loading...</p>
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error && !booking) {
    return (
      <section className="py-20 pb-32 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-top bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.9)), url(${BackgroundImage})`
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[400px]">
          <div className="text-white text-center">
            <p className="text-xl mb-4">Error loading content: {error}</p>
            <button 
              onClick={() => dispatch(fetchBooking())}
              className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded text-white"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 pb-32 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-top bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.9)), url(${BackgroundImage})`,
        }}
      />

      {/* Admin Edit Controls */}
      {isAdmin && (
        <div className="absolute top-4 right-4 z-20 flex gap-2">
          {!isEditing ? (
            <motion.button
              onClick={() => setIsEditing(true)}
              className="bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-full shadow-lg transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Edit size={16} />
            </motion.button>
          ) : (
            <div className="flex gap-2">
              <motion.button
                onClick={saveContent}
                disabled={isUpdating}
                className={`${
                  isUpdating 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-green-600 hover:bg-green-700'
                } text-white p-2 rounded-full shadow-lg transition-colors duration-200`}
                whileHover={!isUpdating ? { scale: 1.1 } : {}}
                whileTap={!isUpdating ? { scale: 0.9 } : {}}
              >
                {isUpdating ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <Save size={16} />
                )}
              </motion.button>
              <motion.button
                onClick={cancelEdit}
                disabled={isUpdating}
                className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={16} />
              </motion.button>
            </div>
          )}
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Content */}
          <div className="space-y-6">
            {/* Section Header */}
            <motion.div 
              className="mb-8"
              variants={fadeInUpVariants}
            >
              <motion.p 
                ref={titleRef}
                contentEditable={isAdmin && isEditing}
                suppressContentEditableWarning={true}
                onKeyDown={handleKeyPress}
                className={`text-orange-400 font-medium text-sm uppercase tracking-wider mb-2 ${
                  isAdmin && isEditing 
                    ? 'bg-blue-900 bg-opacity-30 border border-blue-400 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400' 
                    : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={isAdmin && !isEditing ? { 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                } : {}}
              >
                {content.title}
              </motion.p>
              
              <motion.h2 
                ref={subtitleRef}
                contentEditable={isAdmin && isEditing}
                suppressContentEditableWarning={true}
                onKeyDown={handleKeyPress}
                className={`text-3xl md:text-4xl lg:text-5xl font-serif text-white leading-tight ${
                  isAdmin && isEditing 
                    ? 'bg-blue-900 bg-opacity-30 border border-blue-400 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400' 
                    : ''
                }`}
                variants={titleVariants}
                whileHover={isAdmin && !isEditing ? { 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                } : {}}
              >
                <motion.span 
                  className="italic text-orange-400"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  {content.subtitle}
                </motion.span>
              </motion.h2>
              
              {/* Animated underline */}
              <motion.div 
                className="h-1 bg-gradient-to-r from-orange-400 to-orange-600 mt-4"
                variants={underlineVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              />
            </motion.div>

            {/* Description */}
            <motion.div 
              className="space-y-4 text-gray-300 leading-relaxed"
              variants={fadeInLeftVariants}
            >
              <motion.p 
                ref={descriptionRef}
                contentEditable={isAdmin && isEditing}
                suppressContentEditableWarning={true}
                onKeyDown={handleKeyPress}
                className={`text-lg ${
                  isAdmin && isEditing 
                    ? 'bg-blue-900 bg-opacity-30 border border-blue-400 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-400' 
                    : ''
                }`}
                variants={paragraphVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                whileHover={isAdmin && !isEditing ? { 
                  scale: 1.01,
                  transition: { duration: 0.3 }
                } : {}}
              >
                {content.description}
              </motion.p>

              <motion.p 
                ref={subDescriptionRef}
                contentEditable={isAdmin && isEditing}
                suppressContentEditableWarning={true}
                onKeyDown={handleKeyPress}
                className={`text-base ${
                  isAdmin && isEditing 
                    ? 'bg-blue-900 bg-opacity-30 border border-blue-400 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-400' 
                    : ''
                }`}
                variants={paragraphVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                whileHover={isAdmin && !isEditing ? { 
                  scale: 1.01,
                  transition: { duration: 0.3 }
                } : {}}
              >
                {content.sub_description}
              </motion.p>
            </motion.div>

            {/* Contact Information */}
            <motion.div 
              className="mt-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="flex items-center gap-3 text-gray-300">
                <motion.a
                  href="https://wa.me/6281110065589"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-300 transition-colors duration-300 cursor-pointer group"
                  variants={whatsappVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true }}
                  transition={{ delay: 1 }}
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
                  
                  <motion.span 
                    className="text-lg hover:underline underline-offset-4 decoration-orange-400 relative"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                  >
                    Untuk reservasi dan informasi lebih lanjut
                    
                    {/* Animated underline on hover */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-orange-400"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.span>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EventCatering;