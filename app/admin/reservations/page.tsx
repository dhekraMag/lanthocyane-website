'use client'

import { useState, useEffect } from 'react'
import { Check, X, Clock, RefreshCw, Trash2 } from 'lucide-react'

type Reservation = {
  id: string
  userId: string | null
  name: string
  email: string
  phone: string | null
  date: string
  time: string
  guests: number
  specialRequests: string | null
  status: string
  createdAt: string
  updatedAt: string
  tableId: string | null
  user: { name: string } | null
  table: { number: number } | null
}

type StatusUpdate = {
  id: string
  status: string
}

export default function AdminReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    fetchReservations()
  }, [])

  const fetchReservations = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/reservations')
      const data = await response.json()
      setReservations(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching reservations:', error)
      setReservations([])
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id)
    setMessage(null)
    try {
      const response = await fetch('/api/reservations', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      })
      if (response.ok) {
        setMessage({ type: 'success', text: 'Statut mis à jour avec succès' })
        fetchReservations()
      } else {
        setMessage({ type: 'error', text: 'Erreur lors de la mise à jour' })
      }
    } catch (error) {
      console.error('Error updating reservation:', error)
      setMessage({ type: 'error', text: 'Erreur lors de la mise à jour' })
    } finally {
      setUpdating(null)
    }
  }

  const deleteReservation = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) return
    
    try {
      const response = await fetch(`/api/reservations?id=${id}`, { method: 'DELETE' })
      if (response.ok) {
        setMessage({ type: 'success', text: 'Réservation supprimée' })
        fetchReservations()
      } else {
        setMessage({ type: 'error', text: 'Erreur lors de la suppression' })
      }
    } catch (error) {
      console.error('Error deleting reservation:', error)
      setMessage({ type: 'error', text: 'Erreur lors de la suppression' })
    }
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      CONFIRMED: 'bg-green-100 text-green-800',
      CANCELLED: 'bg-red-100 text-red-800',
      COMPLETED: 'bg-blue-100 text-blue-800',
      NO_SHOW: 'bg-gray-100 text-gray-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      PENDING: 'En attente',
      CONFIRMED: 'Confirmée',
      CANCELLED: 'Annulée',
      COMPLETED: 'Terminée',
      NO_SHOW: 'Absent',
    }
    return labels[status] || status
  }

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="font-playfair text-2xl text-[#2C2C2C]">Réservations</h1>
        <button
          onClick={fetchReservations}
          className="flex items-center gap-2 px-4 py-2 bg-[#7B2D6E] text-white rounded-lg hover:bg-[#6B255E] transition-colors"
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          Actualiser
        </button>
      </div>

      {message && (
        <div
          className={`mb-4 p-3 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {message.text}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <RefreshCw size={32} className="animate-spin text-[#7B2D6E]" />
        </div>
      ) : reservations.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-[#E8DDD0]">
          <p className="text-[#5C5C5C]">Aucune réservation pour le moment</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-[#E8DDD0] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F5EDE6]">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-[#5C5C5C]">Client</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-[#5C5C5C]">Date & Heure</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-[#5C5C5C]">Personnes</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-[#5C5C5C]">Table</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-[#5C5C5C]">Statut</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-[#5C5C5C]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8DDD0]">
                {reservations.map((reservation) => (
                  <tr key={reservation.id} className="hover:bg-[#FDF8F0] transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-[#2C2C2C]">{reservation.name}</div>
                      <div className="text-sm text-[#5C5C5C]">{reservation.email}</div>
                      {reservation.phone && (
                        <div className="text-xs text-[#5C5C5C]">{reservation.phone}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div>{new Date(reservation.date).toLocaleDateString('fr-FR')}</div>
                      <div className="text-sm text-[#5C5C5C]">{reservation.time}</div>
                    </td>
                    <td className="px-6 py-4">{reservation.guests}</td>
                    <td className="px-6 py-4">
                      {reservation.table ? `Table ${reservation.table.number}` : 'Non assignée'}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          reservation.status
                        )}`}
                      >
                        {getStatusLabel(reservation.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2 flex-wrap">
                        {reservation.status === 'PENDING' && (
                          <>
                            <button
                              onClick={() => updateStatus(reservation.id, 'CONFIRMED')}
                              disabled={updating === reservation.id}
                              className="p-1.5 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors disabled:opacity-50"
                              title="Confirmer"
                            >
                              <Check size={18} />
                            </button>
                            <button
                              onClick={() => updateStatus(reservation.id, 'CANCELLED')}
                              disabled={updating === reservation.id}
                              className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50"
                              title="Annuler"
                            >
                              <X size={18} />
                            </button>
                          </>
                        )}
                        {reservation.status === 'CONFIRMED' && (
                          <>
                            <button
                              onClick={() => updateStatus(reservation.id, 'COMPLETED')}
                              disabled={updating === reservation.id}
                              className="p-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors disabled:opacity-50"
                              title="Marquer comme terminée"
                            >
                              <Clock size={18} />
                            </button>
                            <button
                              onClick={() => updateStatus(reservation.id, 'CANCELLED')}
                              disabled={updating === reservation.id}
                              className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50"
                              title="Annuler"
                            >
                              <X size={18} />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => deleteReservation(reservation.id)}
                          disabled={updating === reservation.id}
                          className="p-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                          title="Supprimer"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}