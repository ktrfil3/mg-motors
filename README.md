# Troller — Plataforma Automotiva Brasileira

Site automotivo completo para a marca **Troller**, inspirado na experiência visual do CUPRA (dark/premium, mega-menú, hero em vídeo, carrossel de modelos), desenvolvido em português do Brasil com conformidade LGPD/CDC/BACEN.

---

## Stack Técnico

| Camada | Tecnologia |
|---|---|
| Frontend | Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion + React Three Fiber |
| Backend | NestJS + TypeScript |
| Banco de Dados | PostgreSQL 16 + Prisma ORM |
| Cache | Redis 7 |
| Monorepo | pnpm workspaces |
| Infraestrutura | Docker Compose |

---

## Pré-requisitos

- **Node.js** >= 20.0.0
- **pnpm** >= 9.0.0 (`npm install -g pnpm`)
- **Docker Desktop** (para PostgreSQL e Redis)

---

## Instalação Rápida

```bash
# 1. Clone o repositório
git clone <repo-url>
cd troller

# 2. Instale as dependências
pnpm install

# 3. Configure variáveis de ambiente
cp .env.example .env
# Edite o .env se necessário (padrões funcionam para dev local)

# 4. Suba os serviços Docker (Postgres + Redis)
docker compose up -d

# 5. Gere o cliente Prisma e execute as migrations
pnpm db:migrate

# 6. Popule o banco com dados de exemplo
pnpm db:seed

# 7. Inicie o desenvolvimento
pnpm dev
```

Acesse:
- **Frontend:** http://localhost:3000
- **API:** http://localhost:3001/api/v1
- **Prisma Studio:** `pnpm db:studio` → http://localhost:5555

---

## Estrutura do Projeto

```
troller/
├── apps/
│   ├── web/              # Next.js 14 — Frontend
│   │   ├── app/
│   │   │   └── (site)/  # Páginas públicas
│   │   └── components/  # Componentes React
│   └── api/             # NestJS — Backend
│       ├── src/
│       │   ├── modules/ # Módulos de domínio
│       │   └── common/  # Utilitários globais
│       └── prisma/      # Schema + Seed
├── packages/
│   ├── ui/              # Design System compartilhado
│   └── config/          # ESLint, TSConfig, Tailwind base
└── docker-compose.yml
```

---

## API — Endpoints Principais

### Veículos
```
GET    /api/v1/vehicles                  # Listar todos (paginado)
GET    /api/v1/vehicles/featured         # Destaques (home)
GET    /api/v1/vehicles/:slug            # Detalhe completo
POST   /api/v1/vehicles                  # Criar (admin)
PATCH  /api/v1/vehicles/:id             # Atualizar (admin)
DELETE /api/v1/vehicles/:id             # Desativar (soft delete)
```

### Concessionárias
```
GET    /api/v1/dealers                   # Listar (com filtros)
GET    /api/v1/dealers?lat=&lng=&radius= # Busca por proximidade (Haversine)
GET    /api/v1/dealers/states            # Estados com contagem
GET    /api/v1/dealers/:id
```

### Ofertas
```
GET    /api/v1/offers                    # Ativas e vigentes
GET    /api/v1/offers/:id
```

### Simulador de Crédito (público)
```
POST   /api/v1/credit-simulation/calculate
# Rate limit: 30 req/min por IP
# Input: { vehiclePrice, downPayment, termMonths, amortizationSystem, monthlyInterestRate? }
# Output: parcela, tabela de amortização, CET estimado
```

---

## Módulo de Crédito — LGPD

### Simulação (pública)
- Sem dados pessoais
- Cálculos PRICE e SAC puros
- Persistência anônima por session ID

### Consulta Real (autenticada — Fase 4)
- Consentimento LGPD explícito obrigatório
- CPF e renda **cifrados com AES-256** antes de persistir
- Interface `IBureauCreditoProvider` — permite troca de provider (Serasa, Boa Vista) sem alteração de módulo
- Rate limit: 5 req/10min por usuário autenticado
- `ConsentLog` registra todos os consentimentos com data, IP e texto exato

### Campos sensíveis — NUNCA logados em texto plano
- `cpfEncrypted`, `rendaEncrypted`, `dadosEncrypted`

---

## Design System

Paleta Troller (dark/premium):

| Token | Valor | Uso |
|---|---|---|
| `accent` | `#E85D04` | Laranja Troller (CTAs, destaques) |
| `brand-black` | `#0A0A0A` | Background principal |
| `brand-darker` | `#1A1A1A` | Cards, modais |
| `brand-mid` | `#333333` | Bordas, separadores |

Tipografia:
- **Títulos:** Barlow Condensed (Bold/ExtraBold) — `font-display`
- **Corpo:** Outfit (Regular/SemiBold) — `font-sans`

---

## Assets a Substituir

| Placeholder | Onde | Substituir por |
|---|---|---|
| `/assets/video/hero.mp4` | `Hero.tsx` | Vídeo off-road da marca |
| `/assets/vehicles/*/hero.jpg` | Seed | Fotos reais dos modelos |
| `TrollerLogo.tsx` | SVG inline | SVG oficial da marca |
| `model3dUrl: null` | Seed | URL do arquivo `.glb` |

---

## Docker

```bash
# Subir serviços
docker compose up -d

# Parar serviços
docker compose down

# Ver logs
docker compose logs -f postgres

# Redis Commander (UI)
docker compose --profile tools up -d
# Acesse: http://localhost:8081
```

---

## Fases de Implementação

| Fase | Status | Conteúdo |
|---|---|---|
| 0 — Setup | ✅ | Monorepo, Docker, Prisma schema |
| 1 — Backend Base | ✅ | Vehicles, Dealers, Offers + Seed |
| 2 — Frontend Base | ✅ | Header, MegaMenu, Footer, Home |
| 3 — Modelo + 3D | ✅ | Ficha técnica + Configurador R3F |
| 4 — Crédito | 🔄 | Auth completo + CreditApplication LGPD |
| 5 — Concessionárias | ✅ | Mapa Leaflet |
| 6 — Pulido | 🔄 | Responsive, a11y, testes e2e |

---

## Decisões Técnicas

- **Leaflet** em vez de Google Maps: open source, sem API key obrigatória
- **IBureauCreditoProvider** como interface: troca de Serasa/Boa Vista sem alterar o módulo
- **AES-256** para CPF e renda: requisito LGPD para dados financeiros pessoais
- **ISR (Incremental Static Regeneration)**: páginas de veículos revalidam a cada 10 minutos
- **Fallback data**: frontend funciona mesmo sem API rodando (dados estáticos de dev)

---

## Licença

Proprietário — [Troller Veículos e Motores do Brasil LTDA]
