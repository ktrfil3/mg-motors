import { Controller, Post, Body, Req, HttpCode, HttpStatus } from '@nestjs/common'
import { Throttle } from '@nestjs/throttler'
import { CreditSimulationService } from './credit-simulation.service'
import { CalculateSimulationDto } from './dto/calculate-simulation.dto'

@Controller('credit-simulation')
export class CreditSimulationController {
  constructor(private readonly service: CreditSimulationService) {}

  // POST /credit-simulation/calculate
  // Público — rate limit específico para proteção
  @Post('calculate')
  @HttpCode(HttpStatus.OK)
  @Throttle({ short: { ttl: 1000, limit: 3 }, medium: { ttl: 60_000, limit: 30 } })
  calculate(@Body() dto: CalculateSimulationDto, @Req() req: any) {
    // Session ID anônimo via cookie (se disponível)
    const sessionId = req.headers['x-session-id'] as string | undefined
    return this.service.calculate(dto, sessionId)
  }
}
