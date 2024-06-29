import { Body, Controller, Get, Inject, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { eventDTO } from './dtos/event.dto';
import { AuthGuard } from '@app/shared';
import { BaseFilterDTO } from './dtos/base-filter.dto';

@ApiTags('Event')
@Controller('event')
@ApiBearerAuth('JWT')
@UseGuards(AuthGuard)
export class PosyanduAppController {
  constructor( @Inject('POSYANDU_SERVICE') private readonly posyanduService: ClientProxy ) {}

  @Get()
  async findEvent( @Query() request: BaseFilterDTO ) {
    return this.posyanduService.send({ cmd: 'find-event-posyandu' }, { ...request });
  }

  @Post('create')
  async createEvent( @Body() request: eventDTO) {
    return this.posyanduService.send({ cmd: 'create-event-posyandu' }, { ...request });
  }

  @Post('update')
  async updateEvent( @Body() request: eventDTO, @Param('id') id: string) {
    return this.posyanduService.send({ cmd: 'update-event-posyandu' }, { ...request, id });
  }
}
