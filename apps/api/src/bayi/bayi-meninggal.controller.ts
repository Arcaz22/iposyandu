import { AuthGuard } from "@app/shared";
import { Body, Controller, Inject, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { BayiMeninggalDTO } from "../dtos/bayi/bayi-meninggal.dto";

@ApiTags('Bayi')
@Controller('bayi')
@ApiBearerAuth('JWT')
@UseGuards(AuthGuard)
export class BayiMeninggalAppController {
  constructor( @Inject('BAYI_SERVICE') private readonly bayiService: ClientProxy ) {}

  @Post('meninggal/create/:bayiId')
  async addMeninggalBayi(@Param('bayiId') bayiId: string, @Body() request: BayiMeninggalDTO) {
    return this.bayiService.send(
      { cmd: 'add-bayi-meninggal' }, { ...request, bayiId },
    );
  }

}
3
