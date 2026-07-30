import { Module, Global } from '@nestjs/common'
import { PrismaService } from './prisma.service'

// ─── PrismaModule — Global ─────────────────────────────────────────────────────
// @Global() permite injetar PrismaService em qualquer módulo sem importar

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
