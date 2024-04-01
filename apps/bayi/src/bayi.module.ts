import { Module } from '@nestjs/common';
import { BayiController } from './bayi.controller';
import { BayiService } from './bayi.service';
import { SharedModule } from '@app/shared';

@Module({
  imports: [
    SharedModule.registerRmq('AUTH_SERVICE', process.env.RABBITMQ_AUTH_QUEUE),
  ],
  controllers: [BayiController],
  providers: [BayiService],
})
export class BayiModule {}
