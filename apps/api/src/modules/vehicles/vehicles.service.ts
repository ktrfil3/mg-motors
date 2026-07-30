import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../common/prisma/prisma.service'
import { CreateVehicleDto, UpdateVehicleDto, QueryVehiclesDto } from './dto/vehicle.dto'

// ─── VehiclesService ───────────────────────────────────────────────────────────

@Injectable()
export class VehiclesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: QueryVehiclesDto) {
    const { category, isFeatured, isActive = true, page = 1, limit = 20 } = query
    const skip = (page - 1) * limit

    const where = {
      ...(category && { category }),
      ...(isFeatured !== undefined && { isFeatured }),
      isActive,
    }

    const [items, total] = await Promise.all([
      this.prisma.vehicle.findMany({
        where,
        skip,
        take: limit,
        orderBy: { order: 'asc' },
        include: {
          colors: { where: { isActive: true }, orderBy: { name: 'asc' } },
          _count: { select: { versions: true } },
        },
      }),
      this.prisma.vehicle.count({ where }),
    ])

    return {
      data: items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    }
  }

  async findBySlug(slug: string) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { slug },
      include: {
        versions: {
          where: { isActive: true },
          orderBy: { order: 'asc' },
        },
        colors: {
          where: { isActive: true },
          orderBy: { name: 'asc' },
        },
        offers: {
          where: {
            isActive: true,
            endsAt: { gte: new Date() },
          },
          orderBy: { isFeatured: 'desc' },
        },
      },
    })

    if (!vehicle) {
      throw new NotFoundException(`Veículo com slug "${slug}" não encontrado`)
    }

    return vehicle
  }

  async findById(id: string) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id },
      include: {
        versions: { where: { isActive: true } },
        colors: { where: { isActive: true } },
      },
    })

    if (!vehicle) {
      throw new NotFoundException(`Veículo com id "${id}" não encontrado`)
    }

    return vehicle
  }

  async create(dto: CreateVehicleDto) {
    return this.prisma.vehicle.create({ data: dto as any })
  }

  async update(id: string, dto: UpdateVehicleDto) {
    await this.findById(id)
    return this.prisma.vehicle.update({ where: { id }, data: dto as any })
  }

  async remove(id: string) {
    await this.findById(id)
    return this.prisma.vehicle.update({
      where: { id },
      data: { isActive: false },
    })
  }

  async getFeatured() {
    return this.prisma.vehicle.findMany({
      where: { isActive: true, isFeatured: true },
      orderBy: { order: 'asc' },
      include: {
        colors: { where: { isActive: true }, take: 5 },
        offers: {
          where: { isActive: true, endsAt: { gte: new Date() }, isFeatured: true },
          take: 1,
        },
      },
    })
  }
}
