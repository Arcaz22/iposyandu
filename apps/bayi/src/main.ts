import { NestFactory } from '@nestjs/core';
import { BayiModule } from './bayi.module';
import { SharedService } from '@app/shared';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(BayiModule, { cors: true });

  const configService = app.get(ConfigService);
  const sharedService = app.get(SharedService);

  const queue = configService.get('RABBITMQ_BAYI_QUEUE');

  app.connectMicroservice(sharedService.getRmqOptions(queue))
  await app.startAllMicroservices();

  await app.listen(6000);
}
bootstrap();
