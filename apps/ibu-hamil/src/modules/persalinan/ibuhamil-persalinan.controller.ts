import { Body, Controller, HttpStatus, Inject, Param } from "@nestjs/common";
import { IbuhamilPersalinanService } from "./ibuhamil-persalinan.service";
import { BaseResponses, IbuHamilPersalinan, SharedService } from "@app/shared";
import { Ctx, MessagePattern, RmqContext } from "@nestjs/microservices";
import { IbuhamilPersalinanDTO } from "../../dtos/ibuhamil-persalinan.dto";

@Controller()
export class IbuhamilPersalinanController {
  constructor(
    @Inject('IbuhamilPersalinanServiceInterface')
    private readonly IbuhamilPersalinanService: IbuhamilPersalinanService,
    @Inject('SharedServiceInterface')
    private readonly sharedService: SharedService,
  ) {}

  @MessagePattern({ cmd: 'add-ibuhamil-persalinan' })
  async addPersalinanIbuhamil(@Ctx() context: RmqContext,@Param("id") IbuHamilId:string, @Body() pengukuran: IbuhamilPersalinanDTO) {
    this.sharedService.acknowledgeMessage(context);

    try {
      const pengukuranIbuhamil = await this.IbuhamilPersalinanService.addPersalinanIbuhamil(IbuHamilId, pengukuran);
      const baseResponse = new BaseResponses<IbuHamilPersalinan>(HttpStatus.CREATED, 'Persalinan ibu hamil berhasil ditambahkan', pengukuranIbuhamil);
      return baseResponse;
    } catch (error) {
      const baseResponse = new BaseResponses<IbuHamilPersalinan>(HttpStatus.BAD_REQUEST, error.message, null);
      return baseResponse;
    }
  }

  @MessagePattern({ cmd: 'update-ibuhamil-persalinan' })
  async updatePengukuranBayi(@Ctx() context: RmqContext,@Param("id") pengukuranIbuHamilId:string, @Body() pengukuran: IbuhamilPersalinanDTO) {
    this.sharedService.acknowledgeMessage(context);

    try {
      const updatedPengukuran = await this.IbuhamilPersalinanService.updatePersalinanIbuhamil(pengukuranIbuHamilId, pengukuran);
      const baseResponse = new BaseResponses<IbuHamilPersalinan>(HttpStatus.OK, 'Persalinan ibu hamil berhasil diupdate', updatedPengukuran);
      return baseResponse;
    } catch (error) {
      const baseResponse = new BaseResponses<IbuHamilPersalinan>(HttpStatus.BAD_REQUEST, error.message, null);
      return baseResponse;
    }
  }
}
