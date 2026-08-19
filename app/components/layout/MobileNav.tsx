'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
  navLinks: Array<{ href: string; label: string }>
  isActive: (path: string) => boolean
}

export function MobileNav({ isOpen, onClose, navLinks, isActive }: MobileNavProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-40 bg-white/98 backdrop-blur-md md:hidden pt-20"
          onClick={onClose}
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
                  onClick={onClose}
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
                onClick={onClose}
                className="inline-block mt-4 bg-[#7B2D6E] hover:bg-[#5C1F52] text-white px-8 py-3 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg"
              >
                Réserver une table
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}