'use client'

import dynamic from 'next/dynamic'
import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  Zap, Wind, Shield, Gauge, ChevronDown, ChevronRight, ChevronLeft,
  RotateCcw, Palette, ExternalLink, Star, Maximize2
} from 'lucide-react'

// ─── Importar visor 3D solo en cliente (evita error de window en SSR) ──────────
const CybersterViewer = dynamic(() => import('./CybersterViewer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-brand-darker rounded-lg">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-brand-subtle font-condensed uppercase tracking-wider">
          Cargando visor 3D…
        </span>
      </div>
    </div>
  ),
})

// ─── Datos del Cyberster ─────────────────────────────────────────────────────

// Galería de imágenes 2K para la sección de Diseño
const GALLERY_SLIDES = [
  {
    src: '/assets/models/cyberster/gallery-01-front-top.png',
    alt: 'MG Cyberster — Vista frontal superior',
    label: 'Diseño Exterior',
    detail: 'Capota eléctrica abierta · Faros LED activos',
  },
  {
    src: '/assets/models/cyberster/gallery-02-rear-3q.png',
    alt: 'MG Cyberster — Vista trasera ¾',
    label: 'Trasera Dinámica',
    detail: 'Luces LED en flecha · Difusor aerodinámico',
  },
  {
    src: '/assets/models/cyberster/gallery-03-rear-full.png',
    alt: 'MG Cyberster — Trasera completa',
    label: 'Identidad LED',
    detail: 'Firma luminosa única · Logo Cyberster',
  },
  {
    src: '/assets/models/cyberster/gallery-04-front-face.png',
    alt: 'MG Cyberster — Vista frontal',
    label: 'Frontal Deportivo',
    detail: 'Logo MG · Tomas de aire laterales · DRL en boomerang',
  },
  {
    src: '/assets/models/cyberster/gallery-05-interior.png',
    alt: 'MG Cyberster — Interior cockpit',
    label: 'Cockpit Digital',
    detail: '3 Pantallas · Volante plano · Iluminación ambiental',
  },
]

const COLORS = [
  { name: 'Rojo Cyberster',   value: '#C0392B', hex: '#C0392B' },
  { name: 'Negro Cosmos',     value: '#1a1a1a', hex: '#1a1a1a' },
  { name: 'Blanco Perla',     value: '#F0F0F0', hex: '#F0F0F0' },
  { name: 'Gris Titanio',     value: '#6B7280', hex: '#6B7280' },
  { name: 'Azul Eléctrico',   value: '#1D4ED8', hex: '#1D4ED8' },
]

const SPECS_HERO = [
  { icon: Zap,   label: 'Potencia',        value: '335 HP', sub: '250 kW' },
  { icon: Gauge, label: 'Torque',           value: '475 Nm', sub: 'Instantáneo' },
  { icon: Wind,  label: 'Velocidad Máx.',   value: '199 km/h', sub: 'Sin techo' },
  { icon: Shield,label: 'Autonomía',        value: '490 km', sub: 'Carga única' },
]

const FEATURES_DESIGN = [
  {
    title: 'Puertas Tijera',
    desc: 'Las icónicas puertas de apertura vertical en tijera convierten cada llegada en un momento de espectáculo. Diseñadas para el drama, construidas con precisión.',
    icon: '🦋',
  },
  {
    title: 'Capota Eléctrica',
    desc: 'Con un solo toque, la capota se despliega o recoge en segundos. Convierte tu coupé en roadster abierto para sentir el viento venezolano.',
    icon: '☀️',
  },
  {
    title: 'Silueta Aerodinámica',
    desc: 'Cada curva tiene un propósito: maximizar el flujo de aire, reducir la resistencia y entregar estabilidad a cualquier velocidad.',
    icon: '💨',
  },
]

const FEATURES_TECH = [
  {
    title: '3 Pantallas Digitales',
    desc: 'Cockpit envolvente con tres monitores digitales que mantienen al conductor en total control de toda la información.',
  },
  {
    title: 'Apple CarPlay & Android Auto',
    desc: 'Conecta tu smartphone de forma inalámbrica y lleva tu mundo digital al interior del Cyberster.',
  },
  {
    title: 'MG Pilot — L2',
    desc: 'Sistema de conducción semi-autónomo de nivel 2 con Control Crucero Adaptativo (ACC) y asistencia de carril (LKA).',
  },
  {
    title: 'Carga Rápida DC',
    desc: 'Compatible con carga rápida DC. Recupera hasta el 80% de la batería en aproximadamente 30 minutos.',
  },
]

