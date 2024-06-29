import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class NewUserDTO {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Gunakan kombinasi huruf besar, huruf kecil, angka, dan simbol',
  })
  password: string;

  @IsString()
  name: string;

  @IsString()
  username: string;

  @IsString()
  @Matches(/^[0-9]+$/, {
    message: 'Nomer telepon hanya boleh berisi angka',
  })
  phone: string;

  @IsUUID()
  posyanduId: string;
}
