import { GenderEnum, GolonganDarahEnum } from '@app/shared';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export class BayiDTO {
  @ApiProperty({ example: '1234567890' })
  nik: string;

  @ApiProperty({ example: 'John Doe' })
  nama: string;

  @ApiProperty({ example: 'Jakarta' })
  tempat_lahir: string;

  @ApiProperty({ example: '1990-01-01' })
  tanggal_lahir: Date;

  @ApiProperty({ example: 2 })
  anak_ke: number;

  @ApiProperty({ example: 'LAKI-LAKI' })
  @IsEnum(GenderEnum)
  jenis_kelamin: GenderEnum;

  @ApiProperty({ description: 'Alamat', example: 'Jl. Raya No. 123' })
  alamat: string;

  @ApiProperty({ example: 'A' })
  @IsEnum(GolonganDarahEnum)
  golongan_darah: GolonganDarahEnum;

  @ApiProperty({ example: 3 })
  jumlah_anak: number;

  @ApiProperty({ example: '123456789' })
  no_akte_kelahiran: string;

  @ApiProperty({ example: 'Jane Doe' })
  ibu_nama: string;

  @ApiProperty({ example: 'John Smith' })
  ayah_nama: string;
}
