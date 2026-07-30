import type { Metadata } from 'next'
import { TestDriveForm } from '@/components/testdrive/TestDriveForm'
import { Calendar, HelpCircle, Clock, Compass } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Solicitud de Test Drive | MG Motors Venezuela',
  description:
    'Agenda tu prueba de manejo gratuita en MG Motors Venezuela. Elige tu concesionario en Caracas, Valencia, Maracaibo, Barquisimeto y más.',
}

export default function TestDrivePage() {
  return (
    <div className="bg-brand-black min-h-screen text-white">
      {/* ─── HERO DE TEST DRIVE ────────────────────────────────────────── */}
      <section className="pt-36 pb-16 bg-gradient-to-b from-brand-darkest via-brand-darker to-brand-black border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="container-site relative z-10">
          <p className="text-xs font-bold font-condensed uppercase tracking-[0.3em] text-accent mb-3">
            MG Motors Venezuela · Experiencia en Ruta
          </p>
          <h1 className="text-display-lg font-display text-white mb-6">
            SOLICITUD DE <span className="text-gradient-accent">TEST DRIVE</span>
          </h1>
          <p className="text-brand-subtle max-w-3xl leading-relaxed text-base">
            Vive la emoción de conducir un <strong>MG Motors</strong> en condiciones reales de ruta.
            Solicita tu prueba de manejo en nuestros concesionarios oficiales en Venezuela de forma gratuita, 
            personalizada y sin compromiso.
          </p>

          {/* 3 Pasos de la experiencia */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              {
                icon: Calendar,
                step: '01. Agenda Online',
                title: 'Reserva Rápida',
                desc: 'Selecciona tu modelo MG, fecha, turno y concesionario más cercano en el formulario.',
              },
              {
                icon: Clock,
                step: '02. Confirmación',
                title: 'Atención en 4 Horas',
                desc: 'Un asesor comercial MG se pondrá en contacto para confirmar los detalles de tu cita.',
              },
              {
                icon: Compass,
                step: '03. Experiencia MG',
                title: 'Conduce en Ruta',
                desc: 'Presenta tu Cédula, Licencia y Certificado Médico para disfrutar del rendimiento MG.',
              },
            ].map((item, idx) => (
              <div key={idx} className="glass rounded-xl p-6 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <item.icon size={24} className="text-accent" />
                    <span className="text-xs font-mono text-brand-muted">{item.step}</span>
                  </div>
                  <p className="text-lg font-display font-bold text-white">{item.title}</p>
                </div>
                <p className="text-xs text-brand-subtle mt-3 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FORMULARIO DE AGENDAMIENTO ─────────────────────────────────── */}
      <section className="section-py bg-brand-black" aria-label="Formulario para agendar Test Drive">
        <div className="container-site">
          <TestDriveForm />
        </div>
      </section>

      {/* ─── PREGUNTAS FRECUENTES (FAQ) TEST DRIVE ──────────────────────── */}
      <section className="section-py bg-brand-darker border-t border-white/10">
        <div className="container-site max-w-4xl">
          <div className="text-center mb-12">
            <p className="text-xs font-bold font-condensed uppercase tracking-[0.3em] text-accent mb-2">
              Preguntas Frecuentes
            </p>
            <h2 className="text-display-md font-display text-white">
              TODO SOBRE TU <span className="text-gradient-accent">PRUEBA DE MANEJO</span>
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: '¿Tiene algún costo realizar un Test Drive MG?',
                a: 'No, la prueba de manejo en cualquier sede oficial de MG Motors Venezuela es 100% gratuita y no genera ningún tipo de obligación de compra.',
              },
              {
                q: '¿Qué documentos son obligatorios para conducir en la prueba?',
                a: 'Por normativa legal y de seguridad vial en Venezuela, debes presentar el día de la cita en original y vigente: Cédula de Identidad, Licencia de Conducir y Certificado Médico de Conducir.',
              },
              {
                q: '¿Puedo agendar una prueba con modelos 100% eléctricos como el MG4 EV o Cyberster?',
                a: 'Sí, disponemos de unidades de prueba eléctricas en nuestras sedes principales (como Caracas Las Mercedes y Altamira). Nuestro asesor te indicará la disponibilidad exacta de la versión al confirmar tu reserva.',
              },
              {
                q: '¿Cuánto tiempo dura la prueba de manejo en ruta?',
                a: 'El recorrido estándar tiene una duración aproximada de 20 a 30 minutos, acompañado siempre por un especialista de MG que te explicará la tecnología, sistemas ADAS (MG Pilot) y modos de manejo.',
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
