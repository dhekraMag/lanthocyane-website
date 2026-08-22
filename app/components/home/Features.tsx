import { ChefHat, Sprout, Wine, Building2 } from 'lucide-react'

const features = [
  {
    title: "Cuisine Créative",
    description: "Une gastronomie française raffinée, revisitée avec créativité et passion par notre chef.",
    icon: <ChefHat className="w-8 h-8 text-[#7B2D6E]" />,
  },
  {
    title: "Produits Locaux",
    description: "Des ingrédients frais et de saison, sourcés directement auprès des producteurs bretons.",
    icon: <Sprout className="w-8 h-8 text-[#4A7C59]" />,
  },
  {
    title: "Carte des Vins",
    description: "Une sélection exclusive de vins fins, soigneusement choisis pour accompagner vos plats.",
    icon: <Wine className="w-8 h-8 text-[#C9A96E]" />,
  },
  {
    title: "Ambiance Unique",
    description: "Un cadre chaleureux et intimiste, alliant modernité et charme traditionnel.",
    icon: <Building2 className="w-8 h-8 text-[#2D1B2E]" />,
  },
]

export function Features() {
  return (
    <section className="py-20 px-4 bg-[#FDF8F0]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl text-[#2C2C2C] mb-4">
            Pourquoi choisir L&apos;Anthocyane ?
          </h2>
          <p className="text-[#5C5C5C] max-w-2xl mx-auto">
            Découvrez ce qui fait de notre restaurant un lieu d&apos;exception à Lannion
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="font-playfair text-xl text-[#2C2C2C] mb-2">{feature.title}</h3>
              <p className="text-[#5C5C5C] text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}