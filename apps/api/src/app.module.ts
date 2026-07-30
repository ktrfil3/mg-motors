import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ThrottlerModule } from '@nestjs/throttler'
import { PrismaModule } from './common/prisma/prisma.module'
import { VehiclesModule } from './modules/vehicles/vehicles.module'
import { DealersModule } from './modules/dealers/dealers.module'
import { OffersModule } from './modules/offers/offers.module'
import { AuthModule } from './modules/auth/auth.module'
import { UsersModule } from './modules/users/users.module'
import { CreditSimulationModule } from './modules/credit-simulation/credit-simulation.module'
import { CreditApplicationModule } from './modules/credit-application/credit-application.module'

@Module({
  imports: [
    // ─── Configuração global (variáveis de ambiente) ──────────────────────
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),

    // ─── Rate limiting global ─────────────────────────────────────────────
    // Configurações específicas por módulo podem sobrescrever estes valores
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 10,
      },
      {
        name: 'medium',
        ttl: 60_000,
        limit: 100,
      },
    ]),

    // ─── Prisma (cliente global de banco de dados) ────────────────────────
    PrismaModule,

    // ─── Módulos de domínio ───────────────────────────────────────────────
    VehiclesModule,
    DealersModule,
    OffersModule,
    AuthModule,
    UsersModule,
    CreditSimulationModule,
    CreditApplicationModule,
  ],
})
export class AppModule {}
