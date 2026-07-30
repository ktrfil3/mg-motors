import type { Metadata } from 'next'
import CybersterPageClient from './CybersterPageClient'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'MG Cyberster — Roadster Eléctrico 335 HP | MG Motors Venezuela',
  description:
    'Descubre el MG Cyberster en Venezuela. Roadster eléctrico con 335 HP, 490 km de autonomía, puertas tijera y capota eléctrica. Motor único, tecnología de vanguardia.',
  keywords: ['MG Cyberster Venezuela', 'roadster eléctrico Venezuela', 'MG deportivo', 'auto eléctrico Venezuela'],
  openGraph: {
    title: 'MG Cyberster — Roadster Eléctrico',
    description: '335 HP · 490 km de autonomía · Puertas tijera · Capota eléctrica',
    images: ['/assets/models/cyberster/hero.png'],
  },
}

export default function CybersterPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <CybersterPageClient />
      </main>
      <Footer />
    </>
  )
}
