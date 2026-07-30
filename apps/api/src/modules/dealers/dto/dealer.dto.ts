import { IsString, IsNumber, IsBoolean, IsOptional, IsEmail, Min, Max } from 'class-validator'
import { Type } from 'class-transformer'

export class QueryDealersDto {
  @IsString()
  @IsOptional()
  city?: string

  @IsString()
  @IsOptional()
  state?: string

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  lat?: number

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  lng?: number

  // Raio de busca em km (padrão 50km)
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  @Max(500)
  radius?: number = 50

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  page?: number = 1

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  limit?: number = 20
}

export class CreateDealerDto {
  @IsString()
  code: string

  @IsString()
  name: string

  @IsString()
  @IsOptional()
  tradeName?: string

  @IsString()
  address: string

  @IsString()
  city: string

  @IsString()
  state: string

  @IsString()
  cep: string

  @IsNumber()
  @Type(() => Number)
  latitude: number

  @IsNumber()
  @Type(() => Number)
  longitude: number

  @IsString()
  @IsOptional()
  phone?: string

  @IsString()
  @IsOptional()
  whatsapp?: string

  @IsEmail()
  @IsOptional()
  email?: string

  @IsBoolean()
  @IsOptional()
  hasSales?: boolean

  @IsBoolean()
  @IsOptional()
  hasService?: boolean

  @IsBoolean()
  @IsOptional()
  hasParts?: boolean
}
