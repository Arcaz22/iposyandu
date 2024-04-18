import { AuthGuard } from "@app/shared";
import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { BaseFilterDTO } from "../dtos/base-filter.dto";
import { WuspusDTO } from "../dtos/wuspus/wuspus.dto";

@ApiTags('Wuspus')
@Controller('wuspus')
@ApiBearerAuth('JWT')
@UseGuards(AuthGuard)
export class WuspusAppController {
  constructor(@Inject('WUSPUS_SERVICE') private readonly wuspusService: ClientProxy) {}

  @Get()
  async findWuspus(@Query() request: BaseFilterDTO) {
    return this.wuspusService.send({ cmd: 'find-wuspus' }, { ...request });
  }

  @Post('create')
  async createWuspus(@Body() request: WuspusDTO) {
    return this.wuspusService.send({ cmd: 'create-wuspus' }, { ...request });
  }

  @Patch('update/:id')
  async updateWuspus(@Body() request: WuspusDTO, @Param('id') id: string) {
    return this.wuspusService.send({ cmd: 'update-wuspus' }, { id, ...request });
  }

  @Delete('delete/:id')
  async deleteWuspus(@Param('id') id: string) {
    return this.wuspusService.send({ cmd: 'delete-wuspus' }, { id });
  }

}
