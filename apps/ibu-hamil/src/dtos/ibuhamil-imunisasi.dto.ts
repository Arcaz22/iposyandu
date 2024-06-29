import { JenisBatchIbuHamilEnum } from "@app/shared";
import { IsDateString, IsEnum } from "class-validator";

export class ImunisasiIbuhamilDTO {
  @IsDateString({ strict: true }, { message: 'Format tanggal harus YYYY-MM-DD' })
  tanggal: Date;

  @IsEnum(JenisBatchIbuHamilEnum, { 
    message: 'Jenis Imunisasi Ibu hamil yang tersedia: IMUNISASITT 1, IMUNISASITT 2, IMUNISASITT 3, IMUNISASITT 4, IMUNISASITT 5, TABLET TAMBAH DARAH, PEMBERIAN MAKANAN TAMBAHAN' 
  })
  jenis_batch: JenisBatchIbuHamilEnum;
}
