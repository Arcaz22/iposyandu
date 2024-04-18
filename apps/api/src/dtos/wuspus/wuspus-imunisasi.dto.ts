import { JenisBatchWuspusEnum, KBEnum } from "@app/shared";
import { ApiProperty } from "@nestjs/swagger";

export class WuspusImunisasiDTO {
  @ApiProperty({ example: '1990-01-01' })
  tanggal: Date;

  @ApiProperty({enum: JenisBatchWuspusEnum, example: JenisBatchWuspusEnum.KB })
  jenis_batch: JenisBatchWuspusEnum;

  @ApiProperty({ enum: KBEnum, example: KBEnum.SUNTIK })
  kb?: KBEnum;
}
