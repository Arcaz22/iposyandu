import { Body, Controller, HttpStatus, Inject, Param } from "@nestjs/common";
import { BaseResponses, SharedService, WuspusPemeriksaan } from "@app/shared";
import { WuspusPemeriksaanService } from "./wuspus-pemeriksaan.service";
import { Ctx, MessagePattern, RmqContext } from "@nestjs/microservices";

@Controller()
export class WuspusPemeriksaanController {
  constructor(
    @Inject('WuspusPemeriksaanServiceInterface')
    private readonly wuspusPemeriksaanService: WuspusPemeriksaanService,
    @Inject('SharedServiceInterface')
    private readonly sharedService: SharedService,
  ) {}

  @MessagePattern({ cmd: 'add-wuspus-pemeriksaan' })
  async addWuspusPemeriksaan(@Ctx() context: RmqContext, @Param("wuspusId") wuspusId:string, @Body() pemeriksaan: WuspusPemeriksaan) {
    this.sharedService.acknowledgeMessage(context);
    try {
      const wuspusPemeriksaan = await this.wuspusPemeriksaanService.addWuspusPemeriksaan(wuspusId, pemeriksaan);
      const baseResponse = new BaseResponses<WuspusPemeriksaan>(HttpStatus.CREATED, 'Data wuspus pemeriksaan berhasil ditambahkan', wuspusPemeriksaan);
      return baseResponse;
    } catch (error) {
      const baseResponse = new BaseResponses<WuspusPemeriksaan>(HttpStatus.BAD_REQUEST, error.message, null);
      return baseResponse;
    }
  }

  @MessagePattern({ cmd: 'update-wuspus-pemeriksaan' })
  async updateWuspusPemeriksaan(@Ctx() context: RmqContext, @Param("wuspusId") id: string, @Body() pemeriksaan: WuspusPemeriksaan) {
    this.sharedService.acknowledgeMessage(context);
    try {
      const wuspusPemeriksaan = await this.wuspusPemeriksaanService.updateWuspusPemeriksaan(id, pemeriksaan);
      const baseResponse = new BaseResponses<WuspusPemeriksaan>(HttpStatus.OK, 'Data wuspus pemeriksaan berhasil diupdate', wuspusPemeriksaan);
      return baseResponse;
    } catch (error) {
      const baseResponse = new BaseResponses<WuspusPemeriksaan>(HttpStatus.BAD_REQUEST, error.message, null);
      return baseResponse;
    }
  }
}
