// ─── Prisma Seed — Dados de Exemplo Troller ────────────────────────────────────
// Cria: 5 veículos com versões e cores, 10 concessionárias, ofertas

import { PrismaClient, VehicleCategory, FuelType, TransmissionType } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed de dados...')

  // ─── Limpar dados existentes ───────────────────────────────────────────────
  await prisma.offer.deleteMany()
  await prisma.vehicleColor.deleteMany()
  await prisma.vehicleVersion.deleteMany()
  await prisma.vehicle.deleteMany()
  await prisma.dealer.deleteMany()

  // ─── VEÍCULOS ──────────────────────────────────────────────────────────────

  // 1. Troller T4 — Off-road lendário
  const t4 = await prisma.vehicle.create({
    data: {
      slug: 't4',
      name: 'Troller T4',
      tagline: 'O Rei das Trilhas',
      description:
        'O Troller T4 é o ícone definitivo do off-road brasileiro. Com tração 4x4 permanente, diferencial traseiro blocável e suspensão reforçada, ele conquista qualquer terreno sem abrir mão do conforto e da tecnologia de bordo.',
      category: VehicleCategory.OFFROAD,
      basePrice: new Decimal('189990.00'),
      engine: '2.0L EcoBoost Turbo 250cv',
      fuelType: FuelType.FLEX,
      transmission: TransmissionType.AUTOMATICO,
      doors: 4,
      seats: 5,
      heroImage: '/assets/vehicles/t4/hero.jpg',
      isActive: true,
      isFeatured: true,
      order: 1,
      versions: {
        create: [
          {
            slug: 'adventure',
            name: 'Adventure',
            price: new Decimal('189990.00'),
            description: 'Versão de entrada com todos os recursos essenciais para o off-road.',
            specs: {
              potencia: '250cv a 5.500rpm',
              torque: '370Nm a 1.500rpm',
              velocidadeMaxima: '180km/h',
              aceleracao0a100: '8,9s',
              tracao: '4x4 permanente',
              freios: 'Discos ventilados nas 4 rodas',
              rodas: 'Aro 17 alumínio',
              pneusFrente: '255/70 R17',
              pneusTraseiro: '255/70 R17',
              alturaSolo: '280mm',
              capacidadeTanque: '70L',
              portaMalas: '500L',
              multimidia: 'Troller Connect 10" com Apple CarPlay/Android Auto',
              seguranca: ['ABS', 'ESP', '6 airbags', 'Câmera de ré'],
            },
            order: 1,
          },
          {
            slug: 'sport',
            name: 'Sport',
            price: new Decimal('219990.00'),
            description: 'Versão intermediária com pacote visual exclusivo e mais tecnologia.',
            specs: {
              potencia: '250cv a 5.500rpm',
              torque: '370Nm a 1.500rpm',
              velocidadeMaxima: '185km/h',
              aceleracao0a100: '8,7s',
              tracao: '4x4 permanente com diferencial blocável',
              freios: 'Discos ventilados nas 4 rodas com pinças esportivas',
              rodas: 'Aro 18 alumínio forjado',
              alturaSolo: '285mm',
              multimidia: 'Troller Connect 12" com Head-Up Display',
              seguranca: ['ABS', 'ESP', '8 airbags', 'Câmera 360°', 'Sensores de estacionamento'],
            },
            order: 2,
          },
          {
            slug: 'extreme',
            name: 'Extreme',
            price: new Decimal('259990.00'),
            description: 'Versão topo de linha com equipamento máximo e diferencial traseiro blocável eletronicamente.',
            specs: {
              potencia: '280cv a 5.800rpm',
              torque: '400Nm a 1.600rpm',
              velocidadeMaxima: '190km/h',
              aceleracao0a100: '8,2s',
              tracao: '4x4 permanente com diferencial dianteiro e traseiro blocáveis',
              alturaSolo: '290mm',
              multimidia: 'Troller Connect 12" com navegação e câmera night vision',
              seguranca: ['ABS', 'ESP', '8 airbags', 'Câmera 360°', 'Piloto automático adaptativo'],
            },
            order: 3,
          },
        ],
      },
      colors: {
        create: [
          { name: 'Preto Ônix', hexCode: '#1A1A1A', isMetallic: false, imageUrl: '/assets/vehicles/t4/preto.jpg' },
          { name: 'Branco Ártico', hexCode: '#F0F0F0', isMetallic: true, imageUrl: '/assets/vehicles/t4/branco.jpg' },
          { name: 'Laranja Troller', hexCode: '#E85D04', isMetallic: false, isPremium: true, additionalPrice: new Decimal('2500.00'), imageUrl: '/assets/vehicles/t4/laranja.jpg' },
          { name: 'Verde Militar', hexCode: '#3D5A3E', isMetallic: false, imageUrl: '/assets/vehicles/t4/verde.jpg' },
          { name: 'Cinza Grafite', hexCode: '#4A4A4A', isMetallic: true, additionalPrice: new Decimal('1500.00'), imageUrl: '/assets/vehicles/t4/grafite.jpg' },
        ],
      },
    },
  })

  // 2. Troller XR — SUV Premium
  const xr = await prisma.vehicle.create({
    data: {
      slug: 'xr',
      name: 'Troller XR',
      tagline: 'Poder com Sofisticação',
      description:
        'O Troller XR redefine o conceito de SUV premium brasileiro. Tração inteligente AWD, suspensão pneumática adaptativa e cabine de luxo — para quem não abre mão de nada.',
      category: VehicleCategory.SUV,
      basePrice: new Decimal('299990.00'),
      engine: '3.0L V6 Biturbo 380cv',
      fuelType: FuelType.GASOLINA,
      transmission: TransmissionType.AUTOMATICO,
      doors: 4,
      seats: 7,
      heroImage: '/assets/vehicles/xr/hero.jpg',
      isActive: true,
      isFeatured: true,
      order: 2,
      versions: {
        create: [
          {
            slug: 'premium',
            name: 'Premium',
            price: new Decimal('299990.00'),
            specs: { potencia: '380cv', tracao: 'AWD inteligente', rodas: 'Aro 21' },
            order: 1,
          },
          {
            slug: 'executive',
            name: 'Executive',
            price: new Decimal('349990.00'),
            specs: { potencia: '400cv', tracao: 'AWD com modo off-road', rodas: 'Aro 22', suspensao: 'Pneumática adaptativa' },
            order: 2,
          },
        ],
      },
      colors: {
        create: [
          { name: 'Preto Safira', hexCode: '#0D0D1F', isMetallic: true, imageUrl: '/assets/vehicles/xr/preto.jpg' },
          { name: 'Prata Lunar', hexCode: '#C0C0C8', isMetallic: true, additionalPrice: new Decimal('2000.00') },
          { name: 'Azul Meia-Noite', hexCode: '#1A2744', isMetallic: true, additionalPrice: new Decimal('3000.00') },
          { name: 'Bordô Premium', hexCode: '#6B1E2D', isMetallic: true, isPremium: true, additionalPrice: new Decimal('4000.00') },
        ],
      },
    },
  })

  // 3. Troller Urban — Para a cidade
  const urban = await prisma.vehicle.create({
    data: {
      slug: 'urban',
      name: 'Troller Urban',
      tagline: 'Feito Para Seu Dia a Dia',
      description:
        'Compacto, eficiente e estiloso. O Troller Urban é a resposta perfeita para o trânsito urbano brasileiro: baixo consumo, fácil estacionamento e tecnologia de ponta.',
      category: VehicleCategory.URBAN,
      basePrice: new Decimal('119990.00'),
      engine: '1.5L EcoBoost 150cv',
      fuelType: FuelType.FLEX,
      transmission: TransmissionType.CVT,
      doors: 4,
      seats: 5,
      heroImage: '/assets/vehicles/urban/hero.jpg',
      isActive: true,
      isFeatured: false,
      order: 3,
      versions: {
        create: [
          { slug: 'city', name: 'City', price: new Decimal('119990.00'), specs: { potencia: '150cv', consumo: '14km/L cidade' }, order: 1 },
          { slug: 'city-tech', name: 'City Tech', price: new Decimal('139990.00'), specs: { potencia: '150cv', consumo: '15km/L cidade', multimidia: 'Troller Connect 10"' }, order: 2 },
          { slug: 'sport-edition', name: 'Sport Edition', price: new Decimal('159990.00'), specs: { potencia: '175cv', consumo: '13km/L cidade', visual: 'Kit aerodinâmico' }, order: 3 },
        ],
      },
      colors: {
        create: [
          { name: 'Branco Perolado', hexCode: '#F8F8F0', isMetallic: true },
          { name: 'Vermelho Paixão', hexCode: '#CC1F1F', isMetallic: false },
          { name: 'Azul Aqua', hexCode: '#2B7A8C', isMetallic: true, additionalPrice: new Decimal('1500.00') },
          { name: 'Cinza Urban', hexCode: '#6B7280', isMetallic: false },
        ],
      },
    },
  })

  // 4. Troller Sport — Performance
  const sport = await prisma.vehicle.create({
    data: {
      slug: 'sport',
      name: 'Troller Sport',
      tagline: 'Adrenalina em Estado Puro',
      description:
        'Para quem vive pela emoção de dirigir. O Troller Sport combina motor de alta performance com chassi esportivo desenvolvido em parceria com engenheiros de Fórmula 3.',
      category: VehicleCategory.SPORT,
      basePrice: new Decimal('279990.00'),
      engine: '2.5L Turbo 320cv',
      fuelType: FuelType.FLEX,
      transmission: TransmissionType.AUTOMATICO,
      doors: 2,
      seats: 4,
      heroImage: '/assets/vehicles/sport/hero.jpg',
      isActive: true,
      isFeatured: true,
      order: 4,
      versions: {
        create: [
          { slug: 'gt', name: 'GT', price: new Decimal('279990.00'), specs: { potencia: '320cv', aceleracao: '5,8s (0-100)', pneus: '245/40 R19' }, order: 1 },
          { slug: 'gts', name: 'GTS', price: new Decimal('319990.00'), specs: { potencia: '350cv', aceleracao: '5,2s (0-100)', pneus: '255/35 R20' }, order: 2 },
        ],
      },
      colors: {
        create: [
          { name: 'Vermelho Racing', hexCode: '#D72323', isMetallic: false, imageUrl: '/assets/vehicles/sport/vermelho.jpg' },
          { name: 'Preto Fosco', hexCode: '#111111', isMetallic: false, isPremium: true, additionalPrice: new Decimal('5000.00') },
          { name: 'Amarelo Esportivo', hexCode: '#F4D03F', isMetallic: false, additionalPrice: new Decimal('2500.00') },
          { name: 'Branco Polar', hexCode: '#FAFAFA', isMetallic: true },
        ],
      },
    },
  })

  console.log('✅ Veículo Troller sport criado:')
  console.log(sport)

  // 5. Troller E-Trail — Elétrico
  const etrail = await prisma.vehicle.create({
    data: {
      slug: 'e-trail',
      name: 'Troller E-Trail',
      tagline: 'O Futuro do Off-Road',
      description:
        'O primeiro SUV elétrico off-road do Brasil. Autonomia de 550km, carregamento ultra-rápido e torque instantâneo de 600Nm. O futuro chegou para as trilhas.',
      category: VehicleCategory.OFFROAD,
      basePrice: new Decimal('349990.00'),
      engine: 'Dual Motor Elétrico 450cv',
      fuelType: FuelType.ELETRICO,
      transmission: TransmissionType.AUTOMATICO,
      doors: 4,
      seats: 5,
      heroImage: '/assets/vehicles/e-trail/hero.jpg',
      isActive: true,
      isFeatured: true,
      order: 5,
      versions: {
        create: [
          { slug: 'standard-range', name: 'Standard Range', price: new Decimal('349990.00'), specs: { autonomia: '450km (WLTP)', potencia: '350cv', torque: '500Nm', recarga: 'DC Fast Charge 150kW' }, order: 1 },
          { slug: 'long-range', name: 'Long Range', price: new Decimal('399990.00'), specs: { autonomia: '550km (WLTP)', potencia: '450cv', torque: '600Nm', recarga: 'DC Fast Charge 250kW' }, order: 2 },
        ],
      },
      colors: {
        create: [
          { name: 'Branco Aurora', hexCode: '#F5F5F5', isMetallic: true },
          { name: 'Verde Sustentável', hexCode: '#2D6A4F', isMetallic: false, isPremium: true, additionalPrice: new Decimal('3000.00') },
          { name: 'Azul Elétrico', hexCode: '#0077CC', isMetallic: true, additionalPrice: new Decimal('2000.00') },
          { name: 'Preto Carvão', hexCode: '#1C1C1C', isMetallic: false },
        ],
      },
    },
  })

  console.log(`✅ ${5} veículos criados`)

  // ─── CONCESSIONÁRIAS ───────────────────────────────────────────────────────

  const dealers = await Promise.all([
    prisma.dealer.create({
      data: {
        code: 'SP001', name: 'Troller São Paulo Centro', tradeName: 'Troller SP Centro',
        address: 'Av. Paulista, 2000', city: 'São Paulo', state: 'SP', cep: '01310-100',
        latitude: -23.5629, longitude: -46.6544,
        phone: '(11) 3456-7890', whatsapp: '5511934567890', email: 'sp.centro@troller.com.br',
        businessHours: { 'seg-sex': '08:00-19:00', 'sab': '08:00-14:00' },
        hasSales: true, hasService: true, hasParts: true,
      }
    }),
    prisma.dealer.create({
      data: {
        code: 'SP002', name: 'Troller São Paulo Zona Sul', tradeName: 'Troller SP Sul',
        address: 'Av. Santo Amaro, 4500', city: 'São Paulo', state: 'SP', cep: '04703-002',
        latitude: -23.6272, longitude: -46.6987,
        phone: '(11) 5678-9012', whatsapp: '5511956789012', email: 'sp.sul@troller.com.br',
        businessHours: { 'seg-sex': '08:00-18:00', 'sab': '08:00-13:00' },
        hasSales: true, hasService: true,
      }
    }),
    prisma.dealer.create({
      data: {
        code: 'RJ001', name: 'Troller Rio de Janeiro Barra', tradeName: 'Troller RJ Barra',
        address: 'Av. das Américas, 8500', city: 'Rio de Janeiro', state: 'RJ', cep: '22793-081',
        latitude: -23.0024, longitude: -43.3652,
        phone: '(21) 3345-6789', whatsapp: '5521933456789', email: 'rj.barra@troller.com.br',
        businessHours: { 'seg-sex': '08:00-19:00', 'sab': '08:00-14:00', 'dom': '10:00-16:00' },
        hasSales: true, hasService: true, hasParts: true,
      }
    }),
    prisma.dealer.create({
      data: {
        code: 'MG001', name: 'Troller Belo Horizonte', tradeName: 'Troller BH',
        address: 'Av. Raja Gabaglia, 3000', city: 'Belo Horizonte', state: 'MG', cep: '30350-540',
        latitude: -19.9517, longitude: -43.9342,
        phone: '(31) 3456-7890', whatsapp: '5531934567890', email: 'bh@troller.com.br',
        businessHours: { 'seg-sex': '08:00-18:00', 'sab': '08:00-13:00' },
        hasSales: true, hasService: true,
      }
    }),
    prisma.dealer.create({
      data: {
        code: 'RS001', name: 'Troller Porto Alegre', tradeName: 'Troller POA',
        address: 'Av. Ipiranga, 6900', city: 'Porto Alegre', state: 'RS', cep: '90610-000',
        latitude: -30.0569, longitude: -51.1921,
        phone: '(51) 3456-7890', whatsapp: '5551934567890', email: 'poa@troller.com.br',
        businessHours: { 'seg-sex': '08:00-18:00', 'sab': '08:00-13:00' },
        hasSales: true, hasService: true,
      }
    }),
    prisma.dealer.create({
      data: {
        code: 'PR001', name: 'Troller Curitiba', tradeName: 'Troller CWB',
        address: 'Av. República Argentina, 3400', city: 'Curitiba', state: 'PR', cep: '80240-210',
        latitude: -25.4641, longitude: -49.2752,
        phone: '(41) 3456-7890', whatsapp: '5541934567890', email: 'cwb@troller.com.br',
        businessHours: { 'seg-sex': '08:00-18:00', 'sab': '09:00-13:00' },
        hasSales: true, hasService: true,
      }
    }),
    prisma.dealer.create({
      data: {
        code: 'BA001', name: 'Troller Salvador', tradeName: 'Troller SSA',
        address: 'Av. Antônio Carlos Magalhães, 4000', city: 'Salvador', state: 'BA', cep: '41820-021',
        latitude: -12.9877, longitude: -38.4714,
        phone: '(71) 3456-7890', whatsapp: '5571934567890', email: 'ssa@troller.com.br',
        businessHours: { 'seg-sex': '08:00-18:00', 'sab': '08:00-13:00' },
        hasSales: true, hasService: true,
      }
    }),
    prisma.dealer.create({
      data: {
        code: 'CE001', name: 'Troller Fortaleza', tradeName: 'Troller FOR',
        address: 'Av. Washington Soares, 1300', city: 'Fortaleza', state: 'CE', cep: '60811-341',
        latitude: -3.8034, longitude: -38.4943,
        phone: '(85) 3456-7890', whatsapp: '5585934567890', email: 'for@troller.com.br',
        businessHours: { 'seg-sex': '08:00-18:00', 'sab': '08:00-13:00' },
        hasSales: true, hasService: false,
      }
    }),
    prisma.dealer.create({
      data: {
        code: 'GO001', name: 'Troller Goiânia', tradeName: 'Troller GYN',
        address: 'Av. T-7, 1800', city: 'Goiânia', state: 'GO', cep: '74230-010',
        latitude: -16.6907, longitude: -49.2544,
        phone: '(62) 3456-7890', whatsapp: '5562934567890', email: 'gyn@troller.com.br',
        businessHours: { 'seg-sex': '08:00-18:00', 'sab': '08:00-12:00' },
        hasSales: true, hasService: true,
      }
    }),
    prisma.dealer.create({
      data: {
        code: 'AM001', name: 'Troller Manaus', tradeName: 'Troller MAO',
        address: 'Av. Djalma Batista, 2100', city: 'Manaus', state: 'AM', cep: '69050-010',
        latitude: -3.1095, longitude: -60.0262,
        phone: '(92) 3456-7890', whatsapp: '5592934567890', email: 'mao@troller.com.br',
        businessHours: { 'seg-sex': '08:00-18:00', 'sab': '08:00-13:00' },
        hasSales: true, hasService: true,
      }
    }),
  ])

  console.log(`✅ ${dealers.length} concessionárias criadas`)

  // ─── OFERTAS ───────────────────────────────────────────────────────────────

  const now = new Date()
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)
  const endOfYear = new Date(now.getFullYear(), 11, 31)

  await Promise.all([
    prisma.offer.create({
      data: {
        vehicleId: t4.id,
        title: 'Troller T4 Adventure — IPVA 2025 Pago',
        description: 'Aproveite o T4 Adventure com IPVA 2025 pago e taxa de financiamento a partir de 0,79% ao mês. Oferta válida para estoque disponível.',
        badgeText: 'IPVA Pago',
        originalPrice: new Decimal('189990.00'),
        salePrice: new Decimal('179990.00'),
        discountPct: 5.26,
        downPaymentMin: new Decimal('30000.00'),
        installments: 60,
        installmentPrice: new Decimal('3199.00'),
        imageUrl: '/assets/offers/t4-adventure.jpg',
        ctaText: 'Aproveitar Oferta',
        startsAt: now,
        endsAt: endOfMonth,
        isActive: true,
        isFeatured: true,
      }
    }),
    prisma.offer.create({
      data: {
        vehicleId: xr.id,
        title: 'Troller XR Executive — Acessórios Inclusos',
        description: 'XR Executive com pacote de acessórios no valor de R$ 15.000 incluso: protetor de cárter, rack de teto, tapetes personalizados e filmagem completa.',
        badgeText: 'Acessórios Grátis',
        originalPrice: new Decimal('349990.00'),
        salePrice: new Decimal('349990.00'),
        cashback: new Decimal('15000.00'),
        imageUrl: '/assets/offers/xr-executive.jpg',
        ctaText: 'Quero Esse Benefício',
        startsAt: now,
        endsAt: endOfYear,
        isActive: true,
        isFeatured: true,
      }
    }),
    prisma.offer.create({
      data: {
        vehicleId: urban.id,
        title: 'Troller Urban City — Primeira Parcela em 90 Dias',
        description: 'Saia com seu Urban City hoje e pague a primeira parcela só em 90 dias. Taxa especial de 0,99% a.m. para financiamentos acima de 48 meses.',
        badgeText: '1ª Parcela em 90 Dias',
        originalPrice: new Decimal('119990.00'),
        salePrice: new Decimal('119990.00'),
        downPaymentMin: new Decimal('15000.00'),
        installments: 60,
        installmentPrice: new Decimal('2150.00'),
        imageUrl: '/assets/offers/urban-city.jpg',
        ctaText: 'Simular Financiamento',
        startsAt: now,
        endsAt: endOfMonth,
        isActive: true,
        isFeatured: false,
      }
    }),
    prisma.offer.create({
      data: {
        vehicleId: etrail.id,
        title: 'Troller E-Trail — Instalação de Wallbox Grátis',
        description: 'Compre o E-Trail e ganhe a instalação de um carregador doméstico Wallbox 22kW no endereço de sua preferência, cortesia da Troller e de sua rede de concessionárias.',
        badgeText: 'Wallbox Incluso',
        originalPrice: new Decimal('349990.00'),
        salePrice: new Decimal('349990.00'),
        cashback: new Decimal('8000.00'),
        imageUrl: '/assets/offers/e-trail-wallbox.jpg',
        ctaText: 'Saiba Mais',
        startsAt: now,
        endsAt: endOfYear,
        isActive: true,
        isFeatured: true,
      }
    }),
  ])

  console.log(`✅ 4 ofertas criadas`)
  console.log('\n🎉 Seed concluído com sucesso!')
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
