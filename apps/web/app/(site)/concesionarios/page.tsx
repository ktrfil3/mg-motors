import type { Metadata } from 'next'
import { dealersData } from '@/data/dealers'
import dynamic from 'next/dynamic'

export const metadata: Metadata = {
  title: 'Concesionarios MG Motor Venezuela',
  description: 'Encuentra el concesionario y centro de servicio MG Motor más cercano a ti en Venezuela.',
}

// ─── Mapa con Leaflet (dinámico — importación client) ──────────────────────────
const DealerMap = dynamic(
  () => import('@/components/dealers/DealerMap').then(m => m.DealerMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-96 bg-brand-darker rounded-lg flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-brand-subtle">
          <div className="w-8 h-8 border-2 border-brand-mid border-t-accent rounded-full animate-spin" />
          <p className="text-sm">Cargando mapa...</p>
        </div>
      </div>
    ),
  }
)

export default function ConcesionariosPage() {
  const dealers = dealersData;

  return (
    <div className="bg-brand-black min-h-screen">
      <section className="pt-40 pb-16 bg-brand-darker/50 border-b border-brand-mid/20">
        <div className="container-site">
          <p className="text-xs font-bold font-condensed uppercase tracking-[0.3em] text-accent mb-3">
            Red MG Venezuela
          </p>
          <h1 className="text-display-lg font-display text-white mb-4">
            ENCUENTRA TU{' '}
            <span className="text-gradient-accent">CONCESIONARIO</span>
          </h1>
          <p className="text-brand-subtle max-w-lg">
            {dealers.length} concesionarios y centros de servicios a nivel nacional.
            Encuentra el más cercano a ti.
          </p>
        </div>
      </section>

      <section className="section-py" aria-label="Mapa de concesionarios">
        <div className="container-site">
          <DealerMap />
        </div>
      </section>
    </div>
  )
}
