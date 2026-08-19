'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Save, Clock, Users, MapPin,  RefreshCw } from 'lucide-react'

interface Settings {
  id?: string
  restaurant_name: string
  address: string
  phone: string
  email: string
  lunch_start: string
  lunch_end: string
  dinner_start: string
  dinner_end: string
  max_guests: number
  reservation_buffer: number
  closed_days: string
}

export default function AdminSettings() {
  const [settings, setSettings] = useState<Settings>({
    restaurant_name: "L'Anthocyane",
    address: '25 avenue Ernest-Renan, 22300 Lannion',
    phone: '02 96 38 30 49',
    email: 'contact@lanthocyane.com',
    lunch_start: '12:00',
    lunch_end: '14:00',
    dinner_start: '19:00',
    dinner_end: '21:00',
    max_guests: 20,
    reservation_buffer: 30,
    closed_days: 'Lundi, Mardi'
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadSettings = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .maybeSingle()

      if (error && error.code !== 'PGRST116') throw error
      
      if (data) {
        setSettings(data)
      }
    } catch (err: any) {
      console.error('Error loading settings:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSettings()
  }, [])

  const handleRefresh = () => {
    console.log('🔄 Refreshing settings...')
    loadSettings()
  }

  const handleSave = async () => {
    setSaving(true)
    setSaved(false)
    setError(null)
    
    try {
      const { data: existing, error: checkError } = await supabase
        .from('settings')
        .select('id')
        .maybeSingle()

      if (checkError && checkError.code !== 'PGRST116') throw checkError

      let result
      if (existing) {
        result = await supabase
          .from('settings')
          .update({
            restaurant_name: settings.restaurant_name,
            address: settings.address,
            phone: settings.phone,
            email: settings.email,
            lunch_start: settings.lunch_start,
            lunch_end: settings.lunch_end,
            dinner_start: settings.dinner_start,
            dinner_end: settings.dinner_end,
            max_guests: settings.max_guests,
            reservation_buffer: settings.reservation_buffer,
            closed_days: settings.closed_days,
            updated_at: new Date().toISOString()
          })
          .eq('id', existing.id)
      } else {
        result = await supabase
          .from('settings')
          .insert([{
            restaurant_name: settings.restaurant_name,
            address: settings.address,
            phone: settings.phone,
            email: settings.email,
            lunch_start: settings.lunch_start,
            lunch_end: settings.lunch_end,
            dinner_start: settings.dinner_start,
            dinner_end: settings.dinner_end,
            max_guests: settings.max_guests,
            reservation_buffer: settings.reservation_buffer,
            closed_days: settings.closed_days,
          }])
      }

      if (result.error) throw result.error

      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err: any) {
      setError(err.message || 'Erreur lors de l\'enregistrement')
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setSettings(prev => ({ ...prev, [name]: value }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#7B2D6E] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-serif text-[#2D1B2E]">Paramètres</h1>
          <p className="text-[#4A4A4A]">Configurez votre restaurant</p>
        </div>
        <button
          onClick={handleRefresh}
          className="bg-[#7B2D6E] text-white px-4 py-2 rounded-lg hover:bg-[#5C1F52] transition flex items-center gap-2"
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          Rafraîchir
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg mb-4">
          ❌ {error}
        </div>
      )}

      {saved && (
        <div className="bg-green-50 text-green-600 px-4 py-2 rounded-lg mb-4">
          ✅ Paramètres enregistrés !
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border p-6 space-y-8">
        {/* Restaurant Info */}
        <div>
          <h2 className="text-lg font-serif mb-4 flex items-center gap-2">
            <MapPin size={20} className="text-[#7B2D6E]" />
            Informations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nom</label>
              <input
                type="text"
                name="restaurant_name"
                value={settings.restaurant_name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border focus:border-[#7B2D6E] outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Adresse</label>
              <input
                type="text"
                name="address"
                value={settings.address}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border focus:border-[#7B2D6E] outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Téléphone</label>
              <input
                type="text"
                name="phone"
                value={settings.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border focus:border-[#7B2D6E] outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border focus:border-[#7B2D6E] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Hours */}
        <div className="pt-6 border-t">
          <h2 className="text-lg font-serif mb-4 flex items-center gap-2">
            <Clock size={20} className="text-[#7B2D6E]" />
            Horaires
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Déjeuner - Début</label>
              <input
                type="time"
                name="lunch_start"
                value={settings.lunch_start}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border focus:border-[#7B2D6E] outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Déjeuner - Fin</label>
              <input
                type="time"
                name="lunch_end"
                value={settings.lunch_end}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border focus:border-[#7B2D6E] outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Dîner - Début</label>
              <input
                type="time"
                name="dinner_start"
                value={settings.dinner_start}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border focus:border-[#7B2D6E] outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Dîner - Fin</label>
              <input
                type="time"
                name="dinner_end"
                value={settings.dinner_end}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border focus:border-[#7B2D6E] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Reservation Settings */}
        <div className="pt-6 border-t">
          <h2 className="text-lg font-serif mb-4 flex items-center gap-2">
            <Users size={20} className="text-[#7B2D6E]" />
            Réservations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Max personnes</label>
              <input
                type="number"
                name="max_guests"
                value={settings.max_guests}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border focus:border-[#7B2D6E] outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Délai (minutes)</label>
              <input
                type="number"
                name="reservation_buffer"
                value={settings.reservation_buffer}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border focus:border-[#7B2D6E] outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Jours fermés</label>
              <input
                type="text"
                name="closed_days"
                value={settings.closed_days}
                onChange={handleChange}
                placeholder="Lundi, Mardi"
                className="w-full px-4 py-2 rounded-lg border focus:border-[#7B2D6E] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-6 border-t flex items-center gap-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-[#7B2D6E] text-white px-6 py-3 rounded-full hover:bg-[#5C1F52] transition disabled:opacity-50 flex items-center gap-2"
          >
            <Save size={18} />
            {saving ? 'Enregistrement...' : 'Enregistrer'}
          </button>
          {saved && <span className="text-green-600">✅ Enregistré !</span>}
        </div>
      </div>
    </div>
  )
}