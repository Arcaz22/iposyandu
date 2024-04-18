import { Body, Controller, HttpStatus, Inject, Param } from "@nestjs/common";
import { BaseResponses, SharedService, WuspusMeninggal } from "@app/shared";
import { WuspusMeninggalService } from "./wuspus-meninggal.service";
import { Ctx, MessagePattern, RmqContext } from "@nestjs/microservices";

@Controller()
export class WuspusMeninggalController {
  constructor(
    @Inject('WuspusMeninggalServiceInterface')
    private readonly WuspusMeninggalService: WuspusMeninggalService,
    @Inject('SharedServiceInterface')
    private readonly sharedService: SharedService,
  ) {}

  @MessagePattern({ cmd: 'add-wuspus-meninggal' })
  async addWuspusMeninggal(@Ctx() context: RmqContext, @Param("id") wuspusId:string, @Body() meninggal: WuspusMeninggal) {
    this.sharedService.acknowledgeMessage(context);
    try {
      const wuspusMeninggal = await this.WuspusMeninggalService.addWuspusMeninggal(wuspusId, meninggal);
      const baseResponse = new BaseResponses<WuspusMeninggal>(HttpStatus.CREATED, 'Data wuspus meninggal berhasil ditambahkan', wuspusMeninggal);
      return baseResponse;
    } catch (error) {
      const baseResponse = new BaseResponses<WuspusMeninggal>(HttpStatus.BAD_REQUEST, error.message, null);
      return baseResponse;
    }
  }
}
