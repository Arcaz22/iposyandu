import { IsDateString, IsNumber, IsOptional } from "class-validator";

export class WuspusPemeriksaanDTO {
  @IsDateString({ strict: true }, { message: 'Format tanggal harus YYYY-MM-DD' })
  @IsOptional()
  tanggal: Date;

  @IsNumber({}, { message: 'Lingkar lengan atas harus berupa angka' })
  lila: number;
}
