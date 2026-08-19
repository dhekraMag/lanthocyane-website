'use client'

import Image from 'next/image'
import { Star, Leaf, Wheat } from 'lucide-react'

interface MenuItemProps {
  item: {
    id: number
    name: string
    description: string
    price: string
    dietary?: string[]
    isChefRecommendation?: boolean
    image: string
    emoji?: string
  }
}

const dietaryIcons: Record<string, React.ReactNode> = {
  "Végétarien": <Leaf size={14} className="text-[#4A7C59]" />,
  "Sans gluten": <Wheat size={14} className="text-[#C9A96E]" />,
}

export function MenuItem({ item }: MenuItemProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all overflow-hidden border border-[#C9A96E]/10 group">
      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-[#FDF8F0]">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
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
    </div>
  )
}