import { Body, Controller, HttpStatus, Inject, Param } from "@nestjs/common";
import { WuspusImunisasiService } from "./wuspus-imunisasi.service";
import { BaseResponses, SharedService, WuspusImunisasi } from "@app/shared";
import { Ctx, MessagePattern, RmqContext } from "@nestjs/microservices";
import { WuspusImunisasiDTO } from "../../dtos/wuspus-imunisasi.dto";

@Controller()
export class WuspusImunisasiController {
  constructor(
    @Inject('WuspusImunisasiServiceInterface')
    private readonly WuspusImunisasiService: WuspusImunisasiService,
    @Inject('SharedServiceInterface')
    private readonly sharedService: SharedService,
  ) {}

  @MessagePattern({ cmd: 'add-wuspus-imunisasi' })
  async addWuspusImunisasi(@Ctx() context: RmqContext, @Param("id") wuspusId:string, @Body() imunisasi: WuspusImunisasiDTO) {
    this.sharedService.acknowledgeMessage(context);
    try {
      const wuspusImunisasi = await this.WuspusImunisasiService.addWuspusImunisasi(wuspusId, imunisasi);
      const baseResponse = new BaseResponses<WuspusImunisasi>(HttpStatus.CREATED, 'Data wuspus imunisasi berhasil ditambahkan', wuspusImunisasi);
      return baseResponse;
    } catch (error) {
      const baseResponse = new BaseResponses<WuspusImunisasi>(HttpStatus.BAD_REQUEST, error.message, null);
      return baseResponse;
    }
  }

  @MessagePattern({ cmd: 'update-wuspus-imunisasi' })
  async updateWuspusImunisasi(@Ctx() context: RmqContext, @Param("id") id: string, @Body() imunisasi: WuspusImunisasiDTO) {
    this.sharedService.acknowledgeMessage(context);
    try {
      const wuspusImunisasi = await this.WuspusImunisasiService.updateWuspusImunisasi(id, imunisasi);
      const baseResponse = new BaseResponses<WuspusImunisasi>(HttpStatus.OK, 'Data wuspus imunisasi berhasil diupdate', wuspusImunisasi);
      return baseResponse;
    } catch (error) {
      const baseResponse = new BaseResponses<WuspusImunisasi>(HttpStatus.BAD_REQUEST, error.message, null);
      return baseResponse;
    }
  }
}
