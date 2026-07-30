'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Newspaper, ChevronLeft, ChevronRight, Calendar,
  ArrowUpRight, Car, Sparkles, X, ShieldCheck
} from 'lucide-react'
import { openTestDriveModal } from '@/components/testdrive/TestDriveModalGlobal'

// ─── Notas de Prensa MG Motors Venezuela (de mgvzla.com/notas-de-prensa/) ───

export interface PressRelease {
  id: string
  date: string
  category: string
  title: string
  excerpt: string
  content: string[]
}

export const MG_PRESS_RELEASES: PressRelease[] = [
  {
    id: 'lanzamiento-ve',
    date: '15 de Julio, 2026',
    category: 'Lanzamiento Oficial',
    title: 'MG Motors llega oficialmente a Venezuela con respaldo total y garantía de 7 años',
    excerpt: 'La icónica firma automotriz británica-global inicia operaciones oficiales en Venezuela con una red nacional de concesionarios y portafolio SUV y eléctrico.',
    content: [
      'MG Motors marca un hito histórico en el sector automotriz venezolano al inaugurar su red oficial de concesionarios y servicio de postventa en Caracas, Valencia, Maracaibo, Barquisimeto y las principales ciudades del país.',
      'El portafolio de lanzamiento incluye modelos emblemáticos como el SUV MG ZS, el deportivo MG GT, el familiar MG RX5 y vehículos 100% eléctricos de alta autonomía como el MG4 EV y MG ZS EV.',
      'Cada vehículo cuenta con el respaldo oficial de 7 años de garantía o 150.000 kilómetros, junto con almacén central de repuestos y técnicos especializados formados en estándares globales MG.',
    ],
  },
  {
    id: 'cyberster-caracas',
    date: '22 de Julio, 2026',
    category: 'Innovación & Diseño',
    title: 'MG Cyberster cautiva a Venezuela: El roadster 100% eléctrico con puertas de tijera',
    excerpt: 'El biplaza deportivo eléctrico de 335 HP rinde homenaje al centenario de MG Motors combinando elegancia atemporal y aceleración de 0 a 100 en 3.2 segundos.',
    content: [
      'Durante un exclusivo evento en Caracas, MG Motors Venezuela desveló el MG Cyberster, el primer roadster biplaza 100% eléctrico de la marca que revoluciona el segmento de autos deportivos en Latinoamérica.',
      'Equipado con un motor dual de alto rendimiento, puertas de tijera automáticas y una cabina inspirada en la aeronáutica con triple pantalla curva, el Cyberster representa la evolución del espíritu clásico MG MGB hacia la era de movilidad cero emisiones.',
      'El modelo ya está disponible para demostración en nuestras sedes principales de Las Mercedes y Altamira en Caracas.',
    ],
  },
  {
    id: 'plan-asegurate-500',
    date: '28 de Julio, 2026',
    category: 'Financiamiento',
    title: 'Plan "Asegúrate con 500": Facilidades de apartado y cuotas programadas sin intereses',
    excerpt: 'MG Venezuela lanza el innovador esquema de compra programada desde $500 con entrega garantizada en un máximo de 180 días y plazos de 6, 9 y 12 meses.',
    content: [
      'Con el objetivo de hacer accesible la propiedad de vehículos cero kilómetros, MG Motors Venezuela presentó el plan de financiamiento "Asegúrate con 500", permitiendo apartar cualquier modelo de la gama comenzando con un pago inicial de $500.',
      'El esquema ofrece tres modalidades: plazos cortos de 6, 9 y 12 meses. La modalidad a 12 meses contempla cuotas mensuales fijas, mientras que el plan a 9 meses incluye cuotas dobles iniciales para acelerar la entrega.',
      'Una vez completado el esquema o al realizar abonos anticipados, el cliente recibe su vehículo MG en un lapso no mayor a 180 días con toda la documentación oficial en regla.',
    ],
  },
  {
    id: 'mg4-ev-seguridad',
    date: '20 de Junio, 2026',
    category: 'Tecnología MSP',
    title: 'MG4 EV: 5 estrellas de seguridad Euro NCAP y arquitectura eléctrica MSP de última generación',
    excerpt: 'El hatchback eléctrico modular se consolida como referente de seguridad, reparto de pesos 50:50 y carga ultrarrápida en el mercado nacional.',
    content: [
      'El MG4 EV continúa sumando galardones internacionales y en Venezuela no ha sido la excepción. Basado en la Plataforma Modular Escalable (MSP), ofrece un centro de gravedad ultrabajo y batería de celda horizontal ultra delgada (110 mm).',
      'Gracias a su paquete de asistencia avanzada al conductor MG Pilot, frenado autónomo de emergencia y estructura de acero de alta resistencia, ha obtenido la máxima calificación de 5 estrellas en las rigurosas pruebas Euro NCAP.',
      'Nuestras sedes en Venezuela cuentan con cargadores rápidos e infraestructura completa para el soporte integral de la línea eléctrica MG.',
    ],
  },
]

