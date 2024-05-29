import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // Esto habilita CORS para todas las solicitudes desde cualquier origen

  const port = process.env.PORT || 3002;
  await app.listen(port, '0.0.0.0');
  Logger.log(`La aplicación se está ejecutando en: http://localhost:${port}`, 'Bootstrap');
}

bootstrap().catch(err => {
  Logger.error('Error durante el inicio de la aplicación', err);
});