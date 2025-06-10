import React, { useState } from "react";
import { Star, Gift, Percent, Crown, User, Phone, Mail, Calendar, MessageCircle } from "lucide-react";

const MembershipForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    birthDate: '',
    address: '',
    referralCode: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
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
      newErrors.name = 'Nama lengkap wajib diisi';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Nomor telepon wajib diisi';
    } else if (!/^[0-9+\-\s()]+$/.test(formData.phone)) {
      newErrors.phone = 'Format nomor telepon tidak valid';
    }
    
    if (!formData.birthDate) {
      newErrors.birthDate = 'Tanggal lahir wajib diisi';
    } else {
      const birthDate = new Date(formData.birthDate);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      
      if (age < 13) {
        newErrors.birthDate = 'Usia minimal 13 tahun untuk menjadi member';
      } else if (age > 100) {
        newErrors.birthDate = 'Tanggal lahir tidak valid';
      }
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Alamat wajib diisi';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatWhatsAppMessage = () => {
    const formattedBirthDate = new Date(formData.birthDate).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const message = `Halo Rumarasa Nusantara! 👋

    Saya ingin mendaftar menjadi member dengan detail sebagai berikut:

    🌟 *PENDAFTARAN MEMBER BARU*

    👤 *Nama Lengkap:* ${formData.name}
    📧 *Email:* ${formData.email}
    📞 *Nomor Telepon:* ${formData.phone}
    🎂 *Tanggal Lahir:* ${formattedBirthDate}
    🏠 *Alamat:* ${formData.address}
    ${formData.referralCode ? `🎁 *Kode Referral:* ${formData.referralCode}` : ''}

    Mohon proses pendaftaran member saya dan informasikan mengenai kartu member serta benefit yang akan saya dapatkan. Terima kasih! 🙏

    #RumarasaMember #KulinerNusantara`;

    return encodeURIComponent(message);
  };

  const handleSubmit = () => {    
    if (validateForm()) {
      const whatsappMessage = formatWhatsAppMessage();
      const whatsappNumber = "6287794108007"; // Replace with your actual WhatsApp number
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
      
      window.open(whatsappURL, '_blank');
    }
  };

  // Get max date for birth date (13 years ago)
  const maxBirthDate = new Date();
  maxBirthDate.setFullYear(maxBirthDate.getFullYear() - 13);
  const maxDate = maxBirthDate.toISOString().split('T')[0];

  return (
    <div className="mb-16 md:mb-24">
      <div className="text-center mb-8 md:mb-12">
        <div className="inline-flex items-center gap-3 bg-orange-100 px-6 py-3 rounded-full mb-6">
          <Star className="w-5 h-5 text-orange-600" />
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif text-orange-700">Member Eksklusif</h3>
          <Star className="w-5 h-5 text-orange-600" />
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
          Bergabunglah dengan komunitas pecinta kuliner Nusantara dan nikmati berbagai keuntungan eksklusif sebagai member Rumarasa.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Side - Benefits Information */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 md:p-8 border border-orange-200">
              <div className="flex items-center gap-3 mb-6">
                <Crown className="w-6 h-6 text-orange-600" />
                <h4 className="text-2xl md:text-3xl font-serif text-orange-700">Keuntungan Member</h4>
              </div>
              
              <div className="space-y-6 text-gray-700">
                <p className="text-base md:text-lg leading-relaxed">
                  Menjadi <span className="font-semibold text-orange-700">Member Rumarasa Nusantara</span> memberikan Anda akses ke berbagai privilese eksklusif dan pengalaman kuliner yang tak terlupakan.
                </p>
                
                {/* Main Benefits */}
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-orange-200">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Percent className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-orange-700 mb-1">Diskon Khusus</h5>
                      <p className="text-sm text-gray-600">Dapatkan diskon 10% untuk setiap pembelian makanan dan minuman</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-orange-200">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Gift className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-orange-700 mb-1">Bonus Ulang Tahun</h5>
                      <p className="text-sm text-gray-600">Nikmati hidangan spesial gratis di bulan ulang tahun Anda</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-orange-200">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Star className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-orange-700 mb-1">Akses Menu Eksklusif</h5>
                      <p className="text-sm text-gray-600">Cicipi hidangan khusus yang hanya tersedia untuk member</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-orange-200">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-orange-700 mb-1">Prioritas Reservasi</h5>
                      <p className="text-sm text-gray-600">Dapatkan prioritas dalam pemesanan meja saat weekend dan hari libur</p>
                    </div>
                  </div>
                </div>
                
                {/* Additional Benefits */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-600">Event kuliner eksklusif</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-600">Update menu terbaru</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-600">Undangan acara spesial</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-600">Kartu member fisik</span>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-orange-600 text-white rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Crown className="w-4 h-4" />
                    <span className="font-semibold">Pendaftaran Gratis!</span>
                  </div>
                  <p className="text-sm">
                    Bergabung sekarang tanpa biaya pendaftaran. Kartu member akan dikirim dalam 3-5 hari kerja.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-white rounded-2xl shadow-lg border border-orange-100 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 md:p-8">
              <div className="flex items-center justify-center gap-3 text-white">
                <Star className="w-6 h-6" />
                <h4 className="text-xl md:text-2xl font-serif">Become a Member</h4>
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
                  placeholder="Masukkan nama lengkap sesuai KTP"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Email Field */}
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                  <Mail className="w-4 h-4 text-orange-600" />
                  Email
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="contoh@email.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
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
                  placeholder="Contoh: 08123456789"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              {/* Birth Date Field */}
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                  <Calendar className="w-4 h-4 text-orange-600" />
                  Tanggal Lahir
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  max={maxDate}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                    errors.birthDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.birthDate && <p className="text-red-500 text-sm mt-1">{errors.birthDate}</p>}
              </div>

              {/* Address Field */}
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                  <User className="w-4 h-4 text-orange-600" />
                  Alamat Lengkap
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="3"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors resize-none ${
                    errors.address ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Masukkan alamat lengkap untuk pengiriman kartu member"
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>

              {/* Referral Code Field */}
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                  <Gift className="w-4 h-4 text-orange-600" />
                  Kode Referral (Opsional)
                </label>
                <input
                  type="text"
                  name="referralCode"
                  value={formData.referralCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  placeholder="Masukkan kode referral jika ada"
                />
                <p className="text-xs text-gray-500 mt-1">Dapatkan bonus khusus dengan kode referral dari teman!</p>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-3"
                >
                  <Star className="w-5 h-5" />
                  Daftar Member via WhatsApp
                </button>
                <p className="text-sm text-gray-500 text-center mt-3">
                  * Field wajib diisi. Pendaftaran akan diproses melalui WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipForm;