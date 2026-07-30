import { Injectable, BadRequestException } from '@nestjs/common'
import { PrismaService } from '../../common/prisma/prisma.service'
import { CalculateSimulationDto, AmortizationSystemDto } from './dto/calculate-simulation.dto'
import { calcularPrice, calcularSAC } from './financial.utils'

// ─── Taxa de juros padrão (sem consulta de bureau) ────────────────────────────
// Fonte: média de mercado brasileiro (Banco Central do Brasil)
// Atualizar conforme resolução BACEN vigente
const DEFAULT_MONTHLY_RATE = 0.0149  // 1,49% a.m. ≈ 19,5% a.a.

@Injectable()
export class CreditSimulationService {
  constructor(private readonly prisma: PrismaService) {}

  async calculate(dto: CalculateSimulationDto, sessionId?: string) {
    const {
      vehiclePrice,
      downPayment,
      termMonths,
      amortizationSystem,
      monthlyInterestRate,
      balloonPayment = 0,
    } = dto

    // Validação de negócio
    if (downPayment >= vehiclePrice) {
      throw new BadRequestException('Entrada não pode ser maior ou igual ao valor do veículo')
    }

    const principal = vehiclePrice - downPayment
    const rate = monthlyInterestRate !== undefined
      ? monthlyInterestRate / 100
      : DEFAULT_MONTHLY_RATE

    // Cálculo de acordo com o sistema escolhido
    const result = amortizationSystem === AmortizationSystemDto.PRICE
      ? calcularPrice(principal, rate, termMonths, balloonPayment)
      : calcularSAC(principal, rate, termMonths, balloonPayment)

    // Persiste a simulação anonimamente (sem dados pessoais)
    await this.prisma.creditSimulation.create({
      data: {
        sessionId,
        vehiclePrice,
        downPayment,
        termMonths,
        amortizationSystem: amortizationSystem as any,
        balloonPayment: balloonPayment || 0,
        interestRateMonthly: rate,
        monthlyInstallment: result.monthlyInstallment,
        totalPaid: result.totalPaid,
        totalInterest: result.totalInterest,
        cetAnnual: result.cetAnnual,
      },
    })

    return {
      input: {
        vehiclePrice,
        downPayment,
        principal,
        termMonths,
        amortizationSystem,
        monthlyInterestRate: rate * 100,
        annualInterestRate: ((Math.pow(1 + rate, 12) - 1) * 100),
        balloonPayment,
      },
      result,
      disclaimer: [
        'Simulação meramente informativa. Sujeito à análise de crédito.',
        'CET estimado. O CET real inclui IOF, tarifas e seguros conforme contrato.',
        'Taxa de referência BACEN — pode variar conforme perfil do cliente.',
      ],
    }
  }
}
