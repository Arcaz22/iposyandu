import { PenolongPersalinanEnum, TempatPersalinanEnum } from "@app/shared";
import { IsDateString, IsEnum } from "class-validator";

export class IbuhamilPersalinanDTO {
  @IsEnum(PenolongPersalinanEnum, { message: 'Penolong saat persalinan tidak valid' })
  penolong_persalinan: PenolongPersalinanEnum;

  @IsEnum(TempatPersalinanEnum, { message: 'Tempat persalinan tidak valid' })
  tempat_persalinan: TempatPersalinanEnum;

  @IsDateString({ strict: true }, { message: 'Format tanggal harus YYYY-MM-DD' })
  tanggal_persalinan: Date;
}
