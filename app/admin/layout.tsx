'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Gauge, 
  Calendar, 
  Utensils, 
  Users, 
  Settings, 
  Menu, 
  X 
} from 'lucide-react'

const menuItems = [
  { href: '/admin/dashboard', label: 'Tableau de Bord', icon: Gauge },
  { href: '/admin/reservations', label: 'Réservations', icon: Calendar },
  { href: '/admin/menu', label: 'Menu', icon: Utensils },
  { href: '/admin/users', label: 'Utilisateurs', icon: Users },
  { href: '/admin/settings', label: 'Paramètres', icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-[#F8F4EE] flex">
      {/* ===== SIDEBAR - FIXED ===== */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-white border-r border-[#E8DDD0] transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="p-6">
          <Link href="/admin/dashboard" className="flex items-center gap-2 mb-8">
            <Utensils size={28} className="text-[#7B2D6E]" />
            <span className="font-playfair text-xl text-[#2C2C2C]">Administration</span>
          </Link>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
              const Icon = item.icon

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#7B2D6E]/10 text-[#7B2D6E]'
                      : 'text-[#5C5C5C] hover:bg-[#F5EDE6]'
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </aside>

      {/* ===== MAIN CONTENT AREA ===== */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'ml-0'}`}>
        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
          aria-label={isSidebarOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* ===== PAGE CONTENT ===== */}
        <main className="flex-1 pt-16 pb-8">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>

        {/* ===== FOOTER - ONLY ON ADMIN ===== */}
        <footer className="bg-white border-t border-[#E8DDD0] py-4 px-6">
          <p className="text-center text-sm text-[#5C5C5C]">
            © 2026 L&apos;Anthocyane. Administration
          </p>
        </footer>
      </div>
    </div>
  )
}