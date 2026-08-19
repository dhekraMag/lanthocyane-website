'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/restaurant-interior.jpg"
          alt="L'Anthocyane Restaurant"
          fill
          className="object-cover"
          priority
          quality={100}
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            const parent = e.currentTarget.parentElement
            if (parent) {
              parent.style.background = 'linear-gradient(135deg, #2D1B2E 0%, #7B2D6E 100%)'
            }
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2D1B2E]/70 via-[#2D1B2E]/50 to-[#2D1B2E]/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="text-[#C9A96E] text-sm tracking-widest uppercase font-light border border-[#C9A96E]/30 px-6 py-2 rounded-full inline-block">
              ★ Gastronomie Française ★
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 font-serif">
            L&apos;Anthocyane
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl font-light text-[#C9A96E] mb-2">
            Cuisine raffinée & ambiance chaleureuse
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm md:text-base text-white/80 mb-8">
            <span className="flex items-center gap-1">📍 25 avenue Ernest-Renan, 22300 Lannion</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">📞 02 96 38 30 49</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/reservations"
              className="bg-[#7B2D6E] hover:bg-[#5C1F52] text-white px-10 py-4 rounded-full font-medium text-lg transition-all transform hover:scale-105 shadow-2xl flex items-center gap-2"
            >
              Réserver une table
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/menu"
              className="border-2 border-white/50 hover:border-white text-white hover:bg-white/10 px-10 py-4 rounded-full font-medium text-lg transition-all"
            >
              Voir la carte
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-4 text-sm"
          >
            <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 border border-white/10">
              🅿️ Parking gratuit à 100m
            </span>
            <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 border border-white/10">
              🌿 Produits frais & locaux
            </span>
            <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 border border-white/10">
              🍷 Carte des vins
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </motion.div>
    </section>
  )
}