'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Calendar, Users, Utensils, Clock } from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalReservations: 0,
    totalUsers: 0,
    totalMenuItems: 0,
    pendingReservations: 0,
    todayReservations: 0
  })
  const [loading, setLoading] = useState(true)
  const [recentReservations, setRecentReservations] = useState<any[]>([])

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // ✅ Get counts from Supabase
      const { count: reservations } = await supabase
        .from('reservations')
        .select('*', { count: 'exact', head: true })
      
      const { count: users } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })
      
      const { count: menuItems } = await supabase
        .from('menu_items')
        .select('*', { count: 'exact', head: true })
      
      const { count: pending } = await supabase
        .from('reservations')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'PENDING')
      
      const { count: today } = await supabase
        .from('reservations')
        .select('*', { count: 'exact', head: true })
        .eq('date', new Date().toISOString().split('T')[0])

      // ✅ Get recent reservations
      const { data: recent } = await supabase
        .from('reservations')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)

      setStats({
        totalReservations: reservations || 0,
        totalUsers: users || 0,
        totalMenuItems: menuItems || 0,
        pendingReservations: pending || 0,
        todayReservations: today || 0
      })
      setRecentReservations(recent || [])
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#7B2D6E] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const cards = [
    { label: 'Réservations totales', value: stats.totalReservations, icon: Calendar, color: 'text-[#7B2D6E]' },
    { label: 'Utilisateurs', value: stats.totalUsers, icon: Users, color: 'text-[#4A7C59]' },
    { label: 'Plats au menu', value: stats.totalMenuItems, icon: Utensils, color: 'text-[#C9A96E]' },
    { label: 'En attente', value: stats.pendingReservations, icon: Clock, color: 'text-[#E67E22]' }
  ]

  return (
    <div>
      <h1 className="text-3xl font-serif text-[#2D1B2E] mb-6">Tableau de bord</h1>
      <p className="text-[#4A4A4A] mb-8">Bienvenue dans votre espace d&apos;administration</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => {
          const Icon = card.icon
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-[#C9A96E]/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#4A4A4A]">{card.label}</p>
                  <p className="text-2xl font-serif text-[#2D1B2E] mt-1">{card.value}</p>
                </div>
                <div className={`p-3 rounded-full bg-[#FDF8F0] ${card.color}`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Reservations */}
      {recentReservations.length > 0 && (
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-[#C9A96E]/10 p-6">
          <h2 className="text-lg font-serif text-[#2D1B2E] mb-4">Réservations récentes</h2>
          <div className="space-y-2">
            {recentReservations.map((res) => (
              <div key={res.id} className="flex justify-between items-center p-3 bg-[#FDF8F0] rounded-lg">
                <div>
                  <p className="font-medium text-[#2D1B2E]">{res.name}</p>
                  <p className="text-sm text-[#4A4A4A]">{res.date} à {res.time} • {res.guests} personnes</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  res.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                  res.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                  res.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {res.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}