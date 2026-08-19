export const menuData = {
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