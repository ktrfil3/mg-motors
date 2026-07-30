'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Car, MapPin, User, CheckCircle2,
  ShieldCheck, ChevronRight, Lock
} from 'lucide-react'

// ─── Lista de Modelos MG para Test Drive ─────────────────────────────────────

const MG_TEST_DRIVE_MODELS = [
  { id: 'zs', name: 'MG ZS', category: 'SUV Compacto', desc: 'Versatilidad urbana de alto rendimiento' },
  { id: 'gt', name: 'MG GT', category: 'Sedán Fastback', desc: 'Estilo deportivo y motor Turbo' },
  { id: 'zs-ev', name: 'MG ZS EV', category: 'SUV Eléctrico', desc: 'Cero emisiones con 320 km de autonomía' },
  { id: 'mg4-ev', name: 'MG4 EV', category: 'Hatchback Eléctrico', desc: 'Plataforma MSP pura eléctrica y carga rápida' },
  { id: 'rx5', name: 'MG RX5', category: 'SUV Familiar', desc: 'Espacio premium con tecnología avanzada' },
  { id: 'hs', name: 'MG HS', category: 'SUV Premium', desc: 'Lujo, confort y ADAS MG Pilot' },
  { id: 'cyberster', name: 'MG Cyberster', category: 'Roadster Eléctrico', desc: '335 HP con puertas de tijera y techo retráctil' },
]

// ─── Concesionarios / Sedes MG Motors Venezuela ───────────────────────────────

const MG_CONCESIONARIOS_VENEZUELA = [
  {
    id: 'caracas-mercedes',
    name: 'MG Caracas — Las Mercedes',
    address: 'Av. Principal de Las Mercedes, Edificio MG Motors, Baruta',
    city: 'Caracas (Distrito Capital / Miranda)',
  },
  {
    id: 'caracas-altamira',
    name: 'MG Caracas — Altamira',
    address: 'Av. San Juan Bosco con 3ra Transversal, Altamira, Chacao',
    city: 'Caracas (Miranda)',
  },
  {
    id: 'valencia-vinedo',
    name: 'MG Valencia — El Viñedo',
    address: 'Av. Bolívar Norte, Sector El Viñedo, Valencia',
    city: 'Valencia (Carabobo)',
  },
  {
    id: 'maracaibo-5julio',
    name: 'MG Maracaibo — 5 de Julio',
    address: 'Calle 77 (5 de Julio) con Av. 11, Maracaibo',
    city: 'Maracaibo (Zulia)',
  },
  {
    id: 'barquisimeto-este',
    name: 'MG Barquisimeto — Este',
    address: 'Av. Lara con Calle 5, Nueva Segovia, Barquisimeto',
    city: 'Barquisimeto (Lara)',
  },
  {
    id: 'lecheria-plaza',
    name: 'MG Lechería — Plaza Mayor',
    address: 'Av. Américo Vespucio, Sector Plaza Mayor, Lechería',
    city: 'Lechería (Anzoátegui)',
  },
  {
    id: 'puerto-ordaz',
    name: 'MG Puerto Ordaz — Alta Vista',
    address: 'Av. Guayana, Torre MG, Sector Alta Vista, Puerto Ordaz',
    city: 'Puerto Ordaz (Bolívar)',
  },
]

const ESTADOS_VE = [
  'Distrito Capital', 'Miranda', 'Carabobo', 'Zulia', 'Lara',
  'Anzoátegui', 'Aragua', 'Bolívar', 'Nueva Esparta', 'Táchira',
  'Mérida', 'Monagas', 'Falcón', 'Sucre', 'Yaracuy', 'Otro Estado'
]

// ─── Schema de Validación Zod ────────────────────────────────────────────────

const testDriveSchema = z.object({
  selectedModel: z.string().min(1, 'Seleccione el modelo MG para su prueba de manejo'),
  selectedDealer: z.string().min(1, 'Seleccione un concesionario o sede MG'),
  preferredDate: z.string().min(1, 'Seleccione una fecha de preferencia'),
  preferredShift: z.enum(['MANANA', 'TARDE']),
  fullName: z.string().min(3, 'Ingrese su nombre completo'),
  idNumber: z.string().min(6, 'Ingrese su Cédula de Identidad (V-/E-) o RIF'),
  email: z.string().email('Correo electrónico inválido'),
  phone: z.string().min(10, 'Ingrese un número de celular / WhatsApp válido'),
  state: z.string().min(2, 'Seleccione su estado de residencia'),
  hasLicenseAndCert: z.boolean().refine((v) => v === true, {
    message: 'Debe confirmar que posee Licencia de Conducir y Certificado Médico vigentes',
  }),
  acceptTerms: z.boolean().refine((v) => v === true, {
    message: 'Debe aceptar los términos y condiciones del Test Drive',
  }),
})

