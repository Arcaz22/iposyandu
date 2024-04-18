import { AuthGuard } from "@app/shared";
import { Body, Controller, Inject, Param, Post, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { WusapusMeninggalDTO } from "../dtos/wuspus/wuspus-meninggal.dto";

@ApiTags('Wuspus')
@Controller('wuspus')
@ApiBearerAuth('JWT')
@UseGuards(AuthGuard)
export class WuspusMeninggalAppController {
  constructor( @Inject('WUSPUS_SERVICE') private readonly wuspusService: ClientProxy ) {}

  @Post('meninggal/create/:wuspusId')
  async addMeninggalWuspus(@Param('wuspusId') wuspusId: string, @Body() request: WusapusMeninggalDTO) {
    return this.wuspusService.send(
      { cmd: 'add-wuspus-meninggal' }, { ...request, wuspusId },
    );
  }

}
