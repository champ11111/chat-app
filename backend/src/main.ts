import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Use cors middleware
  app.use(
    cors({
      origin: 'http://localhost:8080',
      methods: '*',
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
