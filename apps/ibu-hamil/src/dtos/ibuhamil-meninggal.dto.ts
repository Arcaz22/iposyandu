import { IsDateString, IsString } from "class-validator";

export class IbuHamilMeninggalDTO {
  @IsDateString({ strict: true }, { message: 'Format tanggal harus YYYY-MM-DD' })
  tanggal: Date;

  @IsString()
  tempat: string;
}
