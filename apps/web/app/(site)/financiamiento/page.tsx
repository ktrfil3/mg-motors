import type { Metadata } from 'next'
import { SimulatorForm } from '@/components/credit/SimulatorForm'
import { SolicitudCreditoForm } from '@/components/credit/SolicitudCreditoForm'
import {
  DollarSign, Clock, HelpCircle,
  TrendingUp, PiggyBank, FileCheck, Building2
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Financiamiento y Solicitud de Crédito | MG Motors Venezuela',
  description:
    'Simula tu financiamiento MG Motors Venezuela. Plan "Asegúrate con 500", Programa "Avanza 36" y Alianzas Bancarias (BBVA Provincial). Pre-aprobación digital.',
}

export default function FinanciamientoPage() {
  return (
    <div className="bg-brand-black min-h-screen text-white">
      {/* ─── HERO DE FINANCIAMIENTO ──────────────────────────────────────── */}
      <section className="pt-36 pb-16 bg-gradient-to-b from-brand-darkest via-brand-darker to-brand-black border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="container-site relative z-10">
          <p className="text-xs font-bold font-condensed uppercase tracking-[0.3em] text-accent mb-3">
            MG Motors Venezuela · Finanzas Digitales & Alianzas Bancarias
          </p>
          <h1 className="text-display-lg font-display text-white mb-6">
            PROGRAMAS DE <span className="text-gradient-accent">FINANCIAMIENTO</span>
          </h1>
          <p className="text-brand-subtle max-w-3xl leading-relaxed text-base">
            En MG Motors Venezuela impulsamos tu movilidad con esquemas estructurados para cada perfil:
            desde nuestro exclusivo <strong>Plan &quot;Asegúrate con 500&quot;</strong>, el novedoso sistema de 
            <strong> Finanzas Digitales &quot;Avanza 36&quot;</strong>, hasta créditos tradicionales con alianzas bancarias como 
            <strong> BBVA Provincial</strong>.
          </p>

          {/* Stats Destacados */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
            {[
              {
                icon: DollarSign,
                title: 'Desde $500 USD',
                sub: 'Apartado Programado',
                desc: 'Inicia el proceso en nuestro Plan Asegúrate con 500',
              },
              {
                icon: Clock,
                title: 'Máximo 180 Días',
                sub: 'Entrega Programada',
                desc: 'Al completar el esquema de apartado o al adelantar cuotas',
              },
              {
                icon: PiggyBank,
                title: 'Hasta 30% Ahorro',
                sub: 'Incentivo de Ahorros',
                desc: 'Frente a modalidades atípicas o de compra tradicional',
              },
              {
                icon: Building2,
                title: 'Alianza BBVA',
                sub: 'Crédito Tradicional',
                desc: 'Tasa preferencial y evaluación crediticia aliada',
              },
            ].map((st, idx) => (
              <div key={idx} className="glass rounded-xl p-5 border border-white/10 flex flex-col justify-between">
                <div>
                  <st.icon size={22} className="text-accent mb-3" />
                  <p className="text-xl font-display font-bold text-white">{st.title}</p>
                  <p className="text-xs text-accent font-condensed uppercase tracking-wider mt-0.5">{st.sub}</p>
                </div>
                <p className="text-xs text-brand-subtle mt-3">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SIMULADOR INTERACTIVO ────────────────────────────────────────── */}
      <section className="section-py bg-brand-black" aria-label="Simulador de Financiamiento MG">
        <div className="container-site">
          <SimulatorForm />
        </div>
      </section>

      {/* ─── ¿CÓMO FUNCIONA LA LÓGICA DE ESTOS PAGOS? ──────────────────────── */}
      <section id="como-funciona" className="section-py bg-brand-darker border-t border-white/10">
        <div className="container-site">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-xs font-bold font-condensed uppercase tracking-[0.3em] text-accent mb-2">
              Estructura Económica Automotriz
            </p>
            <h2 className="text-display-md font-display text-white">
              ¿CÓMO FUNCIONA LA LÓGICA DE <span className="text-gradient-accent">ESTOS PAGOS?</span>
            </h2>
            <p className="text-sm text-brand-subtle mt-3">
              Conoce los pilares que hacen posible adquirir tu vehículo MG en Venezuela de forma segura, estructurada y transparente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass rounded-2xl p-8 border border-white/10 hover:border-accent/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-accent/20 border border-accent/40 flex items-center justify-center text-accent mb-6">
                <TrendingUp size={24} />
              </div>
              <h3 className="text-xl font-display text-white font-bold mb-3">
                1. Fraccionamiento del Riesgo
              </h3>
              <p className="text-sm text-brand-subtle leading-relaxed">
                Al no existir un mercado masivo de crédito bancario tradicional a largo plazo para vehículos en Venezuela, 
                las marcas usamos esquemas de aportes por etapas donde el vehículo se entrega al completar un porcentaje 
                alto o la totalidad del plan de cuotas programadas, garantizando seguridad para el comprador y estabilidad financiera.
              </p>
            </div>

            <div className="glass rounded-2xl p-8 border border-white/10 hover:border-accent/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-accent/20 border border-accent/40 flex items-center justify-center text-accent mb-6">
                <PiggyBank size={24} />
              </div>
              <h3 className="text-xl font-display text-white font-bold mb-3">
                2. Incentivos de Ahorros
              </h3>
              <p className="text-sm text-brand-subtle leading-relaxed">
                Programas como los de MG ofrecen incentivos de un ahorro estimado de hasta <strong>30%</strong> frente a compras 
                fraccionadas atípicas o segundas modalidades de contado, dependiendo del cumplimiento estricto de las cuotas 
                y el aprovechamiento de nuestras importaciones directas de fábrica.
              </p>
            </div>

            <div className="glass rounded-2xl p-8 border border-white/10 hover:border-accent/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-accent/20 border border-accent/40 flex items-center justify-center text-accent mb-6">
                <FileCheck size={24} />
              </div>
              <h3 className="text-xl font-display text-white font-bold mb-3">
                3. Requisitos Comunes
              </h3>
              <ul className="text-sm text-brand-subtle space-y-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  <span>Copia de Cédula de Identidad y RIF actualizado.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  <span>Soportes de ingresos o estados de cuenta bancarios.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  <span>Pago inicial en divisas (efectivo o métodos electrónicos autorizados).</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PLANTILLA DE INSCRIPCIÓN / SOLICITUD DE CRÉDITO ────────────── */}
      <section className="section-py bg-brand-black border-t border-white/10" aria-label="Solicitud de Crédito MG">
        <div className="container-site">
          <SolicitudCreditoForm />
        </div>
      </section>

      {/* ─── PREGUNTAS FRECUENTES (FAQ) ──────────────────────────────────── */}
      <section id="faq" className="section-py bg-brand-darker border-t border-white/10">
        <div className="container-site max-w-4xl">
          <div className="text-center mb-12">
            <p className="text-xs font-bold font-condensed uppercase tracking-[0.3em] text-accent mb-2">
              Preguntas Frecuentes
            </p>
            <h2 className="text-display-md font-display text-white">
              DUDAS COMUNES SOBRE <span className="text-gradient-accent">FINANCIAMIENTO</span>
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: '¿Cómo funciona el Plan "Asegúrate con 500"?',
                a: 'Es un sistema de apartado y pago programado donde inicias el trámite con un pago desde $500 USD. Ofrecemos plazos de 6, 9 y 12 meses. En la modalidad a 12 meses manejas cuotas fijas iguales, mientras que a 9 meses las tres primeras cuotas son dobles. La entrega del vehículo se realiza en un máximo de 180 días al completar el esquema o al adelantar cuotas.',
              },
              {
                q: '¿Qué es el Programa de Finanzas Digitales "Avanza 36"?',
                a: 'Es un esquema diseñado para fraccionar el pago inicial. Pagas un 20% de inicial a la firma, luego completas 6 cuotas de acumulación para alcanzar el 45% del vehículo, y el 55% restante se divide en hasta 30 cuotas mensuales fijas con una tasa preferencial.',
              },
              {
                q: '¿Qué bancos aliados trabajan con MG Motors Venezuela?',
                a: 'Operamos con instituciones financieras de primera línea en Venezuela, tales como BBVA Provincial. Estos créditos bancarios tradicionales requieren evaluación de perfil crediticio, ingresos demostrables y una inicial que oscila entre el 10% y 20%.',
              },
              {
                q: '¿Cómo protegen mis datos personales y crediticios?',
                a: 'Todo el proceso digital se rige por estrictas políticas de confidencialidad en cumplimiento con la normativa de protección de datos personales en Venezuela, regulaciones bancarias locales y estándares internacionales de cifrado 256-bit.',
              },
            ].map((faq, i) => (
              <div key={i} className="glass rounded-xl p-6 border border-white/10">
                <h3 className="text-base font-display font-bold text-white mb-2 flex items-center gap-2">
                  <HelpCircle size={18} className="text-accent flex-shrink-0" />
                  {faq.q}
                </h3>
                <p className="text-sm text-brand-subtle leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
