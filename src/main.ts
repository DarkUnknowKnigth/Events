import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:4200',
    allowedHeaders: '*',
    methods: '*',
  });
  app.use(csurf());
  app.use(helmet());
  await app.listen(3000);
}
bootstrap();
