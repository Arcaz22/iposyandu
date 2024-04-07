import { AuthGuard } from "@app/shared";
import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { BayiDTO } from "../dtos/bayi/bayi.dto";
import { PengukuranBayiDTO } from "../dtos/bayi/bayi-pengukuran.dto";

@ApiTags('Bayi')
@Controller('pengukuran')
@ApiBearerAuth('JWT')
@UseGuards(AuthGuard)
export class BayiPengukuranAppController {
  constructor( @Inject('BAYI_SERVICE') private readonly bayiService: ClientProxy ) {}

  @Post('create/:bayiId')
  async addPengkuranBayi(@Param('bayiId') bayiId: string, @Body() request: PengukuranBayiDTO) {
    return this.bayiService.send(
      { cmd: 'add-bayi-pengukuran' }, { ...request },
    );
  }

  @Patch('update/:pengukuranBayiId')
  async updateBayi( @Body() request: PengukuranBayiDTO, @Param('pengukuranBayiId') id: string ) {
    return this.bayiService.send(
      { cmd: 'update-bayi-pengukuran' }, { ...request },
    );
  }

}
