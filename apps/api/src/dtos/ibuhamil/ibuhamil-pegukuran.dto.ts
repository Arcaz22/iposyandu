import { ApiProperty } from "@nestjs/swagger";

export class IbuhamilPengukuranDTO {
  @ApiProperty({ example: '2024-05-12' })
  tanggal: Date;

  @ApiProperty({ example: '170' })
  tinggi_badan: number;

  @ApiProperty({ example: '50' })
  berat_badan: number;

  @ApiProperty({ example: '8' })
  lila: number;

  @ApiProperty({ example: '10' })
  hb: string;

  @ApiProperty({ example: 'g1p2a0' })
  gpa: string;
}
