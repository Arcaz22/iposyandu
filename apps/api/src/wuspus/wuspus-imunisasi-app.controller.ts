import { AuthGuard } from "@app/shared";
import { Body, Controller, Inject, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { WuspusImunisasiDTO } from "../dtos/wuspus/wuspus-imunisasi.dto";

@ApiTags('Wuspus')
@Controller('wuspus')
@ApiBearerAuth('JWT')
@UseGuards(AuthGuard)
export class WuspusImunisasiAppController {
  constructor( @Inject('WUSPUS_SERVICE') private readonly wuspusService: ClientProxy ) {}

  @Post('imunisasi/create/:wuspusId')
  async addImunisasiWuspus(@Param('wuspusId') wuspusId: string, @Body() request: WuspusImunisasiDTO) {
    return this.wuspusService.send(
      { cmd: 'add-wuspus-imunisasi' }, { ...request, wuspusId },
    );
  }

  @Patch('imunisasi/update/:imunisasiWuspusId')
  async updateImunisasiWuspus( @Body() request: WuspusImunisasiDTO, @Param('imunisasiWuspusId') id: string ) {
    return this.wuspusService.send(
      { cmd: 'update-wuspus-imunisasi' }, { ...request, id },
    );
  }

}
