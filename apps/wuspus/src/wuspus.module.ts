import { Module } from '@nestjs/common';
import { WuspusController } from './wuspus.controller';
import { WuspusService } from './wuspus.service';
import { PostgresModule, SharedModule, SharedService, Wuspus, WuspusImunisasi, WuspusMeninggal, WuspusPemeriksaan } from '@app/shared';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WuspusPemeriksaanService } from './modules/pemeriksaan/wuspus-pemeriksaan.service';
import { WuspusImunisasiService } from './modules/imunisasi/wuspus-imunisasi.service';
import { WuspusMeninggalService } from './modules/meninggal/wuspus-meninggal.service';
import { WuspusImunisasiController } from './modules/imunisasi/wuspus-imunisasi.controller';
import { WuspusPemeriksaanController } from './modules/pemeriksaan/wuspus-pemeriksaan.controller';
import { WuspusMeninggalController } from './modules/meninggal/wuspus-meninggal.controller';

@Module({
  imports: [
    PostgresModule,
    SharedModule.registerRmq('AUTH_SERVICE', process.env.RABBITMQ_AUTH_QUEUE),
    SharedModule.registerRmq('WUSPUS_SERVICE', process.env.RABBITMQ_WUSPUS_QUEUE),
    TypeOrmModule.forFeature([
      Wuspus,
      WuspusImunisasi,
      WuspusPemeriksaan,
      WuspusMeninggal
    ])
  ],
  controllers: [
    WuspusController,
    WuspusImunisasiController,
    WuspusPemeriksaanController,
    WuspusMeninggalController
  ],
  providers: [
    {
      provide: 'WuspusServiceInterface',
      useClass: WuspusService,
    },
    {
      provide: 'WuspusPemeriksaanServiceInterface',
      useClass: WuspusPemeriksaanService,
    },
    {
      provide: 'WuspusImunisasiServiceInterface',
      useClass: WuspusImunisasiService,
    },
    {
      provide: 'WuspusMeninggalServiceInterface',
      useClass: WuspusMeninggalService,
    },
    {
      provide: 'SharedServiceInterface',
      useClass: SharedService,
    },
  ],
})
export class WuspusModule {}
