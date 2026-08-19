'use client'

import { motion } from 'framer-motion'
import { ChefHat, Award, Star } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function RestaurantPage() {
  return (
    <div className="min-h-screen py-32 bg-gradient-to-b from-[#FDF8F0] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-[#2D1B2E] text-center mb-4">
            Le Restaurant
          </h1>
          <p className="text-lg md:text-xl text-[#4A4A4A] text-center max-w-2xl mx-auto">
            Découvrez l&apos;histoire et l&apos;ambiance de L&apos;Anthocyane
          </p>
        </motion.div>

        {/* Chef Section with Photo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm overflow-hidden border border-[#C9A96E]/10 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Chef Portrait */}
            <div className="relative h-64 md:h-auto bg-[#7B2D6E]/10">
              <Image
                src="/images/chef/chef-portrait.jpg.webp"
                alt="Chef Jean-Pierre"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            
            {/* Chef Info */}
            <div className="p-8 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <ChefHat className="text-[#C9A96E]" size={28} />
                <h2 className="text-2xl font-serif text-[#2D1B2E]">Notre Chef</h2>
              </div>
              <h3 className="text-3xl font-serif text-[#2D1B2E] mb-2">Marc Briand</h3>
              <p className="text-[#4A4A4A] mb-4">15ans d&apos;expérience</p>
              <div className="flex gap-1 text-[#C9A96E] mb-4">
                <Star size={20} fill="#C9A96E" />
                <Star size={20} fill="#C9A96E" />
                <Star size={20} fill="#C9A96E" />
                <Star size={20} fill="#C9A96E" />
                <Star size={20} fill="#C9A96E" />
              </div>
              <p className="text-[#4A4A4A] leading-relaxed">
                Avec plus de 15 ans d&apos;expérience dans les plus grandes tables de France, 
                Chez le chef Marc Briand, c’est l’expérience qui prime. Au cœur de Lannion, il
                régale ses convives avec une cuisine qui lui ressemble : carrée, précise,
                sans détours inutiles… mais avec ce qu’il faut de justesse et de finesse.
                […] Imagination, précision technique, respect des saveurs : trois règles d’or pour
                 un repas qui ne laisse pas indifférent..
              </p>
            </div>
          </div>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm p-8 mb-8 border border-[#C9A96E]/10"
        >
          <div className="flex items-center gap-3 mb-4">
            <Award className="text-[#C9A96E]" size={28} />
            <h2 className="text-2xl font-serif text-[#2D1B2E]">Notre Histoire</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-[#4A4A4A] leading-relaxed">
               Marc Briand jouit d’un parcours riche de multiples expériences et de réussites.
                Issu d’une famille d’agriculteurs à Carhaix, il prend connaissance très jeune 
                du goût des bons produits. Après l’école hôtelière de Trégunc et une saison en Bretagne,
                il rejoint la capitale.
                Il rencontre Michel Peignaud qui lui fait découvrir la restauration étoilée dans son
                établissement près de Versailles.
              </p>
              <p className="text-[#4A4A4A] leading-relaxed mt-4">
                Il intègre ensuite les cuisines du Ritz, auprès de Guy Legay, puis celles des Crayères 
                à Reims aux côtés de Gérard Boyer. Il retourne plus tard chez Michel Peignaud en tant que chef,
                puis chez Jean-Marc Delacourt à Divonne-les-Bains où il est sous-chef.
                 De retour dans sa Bretagne natale, il officie dans les cuisines du Manoir de Lan Kerellec pendant
                plusieurs années.
             En 2013, il ouvre avec son épouse Marie son propre restaurant gastronomique à Lannion,
             L’Anthocyane
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#FDF8F0] p-4 rounded-xl text-center">
                <div className="text-3xl mb-2">🌟</div>
                <p className="text-sm font-medium text-[#2D1B2E]">Cuisine créative</p>
              </div>
              <div className="bg-[#FDF8F0] p-4 rounded-xl text-center">
                <div className="text-3xl mb-2">🌿</div>
                <p className="text-sm font-medium text-[#2D1B2E]">Produits locaux</p>
              </div>
              <div className="bg-[#FDF8F0] p-4 rounded-xl text-center">
                <div className="text-3xl mb-2">🍷</div>
                <p className="text-sm font-medium text-[#2D1B2E]">Carte des vins</p>
              </div>
              <div className="bg-[#FDF8F0] p-4 rounded-xl text-center">
                <div className="text-3xl mb-2">🏛️</div>
                <p className="text-sm font-medium text-[#2D1B2E]">Ambiance unique</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Chef en Cuisine */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8"
        >
          <Image
            src="/images/chef/chef-cuisine.jpg.webp"
            alt="Chef en cuisine"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2D1B2E]/80 to-transparent flex items-end">
            <div className="p-8 text-white">
              <h3 className="text-2xl font-serif">La passion en cuisine</h3>
              <p className="text-white/80">Des plats préparés avec amour et savoir-faire</p>
            </div>
          </div>
        </motion.div>

        {/* Plats Signature */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-serif text-[#2D1B2E] text-center mb-6 flex items-center justify-center gap-3">
            <span>🍽️</span> Nos Plats Signature <span>🍽️</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Plat Signature */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#C9A96E]/10 group hover:shadow-lg transition">
              <div className="relative h-48 bg-[#FDF8F0]">
                <Image
                  src="/images/plats/plat-signature.jpg.webp"
                  alt="Plat signature"
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-4 text-center">
                <h4 className="font-serif text-[#2D1B2E]">Plat Signature</h4>
                <p className="text-sm text-[#4A4A4A]">Notre spécialité</p>
              </div>
            </div>

            {/* Côte de Granit Rose */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#C9A96E]/10 group hover:shadow-lg transition">
              <div className="relative h-48 bg-[#FDF8F0]">
                <Image
                  src="/images/plats/Côte-de-Granit-Rose.jpg"
                  alt="Côte de Granit Rose"
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-4 text-center">
                <h4 className="font-serif text-[#2D1B2E]">Côte de Granit Rose</h4>
                <p className="text-sm text-[#4A4A4A]">Inspiration bretonne</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center bg-[#7B2D6E]/5 rounded-2xl p-8 border border-[#7B2D6E]/10"
        >
          <h3 className="text-2xl font-serif text-[#2D1B2E] mb-3">Prêt à nous découvrir ?</h3>
          <p className="text-[#4A4A4A] mb-6">
            Réservez votre table et vivez une expérience culinaire unique
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/reservations"
              className="bg-[#7B2D6E] hover:bg-[#5C1F52] text-white px-8 py-3 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg inline-flex items-center gap-2"
            >
              Réserver une table
            </Link>
            <Link
              href="/menu"
              className="border-2 border-[#C9A96E] text-[#C9A96E] hover:bg-[#C9A96E] hover:text-white px-8 py-3 rounded-full font-medium transition-all transform hover:scale-105 inline-flex items-center gap-2"
            >
              Voir la carte
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}