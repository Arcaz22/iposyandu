import { AuthGuard } from "@app/shared";
import { Body, Controller, Inject, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { PengukuranBayiDTO } from "../dtos/bayi/bayi-pengukuran.dto";
import { IbuhamilPengukuranDTO } from "../dtos/ibuhamil/ibuhamil-pegukuran.dto";

@ApiTags('Ibu Hamil')
@Controller('ibuhamil')
@ApiBearerAuth('JWT')
@UseGuards(AuthGuard)
export class IbuhamilPengukuranAppController {
  constructor( @Inject('IBUHAMIL_SERVICE') private readonly ibuhamilService: ClientProxy ) {}

  @Post('pengukuran/create/:ibuHamilId')
  async addPengkuranBayi(@Param('ibuHamilId') ibuHamilId: string, @Body() request: IbuhamilPengukuranDTO) {
    return this.ibuhamilService.send(
      { cmd: 'add-ibuhamil-pengukuran' }, { ...request },
    );
  }

  @Patch('pengukuran/update/:pengukuranIbuHamilId')
  async updateBayi( @Body() request: IbuhamilPengukuranDTO, @Param('pengukuranIbuHamilId') id: string ) {
    return this.ibuhamilService.send(
      { cmd: 'update-ibuhamil-pengukuran' }, { ...request },
    );
  }

}
