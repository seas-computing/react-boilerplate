/**
 * @module Server
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const {
  /** @ignore */
  SERVER_PORT,
} = process.env;

/**
 * @ignore
 */
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  await app.listen(SERVER_PORT);
}

bootstrap();
