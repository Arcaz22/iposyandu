import { IsDateString, IsString } from "class-validator";

export class WuspusMeninggalDTO {
  @IsDateString({ strict: true }, { message: 'Format tanggal harus YYYY-MM-DD' })
  tanggal: Date;

  @IsString()
  tempat: string;
}
