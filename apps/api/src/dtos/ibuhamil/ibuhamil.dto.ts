import { GolonganDarahEnum, PendidikanEnum } from '@app/shared';
import { ApiProperty } from '@nestjs/swagger';

export class IbuHamilDTO {
  @ApiProperty({ example: '382017229169' })
  nik: string;

  @ApiProperty({ example: "lorem" })
  nama: string;

  @ApiProperty({ example: "2023-10-12" })
  hpht: Date;

  @ApiProperty({ example: "Bandung" })
  tempat_lahir: string;

  @ApiProperty({ example: "2023-10-12" })
  tanggal_lahir: Date;

  @ApiProperty({ example: '085118962476' })
  phone: string;

  @ApiProperty({ enum: PendidikanEnum, example: PendidikanEnum.S3 })
  pendidikan_terakhir: PendidikanEnum;

  @ApiProperty({ example: "Engineeer" })
  pekerjaan: string;

  @ApiProperty({ example: "JL. Cikaloa" })
  alamat: string;

  @ApiProperty({ enum: GolonganDarahEnum, example: GolonganDarahEnum.A })
  golongan_darah: GolonganDarahEnum;

  @ApiProperty({ example: "1000" })
  pembiayaan: number;

  @ApiProperty({ example: "12345" })
  no_jkn: string;

  @ApiProperty({ example: "A" })
  faskes: string;

  @ApiProperty({ example: "B" })
  faskes_rujukan: string;
}
