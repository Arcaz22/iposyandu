import { Module } from '@nestjs/common';
import { Bayi, SharedModule } from '@app/shared';
import { BayiAppController } from './bayi/bayi-app.controller';
import { AuthAppController } from './auth-app.controller';
import { BayiPengukuranAppController } from './bayi/bayi-pengukuran-app.controller';
import { BayiImunisasiAppController } from './bayi/bayi-imunisasi-app.controller';
import { BayiMeninggalAppController } from './bayi/bayi-meninggal.controller';

@Module({
  imports: [
    SharedModule.registerRmq('AUTH_SERVICE', process.env.RABBITMQ_AUTH_QUEUE),
    SharedModule.registerRmq('BAYI_SERVICE', process.env.RABBITMQ_BAYI_QUEUE),
  ],
  controllers: [
    AuthAppController,
    BayiAppController,
    BayiPengukuranAppController,
    BayiImunisasiAppController,
    BayiMeninggalAppController,
  ],
})
export class AppModule {}
