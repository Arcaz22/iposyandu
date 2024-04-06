import { Module } from '@nestjs/common';
import { BayiController } from './bayi.controller';
import { BayiService } from './bayi.service';
import { Bayi, PostgresModule, SharedModule, SharedService } from '@app/shared';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    PostgresModule,
    SharedModule.registerRmq('AUTH_SERVICE', process.env.RABBITMQ_AUTH_QUEUE),
    SharedModule.registerRmq('BAYI_SERVICE', process.env.RABBITMQ_BAYI_QUEUE),
    TypeOrmModule.forFeature([
      Bayi,
    ])
  ],
  controllers: [BayiController],
  providers: [
    {
      provide: 'BayiServiceInterface',
      useClass: BayiService,
    },
    {
      provide: 'SharedServiceInterface',
      useClass: SharedService,
    }
  ],
})
export class BayiModule {}
