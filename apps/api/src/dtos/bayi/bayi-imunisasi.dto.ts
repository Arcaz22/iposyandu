import { JenisBatchEnum } from "@app/shared";
import { ApiProperty } from "@nestjs/swagger";

export class ImunisasiBayiDTO {
  @ApiProperty({ example: '2021-08-01' })
  tanggal: Date;

  @ApiProperty({ enum: JenisBatchEnum, example: JenisBatchEnum.HBO })
  jenis_batch: JenisBatchEnum;
}
