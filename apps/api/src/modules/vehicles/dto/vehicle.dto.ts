import { IsString, IsNumber, IsEnum, IsBoolean, IsOptional, Min } from 'class-validator'
import { Type } from 'class-transformer'
import { VehicleCategory, FuelType, TransmissionType } from '@prisma/client'

// ─── CreateVehicleDto ──────────────────────────────────────────────────────────

export class CreateVehicleDto {
  @IsString()
  slug: string

  @IsString()
  name: string

  @IsString()
  @IsOptional()
  tagline?: string

  @IsString()
  @IsOptional()
  description?: string

  @IsEnum(VehicleCategory)
  category: VehicleCategory

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Type(() => Number)
  basePrice: number

  @IsString()
  @IsOptional()
  engine?: string

  @IsEnum(FuelType)
  @IsOptional()
  fuelType?: FuelType

  @IsEnum(TransmissionType)
  @IsOptional()
  transmission?: TransmissionType

  @IsNumber()
  @IsOptional()
  doors?: number

  @IsNumber()
  @IsOptional()
  seats?: number

  @IsString()
  @IsOptional()
  heroImage?: string

  @IsString()
  @IsOptional()
  heroVideo?: string

  @IsString()
  @IsOptional()
  model3dUrl?: string

  @IsBoolean()
  @IsOptional()
  isActive?: boolean

  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean

  @IsNumber()
  @IsOptional()
  order?: number
}

// ─── UpdateVehicleDto ──────────────────────────────────────────────────────────

export class UpdateVehicleDto implements Partial<CreateVehicleDto> {
  @IsString()
  @IsOptional()
  slug?: string

  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  tagline?: string

  @IsString()
  @IsOptional()
  description?: string

  @IsEnum(VehicleCategory)
  @IsOptional()
  category?: VehicleCategory

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Type(() => Number)
  @IsOptional()
  basePrice?: number

  @IsBoolean()
  @IsOptional()
  isActive?: boolean

  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean

  @IsNumber()
  @IsOptional()
  order?: number
}

// ─── QueryVehiclesDto ──────────────────────────────────────────────────────────

export class QueryVehiclesDto {
  @IsEnum(VehicleCategory)
  @IsOptional()
  category?: VehicleCategory

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  isFeatured?: boolean

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  isActive?: boolean

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
