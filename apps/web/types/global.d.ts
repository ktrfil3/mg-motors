// ─── Declaraciones de módulos CSS ────────────────────────────────────────────
// Permite importar archivos CSS sin errores de TypeScript

declare module '*.css' {
  const content: { [className: string]: string }
  export default content
}

// Leaflet CSS específicamente
declare module 'leaflet/dist/leaflet.css'
