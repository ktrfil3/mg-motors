'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { Badge } from '@troller/ui'

interface VehicleCard {
  id: string
  slug: string
  name: string
  tagline?: string
  category: string
  basePrice: number
  heroImage?: string
  isFeatured: boolean
}

interface ModelCarouselProps {
  vehicles: VehicleCard[]
}

function formatUSD(value: number) {
  return new Intl.NumberFormat('es-VE', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

export function ModelCarousel({ vehicles }: ModelCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: direction === 'left' ? -420 : 420, behavior: 'smooth' })
  }

  const handleScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
  }

  return (
    <section className="section-py bg-brand-black overflow-hidden" aria-label="Modelos MG">
      <div className="container-site mb-10">
        <div className="flex items-end justify-between">
          <div>
            <motion.p
              className="text-xs font-bold font-condensed uppercase tracking-[0.3em] text-accent mb-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Nuestra Línea
            </motion.p>
            <motion.h2
              className="text-display-lg font-display text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.7 }}
            >
              ELIGE TU{' '}
              <span className="text-gradient-accent">MG</span>
            </motion.h2>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Ver modelos anteriores"
              className="w-10 h-10 flex items-center justify-center rounded border border-brand-mid/40 text-brand-subtle hover:border-accent hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Ver más modelos"
              className="w-10 h-10 flex items-center justify-center rounded border border-brand-mid/40 text-brand-subtle hover:border-accent hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto scrollbar-hide px-6 lg:px-10 xl:px-16 pb-4"
        style={{ scrollSnapType: 'x mandatory' }}
        role="list"
        aria-label="Lista de modelos"
      >
        {vehicles.map((vehicle, i) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} index={i} />
        ))}

        <motion.div
          className="flex-shrink-0 w-72 flex flex-col items-center justify-center border border-brand-mid/30 rounded-lg p-8 gap-4 hover:border-accent/40 transition-all duration-300 cursor-pointer group"
          style={{ scrollSnapAlign: 'start' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Link href="/modelos" className="flex flex-col items-center gap-4 text-center">
            <div className="w-14 h-14 flex items-center justify-center rounded-full border border-brand-mid/40 group-hover:border-accent group-hover:bg-accent/10 transition-all duration-300">
              <ArrowRight size={22} className="text-brand-subtle group-hover:text-accent transition-colors" />
            </div>
            <span className="text-sm font-display text-brand-light group-hover:text-white transition-colors">
              VER TODOS LOS MODELOS
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

function VehicleCard({ vehicle, index }: { vehicle: VehicleCard; index: number }) {
  const categoryLabels: Record<string, string> = {
    OFFROAD: 'Eléctrico', SUV: 'SUV', URBAN: 'Sedán', SPORT: 'Sport', PICKUP: 'Pickup',
  }

  return (
    <motion.div
      className="flex-shrink-0 w-80 card-dark group relative overflow-hidden"
      style={{ scrollSnapAlign: 'start' }}
      role="listitem"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
    >
      <div className="relative aspect-video overflow-hidden bg-brand-dark">
        {vehicle.heroImage ? (
          <Image
            src={vehicle.heroImage}
            alt={vehicle.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="320px"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-dark to-brand-darker">
            <span className="text-5xl font-display text-brand-mid font-black">MG</span>
          </div>
        )}
        <div className="absolute inset-0 gradient-card-overlay" />
        <div className="absolute top-4 left-4">
          <Badge variant="neutral">{categoryLabels[vehicle.category] || vehicle.category}</Badge>
        </div>
        {vehicle.isFeatured && (
          <div className="absolute top-4 right-4">
            <Badge variant="accent">Destacado</Badge>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-xl font-display text-white mb-1">{vehicle.name}</h3>
        {vehicle.tagline && (
          <p className="text-xs text-brand-subtle mb-4">{vehicle.tagline}</p>
        )}
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs text-brand-subtle uppercase tracking-wider">Desde</span>
            <p className="text-lg font-bold font-condensed text-white">
              {formatUSD(vehicle.basePrice)}
            </p>
          </div>
          <Link
            href={`/modelos/${vehicle.slug}`}
            id={`card-${vehicle.slug}`}
            className="flex items-center gap-1.5 text-sm font-bold font-condensed uppercase tracking-wider text-accent hover:text-accent-light transition-colors duration-200"
          >
            Ver Modelo
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
