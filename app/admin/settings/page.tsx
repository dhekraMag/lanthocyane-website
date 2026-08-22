'use client'

import { useState, useEffect } from 'react'
import { Save, Clock, Users, MapPin, RefreshCw, Phone, Mail, Calendar } from 'lucide-react'

type SettingsData = {
  id: string
  restaurantName: string
  address: string
  phone: string
  email: string
  lunchStart: string
  lunchEnd: string
  dinnerStart: string
  dinnerEnd: string
  maxGuests: number
  reservationBuffer: number
  closedDays: string
}

export default function AdminSettings() {
  const [settings, setSettings] = useState<SettingsData>({
    id: '',
    restaurantName: "L'Anthocyane",
    address: '25 avenue Ernest-Renan, 22300 Lannion',
    phone: '02 96 38 30 49',
    email: 'contact@lanthocyane.com',
    lunchStart: '12:00',
    lunchEnd: '14:00',
    dinnerStart: '19:00',
    dinnerEnd: '21:00',
    maxGuests: 20,
    reservationBuffer: 30,
    closedDays: 'Lundi, Mardi',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/settings')
      if (!response.ok) throw new Error('Failed to fetch')
      const data = await response.json()
      
      if (Array.isArray(data) && data.length > 0) {
        const s = data[0]
        setSettings({
          id: s.id || '',
          restaurantName: s.restaurantName || s.restaurant_name || settings.restaurantName,
          address: s.address || settings.address,
          phone: s.phone || settings.phone,
          email: s.email || settings.email,
          lunchStart: s.lunchStart || s.lunch_start || settings.lunchStart,
          lunchEnd: s.lunchEnd || s.lunch_end || settings.lunchEnd,
          dinnerStart: s.dinnerStart || s.dinner_start || settings.dinnerStart,
          dinnerEnd: s.dinnerEnd || s.dinner_end || settings.dinnerEnd,
          maxGuests: s.maxGuests || s.max_guests || settings.maxGuests,
          reservationBuffer: s.reservationBuffer || s.reservation_buffer || settings.reservationBuffer,
          closedDays: s.closedDays || s.closed_days || settings.closedDays,
        })
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
      setMessage('❌ Erreur de chargement')
    } finally {
      setLoading(false)
    }
  }

  const saveSettings = async () => {
    setSaving(true)
    setMessage(null)
    
    try {
      const settingsToSave = [
        { key: 'restaurant_name', value: settings.restaurantName },
        { key: 'address', value: settings.address },
        { key: 'phone', value: settings.phone },
        { key: 'email', value: settings.email },
        { key: 'lunch_start', value: settings.lunchStart },
        { key: 'lunch_end', value: settings.lunchEnd },
        { key: 'dinner_start', value: settings.dinnerStart },
        { key: 'dinner_end', value: settings.dinnerEnd },
        { key: 'max_guests', value: String(settings.maxGuests) },
        { key: 'reservation_buffer', value: String(settings.reservationBuffer) },
        { key: 'closed_days', value: settings.closedDays },
      ]

      for (const item of settingsToSave) {
        const response = await fetch('/api/settings', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item),
        })
        if (!response.ok) {
          throw new Error(`Failed to save ${item.key}`)
        }
      }

      setMessage('✅ Paramètres sauvegardés avec succès !')
      await fetchSettings()
    } catch (error) {
      console.error('Error saving settings:', error)
      setMessage('❌ Erreur lors de la sauvegarde')
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSettings(prev => ({ ...prev, [name]: value }))
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <RefreshCw size={32} className="animate-spin text-[#7B2D6E]" />
      </div>
    )
  }

  return (
    <div className="p-6 max-w-3xl mx-auto pt-20">
      {/* Floating Save Button - Always visible */}
      <div className="fixed top-16 right-8 z-50">
        <button
          onClick={saveSettings}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-[#7B2D6E] text-white rounded-xl hover:bg-[#6B255E] transition-colors disabled:opacity-50 shadow-lg"
        >
          <Save size={20} className={saving ? 'animate-pulse' : ''} />
          {saving ? 'Sauvegarde...' : '💾 Enregistrer'}
        </button>
      </div>

      {message && (
        <div
          className={`mb-4 p-4 rounded-lg ${
            message.includes('✅')
              ? 'bg-green-100 text-green-800 border border-green-300'
              : 'bg-red-100 text-red-800 border border-red-300'
          }`}
        >
          {message}
        </div>
      )}

      <div className="space-y-5 bg-white rounded-xl shadow-sm border border-[#E8DDD0] p-6">
        {/* General Info */}
        <div className="border-b border-[#E8DDD0] pb-4">
          <h2 className="font-playfair text-lg text-[#2C2C2C] mb-4">Informations générales</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#2C2C2C] mb-1">
                <MapPin size={16} className="inline mr-2 text-[#7B2D6E]" /> Nom du Restaurant
              </label>
              <input
                type="text"
                name="restaurantName"
                value={settings.restaurantName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#E8DDD0] rounded-lg focus:ring-2 focus:ring-[#7B2D6E] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2C2C2C] mb-1">
                <MapPin size={16} className="inline mr-2 text-[#7B2D6E]" /> Adresse
              </label>
              <input
                type="text"
                name="address"
                value={settings.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#E8DDD0] rounded-lg focus:ring-2 focus:ring-[#7B2D6E] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2C2C2C] mb-1">
                <Phone size={16} className="inline mr-2 text-[#7B2D6E]" /> Téléphone
              </label>
              <input
                type="text"
                name="phone"
                value={settings.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#E8DDD0] rounded-lg focus:ring-2 focus:ring-[#7B2D6E] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2C2C2C] mb-1">
                <Mail size={16} className="inline mr-2 text-[#7B2D6E]" /> Email
              </label>
              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#E8DDD0] rounded-lg focus:ring-2 focus:ring-[#7B2D6E] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Opening Hours */}
        <div className="border-b border-[#E8DDD0] pb-4">
          <h2 className="font-playfair text-lg text-[#2C2C2C] mb-4">
            <Clock size={18} className="inline mr-2 text-[#7B2D6E]" /> Horaires d&apos;ouverture
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#2C2C2C] mb-1">Déjeuner début</label>
              <input
                type="time"
                name="lunchStart"
                value={settings.lunchStart}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#E8DDD0] rounded-lg focus:ring-2 focus:ring-[#7B2D6E] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2C2C2C] mb-1">Déjeuner fin</label>
              <input
                type="time"
                name="lunchEnd"
                value={settings.lunchEnd}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#E8DDD0] rounded-lg focus:ring-2 focus:ring-[#7B2D6E] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2C2C2C] mb-1">Dîner début</label>
              <input
                type="time"
                name="dinnerStart"
                value={settings.dinnerStart}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#E8DDD0] rounded-lg focus:ring-2 focus:ring-[#7B2D6E] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2C2C2C] mb-1">Dîner fin</label>
              <input
                type="time"
                name="dinnerEnd"
                value={settings.dinnerEnd}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#E8DDD0] rounded-lg focus:ring-2 focus:ring-[#7B2D6E] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Reservations */}
        <div>
          <h2 className="font-playfair text-lg text-[#2C2C2C] mb-4">
            <Users size={18} className="inline mr-2 text-[#7B2D6E]" /> Réservations
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#2C2C2C] mb-1">
                Nombre max de personnes
              </label>
              <input
                type="number"
                name="maxGuests"
                value={settings.maxGuests}
                onChange={(e) => setSettings(prev => ({ ...prev, maxGuests: parseInt(e.target.value) || 8 }))}
                min="1"
                max="50"
                className="w-full px-4 py-2 border border-[#E8DDD0] rounded-lg focus:ring-2 focus:ring-[#7B2D6E] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2C2C2C] mb-1">
                Temps tampon (minutes)
              </label>
              <input
                type="number"
                name="reservationBuffer"
                value={settings.reservationBuffer}
                onChange={(e) => setSettings(prev => ({ ...prev, reservationBuffer: parseInt(e.target.value) || 30 }))}
                min="0"
                max="120"
                className="w-full px-4 py-2 border border-[#E8DDD0] rounded-lg focus:ring-2 focus:ring-[#7B2D6E] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2C2C2C] mb-1">
                <Calendar size={16} className="inline mr-2 text-[#7B2D6E]" /> Jours de fermeture
              </label>
              <input
                type="text"
                name="closedDays"
                value={settings.closedDays}
                onChange={handleChange}
                placeholder="Ex: Lundi, Mardi"
                className="w-full px-4 py-2 border border-[#E8DDD0] rounded-lg focus:ring-2 focus:ring-[#7B2D6E] focus:border-transparent"
              />
              <p className="text-xs text-[#5C5C5C] mt-1">Séparez les jours par des virgules</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}