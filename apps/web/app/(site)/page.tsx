import type { Metadata } from 'next'
import { Hero } from '@/components/home/Hero'
import { ModelCarousel } from '@/components/home/ModelCarousel'
import { OffersGrid } from '@/components/home/OffersGrid'
import { StorySection } from '@/components/home/StorySection'

export const metadata: Metadata = {
  title: 'MG Motors Venezuela — Maneja el Futuro',
  description:
    'Descubre los modelos MG en Venezuela: SUV, eléctricos y sedanes. Simula tu financiamiento, encuentra concesionarios y configura tu vehículo ideal.',
}

async function getVehicles() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1'
    const res = await fetch(`${apiUrl}/vehicles?isFeatured=true&isActive=true`, {
      next: { revalidate: 300 },
    })
    if (!res.ok) throw new Error('Error al obtener vehículos')
    const data = await res.json()
    return data.data || []
  } catch {
    return fallbackVehicles
  }
}

async function getOffers() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1'
    const res = await fetch(`${apiUrl}/offers?isFeatured=true`, {
      next: { revalidate: 300 },
    })
    if (!res.ok) throw new Error('Error al obtener ofertas')
    const data = await res.json()
    return data.data || []
  } catch {
    return fallbackOffers
  }
}

export default async function HomePage() {
  const [vehicles, offers] = await Promise.all([getVehicles(), getOffers()])

  return (
    <>
      <Hero />
      <ModelCarousel vehicles={vehicles} />
      <StorySection />
      <OffersGrid offers={offers} />
    </>
  )
}

// ─── Datos de respaldo para desarrollo sin API ────────────────────────────────

const fallbackVehicles = [
  {
    id: '0', slug: 'cyberster', name: 'MG Cyberster', tagline: 'Roadster eléctrico 335 HP · 490 km',
    category: 'OFFROAD', basePrice: 89990, heroImage: '/assets/models/cyberster/hero.png', isFeatured: true,
  },
  {
    id: '1', slug: 'zs', name: 'MG ZS', tagline: 'El SUV compacto más popular',
    category: 'SUV', basePrice: 22990, heroImage: null, isFeatured: true,
  },
  {
    id: '2', slug: 'hs', name: 'MG HS', tagline: 'Potencia y elegancia en uno',
    category: 'SUV', basePrice: 34990, heroImage: null, isFeatured: true,
  },
  {
    id: '3', slug: 'mg4-ev', name: 'MG4 EV', tagline: 'El futuro 100% eléctrico',
    category: 'OFFROAD', basePrice: 29990, heroImage: null, isFeatured: true,
  },
  {
    id: '4', slug: 'zs-ev', name: 'MG ZS EV', tagline: 'SUV eléctrico inteligente',
    category: 'SUV', basePrice: 27990, heroImage: null, isFeatured: true,
  },
  {
    id: '5', slug: 'rx5', name: 'MG RX5', tagline: 'Familia y aventura sin límites',
    category: 'SUV', basePrice: 31990, heroImage: null, isFeatured: false,
  },
  {
    id: '6', slug: 'mg5', name: 'MG5', tagline: 'Sedán moderno para la ciudad',
    category: 'URBAN', basePrice: 18990, heroImage: null, isFeatured: false,
  },
]

const fallbackOffers = [
  {
    id: '1', title: 'MG ZS — Plan Especial de Lanzamiento', badgeText: 'Plan Especial',
    originalPrice: 24990, salePrice: 22990, discountPct: 8,
    installments: 48, installmentPrice: 520,
    imageUrl: null, ctaText: 'Aprovechar', ctaUrl: '/ofertas',
    endsAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    vehicle: { name: 'MG ZS', slug: 'zs', category: 'SUV' },
  },
  {
    id: '2', title: 'MG HS — Accesorios Originales Incluidos', badgeText: 'Accesorios Gratis',
    originalPrice: 36990, salePrice: 34990, discountPct: undefined,
    imageUrl: null, ctaText: 'Ver Oferta', ctaUrl: '/ofertas',
    endsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    vehicle: { name: 'MG HS', slug: 'hs', category: 'SUV' },
  },
  {
    id: '3', title: 'MG4 EV — Cargador Doméstico Gratis', badgeText: 'Cargador Incluido',
    originalPrice: 31990, salePrice: 29990,
    imageUrl: null, ctaText: 'Saber Más', ctaUrl: '/modelos/mg4-ev',
    endsAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
    vehicle: { name: 'MG4 EV', slug: 'mg4-ev', category: 'OFFROAD' },
  },
  {
    id: '4', title: 'MG ZS EV — Primera Cuota en 90 Días', badgeText: '1ª Cuota en 90 Días',
    originalPrice: 27990, salePrice: 27990,
    installments: 60, installmentPrice: 520,
    imageUrl: null, ctaText: 'Simular', ctaUrl: '/financiamiento',
    endsAt: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    vehicle: { name: 'MG ZS EV', slug: 'zs-ev', category: 'SUV' },
  },
]
