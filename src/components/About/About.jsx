import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Edit, Save, X } from 'lucide-react';
import { fetchAbout, updateAbout } from '../../store/aboutAction';

const About = () => {
  const dispatch = useDispatch();
  
  const { about, isLoading, isUpdating, error } = useSelector(state => state.about);
  const [authToken] = useState(localStorage.getItem('authToken'));
  const [isEditing, setIsEditing] = useState(false);
  
  const isAdmin = authToken !== null;
  
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);

  const defaultContent = {
    title: 'ABOUT RUMARASA NUSANTARA',
    subtitle: 'About Us',
    description: 'Rumarasa Nusantara adalah Rumah makan keluarga yang menyajikan hidangan Nusantara. Rumarasa Nusantara juga menjadi pusat kuliner terbaik yang menghadirkan pengalaman unik dengan cita rasa dari berbagai tempat. Kami memperkaya hubungan sosial dan kebersamaan di setiap kesempatan, sambil memberikan hidangan inovatif, ruang yang nyaman, serta kopi berkualitas. Dengan oleh-oleh khas dan layanan untuk acara spesial, kami menjadi bagian dari setiap momen kebahagiaan pelanggan kami.'
  };

  const getCurrentContent = () => {
    if (!about) return defaultContent;
    
    return {
      title: about.title || defaultContent.title,
      subtitle: about.subtitle || defaultContent.subtitle,
      description: about.description || defaultContent.description
    };
  };

  const content = getCurrentContent();

  useEffect(() => {
    dispatch(fetchAbout());
  }, [dispatch]);

  useEffect(() => {
    if (!isEditing) {
      if (titleRef.current) titleRef.current.textContent = content.title;
      if (subtitleRef.current) subtitleRef.current.textContent = content.subtitle;
      if (descriptionRef.current) descriptionRef.current.textContent = content.description;
    }
  }, [about, isEditing]);

  const saveContent = async () => {
    const newContent = {
      title: titleRef.current?.textContent || '',
      subtitle: subtitleRef.current?.textContent || '',
      description: descriptionRef.current?.textContent || ''
    };
    
    try {
      const result = await dispatch(updateAbout(about.id, newContent));
      
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
    if (titleRef.current) titleRef.current.textContent = content.title;
    if (subtitleRef.current) subtitleRef.current.textContent = content.subtitle;
    if (descriptionRef.current) descriptionRef.current.textContent = content.description;
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
      <section className="py-20 pb-16 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-top bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url('/images/venue/IMG_5663.jpg')`
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

  if (error && !about) {
    return (
      <section className="py-20 pb-16 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-top bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url('/images/venue/IMG_5663.jpg')`
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[400px]">
          <div className="text-white text-center">
            <p className="text-xl mb-4">Error loading content: {error}</p>
            <button 
              onClick={() => dispatch(fetchAbout())}
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
    <section className="py-20 pb-16 relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-top bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url('/images/venue/IMG_5663.jpg')`
        }}
      />

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
                ref={titleRef}
                contentEditable={isAdmin && isEditing}
                suppressContentEditableWarning={true}
                onKeyDown={handleKeyPress}
                className={`text-orange-400 font-medium text-sm uppercase tracking-wider mb-2 ${
                  isAdmin && isEditing 
                    ? 'bg-blue-900 bg-opacity-30 border border-blue-400 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400' 
                    : ''
                }`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 }}
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
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  {content.subtitle}
                </motion.span>
              </motion.h2>
            </motion.div>

            <motion.div 
              className="space-y-4 text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
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
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.7 }}
                whileHover={isAdmin && !isEditing ? { 
                  scale: 1.01,
                  transition: { duration: 0.3 }
                } : {}}
              >
                {content.description}
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;