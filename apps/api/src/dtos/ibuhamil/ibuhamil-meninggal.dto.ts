import { ApiProperty } from "@nestjs/swagger";

export class IbuhamilMeninggalDTO {
  @ApiProperty({ example: '1990-01-01' })
  tanggal: Date;

  @ApiProperty({ example: 'RS' })
  tempat: string;
}
