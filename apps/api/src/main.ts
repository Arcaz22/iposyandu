import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createDocument } from '@app/shared';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  createDocument(app);
  await app.listen(5000);
}
bootstrap();
