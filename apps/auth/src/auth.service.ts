import { BadRequestException, ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthServiceInterface } from './interfaces/auth.service.interface';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { 
  User,
  UserJwt,
  UserRepositoryInterface 
} from '@app/shared';
import { NewUserDTO } from './dtos/new-user.dto';
import { ExistingUserDTO } from './dtos/existing-user.dto';

@Injectable()
export class AuthService implements AuthServiceInterface {
  constructor(
    @Inject('UsersRepositoryInterface') private readonly usersRepository: UserRepositoryInterface,
    private readonly jwtService: JwtService,
  ) {}

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findByCondition({
      where: { email },
      select: ['id', 'name', 'username', 'phone', 'email', 'password'],
    })
  }

  async findById(id: string): Promise<User> {
    return this.usersRepository.findOneById(id);
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async register(newsUser: Readonly<NewUserDTO>): Promise<User> {
    const { name, username, phone, email, password } = newsUser;

    const exisingUser = await this.findByEmail(email);
    if (exisingUser) {
      throw new ConflictException('User sudah terdaftar');
    }

    const hashedPassword = await this.hashPassword(password);

    const user = await this.usersRepository.save({
      name,
      username,
      phone,
      email,
      password: hashedPassword
    })

    delete user.password;
    return user;
  }

  async doesPasswordMatch( password: string, hashedPassword: string ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.findByEmail(email);

    const userExist = !!user;
    if(!userExist) return null;

    const passwordMatch = await this.doesPasswordMatch(password, user.password);
    if (!passwordMatch) return null;

    return user;
  }

  async login(existingUser: Readonly<ExistingUserDTO>) {
    const { email, password } = existingUser;
    const user = await this.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    delete user.password;

    const jwt = await this.jwtService.signAsync({ user });
    return { token: jwt, user };
  }

  async verifyJwt(jwt: string): Promise<{ user: User; exp: number; }> {
    if(!jwt) {
      throw new UnauthorizedException();
    }

    try {
      const { user, exp } = await this.jwtService.verifyAsync(jwt);
      return { user, exp };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async getUserFromHeader(jwt: string): Promise<UserJwt> {
    if(!jwt) return;
    
    try {
      return this.jwtService.decode(jwt) as UserJwt;
    } catch (error) {
      throw new BadRequestException('Invalid token');
    }
  }

}
