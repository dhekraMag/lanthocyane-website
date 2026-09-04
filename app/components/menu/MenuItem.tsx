import { Star, Leaf, Wheat, Fish, Beef, Coffee } from 'lucide-react'
import Image from 'next/image'
import { MenuItem as MenuItemType } from '@prisma/client'

interface MenuItemProps {
  item: MenuItemType
}

const dietaryIcons: Record<string, React.ReactNode> = {
  "Végétarien": <Leaf size={14} className="text-[#4A7C59]" />,
  "Sans gluten": <Wheat size={14} className="text-[#C9A96E]" />,
  "Poisson": <Fish size={14} className="text-blue-500" />,
  "Viande": <Beef size={14} className="text-red-500" />,
  "Café": <Coffee size={14} className="text-amber-600" />,
}

export function MenuItem({ item }: MenuItemProps) {
  const dietaryTags = item.dietary?.split(',').map((tag: string) => tag.trim()) || []

  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-[#E8DDD0]">
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden bg-[#F5EDE6]">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#B8B8B8]">
            <span className="text-4xl">🍽️</span>
          </div>
        )}
        {item.isPopular && (
          <div className="absolute top-3 right-3 bg-[#C9A96E] text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Star size={12} fill="white" />
            Coup de cœur
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-playfair text-lg text-[#2C2C2C] group-hover:text-[#7B2D6E] transition-colors">
            {item.name}
          </h3>
          <span className="font-bold text-[#7B2D6E] text-lg whitespace-nowrap">
            {Number(item.price).toFixed(2)} €
          </span>
        </div>

        {item.description && (
          <p className="text-[#5C5C5C] text-sm mt-2 line-clamp-2">
            {item.description}
          </p>
        )}

        {/* Dietary Tags */}
        {dietaryTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {dietaryTags.map((tag: string) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2 py-1 bg-[#F5EDE6] rounded-full text-xs text-[#5C5C5C]"
              >
                {dietaryIcons[tag] || null}
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}