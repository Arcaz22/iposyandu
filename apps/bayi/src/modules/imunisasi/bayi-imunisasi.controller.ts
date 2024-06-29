import { Body, Controller, HttpStatus, Inject, Param } from '@nestjs/common';
import { BaseResponses, BayiImunisasi, SharedService } from '@app/shared';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import { BayiImunisasiService } from './bayi-imunisasi.service';
import { ImunisasiBayiDTO } from '../../dtos/bayi-imunisasi.dto';

@Controller()
export class BayiImunisasiController {
  constructor(
    @Inject('BayiImunisasiServiceInterface')
    private readonly bayiImunisasiService: BayiImunisasiService,
    @Inject('SharedServiceInterface')
    private readonly sharedService: SharedService,
  ) {}

  @MessagePattern({ cmd: 'add-bayi-imunisasi' })
  async addImunisasiBayi(@Ctx() context: RmqContext,@Param("id") bayiId:string, @Body() imunisasi: ImunisasiBayiDTO) {
    this.sharedService.acknowledgeMessage(context);

    try {
      const imunisasiBayi = await this.bayiImunisasiService.addImunisasiBayi(bayiId, imunisasi);
      const baseResponse = new BaseResponses<BayiImunisasi>(HttpStatus.CREATED, 'Imunisasi bayi berhasil ditambahkan', imunisasiBayi);
      return baseResponse;
    } catch (error) {
      const baseResponse = new BaseResponses<BayiImunisasi>(HttpStatus.BAD_REQUEST, error.message, null);
      return baseResponse;
    }
  }

  @MessagePattern({ cmd: 'update-bayi-imunisasi' })
  async updateImunisasiBayi(@Ctx() context: RmqContext,@Param("id") imunisasiBayiId:string, @Body() imunisasi: ImunisasiBayiDTO) {
    this.sharedService.acknowledgeMessage(context);

    try {
      const updatedImunisasi = await this.bayiImunisasiService.updateImunisasiBayi(imunisasiBayiId, imunisasi);
      const baseResponse = new BaseResponses<BayiImunisasi>(HttpStatus.OK, 'Imunisasi bayi berhasil diupdate', updatedImunisasi);
      return baseResponse;
    } catch (error) {
      const baseResponse = new BaseResponses<BayiImunisasi>(HttpStatus.BAD_REQUEST, error.message, null);
      return baseResponse;
    }
  }
}
