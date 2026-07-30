'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Car } from 'lucide-react'
import { TestDriveForm } from './TestDriveForm'

// Helper global para abrir el modal desde cualquier botón de la plataforma
export function openTestDriveModal(defaultModel?: string) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('open-test-drive-modal', {
        detail: { model: defaultModel },
      })
    )
  }
}

export function TestDriveModalGlobal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleOpen = () => setIsOpen(true)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }

    window.addEventListener('open-test-drive-modal', handleOpen)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('open-test-drive-modal', handleOpen)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="test-drive-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Modal para agendar Test Drive MG"
        >
          <motion.div
            key="test-drive-modal-content"
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
            className="relative w-full max-w-4xl bg-brand-darkest border border-accent/40 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto p-6 md:p-10 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón Cerrar */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 p-2 text-brand-light hover:text-white bg-brand-dark hover:bg-accent/80 rounded-full transition-colors z-10"
              aria-label="Cerrar modal de Test Drive"
            >
              <X size={20} />
            </button>

            {/* Cabecera del modal */}
            <div className="flex items-center gap-2 mb-2">
              <Car size={18} className="text-accent" />
              <span className="text-xs font-bold font-condensed uppercase tracking-[0.25em] text-accent">
                Reserva en Línea MG Venezuela
              </span>
            </div>

            {/* Formulario embebido */}
            <TestDriveForm />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
