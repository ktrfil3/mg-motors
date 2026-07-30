import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

// ─── (site) layout ────────────────────────────────────────────────────────────
// Wrapper para todas as páginas públicas do site

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </>
  )
}
