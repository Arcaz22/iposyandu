import { Module } from '@nestjs/common';
import { IbuHamilController } from './ibu-hamil.controller';
import { IbuHamilService } from './ibu-hamil.service';
import { IbuHamil, IbuHamilImunisasi, IbuHamilMeninggal, IbuHamilPengukuran, IbuHamilPersalinan, PostgresModule, SharedModule, SharedService } from '@app/shared';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IbuhamilPengukuranService } from './modules/pengukuran/ibuhamil-pengukuran.service';
import { IbuhamilPengukuranController } from './modules/pengukuran/ibuhamil-pengukuran.controller';
import { IbuhamilImunisasiController } from './modules/imunisasi/ibuhamil-imunisasi.controller';
import { IbuhamilImunisasiService } from './modules/imunisasi/ibuhamil-imunisasi.service';

@Module({
  imports: [
    PostgresModule,
    SharedModule.registerRmq('AUTH_SERVICE', process.env.RABBITMQ_AUTH_QUEUE),
    SharedModule.registerRmq('IBUHAMIL_SERVICE', process.env.RABBITMQ_IBUHAMIL_QUEUE),
    TypeOrmModule.forFeature([
      IbuHamil,
      IbuHamilImunisasi,
      IbuHamilPengukuran,
      IbuHamilPersalinan,
      IbuHamilMeninggal
    ])
  ],
  controllers: [
    IbuHamilController,
    IbuhamilPengukuranController,
    IbuhamilImunisasiController,
  ],
  providers: [
    {
      provide: 'IbuhamilServiceInterface',
      useClass: IbuHamilService,
    },
    {
      provide: 'SharedServiceInterface',
      useClass: SharedService,
    },
    {
      provide: 'IbuhamilPengukuranServiceInterface',
      useClass: IbuhamilPengukuranService,
    },
    {
      provide: 'IbuhamilImunisasiServiceInterface',
      useClass: IbuhamilImunisasiService,
    }
  ],
})
export class IbuHamilModule {}
