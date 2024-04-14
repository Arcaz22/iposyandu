import { AuthGuard } from "@app/shared";
import { Body, Controller, Inject, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { IbuhamilPengukuranDTO } from "../dtos/ibuhamil/ibuhamil-pegukuran.dto";
import { IbuhamilImunisasiDTO } from "../dtos/ibuhamil/ibuhamil-imunisasi.dto";

@ApiTags('Ibu Hamil')
@Controller('ibuhamil')
@ApiBearerAuth('JWT')
@UseGuards(AuthGuard)
export class IbuhamilImunisasiAppController {
  constructor( @Inject('IBUHAMIL_SERVICE') private readonly ibuhamilService: ClientProxy ) {}

  @Post('imunisasi/create/:ibuHamilId')
  async addImunisasiIbuhamil(@Param('ibuHamilId') ibuHamilId: string, @Body() request: IbuhamilImunisasiDTO) {
    return this.ibuhamilService.send(
      { cmd: 'add-ibuhamil-imunisasi' }, { ...request, ibuHamilId },
    );
  }

  @Patch('imunisasi/update/:pengukuranIbuHamilId')
  async updateImunisasiIbuhamil( @Body() request: IbuhamilImunisasiDTO, @Param('pengukuranIbuHamilId') id: string ) {
    return this.ibuhamilService.send(
      { cmd: 'update-ibuhamil-imunisasi' }, { ...request, id },
    );
  }

}
