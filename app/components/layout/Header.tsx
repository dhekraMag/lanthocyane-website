"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Phone, UtensilsCrossed } from 'lucide-react'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', label: 'Accueil' },
  { href: '/menu', label: 'Menu' },
  { href: '/restaurant', label: 'Restaurant' },
  { href: '/reservations', label: 'Réservations' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#FDF8F0] shadow-md py-2' : 'bg-[#FDF8F0]/90 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <UtensilsCrossed 
              size={28} 
              className="text-[#7B2D6E] group-hover:rotate-12 transition-transform duration-300" 
            />
            <span className="font-playfair text-2xl text-[#2C2C2C] group-hover:text-[#7B2D6E] transition-colors">
              L&apos;Anthocyane
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-[#7B2D6E] ${
                  pathname === item.href ? 'text-[#7B2D6E]' : 'text-[#2C2C2C]'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="tel:+33296383049"
              className="flex items-center gap-2 px-4 py-2 bg-[#7B2D6E] hover:bg-[#6B255E] text-white rounded-full text-sm transition-colors"
            >
              <Phone size={16} />
              <span>02 96 38 30 49</span>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-[#F5EDE6] rounded-lg transition-colors"
            aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="flex flex-col gap-4 py-4 border-t border-[#E8DDD0]">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-base font-medium transition-colors hover:text-[#7B2D6E] ${
                  pathname === item.href ? 'text-[#7B2D6E]' : 'text-[#2C2C2C]'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="tel:+33296383049"
              className="flex items-center gap-2 px-4 py-3 bg-[#7B2D6E] hover:bg-[#6B255E] text-white rounded-lg text-sm transition-colors w-full justify-center"
            >
              <Phone size={16} />
              <span>Appeler</span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}