import {
  Controller, Get, Post, Patch, Delete, Param, Body, Query, HttpCode, HttpStatus,
} from '@nestjs/common'
import { VehiclesService } from './vehicles.service'
import { CreateVehicleDto, UpdateVehicleDto, QueryVehiclesDto } from './dto/vehicle.dto'

// ─── VehiclesController ────────────────────────────────────────────────────────
// Rotas públicas de consulta (GET), rotas de escrita requerem auth (futuro)

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  // GET /vehicles?category=SUV&isFeatured=true&page=1&limit=20
  @Get()
  findAll(@Query() query: QueryVehiclesDto) {
    return this.vehiclesService.findAll(query)
  }

  // GET /vehicles/featured
  @Get('featured')
  getFeatured() {
    return this.vehiclesService.getFeatured()
  }

  // GET /vehicles/:slug
  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    return this.vehiclesService.findBySlug(slug)
  }

  // POST /vehicles
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateVehicleDto) {
    return this.vehiclesService.create(dto)
  }

  // PATCH /vehicles/:id
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateVehicleDto) {
    return this.vehiclesService.update(id, dto)
  }

  // DELETE /vehicles/:id (soft delete)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.vehiclesService.remove(id)
  }
}
