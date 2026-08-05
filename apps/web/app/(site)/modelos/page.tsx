'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Datos de Categorías y Modelos ───────────────────────────────────────────

const CATEGORIES = [
  'Modelos',
  'Hatchback',
  'Sedán',
  'SUV',
  'Convertible',
  'Híbridos'
]

const MODELS = [
  {
    id: 'new-mg3',
    name: 'NEW MG3',
    categories: ['Hatchback'],
    image: '/assets/models/mg3/hero.png', // Placeholder o ruta existente
    transmissions: ['Automático', 'Sincrónico'],
    slug: 'mg3'
  },
  {
    id: 'new-mg3-hybrid',
    name: 'NEW MG3 HYBRID',
    categories: ['Hatchback', 'Híbridos'],
    image: '/assets/models/mg3-hybrid/hero.png',
    transmissions: ['Automático'],
    slug: 'mg3-hybrid'
  },
  {
    id: 'new-mg5',
    name: 'NEW MG5',
    categories: ['Sedán'],
    image: '/assets/models/mg5/hero.png',
    transmissions: ['Automático', 'Sincrónico'],
    slug: 'mg5'
  },
  {
    id: 'mg-gt',
    name: 'MG GT',
    categories: ['Sedán'],
    image: '/assets/models/mg-gt/hero.png',
    transmissions: ['Automático'],
    slug: 'mg-gt'
  },
  {
    id: 'mg-zs',
    name: 'MG ZS',
    categories: ['SUV'],
    image: '/assets/models/zs/hero.png',
    transmissions: ['Automático', 'Sincrónico'],
    slug: 'zs'
  },
  {
    id: 'mg-rx5',
    name: 'MG RX5',
    categories: ['SUV'],
    image: '/assets/models/rx5/hero.png',
    transmissions: ['Automático'],
    slug: 'rx5'
  },
  {
    id: 'mg-rx9',
    name: 'MG RX9',
    categories: ['SUV'],
    image: '/assets/models/rx9/hero.png',
    transmissions: ['Automático'],
    slug: 'rx9'
  },
  {
    id: 'mg-cyberster',
    name: 'MG CYBERSTER',
    categories: ['Convertible'],
    image: '/assets/models/cyberster/hero.png',
    transmissions: ['Automático'],
    slug: 'cyberster'
  }
]

export default function ModelosPage() {
  const [activeCategory, setActiveCategory] = useState('Modelos')

  const filteredModels = activeCategory === 'Modelos' 
    ? MODELS 
    : MODELS.filter(m => m.categories.includes(activeCategory))

  return (
    <div className="bg-brand-black min-h-screen pt-24 pb-20">
      <div className="container-site">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* ─── Sidebar ─────────────────────────────────────────────────── */}
          <aside className="lg:w-64 flex-shrink-0">
            <nav className="flex flex-col space-y-2 sticky top-32" aria-label="Filtro de modelos">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={[
                      'text-left py-2 text-lg font-display transition-colors duration-300',
                      isActive 
                        ? 'text-white' 
                        : 'text-brand-subtle hover:text-white'
                    ].join(' ')}
                  >
                    {cat}
                  </button>
                )
              })}
            </nav>
          </aside>

          {/* ─── Grid de Modelos ─────────────────────────────────────────── */}
          <main className="flex-1">
            <div className="mb-8">
              <h1 className="text-display-md font-display text-white mb-2">
                NUESTROS <span className="text-gradient-accent">MODELOS</span>
              </h1>
              <p className="text-brand-subtle">
                Encuentra el MG perfecto para ti. Desde hatchbacks eficientes hasta deportivos eléctricos.
              </p>
            </div>

            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredModels.map((model) => (
                  <motion.div
                    key={model.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="card-dark group flex flex-col h-full hover:border-accent/40 transition-colors"
                  >
                    <Link href={`/modelos/${model.slug}`} className="flex-1 flex flex-col">
                      <div className="relative aspect-[4/3] w-full flex items-center justify-center p-6 pb-0">
                        <Image
                          src={model.image}
                          alt={model.name}
                          fill
                          className="object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                          unoptimized // para evitar problemas de next/image si los paths no existen en dev
                        />
                      </div>
                      
                      <div className="p-6 flex-1 flex flex-col">
                        <h2 className="text-2xl font-display font-bold text-white group-hover:text-accent transition-colors mb-4">
                          {model.name}
                        </h2>
                        
                        <div className="mt-auto flex flex-wrap gap-4">
                          {model.transmissions.map(t => (
                            <span 
                              key={t}
                              className="px-4 py-2 text-xs font-bold uppercase tracking-wider border border-accent text-white transition-colors group-hover:bg-accent/10"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
            
            {filteredModels.length === 0 && (
              <div className="py-20 text-center">
                <p className="text-brand-subtle text-lg">No hay modelos disponibles en esta categoría.</p>
              </div>
            )}
          </main>

        </div>
      </div>
    </div>
  )
}
