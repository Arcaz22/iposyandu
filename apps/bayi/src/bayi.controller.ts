import { Body, Controller, Get, HttpStatus, Inject, Param, Query, Request, Res } from '@nestjs/common';
import { BayiService } from './bayi.service';
import { BaseResponses, Bayi, DataTableResponses, SharedService } from '@app/shared';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { FilterDTO } from './dtos/filter.dto';
import { BayiDTO } from './dtos/bayi.dto';

@Controller()
export class BayiController {
  constructor(
    @Inject('BayiServiceInterface')
    private readonly bayiService: BayiService,
    @Inject('SharedServiceInterface')
    private readonly sharedService: SharedService,
  ) {}

  @MessagePattern({ cmd: 'find-bayi' })
  async findBayi(@Ctx() context: RmqContext, @Body() filter: FilterDTO) {
    this.sharedService.acknowledgeMessage(context);

    try {
      const bayi = await this.bayiService.findBayi(filter);
      const dataTableResponses = new DataTableResponses<Bayi>(bayi, bayi.length);
      return dataTableResponses;
    } catch (error) {
      const baseResponse = new BaseResponses<Bayi>(HttpStatus.BAD_REQUEST, error.message, null);
      return baseResponse;
    }
  }

  @MessagePattern({ cmd: 'create-bayi' })
  async createBayi(@Ctx() context: RmqContext, @Body() newBayi: BayiDTO & { userId: string }) {
    this.sharedService.acknowledgeMessage(context);

    try {
      const bayiDataWithUserId = { ...newBayi, userId: newBayi.userId };

      const bayi = await this.bayiService.createBayi(bayiDataWithUserId);
      const baseResponse = new BaseResponses<Bayi>(HttpStatus.CREATED, 'Data bayi berhasil ditambahkan', bayi);
      return baseResponse;
    } catch (error) {
      const baseResponse = new BaseResponses<Bayi>(HttpStatus.BAD_REQUEST, error.message, null);
      return baseResponse;
    }
  
  }

  @MessagePattern({ cmd: 'update-bayi' })
  async updateBayi( @Ctx() context: RmqContext, @Body() updateBayi: BayiDTO, @Param('id') id: string ) {
    this.sharedService.acknowledgeMessage(context);

    try {
      const bayi = await this.bayiService.updateBayi(id, updateBayi);
      const baseResponse = new BaseResponses<Bayi>(HttpStatus.OK, 'Data bayi berhasil diupdate', bayi);
      return baseResponse;
    } catch (error) {
      const baseResponse = new BaseResponses<Bayi>(HttpStatus.BAD_REQUEST, error.message, null);
      return baseResponse;
    }
    
  }

  @MessagePattern({ cmd: 'delete-bayi' })
  async deleteBayi( @Ctx() context: RmqContext, @Param('id') id: string ) {
    this.sharedService.acknowledgeMessage(context);

    try {
      const bayi = await this.bayiService.deleteBayi(id);
      const baseResponse = new BaseResponses<Bayi>(HttpStatus.OK, 'Data bayi berhasil dihapus');
      return baseResponse;
    } catch (error) {
      const baseResponse = new BaseResponses<Bayi>(HttpStatus.BAD_REQUEST, error.message, null);
      return baseResponse;
    }
  }

  @MessagePattern({ cmd: 'export-bayi' })
  async handleExportBayi(
    @Ctx() context: RmqContext,
  ) {
    this.sharedService.acknowledgeMessage(context);

    try {
      const buffer = await this.bayiService.exportBayi();

      return buffer;
    } catch (error) {
      const baseResponse = new BaseResponses<Bayi>(HttpStatus.BAD_REQUEST, error.message, null);
      return baseResponse;
    }
  }
}
