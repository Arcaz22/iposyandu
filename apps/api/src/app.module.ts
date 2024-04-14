import { Module } from '@nestjs/common';
import { SharedModule } from '@app/shared';
import { BayiAppController } from './bayi/bayi-app.controller';
import { AuthAppController } from './auth-app.controller';
import { BayiPengukuranAppController } from './bayi/bayi-pengukuran-app.controller';
import { BayiImunisasiAppController } from './bayi/bayi-imunisasi-app.controller';
import { BayiMeninggalAppController } from './bayi/bayi-meninggal.controller';
import { IbuhamilAppController } from './ibuhamil/ibuhamil-app.controller';
import { IbuhamilPengukuranAppController } from './ibuhamil/ibuhamil-pengukuran-app.controller';

@Module({
  imports: [
    SharedModule.registerRmq('AUTH_SERVICE', process.env.RABBITMQ_AUTH_QUEUE),
    SharedModule.registerRmq('BAYI_SERVICE', process.env.RABBITMQ_BAYI_QUEUE),
    SharedModule.registerRmq('IBUHAMIL_SERVICE', process.env.RABBITMQ_IBUHAMIL_QUEUE)
  ],
  controllers: [
    AuthAppController,
    BayiAppController,
    BayiPengukuranAppController,
    BayiImunisasiAppController,
    BayiMeninggalAppController,
    IbuhamilAppController,
    IbuhamilPengukuranAppController
  ],
})
export class AppModule {}