const SAFETY_FEATURES = [
  { name: 'Control Crucero Adaptativo (ACC)', desc: 'Mantiene velocidad y distancia con el vehículo de adelante automáticamente.' },
  { name: 'Frenado de Emergencia (AEB)', desc: 'Frena automáticamente para evitar o mitigar colisiones a cualquier velocidad.' },
  { name: 'Monitor de Punto Ciego (BSM)', desc: 'Alerta visual en el espejo cuando hay un vehículo en el ángulo muerto.' },
  { name: 'Luces Altas Inteligentes (IHC)', desc: 'Alterna automáticamente entre luz alta y baja según el tráfico.' },
  { name: 'Asistencia de Carril (LKA)', desc: 'Detecta líneas y corrige la dirección si el vehículo sale involuntariamente del carril.' },
  { name: 'Alerta Tráfico Trasero (RTA)', desc: 'Advierte sobre vehículos que se aproximan lateralmente al reversar.' },
]

const NAV_SECTIONS = ['Visión General', 'Diseño', 'Tecnología', 'Performance', 'Seguridad', 'Visor 3D']

// ─── Componente principal ─────────────────────────────────────────────────────

export default function CybersterPage() {
  const [activeSection, setActiveSection] = useState(0)
  const [selectedColor, setSelectedColor] = useState(COLORS[0])
  const [is3DOpen, setIs3DOpen] = useState(false)
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  const heroRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <div className="bg-brand-black text-white min-h-screen" id="main-content">

      {/* ── Sticky nav del modelo ─────────────────────────────────────────── */}
      <nav className="sticky top-20 z-40 bg-brand-black/90 backdrop-blur-md border-b border-brand-mid/20">
        <div className="container-site">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-0">
            {NAV_SECTIONS.map((section, i) => (
              <button
                key={section}
                onClick={() => setActiveSection(i)}
                className={[
                  'flex-shrink-0 px-5 py-4 text-xs font-bold font-condensed uppercase tracking-widest transition-all duration-200 border-b-2',
                  activeSection === i
                    ? 'text-accent border-accent'
                    : 'text-brand-subtle border-transparent hover:text-white',
                ].join(' ')}
              >
                {section}
              </button>
            ))}
            <div className="ml-auto flex-shrink-0 pl-4">
              <Link
                href="/contacto"
                className="px-5 py-2 bg-accent text-white text-xs font-bold font-condensed uppercase tracking-wider hover:bg-accent-dark transition-colors rounded"
              >
                Cotizar
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden flex flex-col">
        {/* Fondo con imagen */}
        <motion.div
          className="absolute inset-0"
          style={{ y: heroY }}
        >
          <Image
            src="/assets/models/cyberster/hero.png"
            alt="MG Cyberster"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent" />
        </motion.div>

        {/* Contenido del hero */}
        <motion.div
          className="relative z-10 flex flex-col flex-1 container-site pt-32 pb-16"
          style={{ opacity: heroOpacity }}
        >
          <div className="flex-1 flex flex-col justify-center max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="inline-block w-8 h-0.5 bg-accent" />
                <span className="text-xs font-bold font-condensed uppercase tracking-[0.3em] text-accent">
                  Motor Único · Eléctrico
                </span>
              </div>
              <h1 className="text-6xl md:text-8xl font-display font-black text-white leading-none mb-2">
                MG
              </h1>
              <h2 className="text-4xl md:text-6xl font-display font-black text-gradient-accent leading-none mb-6">
                CYBERSTER
              </h2>
              <p className="text-lg text-brand-light/80 leading-relaxed mb-8 max-w-lg">
                El roadster eléctrico que redefine la emoción de conducir. Puertas tijera,
                capota eléctrica y 490 km de autonomía. La pasión tiene un nuevo nombre.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contacto"
                  className="px-8 py-4 bg-accent text-white font-display text-lg hover:bg-accent-dark transition-all duration-300 rounded"
                >
                  Cotizar Ahora
                </Link>
                <button
                  onClick={() => { setIs3DOpen(true); setActiveSection(5) }}
                  className="flex items-center gap-2 px-8 py-4 border border-white/30 text-white font-display text-lg hover:border-accent hover:text-accent transition-all duration-300 rounded"
                >
                  <RotateCcw size={18} />
                  Ver en 3D
                </button>
              </div>
            </motion.div>
          </div>

          {/* Stats bar */}
          <motion.div
            className="mt-12 border-t border-white/10 pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {SPECS_HERO.map(({ icon: Icon, label, value, sub }) => (
                <div key={label} className="flex flex-col">
                  <Icon size={18} className="text-accent mb-2" />
                  <span className="text-2xl font-display text-white font-bold">{value}</span>
                  <span className="text-xs text-accent font-medium">{sub}</span>
                  <span className="text-xs text-brand-subtle uppercase tracking-wider mt-0.5">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Degradado al siguiente bloque */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent 0%, #0A0A0A 100%)' }}
        />
        <motion.div
          className="relative z-10 flex flex-col items-center gap-1 text-brand-subtle pb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span className="text-xs font-condensed uppercase tracking-widest">Descubrir</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── SECCIÓN DISEÑO ───────────────────────────────────────────────── */}
      <section className="section-py bg-brand-black" id="diseno">
        <div className="container-site">
          <div className="text-center mb-16">
            <motion.p
              className="text-xs font-bold font-condensed uppercase tracking-[0.3em] text-accent mb-3"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            >
              Precisión en Cada Detalle
            </motion.p>
            <motion.h2
              className="text-display-lg font-display text-white"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              DISEÑO QUE{' '}
              <span className="text-gradient-accent">DESAFÍA</span>
            </motion.h2>
            <motion.p
              className="text-brand-subtle max-w-2xl mx-auto mt-4 leading-relaxed"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              El Cyberster es un homenaje a quienes desafían lo ordinario. Con sus líneas elegantes
              y silueta aerodinámica, cada detalle celebra el rendimiento y el estilo.
            </motion.p>
          </div>

          {/* ── Galería con slider 2K ────────────────────────────── */}
          <CybersterGallery />

          {/* Cards de características de diseño */}
          <div className="grid md:grid-cols-3 gap-6">
            {FEATURES_DESIGN.map((feat, i) => (
              <motion.div
                key={feat.title}
                className="card-dark p-8 hover:border-accent/30 transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
              >
                <div className="text-4xl mb-4">{feat.icon}</div>
                <h3 className="text-xl font-display text-white mb-3 group-hover:text-accent transition-colors">
                  {feat.title}
                </h3>
                <p className="text-sm text-brand-subtle leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECCIÓN TECNOLOGÍA ───────────────────────────────────────────── */}
      <section className="section-py bg-brand-darker" id="tecnologia">
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.p
                className="text-xs font-bold font-condensed uppercase tracking-[0.3em] text-accent mb-3"
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              >
                Tecnología de Vanguardia
              </motion.p>
              <motion.h2
                className="text-display-md font-display text-white mb-6"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                CONECTADO AL{' '}
                <span className="text-gradient-accent">FUTURO</span>
              </motion.h2>
              <motion.p
                className="text-brand-subtle leading-relaxed mb-10"
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                El MG Cyberster viene con una oferta tecnológica robusta diseñada para enriquecer
                cada kilómetro: 3 pantallas envolventes, asistencia de conducción avanzada y
                conectividad total con tu smartphone.
              </motion.p>
              <div className="flex flex-col gap-4">
                {FEATURES_TECH.map((feat, i) => (
                  <motion.div
                    key={feat.title}
                    className="flex gap-4 p-4 rounded-lg border border-brand-mid/20 hover:border-accent/30 transition-all duration-300 group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                  >
                    <div className="w-1 bg-accent rounded-full flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-display text-white group-hover:text-accent transition-colors mb-1">
                        {feat.title}
                      </h4>
                      <p className="text-xs text-brand-subtle leading-relaxed">{feat.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div
              className="relative rounded-xl overflow-hidden aspect-[4/3]"
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.8 }}
            >
              <Image
                src="/assets/models/cyberster/interior.png"
                alt="MG Cyberster interior con 3 pantallas"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-xs font-condensed text-white uppercase tracking-widest">
                    3 Pantallas Digitales · Cockpit Envolvente
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SECCIÓN PERFORMANCE ─────────────────────────────────────────── */}
      <section className="section-py bg-brand-black relative overflow-hidden" id="performance">
        {/* Fondo decorativo */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle at 30% 50%, #E85D04 0%, transparent 60%)',
          }}
        />
        <div className="container-site relative z-10">
          <div className="text-center mb-16">
            <motion.p
              className="text-xs font-bold font-condensed uppercase tracking-[0.3em] text-accent mb-3"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            >
              Performance
            </motion.p>
            <motion.h2
              className="text-display-lg font-display text-white"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              490 KM. UNA{' '}
              <span className="text-gradient-accent">CARGA.</span>
            </motion.h2>
          </div>

          {/* Métricas grandes */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0.5 mb-16">
            {[
              { value: '335', unit: 'HP',    label: 'Potencia Máxima',   sub: '250 kW' },
              { value: '475', unit: 'Nm',    label: 'Torque Máximo',     sub: 'Al instante' },
              { value: '199', unit: 'km/h',  label: 'Velocidad Máxima',  sub: 'Electrizante' },
              { value: '490', unit: 'km',    label: 'Autonomía',         sub: 'Carga única WLTP' },
            ].map((metric, i) => (
              <motion.div
                key={metric.label}
                className="flex flex-col items-center p-10 bg-brand-darker border border-brand-mid/10 hover:border-accent/20 transition-colors"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
              >
                <span className="text-6xl md:text-7xl font-display font-black text-accent leading-none">
                  {metric.value}
                </span>
                <span className="text-xl font-display text-white mt-1">{metric.unit}</span>
                <span className="text-xs text-brand-subtle uppercase tracking-wider mt-3 text-center">
                  {metric.label}
                </span>
                <span className="text-xs text-accent/70 mt-1">{metric.sub}</span>
              </motion.div>
            ))}
          </div>

          {/* Barra de autonomía visual */}
          <motion.div
            className="card-dark p-8"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          >
            <p className="text-xs font-condensed uppercase tracking-widest text-brand-subtle mb-6">
              Autonomía comparativa
            </p>
            <div className="flex flex-col gap-4">
              {[
                { label: 'Modo ECO', km: 490, pct: 100 },
                { label: 'Modo NORMAL', km: 420, pct: 86 },
                { label: 'Modo SPORT', km: 320, pct: 65 },
              ].map((mode) => (
                <div key={mode.label} className="flex items-center gap-4">
                  <span className="text-xs font-condensed text-brand-subtle w-28 flex-shrink-0">
                    {mode.label}
                  </span>
                  <div className="flex-1 h-2 bg-brand-mid/30 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-accent rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${mode.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                    />
                  </div>
                  <span className="text-sm font-bold font-condensed text-white w-16 text-right flex-shrink-0">
                    {mode.km} km
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECCIÓN SEGURIDAD ────────────────────────────────────────────── */}
      <section className="section-py bg-brand-darker" id="seguridad">
        <div className="container-site">
          <div className="text-center mb-12">
            <motion.p
              className="text-xs font-bold font-condensed uppercase tracking-[0.3em] text-accent mb-3"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            >
              Trayectos Más Seguros
            </motion.p>
            <motion.h2
              className="text-display-lg font-display text-white"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              MG PILOT{' '}
              <span className="text-gradient-accent">L2</span>
            </motion.h2>
            <motion.p
              className="text-brand-subtle max-w-2xl mx-auto mt-4 leading-relaxed"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              6 airbags, sistema de conducción semi-autónomo L2 MG Pilot y tecnologías activas
              de asistencia hacen del Cyberster uno de los más seguros de su clase.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SAFETY_FEATURES.map((feat, i) => (
              <motion.div
                key={feat.name}
                className="p-6 rounded-lg border border-brand-mid/20 hover:border-accent/30 transition-all duration-300 group cursor-default"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
              >
                <div className="flex items-start gap-3">
                  <Shield size={16} className="text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-display text-white group-hover:text-accent transition-colors mb-2">
                      {feat.name}
                    </h4>
                    <p className="text-xs text-brand-subtle leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Badge 6 airbags */}
          <motion.div
            className="mt-10 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 border border-accent/30 rounded-full bg-accent/10">
              <Shield size={18} className="text-accent" />
              <span className="text-sm font-bold font-condensed uppercase tracking-wider text-white">
                6 Airbags de Serie
              </span>
              <Star size={14} className="text-accent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECCIÓN VERSIONES + COLOR PICKER ────────────────────────────── */}
      <section className="section-py bg-brand-black" id="versiones">
        <div className="container-site">
          <div className="text-center mb-12">
            <motion.p
              className="text-xs font-bold font-condensed uppercase tracking-[0.3em] text-accent mb-3"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            >
              Personaliza tu Cyberster
            </motion.p>
            <motion.h2
              className="text-display-lg font-display text-white"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              ELIGE TU{' '}
              <span className="text-gradient-accent">COLOR</span>
            </motion.h2>
          </div>

          {/* Color picker */}
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-wrap justify-center gap-4">
              {COLORS.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c)}
                  className={[
                    'group flex flex-col items-center gap-2 transition-all duration-300',
                    selectedColor.name === c.name ? 'scale-110' : 'opacity-70 hover:opacity-100',
                  ].join(' ')}
                  aria-label={`Color: ${c.name}`}
                >
                  <div
                    className={[
                      'w-10 h-10 rounded-full border-2 transition-all duration-300',
                      selectedColor.name === c.name
                        ? 'border-accent scale-110 shadow-glow-accent'
                        : 'border-brand-mid/50',
                    ].join(' ')}
                    style={{ backgroundColor: c.hex }}
                  />
                  <span className={[
                    'text-xs font-condensed uppercase tracking-wider transition-colors',
                    selectedColor.name === c.name ? 'text-accent' : 'text-brand-subtle',
                  ].join(' ')}>
                    {c.name}
                  </span>
                </button>
              ))}
            </div>

            {/* CTA para abrir visor 3D */}
            <button
              onClick={() => setIs3DOpen(true)}
              className="flex items-center gap-3 px-8 py-4 border border-accent/40 text-accent font-display text-lg hover:bg-accent hover:text-white transition-all duration-300 rounded group"
            >
              <RotateCcw size={20} className="group-hover:rotate-180 transition-transform duration-500" />
              Ver en Visor 3D con este color
            </button>
          </div>
        </div>
      </section>

      {/* ── MODAL / FULLSCREEN VISOR 3D ─────────────────────────────────── */}
      <AnimatePresence>
        {is3DOpen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-brand-black flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Header del visor */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-brand-mid/20">
              <div className="flex items-center gap-3">
                <Palette size={18} className="text-accent" />
                <span className="text-sm font-condensed uppercase tracking-widest text-white">
                  Visor 3D — MG Cyberster
                </span>
                <span className="text-xs text-brand-subtle">
                  · {selectedColor.name}
                </span>
              </div>
              <div className="flex items-center gap-4">
                {/* Mini color picker en el visor */}
                <div className="flex gap-2">
                  {COLORS.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={[
                        'w-6 h-6 rounded-full border-2 transition-all duration-200',
                        selectedColor.name === c.name ? 'border-accent scale-125' : 'border-brand-mid/50',
                      ].join(' ')}
                      style={{ backgroundColor: c.hex }}
                      aria-label={c.name}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setIs3DOpen(false)}
                  className="px-4 py-2 text-xs font-condensed uppercase tracking-wider text-brand-subtle hover:text-white border border-brand-mid/30 hover:border-white/30 rounded transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>

            {/* Canvas 3D */}
            <div className="flex-1">
              <CybersterViewer color={selectedColor.value} />
            </div>

            {/* Instrucciones */}
            <div className="px-6 py-3 border-t border-brand-mid/20 flex items-center justify-center gap-6 text-xs text-brand-muted">
              <span>🖱 Arrastrar para rotar</span>
              <span>🔎 Scroll para zoom</span>
              <span>👆 Click derecho para desplazar</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FAQ / PREGUNTAS FRECUENTES ───────────────────────────────────── */}
      <section className="section-py bg-brand-darker">
        <div className="container-site max-w-3xl">
          <div className="text-center mb-12">
            <motion.h2
              className="text-display-md font-display text-white"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            >
              PREGUNTAS{' '}
              <span className="text-gradient-accent">FRECUENTES</span>
            </motion.h2>
          </div>

          {[
            {
              q: '¿El MG Cyberster está disponible en Venezuela?',
              a: 'Sí, el MG Cyberster está disponible a través de la red oficial de concesionarios MG Motors Venezuela. Contáctanos para verificar disponibilidad de inventario en tu ciudad.',
            },
            {
              q: '¿Cuánto tiempo tarda en cargarse?',
              a: 'Con carga rápida DC, la batería pasa de 10% a 80% en aproximadamente 30 minutos. Con carga normal en corriente alterna (AC), una carga completa toma entre 6 y 8 horas.',
            },
            {
              q: '¿Cuál es la garantía del Cyberster?',
              a: 'El MG Cyberster incluye garantía de 5 años o 100.000 km para la carrocería y componentes mecánicos, y garantía de 8 años o 150.000 km para la batería eléctrica.',
            },
            {
              q: '¿Las puertas tijera son seguras en caso de vuelco?',
              a: 'Sí. Las puertas de apertura vertical del Cyberster cuentan con estructuras de refuerzo especialmente diseñadas para mantener la integridad del habitáculo en caso de accidente, cumpliendo estrictos estándares de seguridad.',
            },
            {
              q: '¿Se puede usar en carreteras venezolanas?',
              a: 'Absolutamente. El Cyberster está diseñado para uso en carretera y ciudad. Aunque es un roadster de alto rendimiento, su suspensión ha sido calibrada para adaptarse a diferentes tipos de superficie.',
            },
          ].map((faq, i) => (
            <motion.div
              key={i}
              className="border-b border-brand-mid/20"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <button
                className="w-full flex items-center justify-between py-5 text-left group"
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
              >
                <span className="text-sm font-display text-white group-hover:text-accent transition-colors pr-4">
                  {faq.q}
                </span>
                <ChevronRight
                  size={18}
                  className={[
                    'flex-shrink-0 text-accent transition-transform duration-300',
                    activeFaq === i ? 'rotate-90' : '',
                  ].join(' ')}
                />
              </button>
              <AnimatePresence>
                {activeFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm text-brand-subtle leading-relaxed pb-5">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────────────────────── */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/assets/models/cyberster/hero.png"
            alt=""
            fill
            className="object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/80 to-brand-black" />
        </div>
        <div className="relative z-10 container-site text-center">
          <motion.h2
            className="text-display-xl font-display text-white mb-6"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            ¿LISTO PARA EL{' '}
            <span className="text-gradient-accent">FUTURO?</span>
          </motion.h2>
          <motion.p
            className="text-brand-subtle text-lg max-w-xl mx-auto mb-10"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Solicita una cotización personalizada o encuentra tu concesionario MG más cercano.
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/test-drive"
              className="px-10 py-5 bg-accent text-white font-display text-xl hover:bg-accent-light transition-all duration-300 rounded shadow-lg shadow-accent/20"
            >
              Agendar Test Drive
            </Link>
            <Link
              href="/contacto"
              className="px-10 py-5 border border-accent text-accent font-display text-xl hover:bg-accent hover:text-white transition-all duration-300 rounded"
            >
              Solicitar Cotización
            </Link>
            <Link
              href="/concesionarios"
              className="flex items-center gap-2 px-10 py-5 border border-white/30 text-white font-display text-xl hover:border-white transition-all duration-300 rounded"
            >
              <ExternalLink size={18} />
              Ver Concesionarios
            </Link>
          </motion.div>
          <p className="text-xs text-brand-muted mt-8">
            * Imágenes de referencia. Disponibilidad de colores y equipamiento puede variar.
            Sujeto a disponibilidad de inventario. Consulta con tu concesionario.
          </p>
        </div>
      </section>
    </div>
  )
}

// ─── CybersterGallery — Slider de imágenes 2K premium ────────────────────────

function CybersterGallery() {
  const [current, setCurrent] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const total = GALLERY_SLIDES.length

  const prev = useCallback(() =>
    setCurrent((c) => (c - 1 + total) % total), [total])
  const next = useCallback(() =>
    setCurrent((c) => (c + 1) % total), [total])

  // Avance automático
  useEffect(() => {
    if (isPaused) return
    const id = setInterval(next, 5000)
    return () => clearInterval(id)
  }, [isPaused, next])

  // Teclado
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape') setIsFullscreen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prev, next])

  // Swipe táctil
  const touchStart = useRef<number>(0)
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev()
  }

  const slide = GALLERY_SLIDES[current]

  const SliderContent = (
    <div
      className="relative w-full overflow-hidden bg-brand-darkest"
      style={{ aspectRatio: isFullscreen ? 'auto' : '16/7' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* ── Slides ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.65, ease: [0.19, 1, 0.22, 1] }}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={current === 0}
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 2560px"
            quality={95}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Overlay gradientes ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-black/30 via-transparent to-brand-black/30 pointer-events-none" />

      {/* ── Etiqueta slide ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`label-${current}`}
          className="absolute bottom-20 left-8 z-10"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
        >
          <span className="block text-xs font-bold font-condensed uppercase tracking-[0.3em] text-accent mb-1">
            {slide.label}
          </span>
          <span className="block text-sm text-white/70 font-condensed">
            {slide.detail}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* ── Contador ── */}
      <div className="absolute top-6 right-6 z-10 flex items-center gap-2">
        <span className="text-2xl font-display text-white font-bold leading-none">
          {String(current + 1).padStart(2, '0')}
        </span>
        <span className="text-brand-muted text-sm">/</span>
        <span className="text-brand-muted text-sm">{String(total).padStart(2, '0')}</span>
      </div>

      {/* ── Botón fullscreen ── */}
      <button
        onClick={() => setIsFullscreen(!isFullscreen)}
        className="absolute top-6 left-6 z-10 w-9 h-9 flex items-center justify-center rounded border border-white/20 bg-black/30 text-white/60 hover:border-accent hover:text-accent transition-all duration-200 backdrop-blur-sm"
        aria-label="Pantalla completa"
      >
        <Maximize2 size={14} />
      </button>

      {/* ── Flechas de navegación ── */}
      <button
        onClick={prev}
        aria-label="Imagen anterior"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 group"
      >
        <div className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-sm text-white group-hover:border-accent group-hover:bg-accent/20 group-hover:text-accent transition-all duration-300 group-hover:scale-110">
          <ChevronLeft size={22} />
        </div>
      </button>
      <button
        onClick={next}
        aria-label="Imagen siguiente"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 group"
      >
        <div className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-sm text-white group-hover:border-accent group-hover:bg-accent/20 group-hover:text-accent transition-all duration-300 group-hover:scale-110">
          <ChevronRight size={22} />
        </div>
      </button>

      {/* ── Barra de progreso auto-avance ── */}
      {!isPaused && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-mid/30 z-20">
          <motion.div
            className="h-full bg-accent"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 5, ease: 'linear' }}
            key={`prog-${current}-${isPaused}`}
          />
        </div>
      )}
    </div>
  )

  return (
    <motion.div
      className="mb-16"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* ── Slider principal ── */}
      <div className="relative rounded-xl overflow-hidden">
        {SliderContent}
      </div>

      {/* ── Tiras de miniaturas ── */}
      <div className="flex gap-2 mt-3">
        {GALLERY_SLIDES.map((s, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={s.label}
            className={[
              'relative flex-1 overflow-hidden rounded transition-all duration-300',
              i === current
                ? 'ring-2 ring-accent ring-offset-1 ring-offset-brand-black'
                : 'opacity-50 hover:opacity-80',
            ].join(' ')}
            style={{ aspectRatio: '16/9' }}
          >
            <Image
              src={s.src}
              alt={s.label}
              fill
              className="object-cover"
              sizes="200px"
            />
            {/* Indicador activo */}
            {i === current && (
              <div className="absolute inset-0 bg-accent/10" />
            )}
          </button>
        ))}
      </div>

      {/* ── Modal pantalla completa ── */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative w-full h-full">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-contain"
                quality={100}
                sizes="100vw"
              />
            </div>
            {/* Flechas fullscreen */}
            <button
              onClick={prev}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center rounded-full border border-white/20 bg-black/60 text-white hover:border-accent hover:text-accent transition-all duration-200"
              aria-label="Anterior"
            >
              <ChevronLeft size={26} />
            </button>
            <button
              onClick={next}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center rounded-full border border-white/20 bg-black/60 text-white hover:border-accent hover:text-accent transition-all duration-200"
              aria-label="Siguiente"
            >
              <ChevronRight size={26} />
            </button>
            {/* Info + cerrar */}
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/60 to-transparent flex items-end justify-between">
              <div>
                <p className="text-xs font-condensed uppercase tracking-widest text-accent mb-1">{slide.label}</p>
                <p className="text-sm text-white/70">{slide.detail}</p>
              </div>
              <button
                onClick={() => setIsFullscreen(false)}
                className="px-5 py-2.5 border border-white/20 text-white/70 hover:border-accent hover:text-accent text-xs font-condensed uppercase tracking-wider rounded transition-all duration-200"
              >
                Cerrar esc
              </button>
            </div>
            {/* Miniaturas fullscreen */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-2">
              {GALLERY_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={[
                    'h-1 rounded-full transition-all duration-300',
                    i === current ? 'w-8 bg-accent' : 'w-4 bg-white/30 hover:bg-white/60',
                  ].join(' ')}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
