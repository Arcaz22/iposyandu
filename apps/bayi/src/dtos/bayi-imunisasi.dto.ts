import { JenisBatchEnum } from "@app/shared";
import { IsDateString, IsEnum } from "class-validator";

export class ImunisasiBayiDTO {
  @IsDateString({ strict: true }, { message: 'Format tanggal harus YYYY-MM-DD' })
  tanggal: Date;

  @IsEnum(JenisBatchEnum, { 
    message: 'Jenis Imunisasi yang tersedia: HBO, DPT-HB 1, DPT-HB 2. DPT-HB 3, MR, BCG, POLIO 1, POLIO 2, POLIO 3, POLIO 4, IPV' 
  })
  jenis_batch: JenisBatchEnum;
}
