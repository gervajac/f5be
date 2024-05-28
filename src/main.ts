import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true }); // Habilitar CORS
  const port = process.env.PORT || 3002; // Usar el puerto definido por el entorno o el puerto 3002

  await app.listen(port, '0.0.0.0'); // Escuchar en todas las interfaces de red

  Logger.log(`Application is running on: http://localhost:${port}`, 'Bootstrap');
}

bootstrap().catch(err => {
  Logger.error('Error during application bootstrap', err);
});