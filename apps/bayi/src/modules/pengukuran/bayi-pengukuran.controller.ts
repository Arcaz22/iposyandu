import { Body, Controller, HttpStatus, Inject, Param, Query } from '@nestjs/common';
import { BaseResponses, Bayi, PengukuranBayi, SharedService } from '@app/shared';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import { BayiPengukuranService } from './bayi-pengukuran.service';
import { PengukuranBayiDTO } from '../../dtos/bayi-pengukuran.dto';

@Controller()
export class BayiPengukuranController {
  constructor(
    @Inject('BayiPengukuranServiceInterface')
    private readonly bayiPengukuranService: BayiPengukuranService,
    @Inject('SharedServiceInterface')
    private readonly sharedService: SharedService,
  ) {}

  @MessagePattern({ cmd: 'add-bayi-pengukuran' })
  async addPengukuranBayi(@Ctx() context: RmqContext,@Param("id") bayiId:string, @Body() pengukuran: PengukuranBayiDTO) {
    this.sharedService.acknowledgeMessage(context);

    try {
      const pengukuranBayi = await this.bayiPengukuranService.addPengukuranBayi(bayiId, pengukuran);
      const baseResponse = new BaseResponses<PengukuranBayi>(HttpStatus.CREATED, 'Pengukuran bayi berhasil ditambahkan', pengukuranBayi);
      return baseResponse;
    } catch (error) {
      const baseResponse = new BaseResponses<PengukuranBayi>(HttpStatus.BAD_REQUEST, error.message, null);
      return baseResponse;
    }
  }

  @MessagePattern({ cmd: 'update-bayi-pengukuran' })
  async updatePengukuranBayi(@Ctx() context: RmqContext,@Param("id") pengukuranBayiId:string, @Body() pengukuran: PengukuranBayiDTO) {
    this.sharedService.acknowledgeMessage(context);

    try {
      const updatedPengukuran = await this.bayiPengukuranService.updatePengukuranBayi(pengukuranBayiId, pengukuran);
      const baseResponse = new BaseResponses<PengukuranBayi>(HttpStatus.OK, 'Pengukuran bayi berhasil diupdate', updatedPengukuran);
      return baseResponse;
    } catch (error) {
      const baseResponse = new BaseResponses<PengukuranBayi>(HttpStatus.BAD_REQUEST, error.message, null);
      return baseResponse;
    }
  }
}
