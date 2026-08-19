import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Header from '@/app/components/layout/Header'
import Footer from '@/app/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "L'Anthocyane - Restaurant Gastronomique à Lannion",
  description: 'Découvrez L\'Anthocyane, restaurant raffiné à Lannion. Cuisine créative, produits frais et locaux.',
  keywords: 'restaurant Lannion, gastronomie, cuisine française, produits locaux, Bretagne',
  authors: [{ name: 'L\'Anthocyane' }],
  openGraph: {
    title: "L'Anthocyane - Restaurant Gastronomique à Lannion",
    description: 'Cuisine raffinée & ambiance chaleureuse à Lannion',
    url: 'https://www.lanthocyane.com',
    siteName: 'L\'Anthocyane',
    locale: 'fr_FR',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="fr" 
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${playfair.variable}`}
    >
      <body className="bg-[#FDF8F0] text-[#2C2C2C] antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}