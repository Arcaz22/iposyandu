import { PengukuranBayiEnum } from '@app/shared';
import { ApiProperty } from '@nestjs/swagger';

export class PengukuranBayiDTO {
  @ApiProperty({ example: '1990-01-01' })
  tanggal: Date;

  @ApiProperty({ example: 3.5 })
  berat_badan: number;

  @ApiProperty({ description: 'Tinggi Badan Bayi', example: 50 })
  tinggi_badan: number;

  @ApiProperty({ enum: PengukuranBayiEnum, example: PengukuranBayiEnum.TERLENTANG })
  cara_pengukuran: PengukuranBayiEnum;
}
