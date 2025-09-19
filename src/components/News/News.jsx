import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Edit, Save, X, ChevronLeft, ChevronRight } from "lucide-react";
import { WhatsAppIcon } from "../Icon/WhatsApp";
import { fetchEvents, updateEvent } from "../../store/eventAction";

const LatestNews = () => {
  const dispatch = useDispatch();

  const { events, loading, error, updateLoading } = useSelector(
    (state) => state.event
  );

  const [authToken] = useState(localStorage.getItem("authToken"));
  const fileInputRef = useRef({});
  const [isEditing, setIsEditing] = useState(false);
  const [editingEventId, setEditingEventId] = useState(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoSlideRef = useRef(null);
  const carouselRef = useRef(null);

  const isAdmin = authToken !== null;

  const titleRefs = useRef({});
  const descriptionRefs = useRef({});

  const whatsappNumber = "6281110065589";

  const newsItems = events && events.length > 0 ? events : [];

  const getItemsPerView = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 1; // mobile
      if (window.innerWidth < 1024) return 2; // tablet
      return 3; // desktop
    }
    return 3;
  };

  const [itemsPerView, setItemsPerView] = useState(getItemsPerView);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(getItemsPerView());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isAutoPlaying && newsItems.length > itemsPerView) {
      autoSlideRef.current = setInterval(() => {
        setCurrentSlide((prev) => {
          const maxSlide = Math.max(0, newsItems.length - itemsPerView);
          return prev >= maxSlide ? 0 : prev + 1;
        });
      }, 4000);
    }

    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, [isAutoPlaying, newsItems.length, itemsPerView]);

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  const goToSlide = (slideIndex) => {
    const maxSlide = Math.max(0, newsItems.length - itemsPerView);
    const newSlide = Math.max(0, Math.min(slideIndex, maxSlide));
    setCurrentSlide(newSlide);
  };

  const nextSlide = () => {
    const maxSlide = Math.max(0, newsItems.length - itemsPerView);
    setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
  };

  const prevSlide = () => {
    const maxSlide = Math.max(0, newsItems.length - itemsPerView);
    setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1));
  };

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  useEffect(() => {
    if (!isEditing) {
      newsItems.forEach((event) => {
        if (titleRefs.current[event.id]) {
          titleRefs.current[event.id].textContent = event.title || "";
        }
        if (descriptionRefs.current[event.id]) {
          descriptionRefs.current[event.id].textContent =
            event.description || "";
        }
      });
    }
  }, [events, isEditing, newsItems]);

  const handleWhatsAppClick = (eventTitle) => {
    const message = `Halo! Saya berminat booking tempat untuk keperluan "${eventTitle}". Bisakah memberikan detail atau ketentuan nya kepada saya?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const startEditing = (eventId) => {
    setIsEditing(true);
    setEditingEventId(eventId);
    setIsAutoPlaying(false);
  };

  const saveContent = async (eventId) => {
    const event = newsItems.find((e) => e.id === eventId);
    if (!event) {
      alert("Event not found. Please refresh the page and try again.");
      return;
    }

    const updatedContent = {
      title: titleRefs.current[eventId]?.textContent || "",
      description: descriptionRefs.current[eventId]?.textContent || "",
    };

    try {
      const result = await dispatch(updateEvent(eventId, updatedContent));

      if (result.success) {
        setIsEditing(false);
        setEditingEventId(null);
        setIsAutoPlaying(true);
      } else {
        alert("Failed to save changes: " + (result.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Error saving content:", error);
      alert("Failed to save changes. Please try again.");
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditingEventId(null);
    setIsAutoPlaying(true);

    newsItems.forEach((event) => {
      if (titleRefs.current[event.id]) {
        titleRefs.current[event.id].textContent = event.title || "";
      }
      if (descriptionRefs.current[event.id]) {
        descriptionRefs.current[event.id].textContent = event.description || "";
      }
    });
  };

  const handleImageClick = (eventId) => {
    if (
      isAdmin &&
      editingEventId === eventId &&
      fileInputRef.current[eventId]
    ) {
      fileInputRef.current[eventId].click();
    }
  };

  const handleFileChange = async (event, eventId) => {
    const file = event.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
      if (!validTypes.includes(file.type)) {
        alert("Please select a valid image file (JPEG, PNG, or GIF)");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      const formData = new FormData();
      formData.append("image", file);

      try {
        const result = await dispatch(updateEvent(eventId, formData));
        if (result.success) {
          dispatch(fetchEvents());
        } else {
          alert("Failed to update image: " + (result.error || "Unknown error"));
        }
      } catch (error) {
        alert("Failed to update image. Please try again.");
      }
    }
  };

  const handleKeyPress = (e, eventId) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      saveContent(eventId);
    }
    if (e.key === "Escape") {
      cancelEdit();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        duration: 0.6,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const getTransform = () => {
    if (itemsPerView === 1) {
      return `translateX(-${currentSlide * 100}%)`;
    } else if (itemsPerView === 2) {
      return `translateX(-${currentSlide * 50}%)`;
    } else {
      return `translateX(-${currentSlide * 33.333333}%)`;
    }
  };

  if (loading) {
    return (
      <section className="py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.85)), url('/images/venue/IMG_5671.jpg')`,
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
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.85)), url('/images/venue/IMG_5671.jpg')`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {newsItems.length > itemsPerView && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-orange-400/80 hover:bg-orange-600 text-white p-2 rounded-full shadow-lg transition-all duration-300 backdrop-blur-sm"
                style={{ transform: "translateY(-50%) translateX(-50%)" }}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-orange-400/80 hover:bg-orange-600 text-white p-2 rounded-full shadow-lg transition-all duration-300 backdrop-blur-sm"
                style={{ transform: "translateY(-50%) translateX(50%)" }}
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          <div className="overflow-hidden rounded-2xl">
            <motion.div
              ref={carouselRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: getTransform(),
                gap: itemsPerView === 1 ? "0px" : "24px",
              }}
            >
              {newsItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={cardVariants}
                  className={`flex-shrink-0 group relative ${
                    itemsPerView === 1
                      ? "w-full px-4" // Mobile: full width with padding
                      : itemsPerView === 2
                      ? "w-[calc(50%-12px)]" // Tablet
                      : "w-[calc(33.333333%-16px)]" // Desktop
                  }`}
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
                                ? "bg-gray-600 cursor-not-allowed"
                                : "bg-green-600 hover:bg-green-700"
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

                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl h-full">
                    {/* Image */}
                    <motion.div
                      className={`relative h-48 sm:h-56 md:h-64 overflow-hidden ${
                        isAdmin && editingEventId === item.id
                          ? "cursor-pointer"
                          : ""
                      }`}
                      initial={{ opacity: 0, scale: 1.1 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      onClick={() => handleImageClick(item.id)}
                    >
                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${
                            typeof item.image === "string" &&
                            item.image.includes("/")
                              ? item.image
                              : item.image
                          })`,
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      {isAdmin && editingEventId === item.id && (
                        <input
                          type="file"
                          ref={(el) => (fileInputRef.current[item.id] = el)}
                          className="hidden"
                          onChange={(e) => handleFileChange(e, item.id)}
                        />
                      )}
                    </motion.div>

                    {/* Content */}
                    <motion.div
                      className="p-4 sm:p-6 text-white flex flex-col h-[calc(100%-12rem)] sm:h-[calc(100%-14rem)] md:h-[calc(100%-16rem)]"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    >
                      <motion.h1
                        ref={(el) => (titleRefs.current[item.id] = el)}
                        contentEditable={isAdmin && editingEventId === item.id}
                        suppressContentEditableWarning={true}
                        onKeyDown={(e) => handleKeyPress(e, item.id)}
                        className={`text-lg sm:text-xl font-semibold mb-3 leading-tight ${
                          isAdmin && editingEventId === item.id
                            ? "bg-blue-600/50 border border-blue-400 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            : ""
                        }`}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      >
                        {item.title}
                      </motion.h1>

                      <motion.h3
                        ref={(el) => (descriptionRefs.current[item.id] = el)}
                        contentEditable={isAdmin && editingEventId === item.id}
                        suppressContentEditableWarning={true}
                        onKeyDown={(e) => handleKeyPress(e, item.id)}
                        className={`text-sm sm:text-base text-gray-200 leading-relaxed mb-4 flex-grow ${
                          isAdmin && editingEventId === item.id
                            ? "bg-blue-600/50 border border-blue-400 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            : ""
                        }`}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      >
                        {item.description}
                      </motion.h3>

                      {/* WhatsApp Book Now Button */}
                      <motion.button
                        onClick={() => handleWhatsAppClick(item.title)}
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2.5 sm:py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg hover:shadow-xl text-sm sm:text-base"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <WhatsAppIcon />
                        <span>Book Now</span>
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {newsItems.length > itemsPerView && (
            <div className="flex justify-center mt-8 gap-2">
              {Array.from({
                length: Math.max(0, newsItems.length - itemsPerView + 1),
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? "bg-orange-600 scale-125"
                      : "bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          )}
        </motion.div>

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
