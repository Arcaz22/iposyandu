import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { NewUserDTO } from './dtos/auth/new-user.dto';
import { ExistingUserDTO } from './dtos/auth/existing-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthAppController {
  constructor( @Inject('AUTH_SERVICE') private readonly authService: ClientProxy ) {}

  @Post('register')
  async register( @Body() request: NewUserDTO ) {
    const { name, username, phone, email, password } = request;
    return this.authService.send(
      { cmd: 'register' }, { name, username, phone, email, password },
    );
  }

  @Post('login')
  async login( @Body() request: ExistingUserDTO) {
    const { email, password } = request;
    return this.authService.send(
      { cmd: 'login' }, { email, password },
    );
  }
}
