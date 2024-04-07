import { AuthGuard } from "@app/shared";
import { Body, Controller, Inject, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ImunisasiBayiDTO } from "../dtos/bayi/bayi-imunisasi.dto";

@ApiTags('Bayi')
@Controller('bayi')
@ApiBearerAuth('JWT')
@UseGuards(AuthGuard)
export class BayiImunisasiAppController {
  constructor( @Inject('BAYI_SERVICE') private readonly bayiService: ClientProxy ) {}

  @Post('imunisasi/create/:bayiId')
  async addImunisasiBayi(@Param('bayiId') bayiId: string, @Body() request: ImunisasiBayiDTO) {
    return this.bayiService.send(
      { cmd: 'add-bayi-imunisasi' }, { ...request },
    );
  }

  @Patch('imunisasi/update/:imunisasiBayiId')
  async updateImunisasiBayi( @Body() request: ImunisasiBayiDTO, @Param('imunisasiBayiId') id: string ) {
    return this.bayiService.send(
      { cmd: 'update-bayi-imunisasi' }, { ...request },
    );
  }

}
