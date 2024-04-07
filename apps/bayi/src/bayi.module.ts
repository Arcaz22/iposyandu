import { Module } from '@nestjs/common';
import { BayiController } from './bayi.controller';
import { BayiService } from './bayi.service';
import { 
  Bayi, BayiMeninggal, ImunisasiBayi, PengukuranBayi, PostgresModule, SharedModule, SharedService 
} from '@app/shared';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BayiPengukuranService } from './modules/pengukuran/bayi-pengukuran.service';
import { BayiPengukuranController } from './modules/pengukuran/bayi-pengukuran.controller';
import { BayiImunisasiService } from './modules/imunisasi/bayi-imunisasi.service';
import { BayiImunisasiController } from './modules/imunisasi/bayi-imunisasi.controller';
import { BayiMeninggalController } from './modules/meninggal/bayi-meninggal.controller';
import { BayiMeninggalService } from './modules/meninggal/bayi-meninggal.service';

@Module({
  imports: [
    PostgresModule,
    SharedModule.registerRmq('AUTH_SERVICE', process.env.RABBITMQ_AUTH_QUEUE),
    SharedModule.registerRmq('BAYI_SERVICE', process.env.RABBITMQ_BAYI_QUEUE),
    TypeOrmModule.forFeature([
      Bayi,
      PengukuranBayi,
      ImunisasiBayi,
      BayiMeninggal
    ])
  ],
  controllers: [
    BayiController,
    BayiPengukuranController,
    BayiImunisasiController,
    BayiMeninggalController
  ],
  providers: [
    {
      provide: 'BayiServiceInterface',
      useClass: BayiService,
    },
    {
      provide: 'SharedServiceInterface',
      useClass: SharedService,
    },
    {
      provide: 'BayiPengukuranServiceInterface',
      useClass: BayiPengukuranService,
    },
    {
      provide: 'BayiImunisasiServiceInterface',
      useClass: BayiImunisasiService,
    },
    {
      provide: 'BayiMeninggalServiceInterface',
      useClass: BayiMeninggalService,
    },
  ],
})
export class BayiModule {}
