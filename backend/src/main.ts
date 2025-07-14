import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // elimina campos no definidos en el DTO
    forbidNonWhitelisted: true, // lanza error si se envían campos no válidos
    transform: true, // convierte los tipos automáticamente
  }));

  await app.listen(4001);
}
bootstrap();
