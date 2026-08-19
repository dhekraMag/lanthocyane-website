'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Handle scroll - this is fine
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50
      setIsScrolled(scrolled)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/menu', label: 'La Carte' },
    { href: '/restaurant', label: 'Le Restaurant' },
    { href: '/reservations', label: 'Réservations' },
    { href: '/contact', label: 'Contact' },
  ]

  const isActive = (path: string) => {
    if (path === '/') return pathname === path
    return pathname?.startsWith(path)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' 
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center space-x-2 group"
              onClick={closeMobileMenu}
            >
              <span 
                className={`text-2xl md:text-3xl font-serif font-bold transition-colors duration-300 ${
                  isScrolled ? 'text-[#2D1B2E]' : 'text-white'
                }`}
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                L&apos;Anthocyane
              </span>
              <span 
                className={`hidden sm:inline text-sm font-serif italic transition-colors duration-300 ${
                  isScrolled ? 'text-[#C9A96E]' : 'text-[#C9A96E]'
                }`}
              >
                • Restaurant
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-200 relative group ${
                    isActive(link.href)
                      ? isScrolled 
                        ? 'text-[#7B2D6E]' 
                        : 'text-white'
                      : isScrolled 
                        ? 'text-[#2C2C2C] hover:text-[#7B2D6E]' 
                        : 'text-white/90 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <motion.span
                      layoutId="activeTab"
                      className={`absolute inset-0 rounded-full ${
                        isScrolled ? 'bg-[#7B2D6E]/10' : 'bg-white/20'
                      } -z-10`}
                      transition={{ type: 'spring', duration: 0.5 }}
                    />
                  )}
                  <span 
                    className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                      isScrolled ? 'bg-[#C9A96E]' : 'bg-[#C9A96E]'
                    }`}
                  />
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              <a
                href="tel:+33296383049"
                className={`hidden sm:flex items-center space-x-2 transition-colors duration-300 ${
                  isScrolled 
                    ? 'text-[#7B2D6E] hover:text-[#5C1F52]' 
                    : 'text-white/90 hover:text-white'
                }`}
              >
                <Phone size={18} />
                <span className="font-medium">02 96 38 30 49</span>
              </a>

              <Link
                href="/reservations"
                onClick={closeMobileMenu}
                className={`hidden md:inline-block px-6 py-2.5 rounded-full text-sm font-medium transition-all transform hover:scale-105 shadow-lg ${
                  isScrolled 
                    ? 'bg-[#7B2D6E] hover:bg-[#5C1F52] text-white' 
                    : 'bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30'
                }`}
              >
                Réserver
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={toggleMobileMenu}
                className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
                  isScrolled 
                    ? 'text-[#2D1B2E] hover:bg-[#7B2D6E]/10' 
                    : 'text-white hover:bg-white/10'
                }`}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white/98 backdrop-blur-md md:hidden pt-20"
            onClick={toggleMobileMenu}
          >
            <div 
              className="flex flex-col items-center justify-center h-full space-y-6 px-4"
              onClick={(e) => e.stopPropagation()}
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Link
                    href={link.href}
                    onClick={closeMobileMenu}
                    className={`text-2xl font-serif transition-colors duration-200 ${
                      isActive(link.href)
                        ? 'text-[#7B2D6E]'
                        : 'text-[#2D1B2E] hover:text-[#7B2D6E]'
                    }`}
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="pt-8 border-t border-[#C9A96E]/30 w-full max-w-xs text-center"
              >
                <a
                  href="tel:+33296383049"
                  className="block text-[#7B2D6E] text-lg font-medium hover:text-[#5C1F52] transition"
                >
                  📞 02 96 38 30 49
                </a>
                <p className="text-sm text-[#4A4A4A] mt-2">
                  25 avenue Ernest-Renan, 22300 Lannion
                </p>
                <p className="text-xs text-[#4A4A4A]/60 mt-1">
                  🅿️ Parking gratuit à 100m
                </p>
                <Link
                  href="/reservations"
                  onClick={closeMobileMenu}
                  className="inline-block mt-4 bg-[#7B2D6E] hover:bg-[#5C1F52] text-white px-8 py-3 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg"
                >
                  Réserver une table
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}