type TestDriveFormData = z.infer<typeof testDriveSchema>

// ─── Componente TestDriveForm ─────────────────────────────────────────────────

export function TestDriveForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successData, setSuccessData] = useState<{
    reference: string
    name: string
    modelName: string
    dealerName: string
    date: string
    shift: string
  } | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<TestDriveFormData>({
    resolver: zodResolver(testDriveSchema),
    defaultValues: {
      selectedModel: 'cyberster',
      selectedDealer: 'caracas-mercedes',
      preferredDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      preferredShift: 'MANANA',
      hasLicenseAndCert: true,
      acceptTerms: true,
    },
  })

  const selectedModelId = watch('selectedModel')

  const onSubmit = async (data: TestDriveFormData) => {
    setIsSubmitting(true)
    // Simular reserva digital instantánea (1 segundo)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const refNum = `MG-TD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`

    const modelObj = MG_TEST_DRIVE_MODELS.find((m) => m.id === data.selectedModel)
    const dealerObj = MG_CONCESIONARIOS_VENEZUELA.find((d) => d.id === data.selectedDealer)

    setSuccessData({
      reference: refNum,
      name: data.fullName,
      modelName: modelObj ? modelObj.name : data.selectedModel,
      dealerName: dealerObj ? dealerObj.name : data.selectedDealer,
      date: data.preferredDate,
      shift: data.preferredShift === 'MANANA' ? 'Mañana (9:00 AM - 12:00 PM)' : 'Tarde (2:00 PM - 5:00 PM)',
    })
    setIsSubmitting(false)
  }

  return (
    <div id="form-test-drive" className="w-full">
      <AnimatePresence mode="wait">
        {successData ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass rounded-2xl p-8 md:p-12 border border-accent/40 text-center max-w-3xl mx-auto"
          >
            <div className="w-20 h-20 bg-accent/20 border border-accent rounded-full flex items-center justify-center mx-auto mb-6 text-accent">
              <CheckCircle2 size={40} />
            </div>

            <p className="text-xs font-bold font-condensed uppercase tracking-[0.3em] text-accent mb-2">
              Prueba de Manejo MG Confirmada
            </p>
            <h3 className="text-display-md font-display text-white mb-4">
              ¡RESERVA EXITOSA, <span className="text-gradient-accent">{successData.name.toUpperCase()}</span>!
            </h3>

            <div className="bg-brand-darker/80 border border-brand-mid/30 rounded-xl p-6 mb-8 text-left max-w-xl mx-auto">
              <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
                <span className="text-xs font-condensed uppercase tracking-widest text-brand-subtle">
                  Código de Reserva Test Drive
                </span>
                <span className="text-sm font-mono font-bold text-accent px-3 py-1 bg-accent/10 rounded">
                  {successData.reference}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-xs text-brand-subtle block">Modelo Seleccionado:</span>
                  <span className="font-semibold text-white">{successData.modelName}</span>
                </div>
                <div>
                  <span className="text-xs text-brand-subtle block">Concesionario:</span>
                  <span className="font-semibold text-white">{successData.dealerName}</span>
                </div>
                <div>
                  <span className="text-xs text-brand-subtle block">Fecha Agendada:</span>
                  <span className="font-semibold text-white">{successData.date}</span>
                </div>
                <div>
                  <span className="text-xs text-brand-subtle block">Horario Preferido:</span>
                  <span className="font-semibold text-white">{successData.shift}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-brand-light text-sm max-w-xl mx-auto mb-8">
              <p>
                Hemos registrado tu solicitud de <strong>Test Drive MG Motors Venezuela</strong>. 
                Tu vehículo de prueba será preparado en la sede seleccionada para la fecha indicada.
              </p>
              <p className="text-brand-subtle text-xs">
                Un asesor comercial se comunicará contigo vía WhatsApp o teléfono en las próximas{' '}
                <strong>4 horas hábiles</strong> para reconfirmar la cita. Recuerda presentar tu{' '}
                <strong>Cédula de Identidad, Licencia de Conducir y Certificado Médico vigentes</strong>.
              </p>
            </div>

            <button
              onClick={() => {
                setSuccessData(null)
                reset()
              }}
              className="px-8 py-3.5 bg-brand-darker border border-brand-mid/40 hover:border-accent text-white text-xs font-condensed uppercase tracking-widest rounded transition-all"
            >
              Agendar Otro Test Drive
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-6 md:p-10 border border-brand-mid/40"
          >
            <div className="border-b border-white/10 pb-6 mb-8">
              <p className="text-xs font-bold font-condensed uppercase tracking-[0.3em] text-accent mb-2">
                Experiencia en Conducción MG
              </p>
              <h2 className="text-2xl md:text-3xl font-display text-white font-bold">
                SOLICITUD DE <span className="text-gradient-accent">TEST DRIVE</span>
              </h2>
              <p className="text-sm text-brand-subtle mt-1">
                Selecciona tu vehículo, elige el concesionario MG más cercano en Venezuela y agenda tu prueba de manejo gratuita.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-10">
              {/* ── PASO 1: SELECCIÓN DE MODELO MG ──────────────────────── */}
              <div>
                <h3 className="text-sm font-bold font-condensed uppercase tracking-widest text-accent mb-4 flex items-center gap-2">
                  <Car size={18} /> 01. Elige el modelo MG para tu prueba de manejo
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {MG_TEST_DRIVE_MODELS.map((mod) => {
                    const isSelected = selectedModelId === mod.id
                    return (
                      <label
                        key={mod.id}
                        className={[
                          'cursor-pointer rounded-xl p-4 border transition-all duration-200 flex flex-col justify-between',
                          isSelected
                            ? 'bg-accent/15 border-accent ring-1 ring-accent'
                            : 'bg-brand-darker/60 border-brand-mid/40 hover:border-brand-mid',
                        ].join(' ')}
                      >
                        <input
                          type="radio"
                          value={mod.id}
                          {...register('selectedModel')}
                          className="sr-only"
                        />
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <span className="font-display font-bold text-white text-base block">
                              {mod.name}
                            </span>
                            <span className="inline-block text-[10px] font-condensed uppercase tracking-wider text-accent font-semibold">
                              {mod.category}
                            </span>
                          </div>
                          {isSelected && (
                            <CheckCircle2 size={18} className="text-accent flex-shrink-0 mt-0.5" />
                          )}
                        </div>
                        <p className="text-xs text-brand-subtle leading-snug">
                          {mod.desc}
                        </p>
                      </label>
                    )
                  })}
                </div>
                {errors.selectedModel && (
                  <p className="text-xs text-error mt-2">{errors.selectedModel.message}</p>
                )}
              </div>

              {/* ── PASO 2: CONCESIONARIO Y FECHA ───────────────────────── */}
              <div className="border-t border-white/10 pt-8">
                <h3 className="text-sm font-bold font-condensed uppercase tracking-widest text-accent mb-4 flex items-center gap-2">
                  <MapPin size={18} /> 02. Sede y Horario de Preferencia
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Concesionario */}
                  <div className="md:col-span-1">
                    <label className="block text-xs font-condensed uppercase tracking-wider text-brand-light mb-2">
                      Concesionario MG Venezuela *
                    </label>
                    <select
                      {...register('selectedDealer')}
                      className="w-full bg-brand-darker border border-brand-mid rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-accent transition-colors"
                    >
                      {MG_CONCESIONARIOS_VENEZUELA.map((dl) => (
                        <option key={dl.id} value={dl.id}>
                          {dl.name} — {dl.city}
                        </option>
                      ))}
                    </select>
                    {errors.selectedDealer && (
                      <p className="text-xs text-error mt-1">{errors.selectedDealer.message}</p>
                    )}
                  </div>

                  {/* Fecha */}
                  <div>
                    <label className="block text-xs font-condensed uppercase tracking-wider text-brand-light mb-2">
                      Fecha Propuesta *
                    </label>
                    <input
                      type="date"
                      {...register('preferredDate')}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full bg-brand-darker border border-brand-mid rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-accent transition-colors"
                    />
                    {errors.preferredDate && (
                      <p className="text-xs text-error mt-1">{errors.preferredDate.message}</p>
                    )}
                  </div>

                  {/* Turno */}
                  <div>
                    <label className="block text-xs font-condensed uppercase tracking-wider text-brand-light mb-2">
                      Turno de Preferencia *
                    </label>
                    <select
                      {...register('preferredShift')}
                      className="w-full bg-brand-darker border border-brand-mid rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-accent transition-colors"
                    >
                      <option value="MANANA">Mañana (9:00 AM — 12:00 PM)</option>
                      <option value="TARDE">Tarde (2:00 PM — 5:00 PM)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* ── PASO 3: DATOS PERSONALES Y CONTACTO ──────────────────── */}
              <div className="border-t border-white/10 pt-8">
                <h3 className="text-sm font-bold font-condensed uppercase tracking-widest text-accent mb-4 flex items-center gap-2">
                  <User size={18} /> 03. Datos del Conductor
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {/* Nombre */}
                  <div className="lg:col-span-2">
                    <label className="block text-xs font-condensed uppercase tracking-wider text-brand-light mb-2">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      {...register('fullName')}
                      placeholder="Ej: Alejandro Silva Mendoza"
                      className="w-full bg-brand-darker border border-brand-mid rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-accent transition-colors"
                    />
                    {errors.fullName && (
                      <p className="text-xs text-error mt-1">{errors.fullName.message}</p>
                    )}
                  </div>

                  {/* Cédula / RIF */}
                  <div>
                    <label className="block text-xs font-condensed uppercase tracking-wider text-brand-light mb-2">
                      Cédula de Identidad (V-/E-) o RIF *
                    </label>
                    <input
                      type="text"
                      {...register('idNumber')}
                      placeholder="V-18234567"
                      className="w-full bg-brand-darker border border-brand-mid rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-accent transition-colors"
                    />
                    {errors.idNumber && (
                      <p className="text-xs text-error mt-1">{errors.idNumber.message}</p>
                    )}
                  </div>

                  {/* Correo */}
                  <div>
                    <label className="block text-xs font-condensed uppercase tracking-wider text-brand-light mb-2">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      {...register('email')}
                      placeholder="alejandro.silva@email.com"
                      className="w-full bg-brand-darker border border-brand-mid rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-accent transition-colors"
                    />
                    {errors.email && (
                      <p className="text-xs text-error mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Teléfono */}
                  <div>
                    <label className="block text-xs font-condensed uppercase tracking-wider text-brand-light mb-2">
                      Teléfono Celular / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      {...register('phone')}
                      placeholder="0414-2345678 / 0424-9876543"
                      className="w-full bg-brand-darker border border-brand-mid rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-accent transition-colors"
                    />
                    {errors.phone && (
                      <p className="text-xs text-error mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  {/* Estado de residencia */}
                  <div>
                    <label className="block text-xs font-condensed uppercase tracking-wider text-brand-light mb-2">
                      Estado de Residencia *
                    </label>
                    <select
                      {...register('state')}
                      className="w-full bg-brand-darker border border-brand-mid rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-accent transition-colors"
                    >
                      <option value="">Selecciona tu Estado</option>
                      {ESTADOS_VE.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                    {errors.state && (
                      <p className="text-xs text-error mt-1">{errors.state.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* ── PASO 4: REQUISITOS DEL TEST DRIVE ───────────────────── */}
              <div className="border-t border-white/10 pt-8">
                <h3 className="text-sm font-bold font-condensed uppercase tracking-widest text-accent mb-4 flex items-center gap-2">
                  <ShieldCheck size={18} /> 04. Requisitos y Confirmación
                </h3>

                <div className="space-y-3 bg-brand-darker/40 border border-brand-mid/30 rounded-xl p-5">
                  {/* Licencia y certificado */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('hasLicenseAndCert')}
                      className="mt-1 rounded border-brand-mid text-accent focus:ring-accent"
                    />
                    <span className="text-xs text-brand-light leading-relaxed">
                      <strong>Licencia de Conducir y Certificado Médico Vigentes en Venezuela.</strong>{' '}
                      Confirmo que poseo y presentaré mi documentación original y vigente para poder realizar la prueba de manejo en el concesionario MG.
                    </span>
                  </label>
                  {errors.hasLicenseAndCert && (
                    <p className="text-xs text-error pl-7">{errors.hasLicenseAndCert.message}</p>
                  )}

                  {/* Aceptar términos */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('acceptTerms')}
                      className="mt-1 rounded border-brand-mid text-accent focus:ring-accent"
                    />
                    <span className="text-xs text-brand-light leading-relaxed">
                      <strong>Aceptación de Políticas del Concesionario y Protección de Datos.</strong>{' '}
                      Autorizo a MG Motors Venezuela al tratamiento seguro de mi información de contacto para coordinar la prueba de manejo y comunicaciones comerciales.
                    </span>
                  </label>
                  {errors.acceptTerms && (
                    <p className="text-xs text-error pl-7">{errors.acceptTerms.message}</p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-10 py-4 bg-accent hover:bg-accent-light text-white font-display text-base tracking-wider uppercase rounded-xl transition-all duration-300 shadow-lg shadow-accent/20 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Procesando Reserva MG...</span>
                    </>
                  ) : (
                    <>
                      <span>Agendar Prueba de Manejo MG</span>
                      <ChevronRight size={20} />
                    </>
                  )}
                </button>
                <p className="text-xs text-brand-subtle mt-3 flex items-center gap-1.5">
                  <Lock size={12} className="text-accent" />
                  Reserva gratuita y sin compromiso de compra · MG Motors Venezuela
                </p>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
