import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthServiceInterface } from './interfaces/auth.service.interface';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { 
  Posyandu,
  User,
  UserJwt,
} from '@app/shared';
import { NewUserDTO } from './dtos/new-user.dto';
import { ExistingUserDTO } from './dtos/existing-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService implements AuthServiceInterface {
  constructor(
    @InjectRepository(User) protected readonly usersRepository: Repository<User>,
    @InjectRepository(Posyandu) private readonly posyanduRepository: Repository<Posyandu>,
    private readonly jwtService: JwtService,
  ) {}

  async findByEmail(existingUser: Readonly<ExistingUserDTO>): Promise<void> {
    const user = await this.usersRepository.findOne({
      where: { email: existingUser.email },
    });
    if (user) {
      throw new BadRequestException('User already exists');
    }
  }

  async hashPassword(password: string): Promise<string> {
    return hash(password, 10);
  }

  async register(newsUser: Readonly<NewUserDTO>): Promise<User> {
    await this.findByEmail(newsUser);
    const hashedPassword = await this.hashPassword(newsUser.password);

    const posyandu = await this.posyanduRepository.findOne({ where: { id: newsUser.posyanduId } });
    if (!posyandu) {
      throw new NotFoundException('Posyandu not found');
    }

    const user = this.usersRepository.create({
      ...newsUser,
      password: hashedPassword,
      posyandu,
    });

    const savedUser = await this.usersRepository.save(user);
    delete user.password;
    return savedUser;
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException("email tidak valid");
    }

    const validPassword = await compare(password, user.password);
    if (!validPassword) {
      throw new UnauthorizedException('password tidak valid');
    }
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
