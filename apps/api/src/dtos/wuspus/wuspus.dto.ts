import { StatusPernikahanEnum } from "@app/shared";
import { ApiProperty } from "@nestjs/swagger";

export class WuspusDTO {
  @ApiProperty({ example: 'Jhon Thor' })
  nama: string;

  @ApiProperty({ example: '1990-01-01' })
  tanggal_lahir: Date;

  @ApiProperty({ enum: StatusPernikahanEnum, example: StatusPernikahanEnum.MENIKAH })
  status_pernikahan: StatusPernikahanEnum;

  @ApiProperty({ example: 'Zuhe' })
  nama_pasangan?: string;

  @ApiProperty({ example: '1990-01-01' })
  tanggal_lahir_pasangan?: Date;
}
