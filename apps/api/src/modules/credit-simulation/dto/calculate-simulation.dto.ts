import { IsNumber, IsEnum, IsOptional, Min, Max } from 'class-validator'
import { Type } from 'class-transformer'

export enum AmortizationSystemDto {
  PRICE = 'PRICE',
  SAC = 'SAC',
}

// ─── CalculateSimulationDto ────────────────────────────────────────────────────
// Input público — sem dados pessoais

export class CalculateSimulationDto {
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(10_000)
  @Type(() => Number)
  vehiclePrice: number

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Type(() => Number)
  downPayment: number

  @IsNumber()
  @Min(12)
  @Max(60)
  @Type(() => Number)
  termMonths: number

  @IsEnum(AmortizationSystemDto)
  amortizationSystem: AmortizationSystemDto

  // Taxa de juros mensal (%). Se não informada, usa taxa padrão configurável.
  @IsNumber({ maxDecimalPlaces: 4 })
  @Min(0)
  @Max(10)
  @IsOptional()
  @Type(() => Number)
  monthlyInterestRate?: number

  // Valor residual (balloon payment) — opcional
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  balloonPayment?: number
}
