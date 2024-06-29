import { Module } from '@nestjs/common';
import { PosyanduController } from './posyandu.controller';
import { PosyanduService } from './posyandu.service';
import { AstraGrupBisnis, AstraPerusahaan, Desa, Event, Kabupaten, Kecamatan, PostgresModule, Posyandu, Provinsi, Puskesmas, SharedModule, SharedService, User } from '@app/shared';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    PostgresModule,
    SharedModule.registerRmq('AUTH_SERVICE', process.env.RABBITMQ_AUTH_QUEUE),
    SharedModule.registerRmq('POSYANDU_SERVICE', process.env.RABBITMQ_POSYANDU_QUEUE),
    TypeOrmModule.forFeature([ Event, AstraGrupBisnis, AstraPerusahaan, Desa, Kabupaten, Kecamatan, Posyandu, Provinsi, Puskesmas, User ])
  ],
  controllers: [PosyanduController],
  providers: [
    {
      provide: 'PosyanduServiceInterface',
      useClass: PosyanduService,
    },
    {
      provide: 'SharedServiceInterface',
      useClass: SharedService,
    },
  ],
})
export class PosyanduModule {}
