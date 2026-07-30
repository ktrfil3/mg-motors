'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

// ─── Datos del MegaMenu ───────────────────────────────────────────────────────

const menuContent: Record<string, {
  title: string
  columns: Array<{ heading: string; links: Array<{ label: string; href: string; desc?: string }> }>
  featured?: { title: string; desc: string; href: string; ctaLabel: string }
}> = {
  modelos: {
    title: 'Descubre los Modelos',
    columns: [
      {
        heading: 'Eléctricos',
        links: [
          { label: 'MG4 EV', href: '/modelos/mg4-ev', desc: 'Deportivo 100% eléctrico' },
          { label: 'MG ZS EV', href: '/modelos/zs-ev', desc: 'SUV eléctrico compacto' },
          { label: 'MG5 EV', href: '/modelos/mg5-ev', desc: 'Sedán eléctrico' },
        ],
      },
      {
        heading: 'SUV',
        links: [
          { label: 'MG ZS', href: '/modelos/zs', desc: 'SUV compacto versátil' },
          { label: 'MG HS', href: '/modelos/hs', desc: 'SUV mediano premium' },
          { label: 'MG RX5', href: '/modelos/rx5', desc: 'SUV familiar potente' },
        ],
      },
      {
        heading: 'Sedán & Hatchback',
        links: [
          { label: 'MG5', href: '/modelos/mg5', desc: 'Sedán moderno' },
          { label: 'MG3', href: '/modelos/mg3', desc: 'Hatchback dinámico' },
        ],
      },
      {
        heading: 'Herramientas',
        links: [
          { label: 'Comparar Modelos', href: '/modelos/comparar' },
          { label: 'Configurador 3D', href: '/configurador/zs' },
          { label: 'Ver Todos', href: '/modelos' },
        ],
      },
    ],
    featured: {
      title: 'MG4 EV',
      desc: 'El futuro ya llegó a Venezuela. Hasta 450 km de autonomía.',
      href: '/modelos/mg4-ev',
      ctaLabel: 'Conocer Ahora',
    },
  },

  ofertas: {
    title: 'Ofertas Especiales',
    columns: [
      {
        heading: 'Destacadas',
        links: [
          { label: 'MG ZS — Plan Especial', href: '/ofertas', desc: 'Cuotas desde $299/mes' },
          { label: 'MG HS — Accesorios Gratis', href: '/ofertas', desc: '$2.000 en accesorios' },
          { label: 'MG4 EV — Cargador Incluido', href: '/ofertas', desc: 'Cargador doméstico gratis' },
        ],
      },
      {
        heading: 'Financiamiento',
        links: [
          { label: 'Primera cuota en 90 días', href: '/financiamiento' },
          { label: 'Tasa desde 0% anual', href: '/financiamiento' },
          { label: 'Simulador de cuotas', href: '/financiamiento' },
        ],
      },
    ],
    featured: {
      title: 'Oferta del Mes',
      desc: 'MG ZS con plan especial y primera cuota en 90 días.',
      href: '/ofertas',
      ctaLabel: 'Ver Oferta',
    },
  },

  financiamiento: {
    title: 'Financiamiento MG',
    columns: [
      {
        heading: 'Simula Ahora',
        links: [
          { label: 'Simulador de Cuotas', href: '/financiamiento', desc: 'Calcula tu cuota mensual' },
          { label: 'Sistema Francés', href: '/financiamiento?sistema=PRICE' },
          { label: 'Sistema Alemán', href: '/financiamiento?sistema=SAC' },
        ],
      },
      {
        heading: 'Crédito',
        links: [
          { label: 'Consulta de Crédito', href: '/consulta-credito', desc: 'Análisis personalizado' },
          { label: 'Condiciones Especiales', href: '/ofertas' },
        ],
      },
      {
        heading: 'Información',
        links: [
          { label: 'Cómo Funciona', href: '/financiamiento#como-funciona' },
          { label: 'Preguntas Frecuentes', href: '/financiamiento#faq' },
          { label: 'Privacidad de Datos', href: '/privacidad' },
        ],
      },
    ],
  },

  concesionarios: {
    title: 'Red de Concesionarios',
    columns: [
      {
        heading: 'Encuéntranos',
        links: [
          { label: 'Por Ubicación', href: '/concesionarios', desc: 'Mapa interactivo' },
          { label: 'Caracas', href: '/concesionarios?ciudad=caracas' },
          { label: 'Maracaibo', href: '/concesionarios?ciudad=maracaibo' },
          { label: 'Valencia', href: '/concesionarios?ciudad=valencia' },
          { label: 'Barquisimeto', href: '/concesionarios?ciudad=barquisimeto' },
          { label: 'Maracay', href: '/concesionarios?ciudad=maracay' },
        ],
      },
      {
        heading: 'Servicios',
        links: [
          { label: 'Ventas', href: '/concesionarios?servicio=ventas' },
          { label: 'Servicio Técnico', href: '/concesionarios?servicio=servicio' },
          { label: 'Repuestos y Accesorios', href: '/concesionarios?servicio=repuestos' },
        ],
      },
    ],
  },

  universo: {
    title: 'Universo MG',
    columns: [
      {
        heading: 'La Marca',
        links: [
          { label: 'Nuestra Historia', href: '/nosotros' },
          { label: 'Tecnología MG', href: '/nosotros#tecnologia' },
          { label: 'Compromiso Verde', href: '/nosotros#sostenibilidad' },
        ],
      },
      {
        heading: 'Comunidad',
        links: [
          { label: 'Club MG Venezuela', href: '/comunidad' },
          { label: 'Eventos', href: '/eventos' },
        ],
      },
      {
        heading: 'Contacto',
        links: [
          { label: 'Contáctanos', href: '/contacto' },
          { label: 'Servicio al Cliente', href: '/contacto#sac' },
        ],
      },
    ],
  },
}

