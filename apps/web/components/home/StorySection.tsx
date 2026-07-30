'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

// ─── Secciones de storytelling MG Motors Venezuela ────────────────────────────

const stories = [
  {
    id: 'innovacion',
    eyebrow: 'Innovación',
    title: 'Tecnología que transforma la manera de conducir',
    description:
      'MG Motors trae a Venezuela lo último en ingeniería automotriz: conectividad total, asistentes de conducción avanzados y plataformas eléctricas de última generación. El futuro está aquí.',
    ctaLabel: 'Nuestra Tecnología',
    ctaHref: '/nosotros#tecnologia',
    imageSide: 'right' as const,
    imageAlt: 'MG HS interior tecnológico',
    imageSrc: '/assets/story/tecnologia.jpg',
    accent: 'Siempre por delante.',
  },
  {
    id: 'electrico',
    eyebrow: 'Movilidad Eléctrica',
    title: 'El futuro eléctrico ya llegó a Venezuela',
    description:
      'El MG4 EV y el MG ZS EV combinan un torque eléctrico instantáneo, carga rápida y una autonomía de hasta 450 km. Conduce sin límites, sin emisiones.',
    ctaLabel: 'Ver Modelos Eléctricos',
    ctaHref: '/modelos/mg4-ev',
    imageSide: 'left' as const,
    imageAlt: 'MG4 EV eléctrico',
    imageSrc: '/assets/story/electrico.jpg',
    accent: 'Sin emisiones. Sin límites.',
  },
  {
    id: 'financiamiento',
    eyebrow: 'Financiamiento',
    title: 'Tu MG comienza con una simulación',
    description:
      'Simula en segundos, compara sistemas de cuotas y encuentra el plan perfecto para ti. Opciones desde $299/mes, proceso 100% digital y transparente.',
    ctaLabel: 'Simular Ahora',
    ctaHref: '/financiamiento',
    imageSide: 'right' as const,
    imageAlt: 'Simulador de financiamiento MG',
    imageSrc: '/assets/story/financiamiento.jpg',
    accent: 'Simple. Transparente.',
  },
]

export function StorySection() {
  return (
    <section className="bg-brand-black" aria-label="Universo MG Motors">
      {stories.map((story, i) => (
        <StoryItem key={story.id} story={story} index={i} />
      ))}
    </section>
  )
}

function StoryItem({ story }: { story: typeof stories[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['5%', '-5%'])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const isLeft = story.imageSide === 'left'

  return (
    <div
      ref={ref}
      className="relative min-h-[80vh] grid grid-cols-1 lg:grid-cols-2 overflow-hidden border-b border-brand-mid/10"
    >
      <div className={`relative overflow-hidden bg-brand-darker ${isLeft ? 'order-1 lg:order-1' : 'order-1 lg:order-2'}`}>
        <motion.div className="absolute inset-0 scale-110" style={{ y }}>
          {story.imageSrc ? (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${story.imageSrc})` }}
              role="img"
              aria-label={story.imageAlt}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-darker to-brand-black flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto rounded-full border-2 border-accent/30 flex items-center justify-center mb-4">
                  <span className="text-4xl font-display text-accent/40 font-black">MG</span>
                </div>
                <p className="text-sm text-brand-muted font-condensed uppercase tracking-widest">
                  {story.imageAlt}
                </p>
              </div>
            </div>
          )}
        </motion.div>
        <div
          className={`absolute inset-0 ${isLeft
            ? 'bg-gradient-to-r from-brand-black via-transparent to-transparent'
            : 'bg-gradient-to-l from-brand-black via-transparent to-transparent'
          }`}
          aria-hidden="true"
        />
      </div>

      <motion.div
        className={`relative z-10 flex items-center ${isLeft ? 'order-2 lg:order-2' : 'order-2 lg:order-1'} bg-brand-black lg:bg-transparent`}
        style={{ opacity }}
      >
        <div className="p-10 lg:p-16 xl:p-24 max-w-xl">
          <motion.p
            className="text-xs font-bold font-condensed uppercase tracking-[0.3em] text-accent mb-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {story.eyebrow}
          </motion.p>

          <motion.h2
            className="text-display-md lg:text-display-lg font-display text-white mb-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.8 }}
          >
            {story.title}
          </motion.h2>

          <motion.p
            className="text-sm font-condensed font-bold text-accent mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            {story.accent}
          </motion.p>

          <motion.p
            className="text-base text-brand-subtle leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            {story.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45, duration: 0.6 }}
          >
            <Link
              href={story.ctaHref}
              id={`story-cta-${story.id}`}
              className="inline-flex items-center gap-3 text-base font-bold font-condensed uppercase tracking-wider text-white group"
            >
              <span className="underline-accent">{story.ctaLabel}</span>
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-2" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
