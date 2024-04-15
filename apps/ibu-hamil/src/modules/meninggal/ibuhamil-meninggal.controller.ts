import { Body, Controller, HttpStatus, Inject, Param } from "@nestjs/common";
import { IbuhamilMeninggalService } from "./ibuhamil-meninggal.service";
import { BaseResponses, SharedService } from "@app/shared";
import { Ctx, MessagePattern, RmqContext } from "@nestjs/microservices";
import { IbuHamilMeninggalDTO } from "../../dtos/ibuhamil-meninggal.dto";

@Controller()
export class IbuhamilMeninggalController {
  constructor(
    @Inject('IbuhamilMeninggalServiceInterface')
    private readonly IbuhamilMeninggalService: IbuhamilMeninggalService,
    @Inject('SharedServiceInterface')
    private readonly sharedService: SharedService,
  ) {}

  @MessagePattern({ cmd: 'add-ibuhamil-meninggal' })
  async addMeninggalIbuhamil(@Ctx() context: RmqContext,@Param("id") IbuHamilId:string, @Body() meninggal: IbuHamilMeninggalDTO) {
    this.sharedService.acknowledgeMessage(context);

    try {
      const pengukuranIbuhamil = await this.IbuhamilMeninggalService.addMeninggalIbuhamil(IbuHamilId, meninggal);
      const baseResponse = new BaseResponses<IbuHamilMeninggalDTO>(HttpStatus.CREATED, 'Data ibu hamil berhasil ditambahkan', pengukuranIbuhamil);
      return baseResponse;
    } catch (error) {
      const baseResponse = new BaseResponses<IbuHamilMeninggalDTO>(HttpStatus.BAD_REQUEST, error.message, null);
      return baseResponse;
    }
  }

}
