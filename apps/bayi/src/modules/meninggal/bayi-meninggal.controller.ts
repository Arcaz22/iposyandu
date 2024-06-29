import { Body, Controller, HttpStatus, Inject, Param } from '@nestjs/common';
import { BaseResponses, BayiMeninggal, SharedService } from '@app/shared';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import { BayiMeninggalService } from './bayi-meninggal.service';
import { BayiMeninggalDTO } from '../../dtos/bayi-meninggal.dto';

@Controller()
export class BayiMeninggalController {
  constructor(
    @Inject('BayiMeninggalServiceInterface')
    private readonly bayiMeninggalService: BayiMeninggalService,
    @Inject('SharedServiceInterface')
    private readonly sharedService: SharedService,
  ) {}

  @MessagePattern({ cmd: 'add-bayi-meninggal' })
  async addMeninggalBayi(@Ctx() context: RmqContext,@Param("id") bayiId:string, @Body() meninggal: BayiMeninggalDTO) {
    this.sharedService.acknowledgeMessage(context);

    try {
      const bayiMeninggal = await this.bayiMeninggalService.addMeninggalBayi(bayiId, meninggal);
      const baseResponse = new BaseResponses<BayiMeninggal>(HttpStatus.CREATED, 'Imunisasi bayi berhasil ditambahkan', bayiMeninggal);
      return baseResponse;
    } catch (error) {
      const baseResponse = new BaseResponses<BayiMeninggal>(HttpStatus.BAD_REQUEST, error.message, null);
      return baseResponse;
    }
  }

}
