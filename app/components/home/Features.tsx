'use client'

import { motion } from 'framer-motion'
import { Utensils, Leaf, Wine, Building2 } from 'lucide-react'

const features = [
  {
    icon: <Utensils className="w-8 h-8 text-[#7B2D6E]" />,
    title: 'Cuisine créative',
    description: 'Gastronomie française raffinée'
  },
  {
    icon: <Leaf className="w-8 h-8 text-[#4A7C59]" />,
    title: 'Produits locaux',
    description: 'Bretagne & saison'
  },
  {
    icon: <Wine className="w-8 h-8 text-[#C9A96E]" />,
    title: 'Carte des vins',
    description: 'Sélection exclusive'
  },
  {
    icon: <Building2 className="w-8 h-8 text-[#2D1B2E]" />,
    title: 'Ambiance unique',
    description: 'Cadre chaleureux'
  }
]

export function Features() {
  return (
    <section className="py-16 bg-white border-t border-[#C9A96E]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="flex justify-center mb-3 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <p className="font-medium text-[#2D1B2E]">{feature.title}</p>
              <p className="text-sm text-[#4A4A4A]">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}