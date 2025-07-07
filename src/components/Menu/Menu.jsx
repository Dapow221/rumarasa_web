import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Edit } from "lucide-react";
import MenuPdf from "./RenderPdf";
import ReservationForm from "./ReservationForm";
import MembershipForm from "./MemberForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenus, updateMenu } from "../../store/menuAction";
import bg_1 from "../../assets/bg_1.png";

const Menu = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  // Redux state
  const { menus, loading, error } = useSelector((state) => state.menu);

  // Admin auth state
  const [authToken] = useState(localStorage.getItem("authToken"));
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const isAdmin = authToken !== null;

  // Slider states
  const [currentFoodIndex, setCurrentFoodIndex] = useState(0);
  const [currentBeverageIndex, setCurrentBeverageIndex] = useState(0);
  const [currentFacilityIndex, setCurrentFacilityIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  // Refs for smooth transitions
  const foodIntervalRef = useRef(null);
  const beverageIntervalRef = useRef(null);
  const facilityIntervalRef = useRef(null);

  const foodImages =
    menus
      ?.filter((menu) => menu.category === "food")
      .map((menu) => ({
        id: menu.id,
        src: menu.image,
        category: menu.category,
        created_at: menu.created_at,
      })) || [];

  const beverageImages =
    menus
      ?.filter((menu) => menu.category === "beverages")
      .map((menu) => ({
        id: menu.id,
        src: menu.image,
        category: menu.category,
        created_at: menu.created_at,
      })) || [];

  const facilityImages =
    menus
      ?.filter((menu) => menu.category === "facilities")
      .map((menu) => ({
        id: menu.id,
        src: menu.image,
        category: menu.category,
        created_at: menu.created_at,
      })) || [];

  useEffect(() => {
    dispatch(fetchMenus());
  }, [dispatch]);

  const getItemsPerView = useCallback(() => {
    if (windowWidth < 640) return 1; // mobile
    if (windowWidth < 1024) return 2; // tablet
    return 4; // desktop
  }, [windowWidth]);

  const itemsPerView = getItemsPerView();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate max index based on items per view
  const getMaxIndex = (imagesLength) => {
    return Math.max(0, imagesLength - itemsPerView);
  };

  // Enhanced auto-slide functionality with smooth transitions
  const startAutoSlide = useCallback(() => {
    // Clear existing intervals
    if (foodIntervalRef.current) clearInterval(foodIntervalRef.current);
    if (beverageIntervalRef.current) clearInterval(beverageIntervalRef.current);
    if (facilityIntervalRef.current) clearInterval(facilityIntervalRef.current);

    if (isPaused || isEditing) return;

    // Food slider auto-slide
    if (foodImages.length > itemsPerView) {
      foodIntervalRef.current = setInterval(() => {
        setCurrentFoodIndex((prev) => {
          const maxIndex = getMaxIndex(foodImages.length);
          return prev >= maxIndex ? 0 : prev + 1;
        });
      }, 4000);
    }

    // Beverage slider auto-slide (offset by 1.5 seconds)
    if (beverageImages.length > itemsPerView) {
      setTimeout(() => {
        beverageIntervalRef.current = setInterval(() => {
          setCurrentBeverageIndex((prev) => {
            const maxIndex = getMaxIndex(beverageImages.length);
            return prev >= maxIndex ? 0 : prev + 1;
          });
        }, 4000);
      }, 1500);
    }

    // Facility slider auto-slide (offset by 3 seconds)
    if (facilityImages.length > itemsPerView) {
      setTimeout(() => {
        facilityIntervalRef.current = setInterval(() => {
          setCurrentFacilityIndex((prev) => {
            const maxIndex = getMaxIndex(facilityImages.length);
            return prev >= maxIndex ? 0 : prev + 1;
          });
        }, 4000);
      }, 3000);
    }
  }, [
    isPaused,
    isEditing,
    foodImages.length,
    beverageImages.length,
    facilityImages.length,
    itemsPerView,
  ]);

  const stopAutoSlide = useCallback(() => {
    if (foodIntervalRef.current) clearInterval(foodIntervalRef.current);
    if (beverageIntervalRef.current) clearInterval(beverageIntervalRef.current);
    if (facilityIntervalRef.current) clearInterval(facilityIntervalRef.current);
  }, []);

  useEffect(() => {
    startAutoSlide();

    return () => {
      stopAutoSlide();
    };
  }, [startAutoSlide, stopAutoSlide]);

  const handleImageClick = (image) => {
    if (!isAdmin) return;

    setEditingItem(image);
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file || !editingItem) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("category", editingItem.category);

      const result = await dispatch(updateMenu(editingItem.id, formData));

      if (result.success) {
        dispatch(fetchMenus());
        setEditingItem(null);
      } else {
        alert("Failed to update menu item: " + result.error);
      }
    } catch (error) {
      console.error("Error updating menu:", error);
      alert("Failed to update menu item");
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  const nextFoodSlide = () => {
    const maxIndex = getMaxIndex(foodImages.length);
    setCurrentFoodIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    setTimeout(startAutoSlide, 100);
  };

  const prevFoodSlide = () => {
    const maxIndex = getMaxIndex(foodImages.length);
    setCurrentFoodIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    setTimeout(startAutoSlide, 100);
  };

  const nextBeverageSlide = () => {
    const maxIndex = getMaxIndex(beverageImages.length);
    setCurrentBeverageIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    setTimeout(startAutoSlide, 100);
  };

  const prevBeverageSlide = () => {
    const maxIndex = getMaxIndex(beverageImages.length);
    setCurrentBeverageIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    setTimeout(startAutoSlide, 100);
  };

  const nextFacilitySlide = () => {
    const maxIndex = getMaxIndex(facilityImages.length);
    setCurrentFacilityIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    setTimeout(startAutoSlide, 100);
  };

  const prevFacilitySlide = () => {
    const maxIndex = getMaxIndex(facilityImages.length);
    setCurrentFacilityIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    setTimeout(startAutoSlide, 100);
  };

  const SliderComponent = ({
    images,
    currentIndex,
    nextSlide,
    prevSlide,
    title,
  }) => {
    const maxIndex = getMaxIndex(images.length);
    const translateX = currentIndex * (100 / itemsPerView);

    return (
      <div className="mb-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-orange-100 px-6 py-3 rounded-full mb-6">
            <span className="w-2 h-2 bg-orange-600 rounded-full animate-pulse"></span>
            <p className="text-orange-700 font-bold text-xs md:text-sm uppercase tracking-wider">
              {title}
            </p>
            <span className="w-2 h-2 bg-orange-600 rounded-full animate-pulse"></span>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {title === "Foods"
              ? "Authentic Indonesian dishes prepared with traditional recipes and premium ingredients"
              : title === "Beverages"
              ? "Refreshing beverages to complement your dining experience, from traditional drinks to modern favorites"
              : "Modern facilities and comfortable spaces designed to enhance your dining experience"}
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-1000 ease-in-out"
              style={{
                transform: `translateX(-${translateX}%)`,
                gap: windowWidth < 640 ? "0px" : "24px",
              }}
            >
              {images.map((image) => (
                <div
                  key={image.id}
                  className={`
                    flex-shrink-0 relative overflow-hidden rounded-sm shadow-md hover:shadow-lg transition-all duration-300 group cursor-pointer
                    ${
                      windowWidth < 640
                        ? "w-full aspect-[4/3] px-4"
                        : windowWidth < 1024
                        ? "w-[calc(50%-12px)] aspect-square"
                        : "w-[calc(25%-18px)] aspect-square"
                    }
                    ${
                      isAdmin
                        ? "ring-2 ring-transparent hover:ring-orange-300"
                        : ""
                    }
                  `}
                  onClick={() => handleImageClick(image)}
                >
                  <div className="w-full h-full">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Admin Edit Overlay */}
                  {isAdmin && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/90 rounded-full p-3">
                        <Edit className="w-5 h-5 text-orange-600" />
                      </div>
                    </div>
                  )}

                  {/* Upload Progress Overlay */}
                  {isUploading && editingItem?.id === image.id && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                        <p className="text-sm">Uploading...</p>
                      </div>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-3 left-3 right-3">
                      <h4 className="text-white font-medium text-sm md:text-base mb-1">
                        {image.alt}
                      </h4>
                      <div className="w-8 h-0.5 bg-orange-500 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons - Only show if there are more slides */}
          {maxIndex > 0 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 md:p-3 shadow-md hover:shadow-lg transition-all duration-200 z-10 backdrop-blur-sm"
              >
                <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 md:p-3 shadow-md hover:shadow-lg transition-all duration-200 z-10 backdrop-blur-sm"
              >
                <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
              </button>
            </>
          )}

          {/* Dots Indicator - Only show if there are multiple slides */}
          {maxIndex > 0 && (
            <div className="flex justify-center mt-6 gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (title === "Foods") {
                      setCurrentFoodIndex(index);
                      setTimeout(startAutoSlide, 100);
                    } else if (title === "Beverages") {
                      setCurrentBeverageIndex(index);
                      setTimeout(startAutoSlide, 100);
                    } else if (title === "Facilities") {
                      setCurrentFacilityIndex(index);
                      setTimeout(startAutoSlide, 100);
                    }
                  }}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? "bg-orange-600 scale-125"
                      : "bg-gray-300 hover:bg-gray-400 hover:scale-110"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Show loading state
  if (loading) {
    return (
      <section className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading menu...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Main content section with background image */}
      <div
        className="w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative"
        style={{
          backgroundImage: `url(${bg_1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Semi-transparent overlay for better text readability */}
        <div className="absolute inset-0 bg-white/90"></div>

        {/* Content container with relative positioning */}
        <div className="relative z-10">
          <div className="text-center mb-16 md:mb-24">
            <div className="inline-flex items-center gap-3 bg-orange-100 px-6 py-3 rounded-full mb-6">
              <span className="w-3 h-3 bg-orange-600 rounded-full animate-pulse"></span>
              <p className="text-orange-700 font-bold text-xs md:text-sm uppercase tracking-wider">
                OUR MENU
              </p>
              <span className="w-3 h-3 bg-orange-600 rounded-full animate-pulse"></span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-gray-900 mb-6 md:mb-8 leading-tight">
              Rumarasa{" "}
              <span className="italic text-orange-600 relative inline-block">
                Nusantara
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent rounded-full animate-pulse" />
              </span>
            </h1>

            <div className="flex items-center justify-center gap-4 md:gap-6 mb-6 md:mb-8">
              <div className="w-12 md:w-20 h-px bg-gradient-to-r from-transparent to-orange-600"></div>
              <div className="w-3 h-3 md:w-4 md:h-4 bg-orange-600 rounded-full animate-pulse"></div>
              <div className="w-12 md:w-20 h-px bg-gradient-to-l from-transparent to-orange-600"></div>
            </div>

            <p className="text-base md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
              Discover our authentic Indonesian cuisine crafted with traditional
              recipes and the finest local ingredients, bringing you the true
              taste of Nusantara
              {isAdmin && (
                <span className="block mt-2 text-sm text-orange-600 font-medium">
                  Click on any menu image to update it
                </span>
              )}
            </p>
          </div>

          {/* Food Slider */}
          <SliderComponent
            images={foodImages}
            currentIndex={currentFoodIndex}
            nextSlide={nextFoodSlide}
            prevSlide={prevFoodSlide}
            title="Foods"
          />

          {/* Beverage Slider */}
          <SliderComponent
            images={beverageImages}
            currentIndex={currentBeverageIndex}
            nextSlide={nextBeverageSlide}
            prevSlide={prevBeverageSlide}
            title="Beverages"
          />

          {/* Facilities Slider */}
          <SliderComponent
            images={facilityImages}
            currentIndex={currentFacilityIndex}
            nextSlide={nextFacilitySlide}
            prevSlide={prevFacilitySlide}
            title="Facilities"
          />

          {/* Error State */}
          {error && (
            <div className="text-center mt-8 mb-16">
              <p className="text-red-600 mb-4">Error loading menu: {error}</p>
              <button
                onClick={() => dispatch(fetchMenus())}
                className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded text-white transition-colors duration-200"
              >
                Retry
              </button>
            </div>
          )}
          {/* PDF Menu Section - still with background */}
          <div className="mb-16 md:mb-24">
            <div className="text-center mb-8 md:mb-12">
              <div className="inline-flex items-center gap-3 bg-orange-100 px-6 py-3 rounded-full mb-6">
                <span className="w-2 h-2 bg-orange-600 rounded-full animate-pulse"></span>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif text-orange-700">
                  Complete Menu
                </h3>
                <span className="w-2 h-2 bg-orange-600 rounded-full animate-pulse"></span>
              </div>
              <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
                Browse our full selection of traditional Indonesian dishes,
                carefully curated to offer you an authentic dining experience
              </p>
            </div>

            <div className="relative">
              <MenuPdf />
            </div>
          </div>
        </div>
      </div>

      <div id="reservation">
        <ReservationForm />
      </div>

      <div id="member">
        <MembershipForm />
      </div>
    </section>
  );
};

export default Menu;
