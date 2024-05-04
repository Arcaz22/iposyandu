import {
  IsNumber,
  IsString,
  IsEnum,
  IsOptional,
  IsDateString,
  Matches,
} from 'class-validator';
import { GenderEnum, GolonganDarahEnum } from '@app/shared';

export class BayiDTO {
  @IsString()
  @Matches(/^[0-9]+$/, {
    message: 'Nomer nik hanya boleh berisi angka',
  })
  nik: string;

  @IsString()
  nama: string;

  @IsString()
  tempat_lahir: string;

  @IsOptional()
  @IsDateString(
    { strict: true },
    { message: 'Format tanggal harus YYYY-MM-DD' },
  )
  tanggal_lahir: Date;

  @IsNumber()
  anak_ke: number;

  @IsEnum(GenderEnum)
  jenis_kelamin: GenderEnum;

  @IsString()
  alamat: string;

  @IsEnum(GolonganDarahEnum, {
    message: 'Golongan darah yang tersedia: A, B, AB, O',
  })
  golongan_darah: GolonganDarahEnum;

  @IsNumber()
  jumlah_anak: number;

  @IsString()
  no_akte_kelahiran: string;

  @IsString()
  ibu_nama: string;

  @IsString()
  ayah_nama: string;
}
