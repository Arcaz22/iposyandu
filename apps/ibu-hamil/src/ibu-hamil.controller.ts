import { Body, Controller, HttpStatus, Inject, Param } from '@nestjs/common';
import { IbuHamilService } from './ibu-hamil.service';
import { BaseResponses, DataTableResponses, IbuHamil, SharedService } from '@app/shared';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import { FilterDTO } from './dtos/filter.dto';
import { IbuHamilDTO } from './dtos/ibuhamil.dto';

@Controller()
export class IbuHamilController {
  constructor(
    @Inject('IbuhamilServiceInterface')
    private readonly ibuhamilService: IbuHamilService,
    @Inject('SharedServiceInterface')
    private readonly sharedService: SharedService,
  ) {}

  @MessagePattern({ cmd: 'find-ibuhamil' })
  async findIbuhamil(@Ctx() context: RmqContext, @Body() filter: FilterDTO) {
    this.sharedService.acknowledgeMessage(context);

    try {
      const ibuhamil = await this.ibuhamilService.findIbuhamil(filter);
      const dataTableResponses = new DataTableResponses<IbuHamil>(ibuhamil, ibuhamil.length);
      return dataTableResponses;
    } catch (error) {
      const baseResponse = new BaseResponses<IbuHamil>(HttpStatus.BAD_REQUEST, 'Gagal mencari ibu hamil', null); // Pesan yang lebih umum
      return baseResponse;
    }
  }

  @MessagePattern({ cmd: 'create-ibuhamil' })
  async createIbuhamil(@Ctx() context: RmqContext, @Body() newIbuhamil: IbuHamilDTO) {
    this.sharedService.acknowledgeMessage(context);

    try {
      const ibuhamil = await this.ibuhamilService.createIbuhamil(newIbuhamil);
      const baseResponse = new BaseResponses<IbuHamil>(HttpStatus.CREATED, 'Data ibu hamil berhasil ditambahkan', ibuhamil);
      return baseResponse;
    } catch (error) {
      const baseResponse = new BaseResponses<IbuHamil>(HttpStatus.BAD_REQUEST, error.message, null);
      return baseResponse;
    }
  }

  @MessagePattern({ cmd: 'update-ibuhamil' })
  async updateIbuhamil(@Ctx() context: RmqContext, @Body() updateIbuhamil: IbuHamilDTO, @Param('id') id: string) {
    this.sharedService.acknowledgeMessage(context);

    try {
      const ibuhamil = await this.ibuhamilService.updateIbuhamil(id, updateIbuhamil);
      const baseResponse = new BaseResponses<IbuHamil>(HttpStatus.OK, 'Data ibu hamil berhasil diupdate', ibuhamil);
      return baseResponse;
    } catch (error) {
      const baseResponse = new BaseResponses<IbuHamil>(HttpStatus.BAD_REQUEST, error.message, null);
      return baseResponse;
    }
  }

  @MessagePattern({ cmd: 'delete-ibuhamil' })
  async deleteIbuhamil(@Ctx() context: RmqContext, @Param('id') id: string) {
    this.sharedService.acknowledgeMessage(context);

    try {
      const ibuhamil = await this.ibuhamilService.deleteIbuhamil(id);
      const baseResponse = new BaseResponses<IbuHamil>(HttpStatus.OK, 'Data ibu hamil berhasil dihapus');
      return baseResponse;
    } catch (error) {
      const baseResponse = new BaseResponses<IbuHamil>(HttpStatus.BAD_REQUEST, error.message, null);
      return baseResponse;
    }
  }

  @MessagePattern({ cmd: 'test' })
  async test(@Ctx() context: RmqContext) {
    this.sharedService.acknowledgeMessage(context)
    return this.ibuhamilService.test()
  }
}
