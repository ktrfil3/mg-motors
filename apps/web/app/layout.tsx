import type { Metadata } from 'next'
import './globals.css'
import { TestDriveModalGlobal } from '@/components/testdrive/TestDriveModalGlobal'

export const metadata: Metadata = {
  title: {
    default: 'MG Motors Venezuela — Maneja el Futuro',
    template: '%s | MG Motors Venezuela',
  },
  description:
    'Descubre los modelos MG en Venezuela: SUV, eléctricos y sedanes. Simula tu financiamiento, encuentra concesionarios y configura tu vehículo ideal.',
  icons: {
    icon: '/assets/logo-mg.png',
    shortcut: '/assets/logo-mg.png',
    apple: '/assets/logo-mg.png',
  },
  keywords: ['MG Motors', 'MG Venezuela', 'MG ZS', 'MG HS', 'MG4 EV', 'autos eléctricos Venezuela', 'SUV Venezuela'],
  openGraph: {
    type: 'website',
    locale: 'es_VE',
    url: 'https://www.mgmotorsvenezuela.com',
    siteName: 'MG Motors Venezuela',
    title: 'MG Motors Venezuela — Maneja el Futuro',
    description: 'Conoce los vehículos MG. Tecnología, diseño y rendimiento al alcance de Venezuela.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MG Motors Venezuela — Maneja el Futuro',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
        <TestDriveModalGlobal />
      </body>
    </html>
  )
}
