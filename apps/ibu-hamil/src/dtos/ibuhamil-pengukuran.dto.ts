import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator"

export class PengukuranIbuhamilDTO {
  @IsOptional()
  @IsDateString({ strict: true }, { message: 'Format tanggal harus YYYY-MM-DD' })
  tanggal: Date

  @IsNumber({}, { message: 'Tinggi badan harus berupa angka' })
  tinggi_badan: number

  @IsNumber({}, { message: 'Berat badan harus berupa angka' })
  berat_badan: number

  @IsNumber({}, { message: 'Lingkar lengan harus berupa angka' })
  lila: number

  @IsString()
  hb: string

  @IsString()
  gpa: string
}
