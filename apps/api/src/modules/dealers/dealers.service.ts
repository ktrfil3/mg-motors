import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../common/prisma/prisma.service'
import { QueryDealersDto, CreateDealerDto } from './dto/dealer.dto'

// ─── DealersService ────────────────────────────────────────────────────────────

@Injectable()
export class DealersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: QueryDealersDto) {
    const { city, state, lat, lng, radius = 50, page = 1, limit = 20 } = query
    const skip = (page - 1) * limit

    // Busca por proximidade via fórmula de Haversine no Prisma raw
    // Se lat/lng fornecidos, ordena por distância
    if (lat !== undefined && lng !== undefined) {
      return this.findNearby(lat, lng, radius, page, limit)
    }

    const where = {
      isActive: true,
      ...(city && { city: { contains: city, mode: 'insensitive' as const } }),
      ...(state && { state: state.toUpperCase() }),
    }

    const [items, total] = await Promise.all([
      this.prisma.dealer.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ state: 'asc' }, { name: 'asc' }],
      }),
      this.prisma.dealer.count({ where }),
    ])

    return {
      data: items,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    }
  }

  async findNearby(lat: number, lng: number, radiusKm: number, page: number, limit: number) {
    // Fórmula de Haversine simplificada via SQL raw
    // R = 6371 km (raio da Terra)
    const skip = (page - 1) * limit

    const dealers = await this.prisma.$queryRaw<Array<any>>`
      SELECT *,
        (6371 * acos(
          cos(radians(${lat})) * cos(radians(latitude)) *
          cos(radians(longitude) - radians(${lng})) +
          sin(radians(${lat})) * sin(radians(latitude))
        )) AS distance_km
      FROM dealers
      WHERE "isActive" = true
      HAVING (6371 * acos(
        cos(radians(${lat})) * cos(radians(latitude)) *
        cos(radians(longitude) - radians(${lng})) +
        sin(radians(${lat})) * sin(radians(latitude))
      )) < ${radiusKm}
      ORDER BY distance_km ASC
      LIMIT ${limit} OFFSET ${skip}
    `

    return {
      data: dealers,
      meta: { page, limit, radiusKm, center: { lat, lng } },
    }
  }

  async findById(id: string) {
    const dealer = await this.prisma.dealer.findUnique({ where: { id } })
    if (!dealer) throw new NotFoundException(`Concessionária "${id}" não encontrada`)
    return dealer
  }

  async create(dto: CreateDealerDto) {
    return this.prisma.dealer.create({ data: dto })
  }

  async getStates() {
    const result = await this.prisma.dealer.groupBy({
      by: ['state'],
      where: { isActive: true },
      _count: true,
      orderBy: { state: 'asc' },
    })
    return result.map(r => ({ state: r.state, count: r._count }))
  }
}
