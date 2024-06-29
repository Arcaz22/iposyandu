import { AuthGuard } from "@app/shared";
import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, Res, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { BaseFilterDTO } from "../dtos/base-filter.dto";
import { BayiDTO } from "../dtos/bayi/bayi.dto";
const fs = require('fs');

@ApiTags('Bayi')
@Controller('bayi')
@ApiBearerAuth('JWT')
@UseGuards(AuthGuard)
export class BayiAppController {
  constructor( @Inject('BAYI_SERVICE') private readonly bayiService: ClientProxy ) {}

  @Get()
  async findBayi(@Query() request: BaseFilterDTO) {
    return this.bayiService.send(
      { cmd: 'find-bayi' }, { ...request },
    );
  }

  @Post('create')
  async createBayi( @Body() request: BayiDTO ) {
    return this.bayiService.send(
      { cmd: 'create-bayi' }, { ...request },
    );
  }

  @Patch('update/:id')
  async updateBayi( @Body() request: BayiDTO, @Param('id') id: string ) {
    return this.bayiService.send(
      { cmd: 'update-bayi' }, { ...request, id },
    );
  }

  @Delete('delete/:id')
  async deleteBayi( @Param('id') id: string ) {
    return this.bayiService.send(
      { cmd: 'delete-bayi' }, { id },
    );
  }

  @Get('export')
  async exportBayi(@Res() res) {
    try {
      const buffer = await this.bayiService.send(
        { cmd: 'export-bayi' }, {},
      );
  
      console.log('Received Excel buffer from service');

      fs.writeFileSync('debug-laporan-posyandu.xlsx', buffer);
      res.setHeader('Content-Disposition', 'attachment; filename=laporan-posyandu.xlsx');
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.send(buffer);
    } catch (error) {
      console.error(`Failed to export bayi data: ${error.message}`, error.stack);
      res.status(500).send({ message: 'Failed to export bayi data' });
    }
  }
}
