import React, { useState, useEffect } from "react";

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const menuItems = [
    {
      id: 1,
      name: "Gulai Ikan Kakap",
      category: "seafood",
      price: "Rp 85,000",
      description:
        "Fresh red snapper in rich coconut curry with aromatic spices",
      image: "../public/f1.jpeg",
    },
    {
      id: 2,
      name: "Mie Ayam Spesial",
      category: "noodles",
      price: "Rp 45,000",
      description:
        "Traditional chicken noodles with special sauce and vegetables",
      image: "../public/f2.jpg",
    },
    {
      id: 3,
      name: "Bebek Bakar Sambal Ijo",
      category: "poultry",
      price: "Rp 95,000",
      description:
        "Grilled duck with spicy green chili sauce and fresh vegetables",
      image: "../public/f3.jpg",
    },
    {
      id: 4,
      name: "Es Campur Segar",
      category: "drinks",
      price: "Rp 25,000",
      description:
        "Traditional mixed ice dessert with tropical fruits and coconut",
      image: "../public/f4.jpg",
    },
    {
      id: 5,
      name: "Ayam Bakar Bumbu Bali",
      category: "poultry",
      price: "Rp 75,000",
      description: "Balinese grilled chicken with traditional spice paste",
      image: "../public/f5.jpg",
    },
    {
      id: 6,
      name: "Sate Lilit Ikan",
      category: "seafood",
      price: "Rp 55,000",
      description: "Balinese fish satay wrapped around lemongrass sticks",
      image: "../public/sate-lilit.jpg",
    },
    {
      id: 7,
      name: "Ikan Bakar Sambal Matah",
      category: "seafood",
      price: "Rp 90,000",
      description: "Grilled fish with fresh Balinese sambal matah",
      image: "../public/f5.jpg",
    },
    {
      id: 8,
      name: "Udang Goreng Tepung",
      category: "seafood",
      price: "Rp 65,000",
      description: "Crispy fried prawns with special seasoning",
      image: "../public/f5.jpg",
    },
  ];

  const categories = [
    { id: "all", name: "All Items", icon: "🍽️" },
    { id: "seafood", name: "Seafood", icon: "🦐" },
    { id: "poultry", name: "Poultry", icon: "🐔" },
    { id: "noodles", name: "Noodles", icon: "🍜" },
    { id: "drinks", name: "Drinks", icon: "🥤" },
  ];

  const filteredItems =
    activeCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-orange-600 font-medium text-sm uppercase tracking-wider mb-2">
            OUR MENU
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 mb-6">
            Rumarasa <span className="italic text-orange-600">Nusantara</span>
          </h2>
          <div className="w-24 h-px bg-orange-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our authentic Indonesian cuisine crafted with traditional
            recipes and the finest local ingredients
          </p>
        </div>

        {/* Category Filter - Horizontal scroll on mobile */}
        <div className="mb-12">
          <div className="flex gap-4 overflow-x-auto pb-2 md:justify-center scrollbar-hide">
            <div className="flex gap-4 md:flex-wrap md:justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex-shrink-0 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeCategory === category.id
                      ? "bg-orange-600 text-white shadow-lg scale-105"
                      : "bg-white text-gray-700 hover:bg-orange-100 hover:text-orange-600 shadow-md"
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Grid - Horizontal scroll on mobile, grid on larger screens */}
        <div className="overflow-x-auto md:overflow-x-visible">
          <div className="flex gap-6 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-8 pb-4 md:pb-0">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-80 md:w-auto bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-110"
                    style={{
                      backgroundImage: `url('${item.image}')`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-serif text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator for mobile */}
        <div className="text-center mt-8 md:hidden">
          <p className="text-sm text-gray-500">← Swipe to see more items →</p>
        </div>
      </div>
    </section>
  );
};

export default Menu;