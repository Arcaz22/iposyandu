import { Module } from '@nestjs/common';
import { BayiController } from './bayi.controller';
import { BayiService } from './bayi.service';
import { 
  Bayi, ImunisasiBayi, PengukuranBayi, PostgresModule, SharedModule, SharedService 
} from '@app/shared';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BayiPengukuranService } from './modules/pengukuran/bayi-pengukuran.service';
import { BayiPengukuranController } from './modules/pengukuran/bayi-pengukuran.controller';
import { BayiImunisasiService } from './modules/imunisasi/bayi-imunisasi.service';
import { BayiImunisasiController } from './modules/imunisasi/bayi-imunisasi.controller';

@Module({
  imports: [
    PostgresModule,
    SharedModule.registerRmq('AUTH_SERVICE', process.env.RABBITMQ_AUTH_QUEUE),
    SharedModule.registerRmq('BAYI_SERVICE', process.env.RABBITMQ_BAYI_QUEUE),
    TypeOrmModule.forFeature([
      Bayi,
      PengukuranBayi,
      ImunisasiBayi
    ])
  ],
  controllers: [
    BayiController,
    BayiPengukuranController,
    BayiImunisasiController
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
    }
  ],
})
export class BayiModule {}
