import { IsDateString, IsNumber } from "class-validator";

export class eventDTO {
  @IsDateString(
    { strict: true },
    { message: 'Format tanggal harus YYYY-MM-DD' }
  )
  tanggal: Date;

  @IsNumber()
  jumlah_kader_l: number;

  @IsNumber()
  jumlah_kader_p: number;

  @IsNumber()
  jumlah_plkb_l: number;

  @IsNumber()
  jumlah_plkb_p: number;

  @IsNumber()
  jumlah_tenaga_medis_l: number;

  @IsNumber()
  jumlah_tenaga_medis_p: number;
}
