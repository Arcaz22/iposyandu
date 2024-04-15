import { NestFactory } from '@nestjs/core';
import { IbuHamilModule } from './ibu-hamil.module';
import { ConfigService } from '@nestjs/config';
import { SharedService } from '@app/shared';

async function bootstrap() {
  const app = await NestFactory.create(IbuHamilModule, { cors: true });

  const configService = app.get(ConfigService);
  const sharedService = app.get(SharedService);

  const queue = configService.get('RABBITMQ_IBUHAMIL_QUEUE');

  app.connectMicroservice(sharedService.getRmqOptions(queue))
  await app.startAllMicroservices();

  await app.listen(7000);
}
bootstrap();
