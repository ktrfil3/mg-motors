import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../common/prisma/prisma.service'
import { IsString, IsBoolean, IsOptional, IsNumber, Min } from 'class-validator'
import { Type } from 'class-transformer'

export class QueryOffersDto {
  @IsString()
  @IsOptional()
  vehicleId?: string

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  isFeatured?: boolean

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  page?: number = 1

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  limit?: number = 20
}

@Injectable()
export class OffersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: QueryOffersDto) {
    const { vehicleId, isFeatured, page = 1, limit = 20 } = query
    const skip = (page - 1) * limit
    const now = new Date()

    const where = {
      isActive: true,
      endsAt: { gte: now },
      startsAt: { lte: now },
      ...(vehicleId && { vehicleId }),
      ...(isFeatured !== undefined && { isFeatured }),
    }

    const [items, total] = await Promise.all([
      this.prisma.offer.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ isFeatured: 'desc' }, { endsAt: 'asc' }],
        include: {
          vehicle: {
            select: { id: true, slug: true, name: true, heroImage: true, category: true },
          },
        },
      }),
      this.prisma.offer.count({ where }),
    ])

    return {
      data: items,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    }
  }

  async findById(id: string) {
    const offer = await this.prisma.offer.findUnique({
      where: { id },
      include: { vehicle: true },
    })
    if (!offer) throw new NotFoundException(`Oferta "${id}" não encontrada`)
    return offer
  }
}
