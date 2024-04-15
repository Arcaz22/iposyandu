import { PenolongPersalinanEnum, TempatPersalinanEnum } from "@app/shared";
import { ApiProperty } from "@nestjs/swagger";

export class ibuhamilPersalinanDTO {
  @ApiProperty({ enum: PenolongPersalinanEnum,example: PenolongPersalinanEnum.BIDAN })
  penolong_persalinan: PenolongPersalinanEnum;

  @ApiProperty({ enum: TempatPersalinanEnum, example: TempatPersalinanEnum.BIDAN })
  tempat_persalinan: TempatPersalinanEnum;

  @ApiProperty({ example: '1990-01-01' })
  tanggal_persalinan: Date;
}
