'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileText, CheckCircle2, ShieldCheck, User, Car, ChevronRight, Lock
} from 'lucide-react'

// ─── Modelos y Programas ──────────────────────────────────────────────────────

const MG_MODELS_LIST = [
  { id: 'zs', name: 'MG ZS (desde $22,990)', price: 22990 },
  { id: 'gt', name: 'MG GT (desde $24,990)', price: 24990 },
  { id: 'zs-ev', name: 'MG ZS EV (desde $27,990)', price: 27990 },
  { id: 'mg4-ev', name: 'MG4 EV (desde $29,990)', price: 29990 },
  { id: 'rx5', name: 'MG RX5 (desde $31,990)', price: 31990 },
  { id: 'hs', name: 'MG HS (desde $34,990)', price: 34990 },
  { id: 'cyberster', name: 'MG Cyberster (desde $89,990)', price: 89990 },
]

const FINANCING_PROGRAMS = [
  {
    id: 'ASEGURATE_500',
    title: 'Plan "Asegúrate con 500"',
    badge: 'Apartado desde $500 · 6 a 12 meses',
    desc: 'Sistema programado de MG Motor. Entrega máxima en 180 días o al adelantar cuotas. 12 meses con cuotas fijas o 9 meses com cuotas dobles iniciales.',
  },
  {
    id: 'AVANZA_36',
    title: 'Programa "Avanza 36"',
    badge: '20% inicial + 6 cuotas de acumulación + 30 meses fixos',
    desc: 'Esquema de Finanzas Digitales. Fracciona tu pago inicial en 6 meses y financia el saldo restante en hasta 30 cuotas fijas.',
  },
  {
    id: 'ALIANZA_BBVA',
    title: 'Crédito Bancario Aliados (BBVA Provincial)',
    badge: 'Inicial 10% a 20% · 12 a 60 meses',
    desc: 'Crédito tradicional con instituciones financieras aliadas. Tasa preferencial y evaluación de perfil crediticio.',
  },
  {
    id: 'CONTADO_ESPECIAL',
    title: 'Contado / Asesoría Personalizada',
    badge: 'Entrega Inmediata',
    desc: 'Atención prioritaria para adquisición directa o estructuración a la medida con incentivos de ahorro.',
  },
]

const ESTADOS_VENEZUELA = [
  'Distrito Capital (Caracas)', 'Miranda', 'Carabobo', 'Zulia', 'Lara',
  'Anzoátegui', 'Aragua', 'Bolívar', 'Nueva Esparta', 'Táchira',
  'Mérida', 'Monagas', 'Falcón', 'Sucre', 'Yaracuy', 'Otro Estado'
]

// ─── Schema de Validación ────────────────────────────────────────────────────

const solicitudSchema = z.object({
  fullName: z.string().min(3, 'Ingrese su nombre completo o razón social'),
  idNumber: z.string().min(6, 'Ingrese su Cédula (V-/E-) ou RIF (J-/G-)'),
  email: z.string().email('Correo electrónico inválido'),
  phone: z.string().min(10, 'Ingrese un número de teléfono celular / WhatsApp válido'),
  state: z.string().min(2, 'Seleccione su estado de residencia'),
  city: z.string().min(2, 'Ingrese su ciudad de residencia'),
  occupation: z.string().min(3, 'Indique su ocupación o actividad económica'),
  monthlyIncome: z
    .number({ invalid_type_error: 'Debe ser un valor numérico' })
    .min(500, 'Ingreso mínimo demostrable para evaluación: $500 USD'),
  selectedModel: z.string().min(1, 'Seleccione un modelo MG'),
  selectedProgram: z.string().min(1, 'Seleccione el programa de financiamiento'),
  downPaymentAvailable: z
    .number({ invalid_type_error: 'Debe ser un valor numérico' })
    .min(500, 'El apartado mínimo en MG inicia en $500 USD'),
  hasIdAndRif: z.boolean().refine((v) => v === true, {
    message: 'Debe confirmar que posee Cédula y RIF actualizado',
  }),
  hasIncomeProof: z.boolean().refine((v) => v === true, {
    message: 'Debe confirmar que cuenta con soportes bancarios o de ingresos',
  }),
  currencyPaymentReady: z.boolean().refine((v) => v === true, {
    message: 'Debe confirmar que el pago inicial será realizado en divisas autorizadas',
  }),
  acceptTerms: z.boolean().refine((v) => v === true, {
    message: 'Debe aceptar las políticas de tratamiento de datos y protección crediticia',
  }),
})

