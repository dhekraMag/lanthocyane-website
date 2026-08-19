'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import {
  LayoutDashboard,
  Calendar,
  Utensils,
  Users,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) {
          router.push('/login')
          return
        }

        // ✅ ONLY EMAIL CHECK - NO DATABASE QUERY
        const adminEmails = ['admin@lanthocyane.com', 'dheka@gmail.com']
        
        if (!adminEmails.includes(user.email || '')) {
          router.push('/')
          return
        }

        setIsLoading(false)
      } catch (error) {
        console.error('Auth error:', error)
        router.push('/login')
      }
    }

    checkAuth()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const navItems = [
    { href: '/admin/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
    { href: '/admin/reservations', label: 'Reservations', icon: Calendar },
    { href: '/admin/menu', label: 'Menu', icon: Utensils },
    { href: '/admin/users', label: 'Utilisateurs', icon: Users },
    { href: '/admin/settings', label: 'Parametres', icon: Settings },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDF8F0]">
        <div className="w-8 h-8 border-4 border-[#7B2D6E] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FDF8F0]">
      <aside className={`fixed top-0 left-0 h-full bg-[#2D1B2E] text-white transition-all duration-300 z-50 ${
        isSidebarOpen ? 'w-64' : 'w-20'
      }`}>
        <div className="p-4 flex items-center justify-between border-b border-white/10">
          <h1 className={`font-serif text-[#C9A96E] transition-all ${
            isSidebarOpen ? 'text-2xl' : 'text-xl'
          }`}>
            {isSidebarOpen ? 'Admin' : 'A'}
          </h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-white/10 rounded-lg transition"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname?.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? 'bg-[#7B2D6E] text-white'
                    : 'hover:bg-white/10 text-white/70 hover:text-white'
                }`}
              >
                <Icon size={20} />
                {isSidebarOpen && <span>{item.label}</span>}
              </Link>
            )
          })}

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg transition w-full hover:bg-red-500/20 text-red-400 hover:text-red-300"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span>Deconnexion</span>}
          </button>
        </nav>
      </aside>

      <main className={`transition-all duration-300 ${
        isSidebarOpen ? 'ml-64' : 'ml-20'
      }`}>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}