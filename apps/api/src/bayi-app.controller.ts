import { AuthGuard } from "@app/shared";
import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { BaseFilterDTO } from "./dtos/base-filter.dto";
import { BayiDTO } from "./dtos/bayi/bayi.dto";

@ApiTags('Bayi')
@Controller('bayi')
@ApiBearerAuth('JWT')
@UseGuards(AuthGuard)
export class BayiAppController {
  constructor( @Inject('BAYI_SERVICE') private readonly bayiService: ClientProxy ) {}

  @Get()
  async findBayi(@Query() request: BaseFilterDTO) {
    return this.bayiService.send(
      { cmd: 'find-bayi' }, { ...request },
    );
  }

  @Post('create')
  async createBayi( @Body() request: BayiDTO ) {
    return this.bayiService.send(
      { cmd: 'create-bayi' }, { ...request },
    );
  }

  @Patch('update/:id')
  async updateBayi( @Body() request: BayiDTO, @Param('id') id: string ) {
    return this.bayiService.send(
      { cmd: 'update-bayi' }, { ...request },
    );
  }

  @Delete('delete/:id')
  async deleteBayi( @Param('id') id: string ) {
    return this.bayiService.send(
      { cmd: 'delete-bayi' }, { id },
    );
  }
}