// ─── MegaMenu ─────────────────────────────────────────────────────────────────

interface MegaMenuProps {
  activeKey: string | null
  onClose: () => void
}

export function MegaMenu({ activeKey, onClose }: MegaMenuProps) {
  const content = activeKey ? menuContent[activeKey] : null

  return (
    <AnimatePresence>
      {activeKey && content && (
        <motion.div
          id={`mega-${activeKey}`}
          role="region"
          aria-label={content.title}
          className="absolute top-full left-0 right-0 glass border-t border-brand-mid/20 shadow-2xl"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
        >
          <div className="container-site py-10">
            <div className="grid grid-cols-12 gap-8">
              <div className={`${content.featured ? 'col-span-8' : 'col-span-12'}`}>
                <p className="text-xs font-bold font-condensed uppercase tracking-widest text-brand-subtle mb-6">
                  {content.title}
                </p>
                <div
                  className={`grid gap-8 ${
                    content.columns.length >= 4 ? 'grid-cols-4' :
                    content.columns.length === 3 ? 'grid-cols-3' : 'grid-cols-2'
                  }`}
                >
                  {content.columns.map((col) => (
                    <div key={col.heading}>
                      <h3 className="text-xs font-bold font-condensed uppercase tracking-widest text-accent mb-3 pb-2 border-b border-brand-mid/30">
                        {col.heading}
                      </h3>
                      <ul className="flex flex-col gap-2.5">
                        {col.links.map((link) => (
                          <li key={link.href + link.label}>
                            <Link
                              href={link.href}
                              className="group flex flex-col"
                              onClick={onClose}
                            >
                              <span className="text-sm font-medium text-brand-light group-hover:text-white transition-colors duration-200">
                                {link.label}
                              </span>
                              {link.desc && (
                                <span className="text-xs text-brand-subtle group-hover:text-brand-muted transition-colors duration-200">
                                  {link.desc}
                                </span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {content.featured && (
                <div className="col-span-4">
                  <div className="h-full glass-light rounded-lg p-6 flex flex-col justify-between border border-brand-mid/20 hover:border-accent/30 transition-colors duration-300">
                    <div>
                      <span className="text-xs font-bold font-condensed uppercase tracking-widest text-accent">
                        Destacado
                      </span>
                      <h3 className="text-xl font-display mt-2 mb-3 text-white">
                        {content.featured.title}
                      </h3>
                      <p className="text-sm text-brand-subtle leading-relaxed">
                        {content.featured.desc}
                      </p>
                    </div>
                    <Link
                      href={content.featured.href}
                      className="inline-flex items-center gap-2 mt-6 text-sm font-bold font-condensed uppercase tracking-wider text-accent hover:text-accent-light transition-colors duration-200"
                      onClick={onClose}
                    >
                      {content.featured.ctaLabel}
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
