import { AuthGuard } from "@app/shared";
import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { BaseFilterDTO } from "../dtos/base-filter.dto";
import { IbuHamilDTO } from "../dtos/ibuhamil/ibuhamil.dto";

@ApiTags('Ibu Hamil')
@Controller('ibuhamil')
@ApiBearerAuth('JWT')
@UseGuards(AuthGuard)
export class IbuhamilAppController {
  constructor(@Inject('IBUHAMIL_SERVICE') private readonly ibuhamilService: ClientProxy) {}

  @Get()
  async findIbuhamil(@Query() request: BaseFilterDTO) {
    return this.ibuhamilService.send({ cmd: 'find-ibuhamil' }, { ...request });
  }

  @Post('create')
  async createIbuhamil(@Body() request: IbuHamilDTO) {
    return this.ibuhamilService.send({ cmd: 'create-ibuhamil' }, { ...request });
  }

  @Patch('update/:id')
  async updateIbuhamil(@Body() request: IbuHamilDTO, @Param('id') id: string) {
    return this.ibuhamilService.send({ cmd: 'update-ibuhamil' }, { id, ...request });
  }

  @Delete('delete/:id')
  async deleteIbuhamil(@Param('id') id: string) {
    return this.ibuhamilService.send({ cmd: 'delete-ibuhamil' }, { id });
  }

}
