import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class ExistingUserDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
