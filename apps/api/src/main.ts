import { NestFactory } from '@nestjs/core'
import { ValidationPipe, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './app.module'

async function bootstrap() {
  const logger = new Logger('Bootstrap')
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug'],
  })

  const config = app.get(ConfigService)
  const port = config.get<number>('API_PORT', 3001)
  const prefix = config.get<string>('API_PREFIX', 'api/v1')

  // ─── Global prefix ─────────────────────────────────────────────────────────
  app.setGlobalPrefix(prefix)

  // ─── CORS ──────────────────────────────────────────────────────────────────
  app.enableCors({
    origin: [
      'http://localhost:3000',  // Next.js dev
      process.env.FRONTEND_URL || 'http://localhost:3000',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })

  // ─── Validation pipe global ────────────────────────────────────────────────
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,           // Remove campos não declarados nos DTOs
      forbidNonWhitelisted: true, // Erro se houver campos extras
      transform: true,           // Auto-transform de tipos (string → number etc.)
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  )

  await app.listen(port)
  logger.log(`🚗 Troller API rodando em http://localhost:${port}/${prefix}`)
}

bootstrap()
