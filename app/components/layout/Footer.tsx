import Link from 'next/link'
import { MapPin, Phone,  Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#2D1B2E] text-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1 - Brand */}
          <div className="text-center md:text-left">
            <h3 className="font-serif text-2xl text-[#C9A96E] mb-4">
              L&apos;Anthocyane
            </h3>
            <p className="text-sm text-white/60">Cuisine raffinée à Lannion</p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-center md:justify-start gap-2 text-sm">
                <MapPin size={16} className="text-[#C9A96E]" />
                <span>25 avenue Ernest-Renan</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2 text-sm">
                <Phone size={16} className="text-[#C9A96E]" />
                <a href="tel:+33296383049" className="hover:text-white">02 96 38 30 49</a>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2 text-sm">
                <Mail size={16} className="text-[#C9A96E]" />
                <a href="mailto:contact@lanthocyane.com" className="hover:text-white">contact@lanthocyane.com</a>
              </div>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold text-white mb-4">Liens rapides</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/menu" className="hover:text-[#C9A96E]">La Carte</Link></li>
              <li><Link href="/reservations" className="hover:text-[#C9A96E]">Réservations</Link></li>
              <li><Link href="/restaurant" className="hover:text-[#C9A96E]">Le Restaurant</Link></li>
              <li><Link href="/contact" className="hover:text-[#C9A96E]">Contact & Accès</Link></li>
            </ul>
          </div>

          {/* Column 3 - Hours */}
           <div className="text-center md:text-left">
            <h4 className="font-semibold text-white mb-4">Horaires</h4>
      <ul className="space-y-2 text-sm">
              <li className="flex justify-center md:justify-between">
             <span>Mercredi - Samedi</span>
                <span className="text-[#C9A96E]">12:00 - 14:00</span>
         </li>
         <li className="flex justify-center md:justify-between">
            <span>Mercredi - Samedi</span>
          <span className="text-[#C9A96E]">19:00 - 21:00</span>
      </li>
        <li className="flex justify-center md:justify-between">
             <span>Dimanche</span>
             <span className="text-[#C9A96E]">12:00 - 14:00</span>
        </li>
        <li className="flex justify-center md:justify-between text-white/40">
              <span>Lundi - Mardi</span>
               <span>Fermé</span>
    </li>
  </ul>
</div>

          {/* Column 4 - Info & Social */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold text-white mb-4">Informations</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-xl">🅿️</span>
                <span className="text-white/80">Parking gratuit</span>
              </div>
              <p className="text-white/60 text-xs">Parking du Stanco à 100m</p>
              <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                <span className="text-xl">🌟</span>
                <span className="text-white/80">Produits frais & locaux</span>
              </div>
            </div>

            {/* ✅ FACEBOOK ONLY */}
            <div className="mt-4">
              <p className="text-xs text-white/40 mb-2">Suivez-nous</p>
              <div className="flex justify-center md:justify-start">
                <a
                  href="https://www.facebook.com/marcbriand22"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#1877F2] text-white rounded-full hover:bg-[#0d65d9] transition-all hover:scale-105 text-sm"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-white/40">
            <p>© 2026 L&apos;Anthocyane - Tous droits réservés</p>
            <div className="flex gap-4 mt-2 sm:mt-0">
              <Link href="/" className="hover:text-white/80">Mentions légales</Link>
              <Link href="/" className="hover:text-white/80">Politique de confidentialité</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}