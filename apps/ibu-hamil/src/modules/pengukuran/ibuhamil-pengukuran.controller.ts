import { Body, Controller, HttpStatus, Inject, Param } from "@nestjs/common";
import { BaseResponses, IbuHamilPengukuran, SharedService } from "@app/shared";
import { Ctx, MessagePattern, RmqContext } from "@nestjs/microservices";
import { IbuhamilPengukuranService } from "./ibuhamil-pengukuran.service";
import { PengukuranIbuhamilDTO } from "../../dtos/ibuhamil-pengukuran.dto";

@Controller()
export class IbuhamilPengukuranController {
  constructor(
    @Inject('IbuhamilPengukuranServiceInterface')
    private readonly IbuhamilPengukuranService: IbuhamilPengukuranService,
    @Inject('SharedServiceInterface')
    private readonly sharedService: SharedService,
  ) {}

  @MessagePattern({ cmd: 'add-ibuhamil-pengukuran' })
  async addPengukuranBayi(@Ctx() context: RmqContext,@Param("id") IbuHamilId:string, @Body() pengukuran: IbuHamilPengukuran) {
    this.sharedService.acknowledgeMessage(context);

    try {
      const pengukuranIbuhamil = await this.IbuhamilPengukuranService.addPengukuranIbuhamil(IbuHamilId, pengukuran);
      const baseResponse = new BaseResponses<IbuHamilPengukuran>(HttpStatus.CREATED, 'Pengukuran bayi berhasil ditambahkan', pengukuranIbuhamil);
      return baseResponse;
    } catch (error) {
      const baseResponse = new BaseResponses<IbuHamilPengukuran>(HttpStatus.BAD_REQUEST, error.message, null);
      return baseResponse;
    }
  }

  @MessagePattern({ cmd: 'update-ibuhamil-pengukuran' })
  async updatePengukuranBayi(@Ctx() context: RmqContext,@Param("id") pengukuranIbuHamilId:string, @Body() pengukuran: PengukuranIbuhamilDTO) {
    this.sharedService.acknowledgeMessage(context);

    try {
      const updatedPengukuran = await this.IbuhamilPengukuranService.updatePengukuranIbuhamil(pengukuranIbuHamilId, pengukuran);
      const baseResponse = new BaseResponses<IbuHamilPengukuran>(HttpStatus.OK, 'Pengukuran bayi berhasil diupdate', updatedPengukuran);
      return baseResponse;
    } catch (error) {
      const baseResponse = new BaseResponses<IbuHamilPengukuran>(HttpStatus.BAD_REQUEST, error.message, null);
      return baseResponse;
    }
  }
}
