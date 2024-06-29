import { StatusPernikahanEnum } from "@app/shared";
import { IsDateString, IsEnum, IsOptional, IsString } from "class-validator";

export class WuspusDTO {
  @IsString()
  nama: string;

  @IsDateString({ strict: true }, { message: 'Format tanggal harus YYYY-MM-DD' })
  tanggal_lahir: Date;

  @IsEnum(StatusPernikahanEnum, { message: 'Status Pernikahan yang valid: LAJANG, MENIKAH, CERAI' })
  status_pernikahan: StatusPernikahanEnum;

  @IsString()
  @IsOptional()
  nama_pasangan?: string;

  @IsDateString({ strict: true }, { message: 'Format tanggal harus YYYY-MM-DD' })
  @IsOptional()
  tanggal_lahir_pasangan?: Date;
}
