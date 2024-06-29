import { PenolongPersalinanEnum, TempatPersalinanEnum } from "@app/shared";
import { IsDateString, IsEnum } from "class-validator";

export class IbuhamilPersalinanDTO {
  @IsEnum(PenolongPersalinanEnum, { message: 'Penolong saat yang valid: DOKTER, BIDAN, LAINNYA' })
  penolong_persalinan: PenolongPersalinanEnum;

  @IsEnum(TempatPersalinanEnum, { message: 'Tempat yang valid: BIDAN, RUMAH SAKIT, PUSKESMAS, RUMAH BERSALIN, LAINNYA' })
  tempat_persalinan: TempatPersalinanEnum;

  @IsDateString({ strict: true }, { message: 'Format tanggal harus YYYY-MM-DD' })
  tanggal_persalinan: Date;
}
