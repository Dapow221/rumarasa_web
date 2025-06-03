import React from "react";
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

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">
            Discover Our Ongoing
          </h2>
          <h3 className="text-3xl md:text-4xl font-serif italic text-orange-600 mb-6">
            Events & Promotions
          </h3>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className={`group relative bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden`}
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
              <div className="p-6">
                <div className="mb-4">
                  <h4 className="text-xl font-serif text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {event.title}
                  </h4>
                  <p className="text-sm text-orange-600 font-medium italic mb-3">
                    {event.subtitle}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {event.description}
                  </p>
                </div>

                {/* Event Details */}
                <div className="space-y-2 mb-4">
                  {event.date && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar size={14} />
                      <span>{event.date}</span>
                    </div>
                  )}
                  {event.capacity && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users size={14} />
                      <span>{event.capacity}</span>
                    </div>
                  )}
                  {event.validity && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock size={14} />
                      <span>{event.validity}</span>
                    </div>
                  )}
                </div>

                {/* Pricing */}
                {/* <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-lg font-semibold text-gray-900">
                      {event.price}
                    </div>
                    {event.originalPrice && (
                      <div className="text-sm text-gray-500 line-through">
                        {event.originalPrice}
                      </div>
                    )}
                  </div>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Card;
