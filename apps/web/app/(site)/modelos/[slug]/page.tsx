import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Zap, Fuel, Settings, Users } from 'lucide-react'
import { Badge } from '@troller/ui'

// ─── Busca dados do veículo ───────────────────────────────────────────────────

async function getVehicle(slug: string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1'
    const res = await fetch(`${apiUrl}/vehicles/${slug}`, {
      next: { revalidate: 600 },
    })
    if (res.status === 404) return null
    if (!res.ok) throw new Error('Falha ao buscar veículo')
    return res.json()
  } catch {
    return null
  }
}

// ─── Metadata dinâmica ────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const vehicle = await getVehicle(params.slug)
  if (!vehicle) return { title: 'Veículo não encontrado' }

  return {
    title: `${vehicle.name} — ${vehicle.tagline || 'Troller'}`,
    description: vehicle.description?.slice(0, 160),
    openGraph: {
      title: vehicle.name,
      description: vehicle.tagline,
      images: vehicle.heroImage ? [vehicle.heroImage] : [],
    },
  }
}

// ─── Página de Modelo ─────────────────────────────────────────────────────────

export default async function ModeloPage({ params }: { params: { slug: string } }) {
  const vehicle = await getVehicle(params.slug)

  if (!vehicle) notFound()

  const formatBRL = (v: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(v)

  const categoryLabels: Record<string, string> = {
    OFFROAD: 'Off-Road', SUV: 'SUV', URBAN: 'Urbano', SPORT: 'Sport',
  }

  const fuelLabels: Record<string, string> = {
    FLEX: 'Flex (Gasolina/Etanol)', GASOLINA: 'Gasolina', DIESEL: 'Diesel',
    ELETRICO: 'Elétrico 100%', HIBRIDO: 'Híbrido',
  }

  const transLabels: Record<string, string> = {
    MANUAL: 'Manual', AUTOMATICO: 'Automático', CVT: 'CVT',
  }

  return (
    <article className="bg-brand-black min-h-screen">
      {/* ─── Hero do modelo ──────────────────────────────────────────── */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
        {vehicle.heroImage ? (
          <Image
            src={vehicle.heroImage}
            alt={vehicle.name}
            fill
            className="object-cover object-center"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-darker to-brand-black" />
        )}
        <div className="absolute inset-0 gradient-hero-overlay" />

        <div className="relative z-10 container-site pb-16 w-full">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-brand-subtle mb-6" aria-label="Navegação estrutural">
            <Link href="/" className="hover:text-white transition-colors">Início</Link>
            <span>/</span>
            <Link href="/modelos" className="hover:text-white transition-colors">Modelos</Link>
            <span>/</span>
            <span className="text-brand-light">{vehicle.name}</span>
          </nav>

          <Badge variant="neutral" className="mb-4">
            {categoryLabels[vehicle.category] || vehicle.category}
          </Badge>

          <h1 className="text-display-xl font-display text-white mb-2">{vehicle.name}</h1>
          {vehicle.tagline && (
            <p className="text-xl text-brand-subtle font-condensed">{vehicle.tagline}</p>
          )}
        </div>
      </section>

      {/* ─── Specs rápidas ───────────────────────────────────────────── */}
      <section className="bg-brand-darker border-b border-brand-mid/20" aria-label="Especificações rápidas">
        <div className="container-site">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-brand-mid/20">
            {[
              { Icon: Zap, label: 'Motor', value: vehicle.engine || '—' },
              { Icon: Fuel, label: 'Combustível', value: fuelLabels[vehicle.fuelType] || vehicle.fuelType },
              { Icon: Settings, label: 'Câmbio', value: transLabels[vehicle.transmission] || vehicle.transmission },
              { Icon: Users, label: 'Lugares', value: `${vehicle.seats} lugares` },
            ].map(({ Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 p-6">
                <Icon size={20} className="text-accent flex-shrink-0" />
                <div>
                  <p className="text-xs text-brand-subtle uppercase tracking-wider">{label}</p>
                  <p className="text-sm font-semibold text-white mt-0.5">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Versões e preços ────────────────────────────────────────── */}
      <section className="section-py container-site" aria-label="Versões disponíveis">
        <h2 className="text-display-md font-display text-white mb-10">
          VERSÕES <span className="text-gradient-accent">DISPONÍVEIS</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicle.versions?.map((version: any, i: number) => (
            <div
              key={version.id}
              className={`card-dark p-6 ${i === 0 ? 'border-brand-mid/30' : ''}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-display text-white">{version.name}</h3>
                  {version.description && (
                    <p className="text-xs text-brand-subtle mt-1 line-clamp-2">{version.description}</p>
                  )}
                </div>
                {i === 0 && <Badge variant="neutral">Base</Badge>}
              </div>

              <p className="text-2xl font-bold font-condensed text-white mb-6">
                {formatBRL(Number(version.price))}
              </p>

              <div className="flex flex-col gap-2">
                <Link
                  href={`/configurador/${vehicle.slug}?versao=${version.slug}`}
                  id={`configurar-${version.slug}`}
                  className="block text-center py-3 bg-accent text-white text-sm font-display hover:bg-accent-dark transition-colors rounded"
                >
                  Configurar
                </Link>
                <Link
                  href="/test-drive"
                  id={`testdrive-${version.slug}`}
                  className="block text-center py-3 border border-accent/60 text-accent text-sm font-display hover:bg-accent hover:text-white transition-colors rounded"
                >
                  Agendar Test Drive
                </Link>
                <Link
                  href="/financiamiento"
                  id={`financiar-${version.slug}`}
                  className="block text-center py-3 border border-brand-mid/40 text-brand-light text-sm font-display hover:border-accent hover:text-accent transition-colors rounded"
                >
                  Simular Financiamiento
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Cores disponíveis ───────────────────────────────────────── */}
      {vehicle.colors?.length > 0 && (
        <section className="pb-20 container-site" aria-label="Cores disponíveis">
          <h2 className="text-display-md font-display text-white mb-8">
            CORES <span className="text-gradient-accent">DISPONÍVEIS</span>
          </h2>
          <div className="flex flex-wrap gap-4">
            {vehicle.colors.map((color: any) => (
              <div key={color.id} className="flex flex-col items-center gap-2">
                <button
                  className="w-10 h-10 rounded-full border-2 border-brand-mid/40 hover:border-accent transition-colors"
                  style={{ backgroundColor: color.hexCode }}
                  title={color.name}
                  aria-label={`Cor: ${color.name}`}
                />
                <span className="text-xs text-brand-subtle text-center max-w-[80px] leading-tight">
                  {color.name}
                </span>
                {color.isPremium && (
                  <span className="text-xs text-accent">
                    +{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(Number(color.additionalPrice))}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─── Configurador 3D CTA ─────────────────────────────────────── */}
      <section className="bg-brand-darker/50 border-t border-brand-mid/20 py-16">
        <div className="container-site flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-display-sm font-display text-white mb-2">
              CONFIGURE SEU {vehicle.name.toUpperCase()}
            </h2>
            <p className="text-brand-subtle">
              Escolha a versão, a cor e os acessórios no nosso configurador 3D interativo.
            </p>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            <Link
              href={`/configurador/${vehicle.slug}`}
              id={`configurador-3d-${vehicle.slug}`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white font-display hover:bg-accent-dark transition-colors rounded"
            >
              Abrir Configurador 3D
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </article>
  )
}
