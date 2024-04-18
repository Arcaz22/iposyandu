import { NestFactory } from '@nestjs/core';
import { WuspusModule } from './wuspus.module';
import { ConfigService } from '@nestjs/config';
import { SharedService } from '@app/shared';

async function bootstrap() {
  const app = await NestFactory.create(WuspusModule, { cors: true });
  const configService = app.get(ConfigService);
  const sharedService = app.get(SharedService);

  const queue = configService.get('RABBITMQ_WUSPUS_QUEUE');

  app.connectMicroservice(sharedService.getRmqOptions(queue))
  await app.startAllMicroservices();

  await app.listen(8000);
}
bootstrap();
