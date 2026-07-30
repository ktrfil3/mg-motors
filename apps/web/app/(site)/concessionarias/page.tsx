import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Concessionárias Troller',
  description: 'Encontre a concessionária Troller mais próxima de você. Rede com presença em todo o Brasil.',
}

// ─── Mapa com Leaflet (dinâmico — importação client) ──────────────────────────
// O mapa Leaflet precisa de 'use client' — lazy load para evitar SSR error

import dynamic from 'next/dynamic'

const DealerMap = dynamic(
  () => import('@/components/dealers/DealerMap').then(m => m.DealerMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-96 bg-brand-darker rounded-lg flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-brand-subtle">
          <div className="w-8 h-8 border-2 border-brand-mid border-t-accent rounded-full animate-spin" />
          <p className="text-sm">Carregando mapa...</p>
        </div>
      </div>
    ),
  }
)

async function getDealers() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1'
    const res = await fetch(`${apiUrl}/dealers?limit=100`, { next: { revalidate: 3600 } })
    if (!res.ok) return []
    const data = await res.json()
    return data.data || []
  } catch {
    return []
  }
}

export default async function ConcessionariasPage() {
  const dealers = await getDealers()

  return (
    <div className="bg-brand-black min-h-screen">
      <section className="pt-40 pb-16 bg-brand-darker/50 border-b border-brand-mid/20">
        <div className="container-site">
          <p className="text-xs font-bold font-condensed uppercase tracking-[0.3em] text-accent mb-3">
            Rede Troller
          </p>
          <h1 className="text-display-lg font-display text-white mb-4">
            ENCONTRE UMA{' '}
            <span className="text-gradient-accent">CONCESSIONÁRIA</span>
          </h1>
          <p className="text-brand-subtle max-w-lg">
            {dealers.length} concessionárias em todo o Brasil.
            Encontre a mais próxima de você.
          </p>
        </div>
      </section>

      <section className="section-py" aria-label="Mapa de concessionárias">
        <div className="container-site">
          <DealerMap dealers={dealers} />
        </div>
      </section>
    </div>
  )
}
