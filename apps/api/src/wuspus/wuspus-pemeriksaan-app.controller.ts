import { AuthGuard } from "@app/shared";
import { Body, Controller, Inject, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { WuspusPemeriksaanDTO } from "../dtos/wuspus/wuspus-pemeriksaan.dto";

@ApiTags('Wuspus')
@Controller('wuspus')
@ApiBearerAuth('JWT')
@UseGuards(AuthGuard)
export class WuspusPemeriksaanAppController {
  constructor( @Inject('WUSPUS_SERVICE') private readonly wuspusService: ClientProxy ) {}

  @Post('pemeriksaan/create/:wuspusId')
  async addPemeriksaanWuspus(@Param('wuspusId') wuspusId: string, @Body() request: WuspusPemeriksaanDTO) {
    return this.wuspusService.send(
      { cmd: 'add-wuspus-pemeriksaan' }, { ...request, wuspusId },
    );
  }

  @Patch('pemeriksaan/update/:pemeriksaanWuspusId')
  async updatePemeriksaanWuspus( @Body() request: WuspusPemeriksaanDTO, @Param('pemeriksaanWuspusId') id: string ) {
    return this.wuspusService.send(
      { cmd: 'update-wuspus-pemeriksaan' }, { ...request, id },
    );
  }

}
