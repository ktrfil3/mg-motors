import { Module } from '@nestjs/common'
import { CreditSimulationController } from './credit-simulation.controller'
import { CreditSimulationService } from './credit-simulation.service'

@Module({
  controllers: [CreditSimulationController],
  providers: [CreditSimulationService],
})
export class CreditSimulationModule {}
