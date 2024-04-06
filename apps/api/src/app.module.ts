import { Module } from '@nestjs/common';
import { SharedModule } from '@app/shared';
import { BayiAppController } from './bayi-app.controller';
import { AuthAppController } from './auth-app.controller';

@Module({
  imports: [
    SharedModule.registerRmq('AUTH_SERVICE', process.env.RABBITMQ_AUTH_QUEUE),
    SharedModule.registerRmq('BAYI_SERVICE', process.env.RABBITMQ_BAYI_QUEUE),
  ],
  controllers: [
    AuthAppController,
    BayiAppController
  ],
})
export class AppModule {}
