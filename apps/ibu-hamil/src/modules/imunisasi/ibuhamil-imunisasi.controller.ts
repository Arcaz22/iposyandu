import { Body, Controller, HttpStatus, Inject, Param } from "@nestjs/common";
import { IbuhamilImunisasiService } from "./ibuhamil-imunisasi.service";
import { BaseResponses, IbuHamilImunisasi, SharedService } from "@app/shared";
import { Ctx, MessagePattern, RmqContext } from "@nestjs/microservices";
import { ImunisasiIbuhamilDTO } from "../../dtos/ibuhamil-imunisasi.dto";

@Controller()
export class IbuhamilImunisasiController {
  constructor(
    @Inject('IbuhamilImunisasiServiceInterface')
    private readonly IbuhamilPengukuranService: IbuhamilImunisasiService,
    @Inject('SharedServiceInterface')
    private readonly sharedService: SharedService,
  ) {}

  @MessagePattern({ cmd: 'add-ibuhamil-imunisasi' })
  async addImunisasiIbuhamil(@Ctx() context: RmqContext,@Param("id") IbuHamilId:string, @Body() imunisasi: ImunisasiIbuhamilDTO) {
    this.sharedService.acknowledgeMessage(context);

    try {
      const imunisasiIbuhamil = await this.IbuhamilPengukuranService.addImunisasiIbuhamil(IbuHamilId, imunisasi);
      const baseResponse = new BaseResponses<IbuHamilImunisasi>(HttpStatus.CREATED, 'Imunisasi ibu hamil berhasil ditambahkan', imunisasiIbuhamil);
      return baseResponse;
    } catch (error) {
      const baseResponse = new BaseResponses<IbuHamilImunisasi>(HttpStatus.BAD_REQUEST, error.message, null);
      return baseResponse;
    }
  }

  @MessagePattern({ cmd: 'update-ibuhamil-imunisasi' })
  async updateImunisasiIbuhamil(@Ctx() context: RmqContext,@Param("id") imunisasiIbuHamilId:string, @Body() imunisasi: ImunisasiIbuhamilDTO) {
    this.sharedService.acknowledgeMessage(context);

    try {
      const updatedImunisasi = await this.IbuhamilPengukuranService.updateImunisasiIbuhamil(imunisasiIbuHamilId, imunisasi);
      const baseResponse = new BaseResponses<IbuHamilImunisasi>(HttpStatus.OK, 'Imunisasi ibu hamil berhasil diupdate', updatedImunisasi);
      return baseResponse;
    } catch (error) {
      const baseResponse = new BaseResponses<IbuHamilImunisasi>(HttpStatus.BAD_REQUEST, error.message, null);
      return baseResponse;
    }
  }
}
