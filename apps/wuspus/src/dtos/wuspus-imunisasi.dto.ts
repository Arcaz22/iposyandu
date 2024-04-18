import { JenisBatchWuspusEnum, KBEnum } from "@app/shared";
import { IsDateString, IsEnum, IsOptional } from "class-validator";

export class WuspusImunisasiDTO {
  @IsDateString({ strict: true }, { message: 'Format tanggal harus YYYY-MM-DD' })
  tanggal: Date;

  @IsEnum(JenisBatchWuspusEnum, { message: 'Jenis Imunisasi tidak valid' })
  jenis_batch: JenisBatchWuspusEnum;

  @IsOptional()
  @IsEnum(KBEnum, { message: 'KB tidak valid' })
  kb?: KBEnum;
}
