import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class NewUserDTO {
  @ApiProperty({ example: 'test@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Test1234' })
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Gunakan kombinasi huruf besar, huruf kecil, angka, dan simbol',
  })
  password: string;

  @ApiProperty({ example: 'test' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'test' })
  @IsString()
  username: string;

  @ApiProperty({ example: '085118962476' })
  @IsNumber()
  @Matches(/^[0-9]+$/, {
    message: 'Nomer telepon hanya boleh berisi angka',
  })
  phone: number;
}
