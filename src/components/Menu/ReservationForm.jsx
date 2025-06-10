import React, { useState } from "react";
import { Calendar, Clock, Users, User, Phone, MessageCircle } from "lucide-react";

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
    specialRequests: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nama wajib diisi';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Nomor telepon wajib diisi';
    } else if (!/^[0-9+\-\s()]+$/.test(formData.phone)) {
      newErrors.phone = 'Format nomor telepon tidak valid';
    }
    
    if (!formData.date) {
      newErrors.date = 'Tanggal wajib dipilih';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.date = 'Tanggal tidak boleh kurang dari hari ini';
      }
    }
    
    if (!formData.time) {
      newErrors.time = 'Waktu wajib dipilih';
    }
    
    if (!formData.guests || formData.guests < 1) {
      newErrors.guests = 'Jumlah tamu minimal 1 orang';
    } else if (formData.guests > 20) {
      newErrors.guests = 'Jumlah tamu maksimal 20 orang';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatWhatsAppMessage = () => {
    const formattedDate = new Date(formData.date).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const message = `Halo Rumarasa Nusantara! 👋

Saya ingin melakukan reservasi dengan detail sebagai berikut:

👤 *Nama:* ${formData.name}
📞 *Nomor Telepon:* ${formData.phone}
📅 *Tanggal:* ${formattedDate}
⏰ *Waktu:* ${formData.time}
👥 *Jumlah Tamu:* ${formData.guests} orang
${formData.specialRequests ? `💬 *Permintaan Khusus:* ${formData.specialRequests}` : ''}

Mohon konfirmasi ketersediaan meja untuk reservasi ini. Terima kasih! 🙏`;

    return encodeURIComponent(message);
  };

  const clearForm = () => {
    setFormData({
      name: '',
      phone: '',
      date: '',
      time: '',
      guests: '',
      specialRequests: ''
    });
    setErrors({});
  };

  const handleSubmit = (e) => {    
    if (validateForm()) {
      const whatsappMessage = formatWhatsAppMessage();
      const whatsappNumber = "625730833070"; // Replace with your actual WhatsApp number
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
      
      // Clear the form first
      clearForm();
      
      // Then redirect to WhatsApp
      window.open(whatsappURL, '_blank');
    }
  };

  // Get today's date for min attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="mb-16 md:mb-24">
      <div className="text-center mb-8 md:mb-12">
        <div className="inline-flex items-center gap-3 bg-orange-100 px-6 py-3 rounded-full mb-6">
          <Calendar className="w-5 h-5 text-orange-600" />
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif text-orange-700">Reservation</h3>
          <Calendar className="w-5 h-5 text-orange-600" />
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
          Booking meja untuk pengalaman kuliner terbaik di Rumarasa Nusantara. Reservasi akan dikonfirmasi melalui WhatsApp.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Side - Information */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 md:p-8 border border-orange-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                <h4 className="text-2xl md:text-3xl font-serif text-orange-700">Mengapa Reservasi?</h4>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <p className="text-base md:text-lg leading-relaxed">
                  <span className="font-semibold text-orange-700">Rumarasa Nusantara</span> menghadirkan pengalaman kuliner autentik dengan suasana yang hangat dan nyaman. Reservasi meja memastikan Anda mendapatkan tempat terbaik untuk menikmati hidangan tradisional Indonesia yang istimewa.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h5 className="font-semibold text-orange-700 mb-1">Jaminan Tempat</h5>
                      <p className="text-sm text-gray-600">Meja tersedia sesuai waktu yang Anda inginkan</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h5 className="font-semibold text-orange-700 mb-1">Pelayanan Optimal</h5>
                      <p className="text-sm text-gray-600">Tim kami siap memberikan pelayanan terbaik</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h5 className="font-semibold text-orange-700 mb-1">Suasana Istimewa</h5>
                      <p className="text-sm text-gray-600">Pengaturan meja sesuai kebutuhan acara Anda</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h5 className="font-semibold text-orange-700 mb-1">Tanpa Antri</h5>
                      <p className="text-sm text-gray-600">Langsung nikmati hidangan tanpa menunggu lama</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-orange-600 text-white rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageCircle className="w-4 h-4" />
                    <span className="font-semibold">Konfirmasi Cepat</span>
                  </div>
                  <p className="text-sm">
                    Setelah mengisi form, Anda akan diarahkan ke WhatsApp untuk konfirmasi reservasi langsung dengan tim kami.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-white rounded-2xl shadow-lg border border-orange-100 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 md:p-8">
              <div className="flex items-center justify-center gap-3 text-white">
                <MessageCircle className="w-6 h-6" />
                <h4 className="text-xl md:text-2xl font-serif">Form Reservasi</h4>
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-6">
            {/* Name Field */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                <User className="w-4 h-4 text-orange-600" />
                Nama Lengkap
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Nama Lengkap"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Phone Field */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                <Phone className="w-4 h-4 text-orange-600" />
                Nomor Telepon
                <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Isi no WA/Telp"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            {/* Date and Time Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Date Field */}
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                  <Calendar className="w-4 h-4 text-orange-600" />
                  Tanggal
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={today}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                    errors.date ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
              </div>

              {/* Time Field */}
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                  <Clock className="w-4 h-4 text-orange-600" />
                  Waktu
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                      errors.time ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
              </div>
            </div>

            {/* Guests Field */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                <Users className="w-4 h-4 text-orange-600" />
                Jumlah Tamu
                <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="guests"
                value={formData.guests}
                onChange={handleInputChange}
                min="1"
                max="20"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                  errors.guests ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Isikan Jumlah Tamu"
              />
              {errors.guests && <p className="text-red-500 text-sm mt-1">{errors.guests}</p>}
            </div>

            {/* Special Requests Field */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                <MessageCircle className="w-4 h-4 text-orange-600" />
                Permintaan Khusus (Opsional)
              </label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors resize-none"
                placeholder="Permintaan khusus contoh (mau meja di area non smoking)"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-3"
              >
                <MessageCircle className="w-5 h-5" />
                 Reservasi
              </button>
              <p className="text-sm text-gray-500 text-center mt-3">
                * Field wajib diisi. Reservasi akan dikonfirmasi melalui WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ReservationForm;