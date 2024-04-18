import { Body, Controller, Get, HttpStatus, Inject, Param } from '@nestjs/common';
import { WuspusService } from './wuspus.service';
import { BaseResponses, DataTableResponses, SharedService, Wuspus } from '@app/shared';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import { FilterDTO } from './dtos/filter.dto';
import { WuspusDTO } from './dtos/wuspus.dto';

@Controller()
export class WuspusController {
  constructor(
    @Inject('WuspusServiceInterface')
    private readonly wuspusService: WuspusService,
    @Inject('SharedServiceInterface')
    private readonly sharedService: SharedService
  ) {}

  @MessagePattern({ cmd: 'find-wuspus' })
  async findWuspus(@Ctx() context: RmqContext, @Body() filter: FilterDTO) {
    this.sharedService.acknowledgeMessage(context);

    try {
      const wuspus = await this.wuspusService.findWuspus(filter);
      const dataTableResponses = new DataTableResponses<Wuspus>(wuspus, wuspus.length);
      return dataTableResponses;
    } catch (error) {
      const baseResponse = new BaseResponses<Wuspus>(HttpStatus.BAD_REQUEST, error.message, null);
      return baseResponse;
    }
  }

  @MessagePattern({ cmd: 'create-wuspus' })
  async createWuspus(@Ctx() context: RmqContext, @Body() newWuspus: WuspusDTO) {
    this.sharedService.acknowledgeMessage(context);

    try {
      const wuspus = await this.wuspusService.createWuspus(newWuspus);
      const baseResponse = new BaseResponses<Wuspus>(HttpStatus.CREATED, 'Data wuspus berhasil ditambahkan', wuspus);
      return baseResponse;
    } catch (error) {
      const baseResponse = new BaseResponses<Wuspus>(HttpStatus.BAD_REQUEST, error.message, null);
      return baseResponse;
    }
  }

  @MessagePattern({ cmd: 'update-wuspus' })
  async updateWuspus(@Ctx() context: RmqContext, @Body() updateWuspus: WuspusDTO, @Param('id') id: string) {
    this.sharedService.acknowledgeMessage(context);

    try {
      const wuspus = await this.wuspusService.updateWuspus(id,updateWuspus);
      const baseResponse = new BaseResponses<Wuspus>(HttpStatus.OK, 'Data wuspus berhasil diupdate', wuspus);
      return baseResponse;
    } catch (error) {
      const baseResponse = new BaseResponses<Wuspus>(HttpStatus.BAD_REQUEST, error.message, null);
      return baseResponse;
    }
  }

  @MessagePattern({ cmd: 'delete-wuspus' })
  async deleteWuspus(@Ctx() context: RmqContext, @Param('id') id: string) {
    this.sharedService.acknowledgeMessage(context);

    try {
      const wuspus = await this.wuspusService.deleteWuspus(id);
      const baseResponse = new BaseResponses<Wuspus>(HttpStatus.OK, 'Data wuspus berhasil dihapus');
      return baseResponse;
    } catch (error) {
      const baseResponse = new BaseResponses<Wuspus>(HttpStatus.BAD_REQUEST, error.message, null);
      return baseResponse;
    }
  }
}
