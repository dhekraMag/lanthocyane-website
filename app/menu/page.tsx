'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Wine, Leaf, Wheat, Star, Utensils } from 'lucide-react'
import Image from 'next/image'

// Menu data with correct image paths
const menuData = {
  entrees: [
    {
      id: 1,
      name: "Tartare de Saumon aux Agrumes",
      description: "Saumon frais de Bretagne, citron vert, huile d'olive vierge extra",
      price: "14.50€",
      dietary: ["Sans gluten"],
      isChefRecommendation: true,
      image: "/images/menu/saumon-tartare.jpg"
    },
    {
      id: 2,
      name: "Velouté de Potimarron",
      description: "Potimarron bio, crème de marron, noisettes torréfiées",
      price: "11.00€",
      dietary: ["Végétarien", "Sans gluten"],
      isChefRecommendation: false,
      image: "/images/menu/veloute-potimarron.avif"
    },
    {
      id: 3,
      name: "Foie Gras Poêlé",
      description: "Foie gras de canard, chutney de figues, pain d'épices",
      price: "18.00€",
      dietary: ["Sans gluten"],
      isChefRecommendation: false,
      image: "/images/menu/foie-gras.avif"
    },
  ],
  plats: [
    {
      id: 4,
      name: "Dos de Cabillaud Rôti",
      description: "Cabillaud de ligne, écrasé de pommes de terre, beurre blanc",
      price: "24.00€",
      dietary: ["Sans gluten"],
      isChefRecommendation: true,
      image: "/images/menu/cabillaud.jpg"
    },
    {
      id: 5,
      name: "Magret de Canard",
      description: "Magret de canard, sauce au miel, pommes grenailles rôties",
      price: "26.00€",
      dietary: ["Sans gluten"],
      isChefRecommendation: false,
      image: "/images/menu/magret-canard.jpg"
    },
    {
      id: 6,
      name: "Risotto aux Champignons Sauvages",
      description: "Riz carnaroli, champignons de saison, parmesan",
      price: "22.00€",
      dietary: ["Végétarien"],
      isChefRecommendation: false,
      image: "/images/menu/risotto.jpg"
    },
  ],
  desserts: [
    {
      id: 7,
      name: "Fondant au Chocolat",
      description: "Cœur coulant, glace vanille, copeaux de chocolat noir",
      price: "12.00€",
      dietary: ["Végétarien"],
      isChefRecommendation: true,
      image: "/images/menu/fondant-chocolat.avif"
    },
    {
      id: 8,
      name: "Tarte Tatin",
      description: "Pommes caramélisées, pâte feuilletée, crème fraîche",
      price: "11.00€",
      dietary: ["Végétarien"],
      isChefRecommendation: false,
      image: "/images/menu/tarte-tatin.jpg"
    },
  ],
  wines: [
    { name: "Château Margaux", region: "Bordeaux - Rouge", price: "45.00€" },
    { name: "Domaine Vacheron", region: "Sancerre - Blanc", price: "38.00€" },
    { name: "Côte-Rôtie", region: "Rhône - Rouge", price: "42.00€" },
    { name: "Chablis Grand Cru", region: "Bourgogne - Blanc", price: "48.00€" },
  ],
}

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('entrees')
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})
  
  const categories = [
    { id: 'entrees', label: 'Entrées', icon: '🍷' },
    { id: 'plats', label: 'Plats', icon: '🍽️' },
    { id: 'desserts', label: 'Desserts', icon: '🍰' },
  ]

  const dietaryIcons: Record<string, React.ReactNode> = {
    "Végétarien": <Leaf size={14} className="text-[#4A7C59]" />,
    "Sans gluten": <Wheat size={14} className="text-[#C9A96E]" />,
  }

  const getItems = () => {
    if (activeCategory === 'entrees') return menuData.entrees
    if (activeCategory === 'plats') return menuData.plats
    return menuData.desserts
  }

  const handleImageError = (imagePath: string) => {
    setImageErrors(prev => ({ ...prev, [imagePath]: true }))
  }

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
            La Carte
          </h1>
          <p className="text-lg md:text-xl text-[#4A4A4A] text-center max-w-2xl mx-auto">
            Une cuisine créative mettant à l&apos;honneur les produits frais et locaux de Bretagne
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <span className="bg-white px-4 py-2 rounded-full text-sm shadow-sm flex items-center gap-2 border border-[#C9A96E]/20">
              <Leaf size={16} className="text-[#4A7C59]" /> Produits locaux
            </span>
            <span className="bg-white px-4 py-2 rounded-full text-sm shadow-sm flex items-center gap-2 border border-[#C9A96E]/20">
              <Star size={16} className="text-[#C9A96E]" /> Coup de cœur
            </span>
          </div>
        </motion.div>

        {/* Categories */}
        <div className="flex justify-center gap-4 mb-10 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#7B2D6E] text-white shadow-lg transform scale-105'
                  : 'bg-white text-[#2D1B2E] hover:bg-[#7B2D6E]/10 border border-[#C9A96E]/30'
              }`}
            >
              <span className="mr-2">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {getItems().map((item) => {
            const hasError = imageErrors[item.image]
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all overflow-hidden border border-[#C9A96E]/10 group"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden bg-[#FDF8F0]">
                  {!hasError ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      onError={() => handleImageError(item.image)}
                      loading="eager"
                      priority
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center text-[#7B2D6E]/20">
                        <Utensils size={64} />
                        <p className="text-sm text-[#4A4A4A]/40 mt-2">Image à venir</p>
                      </div>
                    </div>
                  )}
                  {item.isChefRecommendation && (
                    <div className="absolute top-3 right-3 bg-[#C9A96E] text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-lg">
                      <Star size={12} fill="white" /> Coup de cœur
                    </div>
                  )}
                </div>
                
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-serif text-[#2D1B2E]">{item.name}</h3>
                    <span className="text-lg font-serif text-[#C9A96E] font-bold whitespace-nowrap ml-4">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-[#4A4A4A] text-sm mb-3">{item.description}</p>
                  {item.dietary && item.dietary.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {item.dietary.map((diet) => (
                        <span key={diet} className="text-xs bg-[#FDF8F0] px-2 py-1 rounded-full flex items-center gap-1 border border-[#C9A96E]/20">
                          {dietaryIcons[diet]}
                          {diet}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Wine List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-16 pt-12 border-t-2 border-[#C9A96E]/20"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <Wine size={28} className="text-[#7B2D6E]" />
            <h2 className="text-3xl font-serif text-[#2D1B2E]">Carte des Vins</h2>
            <Wine size={28} className="text-[#7B2D6E]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {menuData.wines.map((wine, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-[#C9A96E]/10"
              >
                <div>
                  <p className="font-medium text-[#2D1B2E] flex items-center gap-2">
                    <span className="text-xl">🍷</span>
                    {wine.name}
                  </p>
                  <p className="text-sm text-[#4A4A4A]">{wine.region}</p>
                </div>
                <span className="text-[#C9A96E] font-serif font-bold">{wine.price}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12 text-sm text-[#4A4A4A]/60 space-y-1"
        >
          <p>📋 Menu susceptible de changer selon les saisons et les arrivages</p>
          <p>🌿 Produits frais et locaux - Sur place ou à emporter</p>
          <p className="text-xs text-[#4A4A4A]/40">* Les prix sont TTC</p>
        </motion.div>
      </div>
    </div>
  )
}