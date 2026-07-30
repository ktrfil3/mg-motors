'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { HeroPressWidget } from './HeroPressWidget'

// ─── Hero — Full-bleed con video de fondo ─────────────────────────────────────
// Video real: reemplazar /assets/video/hero.mp4 con el asset definitivo

export function Hero() {
  return (
    <section
      className="relative flex flex-col min-h-screen overflow-hidden"
      aria-label="Sección principal"
    >
      {/* ─── Background video ──────────────────────────────────────────── */}
      <video
        className="video-bg"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        poster="/assets/video/hero-poster.jpg"
      >
        <source src="/assets/video/hero.mp4" type="video/mp4" />
      </video>

      {/* ─── Gradient overlay lateral (oscurece el lado izquierdo) ─────── */}
      <div className="absolute inset-0 gradient-hero-overlay" aria-hidden="true" />

      {/* ─── Noise texture overlay (efecto premium) ─────────────────────── */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* ─── Contenido principal ────────────────────────────────────────── */}
      {/*
          ESTRUCTURA CORREGIDA:
          - flex-col + justify-between elimina la superposición
          - pt-32 deja espacio al header fijo
          - Stats bar y scroll indicator están en el flujo normal (no absolute)
      */}
      <div className="relative z-10 flex flex-col flex-1 container-site w-full pt-32 md:pt-36 pb-6">

        {/* Contenido en 2 columnas: izquierda (Texto + CTAs) y derecha (Notas de Prensa MG) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center flex-1 my-6">
          {/* Columna Izquierda: Texto y CTAs */}
          <motion.div
            className="lg:col-span-7 flex flex-col justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Eyebrow */}
            <motion.div
              className="flex items-center gap-3 mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
            >
              <span className="inline-block w-8 h-0.5 bg-accent" />
              <span className="text-xs font-bold font-condensed uppercase tracking-[0.3em] text-accent">
                Innovación Venezolana
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="text-display-xl lg:text-display-2xl font-display text-white leading-none mb-5"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            >
              MANEJA EL{' '}
              <span className="text-gradient-accent">FUTURO</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              className="text-lg text-brand-light/80 leading-relaxed mb-8 max-w-lg font-sans"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
            >
              Tecnología, diseño y potencia al alcance de Venezuela.
              Descubre los modelos MG y vive una experiencia de conducción sin igual.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
            >
              <Link
                href="/modelos"
                id="hero-cta-primary"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white font-display text-lg hover:bg-accent-dark transition-all duration-300 rounded"
              >
                Ver Modelos
              </Link>
              <Link
                href="/financiamiento"
                id="hero-cta-secondary"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-white font-display text-lg hover:border-white hover:bg-white/5 transition-all duration-300 rounded"
              >
                Simular Financiamiento
              </Link>
            </motion.div>
          </motion.div>

          {/* Columna Derecha: Widget de Notas de Prensa (donde el usuario resaltó el cuadro rojo) */}
          <motion.div
            className="lg:col-span-5 w-full self-stretch flex flex-col"
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          >
            <HeroPressWidget />
          </motion.div>
        </div>

        {/* ─── Stats bar ──────────────────────────────────────────────── */}
        <motion.div
          className="mt-12 pb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
        >
          <div className="flex flex-wrap gap-8 md:gap-16 border-t border-white/10 pt-8">
            {[
              { value: '8',    unit: 'Modelos',     label: 'Disponibles' },
              { value: '15',   unit: 'Concesionarios', label: 'en Venezuela' },
              { value: '10+',  unit: 'Años',        label: 'de experiencia' },
              { value: '100%', unit: 'Garantía',    label: 'respaldo oficial' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-3xl font-display text-accent leading-none">
                  {stat.value} <span className="text-white">{stat.unit}</span>
                </span>
                <span className="text-xs text-brand-subtle uppercase tracking-wider mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ─── Scroll indicator ────────────────────────────────────────────── */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-1 text-brand-subtle pb-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        aria-hidden="true"
      >
        <span className="text-xs font-condensed uppercase tracking-widest">Explorar</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>

      {/* ─── Degradado inferior: funde el hero con el body negro ────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, #0A0A0A 100%)',
        }}
        aria-hidden="true"
      />
    </section>
  )
}