export function HeroPressWidget() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [selectedNote, setSelectedNote] = useState<PressRelease | null>(null)

  const currentNote = MG_PRESS_RELEASES[activeIdx]

  const nextNote = () => {
    setActiveIdx((prev) => (prev + 1) % MG_PRESS_RELEASES.length)
  }

  const prevNote = () => {
    setActiveIdx((prev) => (prev - 1 + MG_PRESS_RELEASES.length) % MG_PRESS_RELEASES.length)
  }

  return (
    <>
      <div
        className="rounded-2xl p-6 md:p-7 border border-white/15 bg-transparent shadow-2xl flex flex-col justify-between h-full"
        aria-label="Notas de Prensa MG Motors Venezuela"
      >
        {/* Cabecera del widget */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <Newspaper size={18} className="text-accent" />
            <span className="text-xs font-bold font-condensed uppercase tracking-[0.22em] text-white">
              Notas de Prensa · MG Venezuela
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={prevNote}
              className="p-1.5 text-brand-light hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Nota anterior"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-[11px] font-mono text-brand-subtle">
              {activeIdx + 1}/{MG_PRESS_RELEASES.length}
            </span>
            <button
              onClick={nextNote}
              className="p-1.5 text-brand-light hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Siguiente nota"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Tarjeta interactiva de la noticia activa */}
        <div className="flex-1 my-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentNote.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-accent/20 border border-accent/40 text-accent text-[10px] font-condensed uppercase tracking-wider font-bold rounded">
                  {currentNote.category}
                </span>
                <span className="text-xs text-brand-subtle flex items-center gap-1">
                  <Calendar size={12} />
                  {currentNote.date}
                </span>
              </div>

              <h3
                onClick={() => setSelectedNote(currentNote)}
                className="text-base md:text-lg font-display font-bold text-white leading-snug hover:text-accent cursor-pointer transition-colors line-clamp-2"
              >
                {currentNote.title}
              </h3>

              <p className="text-xs text-brand-subtle leading-relaxed line-clamp-2">
                {currentNote.excerpt}
              </p>

              <button
                onClick={() => setSelectedNote(currentNote)}
                className="inline-flex items-center gap-1 text-xs font-condensed uppercase tracking-wider font-semibold text-accent hover:text-white transition-colors pt-1"
              >
                <span>Leer nota completa</span>
                <ArrowUpRight size={14} />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ─── BOTÓN DE TEST DRIVE EN VENTANA MODAL (SOLICITADO POR EL USUARIO) ─── */}
        <div className="border-t border-white/10 pt-5 mt-5">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[11px] font-condensed uppercase tracking-wider text-brand-light font-semibold flex items-center gap-1.5">
              <Sparkles size={14} className="text-accent" />
              ¿Quieres conducir un MG en ruta?
            </span>
            <span className="text-[10px] font-mono text-accent bg-accent/10 px-2 py-0.5 rounded">
              Gratuito
            </span>
          </div>

          <button
            type="button"
            onClick={() => openTestDriveModal()}
            className="w-full py-3.5 bg-accent hover:bg-accent-light text-white font-display text-sm md:text-base tracking-wider uppercase rounded-xl transition-all duration-300 shadow-lg shadow-accent/25 flex items-center justify-center gap-2 group"
          >
            <Car size={18} className="group-hover:scale-110 transition-transform" />
            <span>Agendar Test Drive Aquí</span>
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-[11px] text-center text-brand-subtle mt-2">
            Abre reserva rápida en ventana emergente · Sin salir de la página
          </p>
        </div>
      </div>

      {/* ─── MODAL PARA LEER LA NOTA DE PRENSA COMPLETA ─── */}
      <AnimatePresence>
        {selectedNote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[160] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedNote(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 15 }}
              className="relative w-full max-w-2xl bg-brand-darkest border border-white/20 rounded-2xl p-6 md:p-8 max-h-[85vh] overflow-y-auto text-left shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedNote(null)}
                className="absolute top-5 right-5 p-2 text-brand-light hover:text-white bg-brand-dark rounded-full transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-accent/20 border border-accent/40 text-accent text-xs font-condensed uppercase tracking-wider font-bold rounded">
                  {selectedNote.category}
                </span>
                <span className="text-xs text-brand-subtle">{selectedNote.date}</span>
              </div>

              <h2 className="text-xl md:text-2xl font-display font-bold text-white mb-6">
                {selectedNote.title}
              </h2>

              <div className="space-y-4 text-sm text-brand-light leading-relaxed">
                {selectedNote.content.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-brand-subtle">
                  <ShieldCheck size={16} className="text-accent" />
                  <span>Oficina de Prensa Oficial · MG Motors Venezuela</span>
                </div>

                <button
                  onClick={() => {
                    setSelectedNote(null)
                    openTestDriveModal()
                  }}
                  className="px-6 py-2.5 bg-accent hover:bg-accent-light text-white text-xs font-condensed uppercase tracking-widest rounded-lg transition-colors flex items-center gap-2"
                >
                  <Car size={16} />
                  <span>Agendar Test Drive</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
