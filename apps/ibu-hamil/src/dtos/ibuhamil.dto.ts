import {
  IsNumber,
  IsString,
  IsEnum,
  IsOptional,
  IsDateString,
  Matches,
} from 'class-validator';
import { GolonganDarahEnum, PendidikanEnum } from '@app/shared';

export class IbuHamilDTO {
  @IsString()
  @Matches(/^[0-9]+$/, {
    message: 'Nomer nik hanya boleh berisi angka',
  })
  nik: string;

  @IsString()
  nama: string;

  @IsOptional()
  @IsDateString(
    { strict: true },
    { message: 'Format tanggal harus YYYY-MM-DD' }
  )
  hpht: Date;

  @IsOptional()
  @IsDateString(
    { strict: true },
    { message: 'Format tanggal harus YYYY-MM-DD' }
  )
  taksiran_persalinan: Date;
  
  @IsString()
  tempat_lahir: string;

  @IsOptional()
  @IsDateString(
    { strict: true },
    { message: 'Format tanggal harus YYYY-MM-DD' },
  )
  tanggal_lahir: Date;

  @IsEnum(PendidikanEnum, {
    message: 'Pendidikan terakhir yang valid: SD, SMP, SMA, D1, D2, D3, S1, S2, S3'
  })
  pendidikan_terakhir: PendidikanEnum;

  @IsString()
  pekerjaan: string;

  @IsString()
  alamat: string;

  @IsEnum(GolonganDarahEnum,
    { message: 'Golongan darah yang tersedia: A, B, AB, O' }
  )
  golongan_darah: GolonganDarahEnum;

  @IsNumber()
  pembiayaan: number;

  @IsString()
  no_jkn: string;

  @IsString()
  faskes: string;

  @IsString()
  faskes_rujukan: string;
}
