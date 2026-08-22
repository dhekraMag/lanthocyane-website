import { Calendar, Users, Utensils, Clock } from 'lucide-react'
import { prisma } from '@/lib/prisma'

export default async function AdminDashboard() {
  const totalReservations = await prisma.reservation.count()
  const totalUsers = await prisma.user.count()
  const totalMenuItems = await prisma.menuItem.count()
  const todayReservations = await prisma.reservation.count({
    where: {
      date: {
        gte: new Date(new Date().setHours(0, 0, 0, 0)),
        lt: new Date(new Date().setHours(23, 59, 59, 999)),
      },
    },
  })

  const stats = [
    {
      label: 'Réservations',
      value: totalReservations,
      icon: Calendar,
      color: 'text-[#7B2D6E]',
      bg: 'bg-[#7B2D6E]/10',
    },
    {
      label: 'Clients',
      value: totalUsers,
      icon: Users,
      color: 'text-[#4A7C59]',
      bg: 'bg-[#4A7C59]/10',
    },
    {
      label: 'Plats au Menu',
      value: totalMenuItems,
      icon: Utensils,
      color: 'text-[#C9A96E]',
      bg: 'bg-[#C9A96E]/10',
    },
    {
      label: 'Réservations Aujourd\'hui',
      value: todayReservations,
      icon: Clock,
      color: 'text-[#D4A373]',
      bg: 'bg-[#D4A373]/10',
    },
  ]

  return (
    <div className="p-6">
      <h1 className="font-playfair text-2xl text-[#2C2C2C] mb-8">Tableau de Bord</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm border border-[#E8DDD0] hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#5C5C5C]">{stat.label}</p>
                <p className="text-2xl font-bold text-[#2C2C2C] mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.bg}`}>
                <stat.icon size={24} className={stat.color} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}