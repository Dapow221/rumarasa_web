import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { MapPin, Clock, Edit, Save, X } from 'lucide-react';
import { fetchHero, updateHero } from '../../store/heroAction'
import LogoImage from '../../assets/logo_rumarasa.png'
import { InstagramIcon } from '../Icon/Instagram';
import { TiktokIcon } from '../Icon/Tiktok';

const Hero = () => {
  const dispatch = useDispatch();
  
  const { hero, isLoading, isUpdating, error } = useSelector(state => state.hero);
  
  const [authToken] = useState(localStorage.getItem('authToken'));
  const [isEditing, setIsEditing] = useState(false);
  
  const isAdmin = authToken !== null;
  
  const titleRefs = useRef([]);
  const descriptionRef = useRef(null);
  const hoursRef = useRef(null);
  const addressRef = useRef(null);

  const defaultContent = {
    title: ['Taste', 'Of', 'Authenticity'],
    description: 'Rumarasa Nusantara adalah Rumah makan keluarga yang menyajikan hidangan Nusantara...',
    openingHours: 'Open Daily 10:00 AM - 22:00 PM',
    address: 'Jl. Taman Mpu Sendok No.45, Selong Jakarta Selatan'
  };

  const getCurrentContent = () => {
    if (!hero) return defaultContent;

    let titleArray = defaultContent.title;
    if (hero.title) {
      if (Array.isArray(hero.title)) {
        titleArray = hero.title;
      } else if (typeof hero.title === 'string') {
        titleArray = hero.title.split(' ');
      }
    }
    
    return {
      title: titleArray,
      description: hero.description || defaultContent.description,
      openingHours: hero.openingHours || defaultContent.openingHours,
      address: hero.address || defaultContent.address
    };
  };

  const content = getCurrentContent();

  useEffect(() => {
    dispatch(fetchHero());
  }, [dispatch]);

  useEffect(() => {
    if (!isEditing) {
      if (titleRefs.current) {
        titleRefs.current.forEach((ref, index) => {
          if (ref) ref.textContent = content.title[index] || '';
        });
      }
      if (descriptionRef.current) descriptionRef.current.textContent = content.description;
      if (hoursRef.current) hoursRef.current.textContent = content.openingHours;
      if (addressRef.current) addressRef.current.textContent = content.address;
    }
  }, [hero, isEditing]);

  const saveContent = async () => {
    if (!hero?.id) {
      alert('Hero ID not found. Please refresh the page and try again.');
      return;
    }

    const newContent = {
      title: titleRefs.current.map(ref => ref?.textContent || '').join(' '),
      description: descriptionRef.current?.textContent || '',
      openingHours: hoursRef.current?.textContent || '',
      address: addressRef.current?.textContent || ''
    };
    
    try {
      const result = await dispatch(updateHero(hero.id, newContent));
      
      if (result.success) {
        setIsEditing(false);
      } else {
        alert('Failed to save changes: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      alert('Failed to save changes. Please try again.');
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    if (titleRefs.current) {
      titleRefs.current.forEach((ref, index) => {
        if (ref) ref.textContent = content.title[index] || '';
      });
    }
    if (descriptionRef.current) descriptionRef.current.textContent = content.description;
    if (hoursRef.current) hoursRef.current.textContent = content.openingHours;
    if (addressRef.current) addressRef.current.textContent = content.address;
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      saveContent();
    }
    if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  if (isLoading) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url('/images/venue/IMG_5738.jpg')`
          }}
        />
        <div className="relative z-10 text-white text-center">
          <div className="animate-spin rounded-full h-15 w-15 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error && !hero) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url('/images/venue/IMG_5738.jpg')`
          }}
        />
        <div className="relative z-10 text-white text-center">
          <p className="text-xl mb-4">Error loading content: {error}</p>
          <button 
            onClick={() => dispatch(fetchHero())}
            className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded text-white"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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

  const socialVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        delay: 1.2
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url('/images/venue/IMG_5738.jpg')`
        }}
      />

      {isAdmin && (
        <div className="absolute top-4 right-4 z-20 flex gap-2 mt-20">
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


      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <div className="mb-4 sm:mb-6">
          <div className="mb-2 sm:mb-4 mt-20 flex justify-center">
            <motion.img 
              src={LogoImage}
              alt="Rumarasa Nusantara Logo" 
              className="w-40 h-40 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 object-contain drop-shadow-2xl"
              initial="hidden"
              animate="visible"
            />
          </div>
          
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-serif tracking-wider text-white mb-3 sm:mb-4 drop-shadow-2xl leading-tight"
            variants={titleVariants}
            initial="hidden"
            animate="visible"
          >
            {content.title.map((word, index) => (
              <motion.span
                key={index}
                ref={el => titleRefs.current[index] = el}
                contentEditable={isAdmin && isEditing}
                suppressContentEditableWarning={true}
                onKeyDown={handleKeyPress}
                initial="hidden"
                animate="visible"
                custom={index}
                className={`inline-block ${
                  index === 1 ? 'italic font-light' : ''
                } ${
                  isAdmin && isEditing 
                    ? 'bg-blue-900 bg-opacity-30 border border-blue-400 rounded px-2 mx-1 focus:outline-none focus:ring-2 focus:ring-blue-400' 
                    : ''
                }`}
                style={{
                  minWidth: isAdmin && isEditing ? '100px' : 'auto'
                }}
              >
                {word}
              </motion.span>
            ))}
            {content.title.map((_, index) => index < content.title.length - 1 && ' ')}
          </motion.h1>
          
          <div className="w-24 mt-6 sm:w-32 h-px bg-white mx-auto mb-4 sm:mb-6 overflow-hidden">
            <motion.div 
              className="h-full bg-white"
              variants={dividerVariants}
              initial="hidden"
              animate="visible"
            />
          </div>
        </div>

        <motion.div 
          className="mb-8 sm:mb-12 max-w-2xl mx-auto"
          variants={descriptionVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p 
            ref={descriptionRef}
            contentEditable={isAdmin && isEditing}
            suppressContentEditableWarning={true}
            onKeyDown={handleKeyPress}
            className={`text-sm sm:text-base md:text-xl leading-relaxed text-gray-300 font-light ${
              isAdmin && isEditing 
                ? 'bg-blue-900 bg-opacity-30 border border-blue-400 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-400' 
                : ''
            }`}
          >
            {content.description}
          </motion.p>
        </motion.div>

        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-xs sm:text-sm text-gray-300">
          <motion.div 
            className="flex items-center gap-2"
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <motion.div
              transition={{ duration: 0.2 }}
            >
              <Clock size={14} className="sm:w-4 sm:h-4" />
            </motion.div>
            <motion.span 
              ref={hoursRef}
              contentEditable={isAdmin && isEditing}
              suppressContentEditableWarning={true}
              onKeyDown={handleKeyPress}
              className={`text-center ${
                isAdmin && isEditing 
                  ? 'bg-blue-900 bg-opacity-30 border border-blue-400 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400' 
                  : ''
              }`}
            >
              {content.openingHours}
            </motion.span>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-2"
            initial="hidden"
            animate="visible"
            custom={1}
          >
            <motion.div
              whileHover={{ scale: 1.2, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <MapPin size={14} className="sm:w-4 sm:h-4" />
            </motion.div>
            <motion.span 
              ref={addressRef}
              contentEditable={isAdmin && isEditing}
              suppressContentEditableWarning={true}
              onKeyDown={handleKeyPress}
              className={`text-center sm:text-left ${
                isAdmin && isEditing 
                  ? 'bg-blue-900 bg-opacity-30 border border-blue-400 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400' 
                  : ''
              }`}
            >
              {content.address}
            </motion.span>
          </motion.div>
        </div>

        <motion.div 
          className="mt-6 sm:mt-8 mb-10"
          variants={socialVariants}
          initial="hidden"
          animate="visible"
        >
          <h3 className="text-sm sm:text-base text-gray-300 font-light mb-4 tracking-wide">
            Social Media
          </h3>
          <div className="flex justify-center items-center gap-6">
            <motion.a
              href="https://www.instagram.com/rumarasa.nusantara"
              target='_blank'
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200"
              whileHover={{ scale: 1.1, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <InstagramIcon size={18} />
              <span className="text-xs sm:text-sm">Instagram</span>
            </motion.a>
            <motion.a
              href="https://www.tiktok.com/@rumarasanusantara_"
              target='_blank'
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200"
              whileHover={{ scale: 1.1, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <TiktokIcon size={18} />
              <span className="text-xs sm:text-sm">TikTok</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;