'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Clock, Tag } from 'lucide-react'
import { Badge } from '@troller/ui'

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface Offer {
  id: string
  title: string
  description?: string
  badgeText?: string
  originalPrice: number
  salePrice?: number
  discountPct?: number
  installments?: number
  installmentPrice?: number
  imageUrl?: string
  ctaText?: string
  ctaUrl?: string
  endsAt: string
  vehicle: {
    name: string
    slug: string
    category: string
  }
}

interface OffersGridProps {
  offers: Offer[]
}

// ─── OffersGrid ───────────────────────────────────────────────────────────────

export function OffersGrid({ offers }: OffersGridProps) {
  if (offers.length === 0) return null

  return (
    <section className="section-py gradient-section" aria-label="Ofertas especiais">
      <div className="container-site">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
          <div>
            <motion.p
              className="text-xs font-bold font-condensed uppercase tracking-[0.3em] text-accent mb-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              Promoções
            </motion.p>
            <motion.h2
              className="text-display-lg font-display text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              OFERTAS{' '}
              <span className="text-gradient-accent">ESPECIAIS</span>
            </motion.h2>
          </div>
          <Link
            href="/ofertas"
            className="flex items-center gap-2 text-sm font-bold font-condensed uppercase tracking-wider text-brand-subtle hover:text-accent transition-colors duration-200"
          >
            Ver Todas as Ofertas
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {offers.slice(0, 4).map((offer, i) => (
            <OfferCard key={offer.id} offer={offer} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── OfferCard ─────────────────────────────────────────────────────────────

function OfferCard({ offer, index }: { offer: Offer; index: number }) {
  const endsAt = new Date(offer.endsAt)
  const daysLeft = Math.ceil((endsAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))

  return (
    <motion.article
      className="card-dark flex flex-col"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
      aria-label={offer.title}
    >
      {/* Image */}
      <div className="relative aspect-video bg-brand-dark overflow-hidden">
        {offer.imageUrl ? (
          <Image
            src={offer.imageUrl}
            alt={offer.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-dark to-brand-darker">
            <Tag size={40} className="text-brand-mid" />
          </div>
        )}
        <div className="absolute inset-0 gradient-card-overlay" />

        {offer.badgeText && (
          <div className="absolute top-3 left-3">
            <Badge variant="accent">{offer.badgeText}</Badge>
          </div>
        )}
        {offer.discountPct && (
          <div className="absolute top-3 right-3">
            <span className="px-2 py-1 bg-accent text-white text-xs font-bold font-condensed rounded">
              -{Math.round(offer.discountPct)}%
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div>
          <p className="text-xs text-brand-subtle mb-1">{offer.vehicle.name}</p>
          <h3 className="text-sm font-bold text-white leading-snug line-clamp-2">{offer.title}</h3>
        </div>

        {/* Price */}
        {offer.installments && offer.installmentPrice ? (
          <div>
            <p className="text-xs text-brand-subtle">
              {offer.installments}x de
            </p>
            <p className="text-xl font-bold font-condensed text-white">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(offer.installmentPrice)}
            </p>
          </div>
        ) : offer.salePrice ? (
          <div>
            {offer.salePrice < offer.originalPrice && (
              <p className="text-xs text-brand-subtle line-through">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(offer.originalPrice)}
              </p>
            )}
            <p className="text-xl font-bold font-condensed text-white">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(offer.salePrice)}
            </p>
          </div>
        ) : null}

        {/* Expires */}
        <div className="flex items-center gap-1.5 text-xs text-brand-subtle mt-auto">
          <Clock size={12} />
          <span>
            {daysLeft > 0 ? `Termina em ${daysLeft} dia${daysLeft > 1 ? 's' : ''}` : 'Último dia!'}
          </span>
        </div>

        <Link
          href={offer.ctaUrl || `/modelos/${offer.vehicle.slug}`}
          id={`offer-${offer.id}`}
          className="mt-2 block text-center py-2.5 border border-accent text-accent text-sm font-bold font-condensed uppercase tracking-wider hover:bg-accent hover:text-white transition-all duration-200 rounded"
        >
          {offer.ctaText || 'Ver Oferta'}
        </Link>
      </div>
    </motion.article>
  )
}
