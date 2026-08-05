'use client'

import { useEffect, useState } from 'react'
import { MapPin, Phone, Clock } from 'lucide-react'

// ─── DealerMap com Leaflet ────────────────────────────────────────────────────
// Importado dinamicamente (ssr: false) para evitar erro de window undefined

import { dealersData } from '@/data/dealers'

interface Dealer {
  id: string
  name: string
  address: string
  city: string
  state: string
  phone?: string
  latitude: number
  longitude: number
  businessHours?: Record<string, string>
  hasSales: boolean
  hasService: boolean
}

export function DealerMap() {
  const dealers = dealersData;
  const [selectedDealer, setSelectedDealer] = useState<Dealer | null>(dealers[0] || null)
  const [MapComponents, setMapComponents] = useState<any>(null)

  // Carrega Leaflet dinamicamente
  useEffect(() => {
    Promise.all([
      import('react-leaflet').then(m => ({
        MapContainer: m.MapContainer,
        TileLayer: m.TileLayer,
        Marker: m.Marker,
        Popup: m.Popup,
      })),
      import('leaflet').then(async (L) => {
        // Injeta CSS do Leaflet via link tag (evita problema de import dinâmico de CSS no TS)
        if (!document.querySelector('link[href*="leaflet"]')) {
          const link = document.createElement('link')
          link.rel = 'stylesheet'
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
          document.head.appendChild(link)
        }
        // Fix ícone padrão do Leaflet
        delete (L.Icon.Default.prototype as any)._getIconUrl
        L.Icon.Default.mergeOptions({
          iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
          iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        })
        return L
      }),
    ]).then(([components]) => {
      setMapComponents(components)
    })
  }, [])

  const center: [number, number] = [8.0, -66.0] // Centro aproximado de Venezuela

  if (dealers.length === 0) {
    return (
      <div className="text-center py-20 text-brand-subtle">
        <MapPin size={48} className="mx-auto mb-4 opacity-30" />
        <p>No se encontraron concesionarios.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* ─── Lista de concesionarios ─────────────────────────────── */}
      <div className="lg:col-span-1 flex flex-col gap-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
        {dealers.map((dealer) => (
          <button
            key={dealer.id}
            onClick={() => setSelectedDealer(dealer)}
            className={[
              'text-left p-4 rounded-lg border transition-all duration-200',
              selectedDealer?.id === dealer.id
                ? 'border-accent bg-accent/10'
                : 'border-brand-mid/30 bg-brand-darker hover:border-accent/40',
            ].join(' ')}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-white">{dealer.name}</h3>
                <p className="text-xs text-brand-subtle mt-0.5">
                  {dealer.city}, {dealer.state}
                </p>
                <p className="text-xs text-brand-subtle mt-0.5 line-clamp-1">
                  {dealer.address}
                </p>
              </div>
              <MapPin size={14} className="text-accent flex-shrink-0 mt-0.5" />
            </div>
            <div className="flex items-center gap-3 mt-2">
              {dealer.hasSales && (
                <span className="text-xs bg-brand-mid/30 text-brand-light px-2 py-0.5 rounded border border-brand-mid/50">Ventas</span>
              )}
              {dealer.hasService && (
                <span className="text-xs bg-brand-mid/30 text-brand-light px-2 py-0.5 rounded border border-brand-mid/50">Servicio</span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* ─── Mapa ────────────────────────────────────────────────── */}
      <div className="lg:col-span-2 flex flex-col gap-4">
        <div className="h-96 lg:h-[500px] rounded-xl overflow-hidden border border-brand-mid/20 relative z-0">
          {MapComponents ? (
            <MapComponents.MapContainer
              center={center}
              zoom={6}
              className="h-full w-full"
              style={{ background: '#0a0a0a' }}
            >
              <MapComponents.TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              />
              {dealers.map((dealer) => (
                <MapComponents.Marker
                  key={dealer.id}
                  position={[dealer.latitude, dealer.longitude]}
                  eventHandlers={{ click: () => setSelectedDealer(dealer) }}
                >
                  <MapComponents.Popup>
                    <div className="text-white">
                      <strong>{dealer.name}</strong>
                      <br />
                      {dealer.address}
                    </div>
                  </MapComponents.Popup>
                </MapComponents.Marker>
              ))}
            </MapComponents.MapContainer>
          ) : (
            <div className="h-full bg-brand-darker flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-brand-mid border-t-accent rounded-full animate-spin" />
            </div>
          )}
        </div>

        {/* Detalhe da concessionária selecionada */}
        {selectedDealer && (
          <div className="glass rounded-xl p-5">
            <h2 className="text-lg font-display text-white mb-3">{selectedDealer.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-start gap-2 text-brand-subtle">
                <MapPin size={14} className="mt-0.5 text-accent flex-shrink-0" />
                <span>{selectedDealer.address}, {selectedDealer.city} - {selectedDealer.state}</span>
              </div>
              {selectedDealer.phone && (
                <div className="flex items-center gap-2 text-brand-subtle">
                  <Phone size={14} className="text-accent flex-shrink-0" />
                  <a href={`tel:${selectedDealer.phone}`} className="hover:text-accent transition-colors">
                    {selectedDealer.phone}
                  </a>
                </div>
              )}
              {selectedDealer.businessHours && (
                <div className="flex items-start gap-2 text-brand-subtle sm:col-span-2">
                  <Clock size={14} className="mt-0.5 text-accent flex-shrink-0" />
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    {Object.entries(selectedDealer.businessHours).map(([day, hours]) => (
                      <span key={day}><strong className="text-brand-light">{day}:</strong> {hours}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
