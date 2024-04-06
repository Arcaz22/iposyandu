import { Controller, Get, HttpStatus, Inject, NotFoundException, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BaseResponses, SharedService, User } from '@app/shared';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { NewUserDTO } from './dtos/new-user.dto';
import { ExistingUserDTO } from './dtos/existing-user.dto';
import { JwtGuard } from './jwt.guard';

@Controller()
export class AuthController {
  constructor(
    @Inject('AuthServiceInterface')
    private readonly authService: AuthService,
    @Inject('SharedServiceInterface')
    private readonly sharedService: SharedService,
  ) {}

  @MessagePattern({ cmd: 'register' })
  async register(@Ctx() context: RmqContext, @Payload() newUser: NewUserDTO) {
    this.sharedService.acknowledgeMessage(context);

    try {
      const user = await this.authService.register(newUser);
      const baseResponse = new BaseResponses<User>(HttpStatus.CREATED, 'User berhasil didaftarkan', user);
      return baseResponse;
    } catch (error) {
      const baseResponse = new BaseResponses<User>(HttpStatus.BAD_REQUEST, error.message, null);
      return baseResponse;
    }
    
  }

  @MessagePattern({ cmd: 'login' })
  async login(
    @Ctx() context: RmqContext,
    @Payload() existingUser: ExistingUserDTO,
  ) {
    this.sharedService.acknowledgeMessage(context);

    try {
      return await this.authService.login(existingUser);
    } catch (error) {
      if (error instanceof NotFoundException) {
        const baseResponse = new BaseResponses<User>(HttpStatus.NOT_FOUND, error.message, null);
        return baseResponse;
      } else if (error instanceof UnauthorizedException) {
        const baseResponse = new BaseResponses<User>(HttpStatus.UNAUTHORIZED, error.message, null);
        return baseResponse;
      } else {
        const baseResponse = new BaseResponses<User>(HttpStatus.BAD_REQUEST, error.message, null);
        return baseResponse;
      }
    }
  }

  @MessagePattern({ cmd: 'verify-jwt' })
  @UseGuards(JwtGuard)
  async verifyJwt(
    @Ctx() context: RmqContext,
    @Payload() payload: { jwt: string },
  ) {
    this.sharedService.acknowledgeMessage(context);

    return this.authService.verifyJwt(payload.jwt);
  }

  @MessagePattern({ cmd: 'decode-jwt' })
  async decodeJwt(
    @Ctx() context: RmqContext,
    @Payload() payload: { jwt: string },
  ) {
    this.sharedService.acknowledgeMessage(context);

    return this.authService.getUserFromHeader(payload.jwt);
  }
}
