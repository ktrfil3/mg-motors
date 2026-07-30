import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

// ─── PrismaService ─────────────────────────────────────────────────────────────
// Wrapper singleton do PrismaClient para NestJS
// Gerencia ciclo de vida da conexão com o banco de dados

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name)

  constructor() {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'stdout', level: 'error' },
        { emit: 'stdout', level: 'warn' },
      ],
    })
  }

  async onModuleInit() {
    await this.$connect()
    this.logger.log('Conexão com PostgreSQL estabelecida')
  }

  async onModuleDestroy() {
    await this.$disconnect()
    this.logger.log('Conexão com PostgreSQL encerrada')
  }
}
