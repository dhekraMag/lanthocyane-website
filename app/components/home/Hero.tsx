'use client'

import { ArrowRight, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/restaurant-interior.jpg"
          alt="L'Anthocyane - Restaurant Gastronomique à Lannion"
          fill
          className="object-cover brightness-[0.7]"
          priority
          sizes="100vw"
          quality={100}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-[#7B2D6E]/20 backdrop-blur-sm text-[#FDF8F0] px-4 py-2 rounded-full text-sm mb-6">
            <span className="w-2 h-2 bg-[#C9A96E] rounded-full animate-pulse" />
            ★ Gastronomie Française ★
          </div>
          
          <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl text-[#FDF8F0] leading-tight mb-6">
            L&apos;Anthocyane
          </h1>
          
          <p className="text-xl md:text-2xl text-[#FDF8F0]/90 font-light mb-8">
            Cuisine raffinée & ambiance chaleureuse à Lannion
          </p>

          <div className="flex flex-wrap gap-6 text-[#FDF8F0]/80 text-sm mb-10">
            <div className="flex items-center gap-2">
              <MapPin size={18} />
              <span>25 avenue Ernest-Renan, 22300 Lannion</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={18} />
              <span>02 96 38 30 49</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/reservations"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#7B2D6E] hover:bg-[#6B255E] text-white rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Phone size={20} />
              Réserver une table
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full transition-all duration-300 border border-white/20"
            >
              Découvrir la carte
            </Link>
          </div>

          {/* Quick Info Tags */}
          <div className="flex flex-wrap gap-4 mt-12 text-[#FDF8F0]/70 text-sm">
            <span>🅿️ Parking gratuit à 100m</span>
            <span>🌿 Produits frais & locaux</span>
            <span>🍷 Carte des vins</span>
          </div>
        </div>
      </div>
    </section>
  )
}

import { MapPin } from 'lucide-react'