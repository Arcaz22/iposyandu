import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class ExistingUserDTO {
  @ApiProperty({ example: 'test@gmail.com',})
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Test1234' })
  @IsString()
  password: string;
}
