import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'

export const metadata: Metadata = {
  title: 'Configurador 3D',
  description: 'Configure seu Troller em 3D: escolha versão, cor e acessórios.',
}

const CarViewer = dynamic(
  () => import('@/components/viewer3d/CarViewer').then(m => m.CarViewer),
  {
    ssr: false,
    loading: () => (
      <div className="h-[500px] bg-brand-darker rounded-xl flex items-center justify-center border border-brand-mid/20">
        <div className="flex flex-col items-center gap-3 text-brand-subtle">
          <div className="w-8 h-8 border-2 border-brand-mid border-t-accent rounded-full animate-spin" />
          <p className="text-sm font-condensed">Iniciando configurador 3D...</p>
        </div>
      </div>
    ),
  }
)

async function getVehicle(slug: string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1'
    const res = await fetch(`${apiUrl}/vehicles/${slug}`, { next: { revalidate: 600 } })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export default async function ConfiguradorPage({ params }: { params: { slug: string } }) {
  const vehicle = await getVehicle(params.slug)
  if (!vehicle) notFound()

  const colors = vehicle.colors || [
    { name: 'Preto Ônix', hexCode: '#1A1A1A' },
    { name: 'Branco Ártico', hexCode: '#F0F0F0' },
    { name: 'Laranja Troller', hexCode: '#E85D04', isPremium: true },
  ]

  return (
    <div className="bg-brand-black min-h-screen pt-24">
      <div className="container-site py-10">
        <div className="mb-8">
          <p className="text-xs font-bold font-condensed uppercase tracking-[0.3em] text-accent mb-2">
            Configurador 3D
          </p>
          <h1 className="text-display-md font-display text-white">
            Configure Seu{' '}
            <span className="text-gradient-accent">{vehicle.name}</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Viewer */}
          <div className="xl:col-span-2">
            <CarViewer
              model3dUrl={vehicle.model3dUrl || undefined}
              colors={colors}
              vehicleName={vehicle.name}
            />
          </div>

          {/* Versões */}
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-display text-white">Escolha a Versão</h2>
            {vehicle.versions?.map((version: any) => (
              <div key={version.id} className="card-dark p-4">
                <p className="font-bold font-condensed text-white">{version.name}</p>
                <p className="text-accent font-bold mt-1">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(Number(version.price))}
                </p>
                <button className="mt-3 w-full py-2 border border-brand-mid/40 text-brand-light text-xs font-display hover:border-accent hover:text-accent transition-colors rounded">
                  Selecionar
                </button>
              </div>
            ))}

            <div className="mt-4">
              <a
                href="/financiamiento"
                id="configurador-financiar"
                className="block text-center py-4 bg-accent text-white font-display hover:bg-accent-dark transition-colors rounded"
              >
                Financiar Este Modelo
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
