import { Body, Controller, Get, HttpStatus, Inject } from '@nestjs/common';
import { PosyanduService } from './posyandu.service';
import { BaseResponses, DataTableResponses, Event, SharedService } from '@app/shared';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import { FilterDTO } from './dtos/filter.dto';

@Controller()
export class PosyanduController {
  constructor(
    @Inject('PosyanduServiceInterface')
    private readonly posyanduService: PosyanduService,
    @Inject('SharedServiceInterface')
    private readonly sharedService: SharedService,
  ) {}

  @MessagePattern({ cmd: 'find-event-posyandu' })
  async findEvent(@Ctx() context: RmqContext, @Body()filter: FilterDTO) {
    this.sharedService.acknowledgeMessage(context);

    try {
      const event = await this.posyanduService.findEvent(filter);
      const dataTableResponses = new DataTableResponses<Event>(event, event.length);
      return dataTableResponses;
    } catch (error) {
      const baseResponse = new BaseResponses<Event>(HttpStatus.BAD_REQUEST, error.message, null);
      return baseResponse;
    }
  }

  @MessagePattern({ cmd: 'create-event-posyandu' })
  async createEvent(@Ctx() context: RmqContext, @Body() newEvent: Event) {
    this.sharedService.acknowledgeMessage(context);

    try {
      const event = await this.posyanduService.createEvent(newEvent);
      const baseResponse = new BaseResponses<Event>(HttpStatus.CREATED, 'Data posyandu berhasil ditambahkan', event);
      return baseResponse;
    } catch (error) {
      const baseResponse = new BaseResponses<Event>(HttpStatus.BAD_REQUEST, error.message, null);
      return baseResponse;
    }
  }

  @MessagePattern({ cmd: 'update-event-posyandu' })
  async updateEvent(@Ctx() context: RmqContext, @Body() updateEvent: Event) {
    this.sharedService.acknowledgeMessage(context);

    try {
      const event = await this.posyanduService.updateEvent(updateEvent.id, updateEvent);
      const baseResponse = new BaseResponses<Event>(HttpStatus.OK, 'Data posyandu berhasil diupdate', event);
      return baseResponse;
    } catch (error) {
      const baseResponse = new BaseResponses<Event>(HttpStatus.BAD_REQUEST, error.message, null);
      return baseResponse;
    }
  }
}
