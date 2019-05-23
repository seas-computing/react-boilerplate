import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const { SERVER_PORT } = process.env;

/**
 * initializes and runs the nestjs app
 */

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  await app.listen(SERVER_PORT);
}

bootstrap();
