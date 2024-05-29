import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173', // Replace with your front-end URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept',
    credentials: true,
  });

  const port = process.env.PORT || 3002;

  await app.listen(port, '0.0.0.0');

  Logger.log(`Application is running on: http://localhost:${port}`, 'Bootstrap');
}

bootstrap().catch(err => {
  Logger.error('Error during application bootstrap', err);
});