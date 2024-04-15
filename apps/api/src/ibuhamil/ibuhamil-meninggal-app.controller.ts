import { AuthGuard } from "@app/shared";
import { Body, Controller, Inject, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { IbuhamilMeninggalDTO } from "../dtos/ibuhamil/ibuhamil-meninggal.dto";

@ApiTags('Ibu Hamil')
@Controller('ibuhamil')
@ApiBearerAuth('JWT')
@UseGuards(AuthGuard)
export class IbuhamilMeninggalAppController {
  constructor( @Inject('IBUHAMIL_SERVICE') private readonly ibuhamilService: ClientProxy ) {}

  @Post('meninggal/create/:ibuHamilId')
  async addMeninggalIbuhamil(@Param('ibuHamilId') ibuHamilId: string, @Body() request: IbuhamilMeninggalDTO) {
    return this.ibuhamilService.send(
      { cmd: 'add-ibuhamil-meninggal' }, { ...request, ibuHamilId },
    );
  }

}
