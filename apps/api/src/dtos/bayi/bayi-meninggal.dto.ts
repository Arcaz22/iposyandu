import { ApiProperty } from "@nestjs/swagger";

export class BayiMeninggalDTO {
  @ApiProperty({ example: '1990-01-01' })
  tanggal: Date;

  @ApiProperty({ example: 4 })
  usia: number;

  @ApiProperty({ example: 'RSUD' })
  tempat_pelayanan: string;
}
