import { Module } from '@nestjs/common';
import { SharedModule } from '@app/shared';
import { AuthController, BayiController } from './app.controller';

@Module({
  imports: [
    SharedModule.registerRmq('AUTH_SERVICE', process.env.RABBITMQ_AUTH_QUEUE),
    SharedModule.registerRmq('BAYI_SERVICE', process.env.RABBITMQ_BAYI_QUEUE),
  ],
  controllers: [AuthController, BayiController],
})
export class AppModule {}
