import { ApiProperty } from "@nestjs/swagger";

export class WuspusPemeriksaanDTO {
  @ApiProperty({ example: '1990-01-01' })
  tanggal: Date;

  @ApiProperty({ example: 30 })
  lila: number;
}
