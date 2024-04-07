import { IsDateString, IsNumber, IsString } from "class-validator";

export class BayiMeninggalDTO {
  @IsDateString({ strict: true }, { message: 'Format tanggal harus YYYY-MM-DD' })
  tanggal: Date;

  @IsNumber({}, { message: 'Usia harus berupa angka' })
  usia: number;

  @IsString()
  tempat_pelayanan: string;
}
