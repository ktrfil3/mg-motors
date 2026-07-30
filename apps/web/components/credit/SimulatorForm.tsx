'use client'

import { useState, useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calculator, ChevronDown, ChevronUp, Sparkles
} from 'lucide-react'

// ─── Modelos MG Motors Venezuela ──────────────────────────────────────────────

export const MG_MODELS = [
  { id: 'zs', name: 'MG ZS', price: 22990, category: 'SUV Compacto' },
  { id: 'gt', name: 'MG GT', price: 24990, category: 'Sedán Fastback' },
  { id: 'zs-ev', name: 'MG ZS EV', price: 27990, category: 'SUV Eléctrico' },
  { id: 'mg4-ev', name: 'MG4 EV', price: 29990, category: 'Hatchback Eléctrico' },
  { id: 'rx5', name: 'MG RX5', price: 31990, category: 'SUV Familiar' },
  { id: 'hs', name: 'MG HS', price: 34990, category: 'SUV Premium' },
  { id: 'cyberster', name: 'MG Cyberster', price: 89990, category: 'Roadster Eléctrico' },
]

// ─── Schema de Validação (Zod) ────────────────────────────────────────────────

const simulatorSchema = z.object({
  selectedModel: z.string().min(1, 'Seleccione un modelo MG'),
  vehiclePrice: z
    .number({ invalid_type_error: 'Informe un valor numérico' })
    .min(5000, 'Valor mínimo: $5.000')
    .max(500_000, 'Valor máximo: $500.000'),
  downPayment: z
    .number({ invalid_type_error: 'Informe un valor numérico' })
    .min(500, 'La inicial o apartado mínimo en MG es $500 USD'),
  financingPlan: z.enum(['ASEGURATE_500', 'AVANZA_36', 'ALIANZA_BBVA']),
  termMonths: z
    .number()
    .int()
    .min(6, 'Mínimo 6 meses')
    .max(60, 'Máximo 60 meses'),
  amortizationSystem: z.enum(['PRICE', 'SAC']),
  monthlyInterestRate: z
    .number()
    .min(0)
    .max(5)
    .default(0.79),
}).refine(
  (data) => data.downPayment < data.vehiclePrice,
  { message: 'La inicial no puede ser igual o mayor que el valor del vehículo', path: ['downPayment'] }
)

type SimulatorFormData = z.infer<typeof simulatorSchema>

// ─── Tipos de Resultado ───────────────────────────────────────────────────────

export interface AmortizationRow {
  month: number
  payment: number
  principal: number
  interest: number
  balance: number
  note?: string
}

export interface SimulationResult {
  input: {
    modelName: string
    vehiclePrice: number
    downPayment: number
    principal: number
    financingPlan: 'ASEGURATE_500' | 'AVANZA_36' | 'ALIANZA_BBVA'
    termMonths: number
    amortizationSystem: string
    monthlyInterestRate: number
  }
  result: {
    monthlyInstallment: number
    secondInstallmentText?: string
    totalPaid: number
    totalInterest: number
    estimatedSavings: number
    deliveryCondition: string
    amortizationTable: AmortizationRow[]
  }
  disclaimers: string[]
}

// ─── Motor de Cálculo Local (100% Funcional) ──────────────────────────────────

