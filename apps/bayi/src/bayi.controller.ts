import { Controller, Get } from '@nestjs/common';
import { BayiService } from './bayi.service';
import { SharedService } from '@app/shared';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller()
export class BayiController {
  constructor(
    private readonly bayiService: BayiService,
    private readonly sharedService: SharedService,
  ) {}

  @MessagePattern({ cmd: 'get-bayi' })
  async getUsers(@Ctx() context: RmqContext) {
    this.sharedService.acknowledgeMessage(context);
    return this.bayiService.getPresence();
  }
}
