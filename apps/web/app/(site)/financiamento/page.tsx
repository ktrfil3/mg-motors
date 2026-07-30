import type { Metadata } from 'next'
import FinanciamientoPage, { metadata as meta } from '../financiamiento/page'

export const metadata: Metadata = meta

export default function FinanciamentoRedirectPage() {
  return <FinanciamientoPage />
}
