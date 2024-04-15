import { JenisBatchIbuHamilEnum } from "@app/shared";
import { ApiProperty } from "@nestjs/swagger";

export class IbuhamilImunisasiDTO {
  @ApiProperty({ example: '1990-01-01' })
  tanggal: Date;

  @ApiProperty({ enum: JenisBatchIbuHamilEnum, example: JenisBatchIbuHamilEnum.PMT})
  jenis_batch: JenisBatchIbuHamilEnum;
}
