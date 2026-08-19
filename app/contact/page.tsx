'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsLoading(false)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen py-32 bg-gradient-to-br from-[#FDF8F0] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-[#2D1B2E] text-center mb-4">
            Contact &amp; Accès
          </h1>
          <p className="text-lg md:text-xl text-[#4A4A4A] text-center max-w-2xl mx-auto">
            Nous sommes à votre disposition pour toute question ou réservation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-[#C9A96E]/10">
              <h2 className="text-2xl font-serif text-[#2D1B2E] mb-6">Informations</h2>

              <div className="space-y-5">
                {/* Address */}
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#FDF8F0] transition">
                  <MapPin className="text-[#7B2D6E] mt-1 flex-shrink-0" size={22} />
                  <div>
                    <p className="font-medium text-[#2D1B2E]">Adresse</p>
                    <p className="text-[#4A4A4A]">25 avenue Ernest-Renan</p>
                    <p className="text-[#4A4A4A]">22300 Lannion</p>
                    <a 
                      href="https://www.google.com/maps/place/L'Anthocyane/@48.7330224,-3.459998,17z"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#7B2D6E] hover:text-[#5C1F52] transition inline-block mt-1"
                    >
                      Ouvrir dans Google Maps →
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#FDF8F0] transition">
                  <Phone className="text-[#7B2D6E] mt-1 flex-shrink-0" size={22} />
                  <div>
                    <p className="font-medium text-[#2D1B2E]">Téléphone</p>
                    <a href="tel:+33296383049" className="text-[#7B2D6E] hover:text-[#5C1F52] transition text-lg font-medium">
                      02 96 38 30 49
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#FDF8F0] transition">
                  <Mail className="text-[#7B2D6E] mt-1 flex-shrink-0" size={22} />
                  <div>
                    <p className="font-medium text-[#2D1B2E]">Email</p>
                    <a href="mailto:contact@lanthocyane.com" className="text-[#7B2D6E] hover:text-[#5C1F52] transition">
                      contact@lanthocyane.com
                    </a>
                  </div>
                </div>

                {/* Opening Hours - UPDATED */}
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#FDF8F0] transition">
                  <Clock className="text-[#7B2D6E] mt-1 flex-shrink-0" size={22} />
                  <div>
                    <p className="font-medium text-[#2D1B2E]">Horaires</p>
                    <div className="text-[#4A4A4A] space-y-1">
                      <p className="flex justify-between gap-8">
                        <span>Mercredi - Samedi</span>
                        <span className="text-[#7B2D6E] font-medium">12:00 - 14:00</span>
                      </p>
                      <p className="flex justify-between gap-8">
                        <span>Mercredi - Samedi</span>
                        <span className="text-[#7B2D6E] font-medium">19:00 - 21:00</span>
                      </p>
                      <p className="flex justify-between gap-8">
                        <span>Dimanche</span>
                        <span className="text-[#7B2D6E] font-medium">12:00 - 14:00</span>
                      </p>
                      <p className="flex justify-between gap-8 text-sm text-[#4A4A4A]/60">
                        <span>Lundi - Mardi</span>
                        <span>Fermé</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Parking Info */}
              <div className="mt-6 p-4 bg-[#C9A96E]/10 rounded-lg border border-[#C9A96E]/20">
                <p className="text-sm text-[#2D1B2E] flex items-center gap-2">
                  🅿️ Parking gratuit du Stanco à 100m
                </p>
              </div>

              {/* Facebook Link */}
              <div className="mt-6 pt-6 border-t border-[#C9A96E]/20">
                <p className="text-center text-sm text-[#4A4A4A] mb-3">Suivez-nous sur Facebook</p>
                <div className="flex justify-center">
                  <a 
                    href="https://www.facebook.com/lanthocyane"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#1877F2] text-white rounded-full hover:bg-[#0d65d9] transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                    aria-label="Facebook"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span className="font-medium">Facebook</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-[#C9A96E]/10">
              <h2 className="text-2xl font-serif text-[#2D1B2E] mb-6">Envoyez-nous un message</h2>

              {submitted ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-xl font-serif text-[#2D1B2E] mb-2">Message envoyé !</h3>
                  <p className="text-[#4A4A4A]">
                    Nous vous répondrons dans les plus brefs délais.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Votre nom"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#7B2D6E] focus:outline-none focus:ring-2 focus:ring-[#7B2D6E]/20 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="email@exemple.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#7B2D6E] focus:outline-none focus:ring-2 focus:ring-[#7B2D6E]/20 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="06 12 34 56 78"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#7B2D6E] focus:outline-none focus:ring-2 focus:ring-[#7B2D6E]/20 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        placeholder="Votre message..."
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#7B2D6E] focus:outline-none focus:ring-2 focus:ring-[#7B2D6E]/20 transition"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full bg-[#7B2D6E] hover:bg-[#5C1F52] text-white px-8 py-4 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 ${
                        isLoading ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          Envoyer le message
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* Google Maps Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-white rounded-2xl shadow-sm overflow-hidden border border-[#C9A96E]/10"
        >
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-xl font-serif text-[#2D1B2E] flex items-center gap-2">
              <MapPin className="text-[#7B2D6E]" size={20} />
              Nous trouver
            </h3>
            <a 
              href="https://www.google.com/maps/place/L'Anthocyane/@48.7330224,-3.459998,17z"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#7B2D6E] hover:text-[#5C1F52] transition"
            >
              Voir en grand →
            </a>
          </div>
          <div className="relative w-full" style={{ height: '400px' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2650.836531099461!2d-3.459998!3d48.7330224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48122beeb662f921%3A0xd4a3521b88aba9bf!2sL'Anthocyane!5e0!3m2!1sfr!2sfr!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="L'Anthocyane - Google Maps"
              className="absolute inset-0"
            />
          </div>
          <div className="p-4 bg-gray-50 text-sm text-[#4A4A4A] text-center border-t border-gray-100">
            <p>📍 25 avenue Ernest-Renan, 22300 Lannion • 🅿️ Parking gratuit du Stanco à 100m</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}