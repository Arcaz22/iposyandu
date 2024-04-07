import { JenisBatchEnum } from "@app/shared";
import { IsDateString, IsEnum } from "class-validator";

export class ImunisasiBayiDTO {
  @IsDateString({ strict: true }, { message: 'Format tanggal harus YYYY-MM-DD' })
  tanggal: Date;

  @IsEnum(JenisBatchEnum, { message: 'Jenis Imunisasi tidak valid' })
  jenis_batch: JenisBatchEnum;
}
