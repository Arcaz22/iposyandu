import { JenisBatchWuspusEnum, KBEnum } from "@app/shared";
import { IsDateString, IsEnum, IsOptional } from "class-validator";

export class WuspusImunisasiDTO {
  @IsDateString({ strict: true }, { message: 'Format tanggal harus YYYY-MM-DD' })
  tanggal: Date;

  @IsEnum(JenisBatchWuspusEnum, { message: 'Jenis Imunisasi yang valid: TT 1, TT 2, TT 3, TT 4, TT 5, KB' })
  jenis_batch: JenisBatchWuspusEnum;

  @IsOptional()
  @IsEnum(KBEnum, { message: 'KB tidak yang valid: KONDOM, SUNTIK, PIL, IUD, IMPLAN, MOW, MOP, PERGANTIAN KONTRASEPSI' })
  kb?: KBEnum;
}
