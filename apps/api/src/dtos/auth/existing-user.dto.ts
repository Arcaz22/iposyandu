import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class ExistingUserDTO {
  @ApiProperty({ example: 'test@gmail.com' })
  email: string;

  @ApiProperty({ example: 'Test1234' })
  password: string;
}
