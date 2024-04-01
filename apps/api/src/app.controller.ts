import { AuthGuard } from '@app/shared';
import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
    @Inject('BAYI_SERVICE') private readonly bayiService: ClientProxy,
  ) {}

  @Post('auth/register')
  async register(
    @Body('name') name: string,
    @Body('username') username: string,
    @Body('phone') phone: number,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.send(
      {
        cmd: 'register',
      },
      {
        name,
        username,
        phone,
        email,
        password
      },
    );
  }

  @Post('auth/login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.send(
      {
        cmd: 'login',
      },
      {
        email,
        password,
      },
    );
  }

  @UseGuards(AuthGuard)
  @Get('bayi')
  async getBayi() {
    return this.bayiService.send(
      {
        cmd: 'get-bayi',
      },
      {},
    );
  }
}
