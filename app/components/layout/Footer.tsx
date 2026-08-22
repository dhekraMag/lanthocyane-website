'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { MapPin, Phone, Mail, Share2, Heart, Globe } from 'lucide-react'

export default function Footer() {
  const pathname = usePathname()
  
  // Hide footer on admin pages
  if (pathname?.startsWith('/admin')) {
    return null
  }

  return (
    <footer className="bg-[#2C2C2C] text-[#FDF8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Restaurant Info */}
          <div>
            <h3 className="font-playfair text-2xl mb-4">L&apos;Anthocyane</h3>
            <p className="text-[#B8B8B8] text-sm mb-4">
              Cuisine raffinée & ambiance chaleureuse à Lannion
            </p>
            <div className="flex gap-4">
              <a href="#" aria-label="Partager" className="hover:text-[#C9A96E] transition-colors">
                <Share2 size={20} />
              </a>
              <a href="#" aria-label="Favoris" className="hover:text-[#C9A96E] transition-colors">
                <Heart size={20} />
              </a>
              <a href="#" aria-label="Site" className="hover:text-[#C9A96E] transition-colors">
                <Globe size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-playfair text-lg mb-4">Navigation</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/menu" className="text-[#B8B8B8] hover:text-[#C9A96E] transition-colors">La Carte</Link></li>
              <li><Link href="/restaurant" className="text-[#B8B8B8] hover:text-[#C9A96E] transition-colors">Le Restaurant</Link></li>
              <li><Link href="/reservations" className="text-[#B8B8B8] hover:text-[#C9A96E] transition-colors">Réservations</Link></li>
              <li><Link href="/contact" className="text-[#B8B8B8] hover:text-[#C9A96E] transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-playfair text-lg mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#C9A96E] flex-shrink-0 mt-0.5" />
                <span className="text-[#B8B8B8]">25 avenue Ernest-Renan<br />22300 Lannion</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-[#C9A96E]" />
                <a href="tel:+33296383049" className="text-[#B8B8B8] hover:text-[#C9A96E] transition-colors">
                  02 96 38 30 49
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-[#C9A96E]" />
                <a href="mailto:contact@lanthocyane.com" className="text-[#B8B8B8] hover:text-[#C9A96E] transition-colors">
                  contact@lanthocyane.com
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-playfair text-lg mb-4">Horaires</h4>
            <ul className="space-y-2 text-sm text-[#B8B8B8]">
              <li>Mardi - Samedi</li>
              <li>12:00 - 14:00</li>
              <li>19:00 - 22:00</li>
              <li className="text-[#C9A96E] mt-2">Fermé dimanche & lundi</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#4A4A4A] mt-8 pt-6 text-center text-sm text-[#B8B8B8]">
          <p>© 2026 L&apos;Anthocyane. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}