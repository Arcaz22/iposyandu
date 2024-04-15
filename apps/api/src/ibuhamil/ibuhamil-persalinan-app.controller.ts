import { AuthGuard } from "@app/shared";
import { Body, Controller, Inject, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ibuhamilPersalinanDTO } from "../dtos/ibuhamil/ibuhamil-persalinan.dto";

@ApiTags('Ibu Hamil')
@Controller('ibuhamil')
@ApiBearerAuth('JWT')
@UseGuards(AuthGuard)
export class IbuhamilPersalinanAppController {
  constructor( @Inject('IBUHAMIL_SERVICE') private readonly ibuhamilService: ClientProxy ) {}

  @Post('persalinan/create/:ibuHamilId')
  async addPersalinanIbuhamil(@Param('ibuHamilId') ibuHamilId: string, @Body() request: ibuhamilPersalinanDTO) {
    return this.ibuhamilService.send(
      { cmd: 'add-ibuhamil-persalinan' }, { ...request, ibuHamilId },
    );
  }

  @Patch('persalinan/update/:persalinanIbuHamilId')
  async updatePersalinanIbuhamil( @Body() request: ibuhamilPersalinanDTO, @Param('persalinanIbuHamilId') id: string ) {
    return this.ibuhamilService.send(
      { cmd: 'update-ibuhamil-persalinan' }, { ...request, id },
    );
  }

}
