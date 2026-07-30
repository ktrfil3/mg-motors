import Link from 'next/link'
import { TrollerLogo } from '../brand/TrollerLogo'
import { Instagram, Youtube, Facebook, Linkedin, Phone, Mail, ShieldCheck } from 'lucide-react'

const footerLinks = {
  modelos: {
    title: 'Modelos',
    links: [
      { label: 'MG ZS', href: '/modelos/zs' },
      { label: 'MG HS', href: '/modelos/hs' },
      { label: 'MG RX5', href: '/modelos/rx5' },
      { label: 'MG4 EV', href: '/modelos/mg4-ev' },
      { label: 'MG ZS EV', href: '/modelos/zs-ev' },
      { label: 'Comparar Modelos', href: '/modelos/comparar' },
    ],
  },
  comprar: {
    title: 'Comprar',
    links: [
      { label: 'Ofertas Especiales', href: '/ofertas' },
      { label: 'Simulador de Cuotas', href: '/financiamiento' },
      { label: 'Consulta de Crédito', href: '/consulta-credito' },
      { label: 'Configurador 3D', href: '/configurador/zs' },
      { label: 'Hallar Concesionario', href: '/concesionarios' },
    ],
  },
  servicios: {
    title: 'Servicios',
    links: [
      { label: 'Agendar Test Drive', href: '/test-drive' },
      { label: 'Servicio Técnico', href: '/concesionarios?servicio=servicio' },
      { label: 'Garantía', href: '/garantia' },
      { label: 'Recalls', href: '/recalls' },
      { label: 'Manual del Propietario', href: '/manuales' },
      { label: 'Accesorios Originales', href: '/accesorios' },
    ],
  },
  empresa: {
    title: 'La Empresa',
    links: [
      { label: 'Nuestra Historia', href: '/nosotros' },
      { label: 'Tecnología MG', href: '/nosotros#tecnologia' },
      { label: 'Sostenibilidad', href: '/nosotros#sostenibilidad' },
      { label: 'Trabaja con Nosotros', href: '/empleos' },
      { label: 'Prensa', href: '/prensa' },
    ],
  },
  legal: {
    title: 'Legal',
    links: [
      { label: 'Política de Privacidad', href: '/privacidad' },
      { label: 'Términos de Uso', href: '/terminos' },
      { label: 'Política de Cookies', href: '/cookies' },
      { label: 'Canal de Denuncias', href: '/denuncia' },
    ],
  },
}

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com/mgmotorsvenezuela', Icon: Instagram },
  { label: 'YouTube',   href: 'https://youtube.com/mgmotorsvenezuela',   Icon: Youtube },
  { label: 'Facebook',  href: 'https://facebook.com/mgmotorsvenezuela',  Icon: Facebook },
  { label: 'LinkedIn',  href: 'https://linkedin.com/company/mgmotorsve',  Icon: Linkedin },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-brand-darkest border-t border-brand-mid/20" role="contentinfo">
      <div className="container-site py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
          {/* Columna de marca */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 flex flex-col gap-6">
            <TrollerLogo className="h-12 w-auto" />
            <p className="text-sm text-brand-subtle leading-relaxed max-w-xs">
              La experiencia de conducción más avanzada, ahora en Venezuela. Tecnología, diseño y pasión.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded border border-brand-mid/40 text-brand-subtle hover:border-accent hover:text-accent transition-colors duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-2 text-xs text-brand-subtle">
              <a href="tel:+58212000000" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Phone size={13} /> +58 (212) 000-0000
              </a>
              <a href="mailto:info@mgmotorsvenezuela.com" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Mail size={13} /> info@mgmotorsvenezuela.com
              </a>
            </div>
          </div>

          {/* Columnas de links */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h3 className="text-xs font-bold font-condensed uppercase tracking-widest text-brand-light mb-4">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {section.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-brand-subtle hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Legal */}
      <div className="border-t border-brand-mid/20">
        <div className="container-site py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="text-xs text-brand-muted leading-relaxed max-w-2xl">
              <p>
                © {year} MG Motors Venezuela C.A. RIF: J-[00000000]-0.
                Av. Principal, [Edificio], Caracas, Venezuela.
              </p>
              <p className="mt-1">
                Imágenes de referencia. Precios sujetos a cambio sin previo aviso.
                Oferta válida según disponibilidad de inventario. Sujeto a aprobación de crédito.
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 bg-brand-darker/50 border border-brand-mid/20 rounded px-3 py-2">
              <ShieldCheck size={16} className="text-accent" />
              <span className="text-xs text-brand-subtle font-medium">
                Datos protegidos y seguros
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
