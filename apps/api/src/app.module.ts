import { Module } from '@nestjs/common';
import { SharedModule } from '@app/shared';
import { BayiAppController } from './bayi/bayi-app.controller';
import { AuthAppController } from './auth-app.controller';
import { BayiPengukuranAppController } from './bayi/bayi-pengukuran-app.controller';

@Module({
  imports: [
    SharedModule.registerRmq('AUTH_SERVICE', process.env.RABBITMQ_AUTH_QUEUE),
    SharedModule.registerRmq('BAYI_SERVICE', process.env.RABBITMQ_BAYI_QUEUE),
  ],
  controllers: [
    AuthAppController,
    BayiAppController,
    BayiPengukuranAppController,
  ],
})
export class AppModule {}
