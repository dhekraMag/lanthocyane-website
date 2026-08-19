'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Check, X, Clock, RefreshCw } from 'lucide-react'

interface Reservation {
  id: string
  name: string
  email: string
  phone: string
  date: string
  time: string
  guests: number
  status: string
  created_at: string
}

export default function AdminReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState('all')
  const [updating, setUpdating] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // ✅ Function to load reservations
  const loadReservations = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setReservations(data || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // ✅ Load on page load
  useEffect(() => {
    loadReservations()
  }, [])

  // ✅ Update status
  const updateStatus = async (id: string, status: string) => {
    setUpdating(id)
    try {
      const { error } = await supabase
        .from('reservations')
        .update({ status })
        .eq('id', id)

      if (error) throw error
      setSuccess('Status mis à jour!')
      await loadReservations()
      setTimeout(() => setSuccess(null), 3000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setUpdating(null)
    }
  }

  // ✅ Refresh function
  const handleRefresh = () => {
    console.log('🔄 Refreshing reservations...')
    loadReservations()
  }

  const getFilteredData = () => {
    if (filter === 'all') return reservations
    return reservations.filter(r => r.status === filter.toUpperCase())
  }

  const filteredData = getFilteredData()
  const counts = {
    all: reservations.length,
    pending: reservations.filter(r => r.status === 'PENDING').length,
    confirmed: reservations.filter(r => r.status === 'CONFIRMED').length,
    cancelled: reservations.filter(r => r.status === 'CANCELLED').length,
    completed: reservations.filter(r => r.status === 'COMPLETED').length,
  }

  const getBadge = (status: string) => {
    const colors: any = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      CONFIRMED: 'bg-green-100 text-green-800',
      CANCELLED: 'bg-red-100 text-red-800',
      COMPLETED: 'bg-blue-100 text-blue-800'
    }
    const labels: any = {
      PENDING: 'En attente',
      CONFIRMED: 'Confirmée',
      CANCELLED: 'Annulée',
      COMPLETED: 'Terminée'
    }
    return {
      color: colors[status] || 'bg-gray-100',
      label: labels[status] || status
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#7B2D6E] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-serif text-[#2D1B2E]">Réservations</h1>
          <p className="text-[#4A4A4A]">{reservations.length} total</p>
        </div>
        <button
          onClick={handleRefresh}
          className="bg-[#7B2D6E] text-white px-4 py-2 rounded-lg hover:bg-[#5C1F52] transition flex items-center gap-2"
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          Rafraîchir
        </button>
      </div>

      {success && (
        <div className="bg-green-50 text-green-600 px-4 py-2 rounded-lg mb-4">
          ✅ {success}
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg mb-4">
          ❌ {error}
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {[
          { key: 'all', label: 'Toutes' },
          { key: 'pending', label: 'En attente' },
          { key: 'confirmed', label: 'Confirmées' },
          { key: 'cancelled', label: 'Annulées' },
          { key: 'completed', label: 'Terminées' },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              filter === f.key
                ? 'bg-[#7B2D6E] text-white'
                : 'bg-white border border-gray-200 hover:border-[#7B2D6E]'
            }`}
          >
            {f.label} ({counts[f.key as keyof typeof counts] || 0})
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-left text-sm font-medium">Client</th>
              <th className="p-4 text-left text-sm font-medium">Date</th>
              <th className="p-4 text-left text-sm font-medium">Personnes</th>
              <th className="p-4 text-left text-sm font-medium">Statut</th>
              <th className="p-4 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">
                  Aucune réservation
                </td>
              </tr>
            ) : (
              filteredData.map((r) => {
                const badge = getBadge(r.status)
                return (
                  <tr key={r.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="font-medium">{r.name}</div>
                      <div className="text-sm text-gray-500">{r.email}</div>
                    </td>
                    <td className="p-4">
                      <div>{new Date(r.date).toLocaleDateString('fr-FR')}</div>
                      <div className="text-sm text-gray-500">{r.time}</div>
                    </td>
                    <td className="p-4">{r.guests}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${badge.color}`}>
                        {badge.label}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        {r.status === 'PENDING' && (
                          <>
                            <button
                              onClick={() => updateStatus(r.id, 'CONFIRMED')}
                              disabled={updating === r.id}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                            >
                              <Check size={18} />
                            </button>
                            <button
                              onClick={() => updateStatus(r.id, 'CANCELLED')}
                              disabled={updating === r.id}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            >
                              <X size={18} />
                            </button>
                          </>
                        )}
                        {r.status === 'CONFIRMED' && (
                          <button
                            onClick={() => updateStatus(r.id, 'COMPLETED')}
                            disabled={updating === r.id}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          >
                            <Clock size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}