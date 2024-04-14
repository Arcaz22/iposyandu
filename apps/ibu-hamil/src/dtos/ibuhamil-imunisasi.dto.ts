import { JenisBatchIbuHamilEnum } from "@app/shared";
import { IsDateString, IsEnum } from "class-validator";

export class ImunisasiIbuhamilDTO {
  @IsDateString({ strict: true }, { message: 'Format tanggal harus YYYY-MM-DD' })
  tanggal: Date;

  @IsEnum(JenisBatchIbuHamilEnum, { message: 'Jenis Imunisasi tidak valid' })
  jenis_batch: JenisBatchIbuHamilEnum;
}