type SolicitudFormData = z.infer<typeof solicitudSchema>

// ─── Componente Principal ────────────────────────────────────────────────────

export function SolicitudCreditoForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successData, setSuccessData] = useState<{
    reference: string
    name: string
    model: string
    program: string
  } | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<SolicitudFormData>({
    resolver: zodResolver(solicitudSchema),
    defaultValues: {
      selectedModel: 'cyberster',
      selectedProgram: 'ASEGURATE_500',
      downPaymentAvailable: 5000,
      monthlyIncome: 2500,
      hasIdAndRif: true,
      hasIncomeProof: true,
      currencyPaymentReady: true,
      acceptTerms: true,
    },
  })

  const selectedProgramId = watch('selectedProgram')

  const onSubmit = async (data: SolicitudFormData) => {
    setIsSubmitting(true)
    // Simulamos pre-aprobación inmediata digital (1.2 segundos para UX de procesamiento)
    await new Promise((resolve) => setTimeout(resolve, 1200))
    const refNum = `MG-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
    
    const modelName = MG_MODELS_LIST.find((m) => m.id === data.selectedModel)?.name || data.selectedModel
    const programName = FINANCING_PROGRAMS.find((p) => p.id === data.selectedProgram)?.title || data.selectedProgram

    setSuccessData({
      reference: refNum,
      name: data.fullName,
      model: modelName,
      program: programName,
    })
    setIsSubmitting(false)
  }

  return (
    <div id="solicitud-credito" className="w-full">
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
              Solicitud de Crédito Pre-Registrada
            </p>
            <h3 className="text-display-md font-display text-white mb-4">
              ¡EXCELENTE, <span className="text-gradient-accent">{successData.name.toUpperCase()}</span>!
            </h3>

            <div className="bg-brand-darker/80 border border-brand-mid/30 rounded-xl p-6 mb-8 text-left max-w-xl mx-auto">
              <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
                <span className="text-xs font-condensed uppercase tracking-widest text-brand-subtle">
                  Expediente Digital
                </span>
                <span className="text-sm font-mono font-bold text-accent px-3 py-1 bg-accent/10 rounded">
                  {successData.reference}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-xs text-brand-subtle block">Modelo MG Seleccionado:</span>
                  <span className="font-semibold text-white">{successData.model}</span>
                </div>
                <div>
                  <span className="text-xs text-brand-subtle block">Programa Elegido:</span>
                  <span className="font-semibold text-white">{successData.program}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-brand-light text-sm max-w-xl mx-auto mb-8">
              <p>
                Tu solicitud ha sido ingresada satisfactoriamente a nuestro motor de crédito MG Motors Venezuela
                y asignada a nuestro equipo de analistas de <strong>Finanzas Digitales y Alianzas Bancarias</strong>.
              </p>
              <p className="text-brand-subtle text-xs">
                Un asesor se pondrá en contacto contigo en un plazo no mayor a <strong>24 horas hábiles</strong> vía
                WhatsApp y correo electrónico para coordinar la recepción digital de los soportes y formalizar el apartado.
              </p>
            </div>

            <button
              onClick={() => {
                setSuccessData(null)
                reset()
              }}
              className="px-8 py-3.5 bg-brand-darker border border-brand-mid/40 hover:border-accent text-white text-xs font-condensed uppercase tracking-widest rounded transition-all"
            >
              Realizar Otra Solicitud
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-6 md:p-10 border border-brand-mid/30"
          >
            <div className="border-b border-white/10 pb-6 mb-8">
              <div className="flex items-center gap-3 mb-2">
                <FileText size={24} className="text-accent" />
                <h2 className="text-2xl font-display text-white font-bold">
                  PLANTILLA DE INSCRIPCIÓN Y <span className="text-gradient-accent">SOLICITUD DE CRÉDITO</span>
                </h2>
              </div>
              <p className="text-sm text-brand-subtle">
                Completa tus datos conforme al estándar de pre-aprobación de MG Motors Venezuela. Proceso 100% digital
                y confidencial protegido bajo normativa local de datos personales.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
              {/* ── SECCIÓN 1: SELECCIÓN DE MODELO Y PROGRAMA ──────────── */}
              <div>
                <h3 className="text-sm font-bold font-condensed uppercase tracking-widest text-accent mb-4 flex items-center gap-2">
                  <Car size={16} /> 01. Selecciona tu MG y Programa de Financiamiento
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Modelo */}
                  <div>
                    <label className="block text-xs font-condensed uppercase tracking-wider text-brand-light mb-2">
                      Modelo MG de Interés *
                    </label>
                    <select
                      {...register('selectedModel')}
                      className="w-full bg-brand-darker border border-brand-mid rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-accent transition-colors"
                    >
                      {MG_MODELS_LIST.map((mod) => (
                        <option key={mod.id} value={mod.id}>
                          {mod.name}
                        </option>
                      ))}
                    </select>
                    {errors.selectedModel && (
                      <p className="text-xs text-error mt-1">{errors.selectedModel.message}</p>
                    )}
                  </div>

                  {/* Apartado / Inicial disponible */}
                  <div>
                    <label className="block text-xs font-condensed uppercase tracking-wider text-brand-light mb-2">
                      Monto de Inicial / Apartado Disponible ($ USD) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted font-bold">$</span>
                      <input
                        type="number"
                        {...register('downPaymentAvailable', { valueAsNumber: true })}
                        placeholder="5000"
                        min="500"
                        className="w-full bg-brand-darker border border-brand-mid rounded-lg pl-8 pr-4 py-3 text-white text-sm focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>
                    {errors.downPaymentAvailable && (
                      <p className="text-xs text-error mt-1">{errors.downPaymentAvailable.message}</p>
                    )}
                  </div>
                </div>

                {/* Programa selector en cards */}
                <div className="mt-6">
                  <label className="block text-xs font-condensed uppercase tracking-wider text-brand-light mb-3">
                    Programa de Financiamiento Preferido *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {FINANCING_PROGRAMS.map((prog) => {
                      const isSelected = selectedProgramId === prog.id
                      return (
                        <label
                          key={prog.id}
                          className={[
                            'cursor-pointer rounded-xl p-4 border transition-all duration-300 relative overflow-hidden',
                            isSelected
                              ? 'bg-accent/10 border-accent ring-1 ring-accent'
                              : 'bg-brand-darker/60 border-brand-mid/40 hover:border-brand-mid',
                          ].join(' ')}
                        >
                          <input
                            type="radio"
                            value={prog.id}
                            {...register('selectedProgram')}
                            className="sr-only"
                          />
                          <div className="flex items-start justify-between gap-2 mb-1.5">
                            <span className="font-display font-bold text-white text-base">
                              {prog.title}
                            </span>
                            {isSelected && (
                              <CheckCircle2 size={18} className="text-accent flex-shrink-0" />
                            )}
                          </div>
                          <span className="inline-block text-[11px] font-condensed uppercase tracking-wider px-2 py-0.5 rounded bg-white/10 text-accent font-semibold mb-2">
                            {prog.badge}
                          </span>
                          <p className="text-xs text-brand-subtle leading-relaxed">
                            {prog.desc}
                          </p>
                        </label>
                      )
                    })}
                  </div>
                  {errors.selectedProgram && (
                    <p className="text-xs text-error mt-2">{errors.selectedProgram.message}</p>
                  )}
                </div>
              </div>

              {/* ── SECCIÓN 2: DATOS DEL SOLICITANTE ───────────────────── */}
              <div className="border-t border-white/10 pt-8">
                <h3 className="text-sm font-bold font-condensed uppercase tracking-widest text-accent mb-4 flex items-center gap-2">
                  <User size={16} /> 02. Datos Personales y Económicos
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {/* Nombre completo */}
                  <div className="lg:col-span-2">
                    <label className="block text-xs font-condensed uppercase tracking-wider text-brand-light mb-2">
                      Nombre Completo o Razón Social *
                    </label>
                    <input
                      type="text"
                      {...register('fullName')}
                      placeholder="Ej: Carlos Eduardo Mendoza / Inversiones Mendoza C.A."
                      className="w-full bg-brand-darker border border-brand-mid rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-accent transition-colors"
                    />
                    {errors.fullName && (
                      <p className="text-xs text-error mt-1">{errors.fullName.message}</p>
                    )}
                  </div>

                  {/* Cédula o RIF */}
                  <div>
                    <label className="block text-xs font-condensed uppercase tracking-wider text-brand-light mb-2">
                      Cédula o RIF (con prefijo V, E, J, G) *
                    </label>
                    <input
                      type="text"
                      {...register('idNumber')}
                      placeholder="V-12345678 / J-50123456-8"
                      className="w-full bg-brand-darker border border-brand-mid rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-accent transition-colors"
                    />
                    {errors.idNumber && (
                      <p className="text-xs text-error mt-1">{errors.idNumber.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-condensed uppercase tracking-wider text-brand-light mb-2">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      {...register('email')}
                      placeholder="carlos.mendoza@email.com"
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
                      placeholder="0414-1234567 / 0424-9876543"
                      className="w-full bg-brand-darker border border-brand-mid rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-accent transition-colors"
                    />
                    {errors.phone && (
                      <p className="text-xs text-error mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  {/* Estado */}
                  <div>
                    <label className="block text-xs font-condensed uppercase tracking-wider text-brand-light mb-2">
                      Estado de Residencia *
                    </label>
                    <select
                      {...register('state')}
                      className="w-full bg-brand-darker border border-brand-mid rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-accent transition-colors"
                    >
                      <option value="">Selecciona tu Estado</option>
                      {ESTADOS_VENEZUELA.map((est) => (
                        <option key={est} value={est}>
                          {est}
                        </option>
                      ))}
                    </select>
                    {errors.state && (
                      <p className="text-xs text-error mt-1">{errors.state.message}</p>
                    )}
                  </div>

                  {/* Ciudad */}
                  <div>
                    <label className="block text-xs font-condensed uppercase tracking-wider text-brand-light mb-2">
                      Ciudad / Municipio *
                    </label>
                    <input
                      type="text"
                      {...register('city')}
                      placeholder="Ej: Caracas, Chacao, Valencia, Maracaibo..."
                      className="w-full bg-brand-darker border border-brand-mid rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-accent transition-colors"
                    />
                    {errors.city && (
                      <p className="text-xs text-error mt-1">{errors.city.message}</p>
                    )}
                  </div>

                  {/* Ocupación */}
                  <div>
                    <label className="block text-xs font-condensed uppercase tracking-wider text-brand-light mb-2">
                      Ocupación / Actividad Económica *
                    </label>
                    <input
                      type="text"
                      {...register('occupation')}
                      placeholder="Ej: Comerciante / Ingeniero / Empresa"
                      className="w-full bg-brand-darker border border-brand-mid rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-accent transition-colors"
                    />
                    {errors.occupation && (
                      <p className="text-xs text-error mt-1">{errors.occupation.message}</p>
                    )}
                  </div>

                  {/* Ingreso mensual */}
                  <div>
                    <label className="block text-xs font-condensed uppercase tracking-wider text-brand-light mb-2">
                      Ingreso Mensual Demostrable ($ USD) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted font-bold">$</span>
                      <input
                        type="number"
                        {...register('monthlyIncome', { valueAsNumber: true })}
                        placeholder="2500"
                        min="500"
                        className="w-full bg-brand-darker border border-brand-mid rounded-lg pl-8 pr-4 py-3 text-white text-sm focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>
                    {errors.monthlyIncome && (
                      <p className="text-xs text-error mt-1">{errors.monthlyIncome.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* ── SECCIÓN 3: REQUISITOS COMUNES Y DECLARACIÓN ────────── */}
              <div className="border-t border-white/10 pt-8">
                <h3 className="text-sm font-bold font-condensed uppercase tracking-widest text-accent mb-4 flex items-center gap-2">
                  <ShieldCheck size={16} /> 03. Requisitos Comunes & Cumplimiento Normativo
                </h3>
                <p className="text-xs text-brand-subtle mb-5">
                  Marca las siguientes casillas para confirmar que cuentas con los documentos requeridos para el proceso
                  de pre-aprobación con MG Motors Venezuela y nuestras alianzas bancarias:
                </p>

                <div className="space-y-3 bg-brand-darker/40 border border-brand-mid/30 rounded-xl p-5">
                  {/* Cédula y RIF */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('hasIdAndRif')}
                      className="mt-1 rounded border-brand-mid text-accent focus:ring-accent"
                    />
                    <span className="text-xs text-brand-light leading-relaxed">
                      <strong>Copia de Cédula de Identidad y Registro de Información Fiscal (RIF) actualizado.</strong>{' '}
                      Confirmo que poseo mi documentación de identidad y fiscal vigente y legible para anexar al expediente.
                    </span>
                  </label>
                  {errors.hasIdAndRif && (
                    <p className="text-xs text-error pl-7">{errors.hasIdAndRif.message}</p>
                  )}

                  {/* Soportes de ingreso */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('hasIncomeProof')}
                      className="mt-1 rounded border-brand-mid text-accent focus:ring-accent"
                    />
                    <span className="text-xs text-brand-light leading-relaxed">
                      <strong>Soportes de ingresos o estados de cuenta bancarios (últimos 3 meses).</strong>{' '}
                      Confirmo que puedo presentar respaldos financieros (cuentas nacionales o internacionales, balances o constancia de ingresos).
                    </span>
                  </label>
                  {errors.hasIncomeProof && (
                    <p className="text-xs text-error pl-7">{errors.hasIncomeProof.message}</p>
                  )}

                  {/* Pago en Divisas */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('currencyPaymentReady')}
                      className="mt-1 rounded border-brand-mid text-accent focus:ring-accent"
                    />
                    <span className="text-xs text-brand-light leading-relaxed">
                      <strong>Pago inicial en divisas (efectivo o métodos electrónicos autorizados).</strong>{' '}
                      Declaro que el pago inicial o apartado será cubierto en moneda extranjera bajo los esquemas autorizados por la red de concesionarios MG Venezuela.
                    </span>
                  </label>
                  {errors.currencyPaymentReady && (
                    <p className="text-xs text-error pl-7">{errors.currencyPaymentReady.message}</p>
                  )}

                  {/* Políticas y LGPD */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('acceptTerms')}
                      className="mt-1 rounded border-brand-mid text-accent focus:ring-accent"
                    />
                    <span className="text-xs text-brand-light leading-relaxed">
                      <strong>Aceptación de Términos y Protección de Datos.</strong>{' '}
                      Autorizo a MG Motors Venezuela y sus instituciones financieras aliadas (como BBVA Provincial) al tratamiento seguro de mis datos personales para la evaluación crediticia, conforme a las normativas de privacidad locales (LGPD / SUDEBAN / BACEN).
                    </span>
                  </label>
                  {errors.acceptTerms && (
                    <p className="text-xs text-error pl-7">{errors.acceptTerms.message}</p>
                  )}
                </div>
              </div>

              {/* Botón Submit */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-10 py-4 bg-accent hover:bg-accent-light text-white font-display text-base tracking-wider uppercase rounded-xl transition-all duration-300 shadow-lg shadow-accent/20 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Procesando Solicitud MG...</span>
                    </>
                  ) : (
                    <>
                      <span>Enviar Solicitud de Crédito</span>
                      <ChevronRight size={20} />
                    </>
                  )}
                </button>
                <p className="text-xs text-brand-subtle mt-3 flex items-center gap-1.5">
                  <Lock size={12} className="text-accent" />
                  Conexión segura 256-bit TLS · Sin compromiso de compra inicial
                </p>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
