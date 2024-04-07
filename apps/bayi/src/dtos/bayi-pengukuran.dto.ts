import { PengukuranBayiEnum } from '@app/shared';
import { IsDateString, IsEnum, IsNumber, IsOptional } from 'class-validator';

export class PengukuranBayiDTO {
  @IsOptional()
  @IsDateString({ strict: true }, { message: 'Format tanggal harus YYYY-MM-DD' })
  tanggal: Date;

  @IsOptional()
  @IsNumber({}, { message: 'Berat badan harus berupa angka' })
  berat_badan: number;

  @IsOptional()
  @IsNumber({}, { message: 'Tinggi badan harus berupa angka' })
  tinggi_badan: number;

  @IsOptional()
  @IsEnum(PengukuranBayiEnum, { message: 'Cara pengukuran tidak valid' })
  cara_pengukuran: PengukuranBayiEnum;
}