function calculateFinancingLocally(data: SimulatorFormData): SimulationResult {
  const modelObj = MG_MODELS.find((m) => m.id === data.selectedModel) || MG_MODELS[0]
  const price = data.vehiclePrice
  const downPayment = data.downPayment
  const principal = price - downPayment
  const plan = data.financingPlan
  const term = data.termMonths
  const rate = data.monthlyInterestRate / 100 // ej: 0.0079

  const table: AmortizationRow[] = []
  let monthlyInstallment = 0
  let totalPaid = 0
  let totalInterest = 0
  let secondInstallmentText = ''
  let deliveryCondition = ''
  const estimatedSavings = Math.round(price * 0.30) // Hasta 30% de ahorro vs esquema atípico

  if (plan === 'ASEGURATE_500') {
    // Sistema programado de apartado desde $500. Sin intereses bancarios (0%)
    // Modalidad 12 meses: cuotas fijas | Modalidad 9 meses: cuotas dobles iniciales
    const effectiveTerm = term <= 12 ? term : 12
    const baseInstallment = principal / effectiveTerm

    if (effectiveTerm === 9) {
      // 3 meses dobles + 6 meses sencillas
      const doubleQuota = baseInstallment * 2
      monthlyInstallment = doubleQuota
      secondInstallmentText = `y 6 cuotas de $${baseInstallment.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
      let bal = principal
      for (let m = 1; m <= effectiveTerm; m++) {
        const pay = m <= 3 ? doubleQuota : baseInstallment
        bal = Math.max(0, bal - pay)
        table.push({
          month: m,
          payment: pay,
          principal: pay,
          interest: 0,
          balance: bal,
          note: m <= 3 ? 'Cuota Doble Inicial' : 'Cuota Regular Fija',
        })
      }
    } else {
      monthlyInstallment = baseInstallment
      let bal = principal
      for (let m = 1; m <= effectiveTerm; m++) {
        bal = Math.max(0, bal - baseInstallment)
        table.push({
          month: m,
          payment: baseInstallment,
          principal: baseInstallment,
          interest: 0,
          balance: bal,
          note: 'Cuota Programada Fija',
        })
      }
    }
    totalPaid = downPayment + principal
    totalInterest = 0
    deliveryCondition = 'Entrega programada en un plazo máximo de 180 días al completar el esquema o al adelantar cuotas.'
  } else if (plan === 'AVANZA_36') {
    // Finanzas Digitales: 1er pago 20% inicial, 6 cuotas acumulativas para llegar a 45%, luego 30 meses fijos
    const firstDownPayment = price * 0.20
    const accumTotal = price * 0.25 // para alcanzar 45% en mes 6
    const accumMonthly = accumTotal / 6
    const creditBalance = price * 0.55 // 55% restante financiado a 30 meses

    // Cálculo cuota fija 30 meses (PRICE al 0.79% monthly)
    const n = 30
    const i = rate || 0.0079
    const priceInstallment = (creditBalance * (i * Math.pow(1 + i, n))) / (Math.pow(1 + i, n) - 1)
    monthlyInstallment = accumMonthly
    secondInstallmentText = `seguido de 30 cuotas de $${priceInstallment.toLocaleString('en-US', { maximumFractionDigits: 0 })}`

    let bal = price - firstDownPayment
    // Meses 1 a 6: acumulación inicial
    for (let m = 1; m <= 6; m++) {
      bal = Math.max(0, bal - accumMonthly)
      table.push({
        month: m,
        payment: accumMonthly,
        principal: accumMonthly,
        interest: 0,
        balance: bal,
        note: 'Etapa Acumulación Inicial (hasta 45%)',
      })
    }
    // Meses 7 a 36: financiamiento saldo 55%
    let loanBal = creditBalance
    let interestSum = 0
    for (let m = 7; m <= 36; m++) {
      const intPart = loanBal * i
      const princPart = priceInstallment - intPart
      loanBal = Math.max(0, loanBal - princPart)
      interestSum += intPart
      table.push({
        month: m,
        payment: priceInstallment,
        principal: princPart,
        interest: intPart,
        balance: loanBal,
        note: 'Cuota Financiada Fija (Saldo 55%)',
      })
    }
    totalInterest = interestSum
    totalPaid = firstDownPayment + accumTotal + (priceInstallment * 30)
    deliveryCondition = 'Vehículo entregado al completar entre 40% y 50% de inicial (mes 6 o al adelantar cuotas).'
  } else {
    // ALIANZA_BBVA (Crédito Bancario Tradicional PRICE / SAC)
    let bal = principal
    let sumInt = 0

    if (data.amortizationSystem === 'PRICE') {
      const i = rate || 0.0079
      const n = term
      const p = (principal * (i * Math.pow(1 + i, n))) / (Math.pow(1 + i, n) - 1)
      monthlyInstallment = p

      for (let m = 1; m <= n; m++) {
        const intPart = bal * i
        const princPart = p - intPart
        bal = Math.max(0, bal - princPart)
        sumInt += intPart
        table.push({
          month: m,
          payment: p,
          principal: princPart,
          interest: intPart,
          balance: bal,
          note: 'Sistema Francés (Cuota Fija)',
        })
      }
      totalPaid = downPayment + (p * n)
      totalInterest = sumInt
    } else {
      // SAC (Amortización Constante)
      const i = rate || 0.0079
      const n = term
      const princPart = principal / n
      let firstQuota = 0

      for (let m = 1; m <= n; m++) {
        const intPart = bal * i
        const pay = princPart + intPart
        if (m === 1) firstQuota = pay
        bal = Math.max(0, bal - princPart)
        sumInt += intPart
        table.push({
          month: m,
          payment: pay,
          principal: princPart,
          interest: intPart,
          balance: bal,
          note: 'Sistema Alemán (SAC - Cuota Decreciente)',
        })
      }
      monthlyInstallment = firstQuota
      secondInstallmentText = `(cuotas decrecientes mes a mes)`
      totalPaid = downPayment + principal + sumInt
      totalInterest = sumInt
    }
    deliveryCondition = 'Entrega inmediata una vez aprobada la evaluación crediticia e ingresos demostrables por BBVA Provincial / Aliados.'
  }

  const disclaimers = [
    'Los valores mostrados representan una simulación referencial calculada en divisas (USD $) según el programa oficial seleccionado de MG Motors Venezuela.',
    'Plan "Asegúrate con 500": Entrega programada en un plazo máximo de 180 días al completar el esquema o al adelantar cuotas. Sin intereses bancarios.',
    'Programa "Avanza 36": Fracciona la inicial con 20% inicial + 6 cuotas de acumulación, y el saldo restante del 55% financiado a 30 meses.',
    'Alianzas bancarias (BBVA Provincial): Sujeto a evaluación crediticia, ingresos demostrables e inicial entre 10% y 20%.',
    'Requisitos comunes: Copia de Cédula de Identidad, RIF actualizado, soportes bancarios (últimos 3 meses) y pago en divisas (efectivo o métodos electrónicos autorizados).',
  ]

  return {
    input: {
      modelName: modelObj.name,
      vehiclePrice: price,
      downPayment,
      principal,
      financingPlan: plan,
      termMonths: plan === 'AVANZA_36' ? 36 : term,
      amortizationSystem: data.amortizationSystem,
      monthlyInterestRate: rate * 100,
    },
    result: {
      monthlyInstallment,
      secondInstallmentText,
      totalPaid,
      totalInterest,
      estimatedSavings,
      deliveryCondition,
      amortizationTable: table,
    },
    disclaimers,
  }
}

// ─── Componente SimulatorForm ─────────────────────────────────────────────────

export function SimulatorForm() {
  const [result, setResult] = useState<SimulationResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [showTable, setShowTable] = useState(false)

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<SimulatorFormData>({
    resolver: zodResolver(simulatorSchema),
    defaultValues: {
      selectedModel: 'cyberster',
      vehiclePrice: 89990,
      downPayment: 15000,
      financingPlan: 'ASEGURATE_500',
      termMonths: 12,
      amortizationSystem: 'PRICE',
      monthlyInterestRate: 0.79,
    },
  })

  const selectedModel = watch('selectedModel')
  const vehiclePrice = watch('vehiclePrice')
  const downPayment = watch('downPayment')
  const financingPlan = watch('financingPlan')


  // Sincronizar precio oficial cuando el usuario cambia de modelo
  useEffect(() => {
    const found = MG_MODELS.find((m) => m.id === selectedModel)
    if (found) {
      setValue('vehiclePrice', found.price)
      if (financingPlan === 'ASEGURATE_500') {
        setValue('downPayment', 500)
        setValue('termMonths', 12)
      } else if (financingPlan === 'AVANZA_36') {
        setValue('downPayment', Math.round(found.price * 0.20))
        setValue('termMonths', 36)
      } else {
        setValue('downPayment', Math.round(found.price * 0.20))
      }
    }
  }, [selectedModel, financingPlan, setValue])

  const onSubmit = useCallback((data: SimulatorFormData) => {
    setLoading(true)
    setTimeout(() => {
      const calcResult = calculateFinancingLocally(data)
      setResult(calcResult)
      setShowTable(false)
      setLoading(false)
    }, 400)
  }, [])

  // Calcular simulación automática inicial y ante cambios
  useEffect(() => {
    const data: SimulatorFormData = {
      selectedModel: selectedModel || 'cyberster',
      vehiclePrice: vehiclePrice || 89990,
      downPayment: downPayment || 500,
      financingPlan: financingPlan || 'ASEGURATE_500',
      termMonths: 12,
      amortizationSystem: 'PRICE',
      monthlyInterestRate: 0.79,
    }
    setResult(calculateFinancingLocally(data))
  }, [selectedModel, vehiclePrice, downPayment, financingPlan])

  const fmt = (v: number) =>
    `$${v.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} USD`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* ─── COLUMNA 1: FORMULARIO DE SIMULACIÓN (5 col) ──────────────── */}
      <div className="lg:col-span-5 glass rounded-2xl p-6 md:p-8 border border-brand-mid/40">
        <div className="flex items-center gap-3 border-b border-white/10 pb-5 mb-6">
          <div className="w-10 h-10 rounded-lg bg-accent/20 border border-accent flex items-center justify-center text-accent">
            <Calculator size={22} />
          </div>
          <div>
            <h2 className="text-xl font-display text-white font-bold">
              Simulador de Finanzas
            </h2>
            <p className="text-xs text-brand-subtle">
              Calcula tus cuotas en divisas según programa MG
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
          {/* 1. Selección de Modelo MG */}
          <div>
            <label className="block text-xs font-condensed uppercase tracking-wider text-brand-light mb-2">
              Modelo MG Motors Venezuela
            </label>
            <select
              {...register('selectedModel')}
              className="w-full bg-brand-darker border border-brand-mid rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-accent transition-all"
            >
              {MG_MODELS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} — ${m.price.toLocaleString('en-US')} USD
                </option>
              ))}
            </select>
          </div>

          {/* 2. Programa de Financiamiento MG */}
          <div>
            <label className="block text-xs font-condensed uppercase tracking-wider text-brand-light mb-2">
              Programa Oficial MG
            </label>
            <div className="space-y-2">
              {[
                {
                  id: 'ASEGURATE_500',
                  title: 'Plan "Asegúrate con 500"',
                  sub: 'Apartado desde $500 · 6 a 12 meses · Entrega máx. 180 días',
                },
                {
                  id: 'AVANZA_36',
                  title: 'Programa "Avanza 36"',
                  sub: '20% inicial + 6 cuotas para acumular 45% + 30 meses fijos',
                },
                {
                  id: 'ALIANZA_BBVA',
                  title: 'Alianzas Bancarias (BBVA Provincial)',
                  sub: 'Crédito Tradicional PRICE / SAC · Inicial 10% a 20%',
                },
              ].map((p) => {
                const isChecked = financingPlan === p.id
                return (
                  <label
                    key={p.id}
                    className={[
                      'flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all duration-200',
                      isChecked
                        ? 'bg-accent/15 border-accent ring-1 ring-accent'
                        : 'bg-brand-darker/60 border-brand-mid/40 hover:border-brand-mid',
                    ].join(' ')}
                  >
                    <input
                      type="radio"
                      value={p.id}
                      {...register('financingPlan')}
                      className="sr-only"
                    />
                    <div>
                      <p className="text-sm font-display font-bold text-white">{p.title}</p>
                      <p className="text-[11px] text-brand-subtle mt-0.5">{p.sub}</p>
                    </div>
                  </label>
                )
              })}
            </div>
          </div>

          {/* 3. Valor e Inicial */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-condensed uppercase tracking-wider text-brand-light mb-1.5">
                Valor Veículo (USD)
              </label>
              <input
                type="number"
                {...register('vehiclePrice', { valueAsNumber: true })}
                className="w-full bg-brand-darker border border-brand-mid rounded-lg px-3 py-2.5 text-white text-sm font-semibold focus:outline-none focus:border-accent transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-condensed uppercase tracking-wider text-brand-light mb-1.5">
                Inicial / Apartado (USD)
              </label>
              <input
                type="number"
                {...register('downPayment', { valueAsNumber: true })}
                className="w-full bg-brand-darker border border-brand-mid rounded-lg px-3 py-2.5 text-white text-sm font-semibold focus:outline-none focus:border-accent transition-all"
              />
            </div>
          </div>
          {errors.downPayment && (
            <p className="text-xs text-error -mt-3">{errors.downPayment.message}</p>
          )}

          {/* 4. Plazo y Sistema de Amortización (Si aplica BBVA / Asegúrate) */}
          {financingPlan === 'ASEGURATE_500' ? (
            <div>
              <label className="block text-xs font-condensed uppercase tracking-wider text-brand-light mb-1.5">
                Plazo Programado (Meses)
              </label>
              <select
                {...register('termMonths', { valueAsNumber: true })}
                className="w-full bg-brand-darker border border-brand-mid rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-accent"
              >
                <option value={12}>12 meses (Cuotas fijas programadas)</option>
                <option value={9}>9 meses (Cuotas dobles iniciales m1-m3)</option>
                <option value={6}>6 meses (Cuotas programadas cortas)</option>
              </select>
            </div>
          ) : financingPlan === 'ALIANZA_BBVA' ? (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-condensed uppercase tracking-wider text-brand-light mb-1.5">
                  Plazo (Meses)
                </label>
                <select
                  {...register('termMonths', { valueAsNumber: true })}
                  className="w-full bg-brand-darker border border-brand-mid rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-accent"
                >
                  {[12, 24, 36, 48, 60].map((m) => (
                    <option key={m} value={m}>{m} meses</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-condensed uppercase tracking-wider text-brand-light mb-1.5">
                  Sistema Amortización
                </label>
                <select
                  {...register('amortizationSystem')}
                  className="w-full bg-brand-darker border border-brand-mid rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-accent"
                >
                  <option value="PRICE">PRICE (Cuota Fija)</option>
                  <option value="SAC">SAC (Cuota Decreciente)</option>
                </select>
              </div>
            </div>
          ) : null}

          {/* Botón Calcular */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-accent hover:bg-accent-light text-white font-display text-base tracking-wider uppercase rounded-xl transition-all duration-300 shadow-lg shadow-accent/20 flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Calculando...</span>
              </>
            ) : (
              <>
                <Calculator size={18} />
                <span>Actualizar Simulación</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* ─── COLUMNA 2: RESULTADO INTERACTIVO (7 col) ───────────────────── */}
      <div className="lg:col-span-7">
        <AnimatePresence mode="wait">
          {result ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-6"
            >
              {/* Tarjeta principal con cuota destacada */}
              <div className="glass rounded-2xl p-8 border border-accent/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5 mb-6">
                  <div>
                    <span className="text-xs font-bold font-condensed uppercase tracking-[0.3em] text-accent block">
                      {result.input.financingPlan === 'ASEGURATE_500'
                        ? 'PLAN ASEGÚRATE CON 500'
                        : result.input.financingPlan === 'AVANZA_36'
                        ? 'PROGRAMA AVANZA 36 (FINANZAS DIGITALES)'
                        : 'ALIANZAS BANCARIAS (BBVA PROVINCIAL)'}
                    </span>
                    <h3 className="text-2xl font-display text-white font-bold mt-1">
                      {result.input.modelName}
                    </h3>
                  </div>
                  <div className="px-4 py-1.5 bg-accent/20 border border-accent/40 rounded-full text-xs font-condensed uppercase tracking-wider text-accent font-semibold">
                    Ahorro estimado hasta 30%
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div>
                    <span className="text-xs text-brand-subtle uppercase tracking-wider block mb-1">
                      {result.input.financingPlan === 'ASEGURATE_500'
                        ? 'Cuota Mensual Programada'
                        : result.input.financingPlan === 'AVANZA_36'
                        ? '1ª Etapa: Cuota Acumulación (6 meses)'
                        : 'Cuota Mensual Estimada'}
                    </span>
                    <div className="text-5xl font-display text-white font-bold tracking-tight">
                      {fmt(result.result.monthlyInstallment)}
                    </div>
                    {result.result.secondInstallmentText && (
                      <p className="text-xs text-accent mt-2 font-semibold">
                        {result.result.secondInstallmentText}
                      </p>
                    )}
                  </div>

                  <div className="bg-brand-darker/70 border border-brand-mid/40 rounded-xl p-5 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-brand-subtle">Valor del vehículo:</span>
                      <span className="text-white font-bold">{fmt(result.input.vehiclePrice)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-brand-subtle">
                        {result.input.financingPlan === 'ASEGURATE_500' ? 'Apartado Inicial:' : 'Inicial / Primer Pago:'}
                      </span>
                      <span className="text-accent font-bold">{fmt(result.input.downPayment)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-brand-subtle">Monto a Financiar:</span>
                      <span className="text-white font-semibold">{fmt(result.input.principal)}</span>
                    </div>
                    <div className="flex justify-between text-sm border-t border-white/10 pt-2">
                      <span className="text-brand-subtle">Ahorro vs. Contado Atípico:</span>
                      <span className="text-emerald-400 font-bold">{fmt(result.result.estimatedSavings)}</span>
                    </div>
                  </div>
                </div>

                {/* Condición de entrega */}
                <div className="mt-6 pt-5 border-t border-white/10 flex items-start gap-3">
                  <Sparkles size={18} className="text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-brand-light leading-relaxed">
                    <strong className="text-white">Condición de Entrega:</strong> {result.result.deliveryCondition}
                  </p>
                </div>
              </div>

              {/* Botón Acordeón: Tabela de Amortización */}
              <div className="glass rounded-xl overflow-hidden border border-brand-mid/30">
                <button
                  onClick={() => setShowTable(!showTable)}
                  className="w-full flex items-center justify-between p-5 text-sm font-bold font-condensed uppercase tracking-wider text-brand-light hover:text-white transition-colors"
                >
                  <span>Ver Tabla de Pagos & Cronograma Programado ({result.result.amortizationTable.length} meses)</span>
                  {showTable ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                <AnimatePresence>
                  {showTable && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="overflow-x-auto max-h-72 overflow-y-auto border-t border-white/10">
                        <table className="w-full text-xs text-left">
                          <thead className="bg-brand-darker sticky top-0 z-10">
                            <tr>
                              <th className="p-3 text-brand-subtle font-condensed uppercase">Mes</th>
                              <th className="p-3 text-white font-condensed uppercase">Cuota</th>
                              <th className="p-3 text-brand-light font-condensed uppercase">Amortización</th>
                              <th className="p-3 text-accent font-condensed uppercase">Juros</th>
                              <th className="p-3 text-brand-subtle font-condensed uppercase">Saldo Restante</th>
                              <th className="p-3 text-white font-condensed uppercase">Etapa / Nota</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {result.result.amortizationTable.map((row) => (
                              <tr key={row.month} className="hover:bg-brand-darker/40 transition-colors">
                                <td className="p-3 text-brand-subtle font-mono">Mes {row.month}</td>
                                <td className="p-3 text-white font-bold font-mono">{fmt(row.payment)}</td>
                                <td className="p-3 text-brand-light font-mono">{fmt(row.principal)}</td>
                                <td className="p-3 text-accent font-mono">{fmt(row.interest)}</td>
                                <td className="p-3 text-brand-subtle font-mono">{fmt(row.balance)}</td>
                                <td className="p-3 text-brand-light">
                                  <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-semibold">
                                    {row.note || 'Pago programado'}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Botón CTA directo para llenar la planilla */}
              <a
                href="#solicitud-credito"
                className="block text-center py-4 bg-brand-darker border border-accent text-accent hover:bg-accent hover:text-white font-display text-sm uppercase tracking-widest rounded-xl transition-all duration-300 shadow-md"
              >
                Solicitar Crédito / Formalizar Apartado para {result.input.modelName}
              </a>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  )
}
