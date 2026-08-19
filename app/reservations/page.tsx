'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Calendar, Users, Phone, Mail, User, MessageSquare, Clock, CheckCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function ReservationsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    specialRequests: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    console.log('📝 Sending reservation:', formData)

    try {
      const { data, error } = await supabase
        .from('reservations')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null,
            date: formData.date,
            time: formData.time,
            guests: parseInt(formData.guests),
            special_requests: formData.specialRequests || null,
            status: 'PENDING'
          }
        ])
        .select()

      if (error) {
        console.error('❌ Supabase error:', error)
        throw error
      }

      console.log('✅ Reservation saved:', data)
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 5000)
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: '2',
        specialRequests: '',
      })
      
    } catch (err: any) {
      console.error('❌ Error:', err)
      setError(err.message || 'Erreur lors de la réservation')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen py-32 bg-gradient-to-br from-[#FDF8F0] to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-[#2D1B2E] text-center mb-4">
            Réservations
          </h1>
          <p className="text-lg md:text-xl text-[#4A4A4A] text-center max-w-2xl mx-auto">
            Réservez votre table pour une expérience culinaire inoubliable
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-8 rounded-2xl shadow-xl border border-[#C9A96E]/10"
        >
          {submitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-serif text-[#2D1B2E] mb-2">Réservation confirmée !</h3>
              <p className="text-[#4A4A4A]">
                Vous recevrez une confirmation par email dans les prochaines minutes.
              </p>
              <p className="text-sm text-[#4A4A4A]/60 mt-4">
                📍 25 avenue Ernest-Renan, 22300 Lannion
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#2C2C2C] mb-2 flex items-center gap-2">
                    <Calendar size={18} className="text-[#7B2D6E]" /> Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#7B2D6E] focus:outline-none focus:ring-2 focus:ring-[#7B2D6E]/20 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2C2C2C] mb-2 flex items-center gap-2">
                    <Clock size={18} className="text-[#7B2D6E]" /> Heure *
                  </label>
                  <select
                    name="time"
                    required
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#7B2D6E] focus:outline-none focus:ring-2 focus:ring-[#7B2D6E]/20 transition"
                  >
                    <option value="">Sélectionnez une heure</option>
                    <option value="12:00">12:00</option>
                    <option value="12:30">12:30</option>
                    <option value="13:00">13:00</option>
                    <option value="13:30">13:30</option>
                    <option value="19:00">19:00</option>
                    <option value="19:30">19:30</option>
                    <option value="20:00">20:00</option>
                    <option value="20:30">20:30</option>
                    <option value="21:00">21:00</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2C2C2C] mb-2 flex items-center gap-2">
                    <Users size={18} className="text-[#7B2D6E]" /> Personnes *
                  </label>
                  <select
                    name="guests"
                    required
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#7B2D6E] focus:outline-none focus:ring-2 focus:ring-[#7B2D6E]/20 transition"
                  >
                    {[1,2,3,4,5,6,7,8].map(n => (
                      <option key={n} value={n}>{n} personne{n > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2C2C2C] mb-2 flex items-center gap-2">
                    <User size={18} className="text-[#7B2D6E]" /> Nom complet *
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
                  <label className="block text-sm font-medium text-[#2C2C2C] mb-2 flex items-center gap-2">
                    <Mail size={18} className="text-[#7B2D6E]" /> Email *
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
                  <label className="block text-sm font-medium text-[#2C2C2C] mb-2 flex items-center gap-2">
                    <Phone size={18} className="text-[#7B2D6E]" /> Téléphone
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

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#2C2C2C] mb-2 flex items-center gap-2">
                    <MessageSquare size={18} className="text-[#7B2D6E]" /> Demande particulière
                  </label>
                  <textarea
                    name="specialRequests"
                    rows={4}
                    placeholder="Allergies, anniversaire, préférences de table, etc."
                    value={formData.specialRequests}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#7B2D6E] focus:outline-none focus:ring-2 focus:ring-[#7B2D6E]/20 transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full mt-6 bg-[#7B2D6E] hover:bg-[#5C1F52] text-white px-8 py-4 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    En cours...
                  </>
                ) : (
                  <>
                    <CheckCircle size={20} />
                    Réserver maintenant
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>

        {/* Info note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center text-sm text-[#4A4A4A]/60 space-y-1"
        >
          <p>📧 Une confirmation vous sera envoyée par email</p>
          <p>🔄 Modifiable jusqu&apos;à 24h avant la réservation</p>
          <p>🅿️ Parking gratuit du Stanco à 100m</p>
        </motion.div>
      </div>
    </div>
  )
}