'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { MegaMenu } from './MegaMenu'
import { TrollerLogo } from '../brand/TrollerLogo'
import { openTestDriveModal } from '@/components/testdrive/TestDriveModalGlobal'

// ─── Ítems de navegación ──────────────────────────────────────────────────────

export const navItems = [
  { label: 'Modelos',        key: 'modelos' },
  { label: 'Ofertas',        key: 'ofertas' },
  { label: 'Financiamiento', key: 'financiamiento' },
  { label: 'Concesionarios', key: 'concesionarios' },
  { label: 'Universo MG',    key: 'universo' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeMega, setActiveMega] = useState<string | null>(null)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    setIsScrolled(y > 40)
  })

  const closeMega = useCallback(() => setActiveMega(null), [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMega()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [closeMega])

  return (
    <>
      {/* ─── Saltar al contenido (accesibilidad) ──────────────────────── */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded"
      >
        Ir al contenido principal
      </a>

      <motion.header
        className={[
          'fixed top-0 left-0 right-0 z-50 transition-colors duration-500',
          isScrolled
            ? 'bg-brand-black/95 backdrop-blur-md border-b border-brand-mid/20 shadow-lg'
            : 'bg-transparent',
        ].join(' ')}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
      >
        <div className="container-site">
          <nav
            className="flex items-center justify-between h-20"
            role="navigation"
            aria-label="Navegación principal"
          >
            {/* Logo */}
            <Link
              href="/"
              className="flex-shrink-0 focus-visible:outline-accent"
              aria-label="MG Motors Venezuela — Inicio"
              onClick={closeMega}
            >
              <TrollerLogo className="h-10 w-auto" />
            </Link>

            {/* Desktop Nav */}
            <ul className="hidden lg:flex items-center gap-1" role="list">
              {navItems.map((item) => (
                <li key={item.key}>
                  <button
                    id={`nav-${item.key}`}
                    aria-expanded={activeMega === item.key}
                    aria-controls={`mega-${item.key}`}
                    onClick={() =>
                      setActiveMega(activeMega === item.key ? null : item.key)
                    }
                    className={[
                      'flex items-center gap-1.5 px-4 py-2 rounded',
                      'text-sm font-semibold font-condensed uppercase tracking-wider',
                      'transition-colors duration-200',
                      activeMega === item.key
                        ? 'text-accent'
                        : 'text-brand-light hover:text-white',
                    ].join(' ')}
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      className={[
                        'transition-transform duration-300',
                        activeMega === item.key ? 'rotate-180 text-accent' : '',
                      ].join(' ')}
                    />
                  </button>
                </li>
              ))}
            </ul>

            {/* CTA + Mobile toggle */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => openTestDriveModal()}
                className={[
                  'hidden lg:inline-flex items-center gap-2',
                  'px-5 py-2.5 border border-accent/60 text-accent',
                  'text-sm font-bold font-condensed uppercase tracking-wider',
                  'hover:bg-accent hover:text-white transition-colors duration-200 rounded',
                ].join(' ')}
              >
                Test Drive
              </button>

              <Link
                href="/financiamiento"
                className={[
                  'hidden lg:inline-flex items-center gap-2',
                  'px-5 py-2.5 bg-accent text-white',
                  'text-sm font-bold font-condensed uppercase tracking-wider',
                  'hover:bg-accent-dark transition-colors duration-200 rounded',
                ].join(' ')}
              >
                Financiamiento
              </Link>

              <button
                className="lg:hidden p-2 text-white focus-visible:outline-accent rounded"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                aria-expanded={isMobileOpen}
                aria-label={isMobileOpen ? 'Cerrar menú' : 'Abrir menú'}
              >
                {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </nav>
        </div>

        <MegaMenu activeKey={activeMega} onClose={closeMega} />
      </motion.header>

      {/* Mobile Menu */}
      <motion.div
        className="fixed inset-0 z-40 lg:hidden bg-brand-black pt-20"
        initial={{ opacity: 0, x: '100%' }}
        animate={{ opacity: isMobileOpen ? 1 : 0, x: isMobileOpen ? '0%' : '100%' }}
        transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
        aria-hidden={!isMobileOpen}
      >
        <nav className="flex flex-col p-6 gap-2" aria-label="Menú móvil">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={`/${item.key}`}
              className="py-4 border-b border-brand-mid/30 text-xl font-display text-white hover:text-accent transition-colors"
              onClick={() => setIsMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => {
              setIsMobileOpen(false)
              openTestDriveModal()
            }}
            className="mt-6 block w-full text-center py-4 border border-accent text-accent font-display text-lg rounded hover:bg-accent hover:text-white transition-colors"
          >
            Agendar Test Drive
          </button>
          <Link
            href="/financiamiento"
            className="mt-3 block text-center py-4 bg-accent text-white font-display text-lg rounded hover:bg-accent-dark transition-colors"
            onClick={() => setIsMobileOpen(false)}
          >
            Simular Financiamiento
          </Link>
        </nav>
      </motion.div>

      {activeMega && (
        <div
          className="fixed inset-0 z-40"
          onClick={closeMega}
          aria-hidden="true"
        />
      )}
    </>
  )
}
