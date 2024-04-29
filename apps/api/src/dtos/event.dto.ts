import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber } from "class-validator";

export class eventDTO {
  @ApiProperty({ example: '2021-08-01' })
  tanggal: Date;

  @ApiProperty({ example: 1 })
  jumlah_kader_l: number;

  @ApiProperty({ example: 2 })
  jumlah_kader_p: number;

  @ApiProperty({ example: 3 })
  jumlah_plkb_l: number;

  @ApiProperty({ example: 4 })
  jumlah_plkb_p: number;

  @ApiProperty({ example: 5 })
  jumlah_tenaga_medis_l: number;

  @ApiProperty({ example: 6 })
  jumlah_tenaga_medis_p: number;
}
