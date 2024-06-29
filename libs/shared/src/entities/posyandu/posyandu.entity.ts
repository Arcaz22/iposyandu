import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Puskesmas } from "./puskesmas.entity";
import { Desa } from "./desa.entity";
import { AstraPerusahaan } from "./astra_perusahaan.entity";

@Entity('posyandus')
export class Posyandu {
  @ApiProperty({ description: 'Id' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Puskesmas Id' })
  @ManyToOne(() => Puskesmas, puskesmas => puskesmas.posyandus)
  puskesmas: Puskesmas;

  @ApiProperty({ description: 'Desa Id' })
  @ManyToOne(() => Desa, desa => desa.posyandus, { nullable: true })
  desa: Desa;

  @ApiProperty({ description: 'Astra Perusahaan Id' })
  @ManyToOne(() => AstraPerusahaan, perusahaan => perusahaan.posyandus, { nullable: true })
  astra_perusahaan: AstraPerusahaan;

  @ApiProperty({ description: 'Nama' })
  @Column({ length: 255 })
  nama: string;

  @ApiProperty({ description: 'Binaan Astra' })
  @Column({ type: 'smallint', default: 0 })
  binaan_astra: number;

  @ApiProperty({ description: 'Status Verifikasi' })
  @Column({ length: 255, default: 'na' })
  status_verifikasi: string;

  @ApiProperty({ description: 'Total Nilai Asesment' })
  @Column({ type: 'double precision', nullable: true })
  total_nilai_asesment: number;

  @ApiProperty({ description: 'Bintang' })
  @Column({ type: 'smallint', nullable: true })
  bintang: number;

  @ApiProperty({ description: 'Kategori' })
  @Column({ length: 255, nullable: true })
  kategori: string;

  @ApiProperty({ description: 'Info' })
  @Column({ length: 255, nullable: true })
  info: string;

  @ApiProperty({ description: 'Sumber Tabel Id' })
  @Column({ nullable: true })
  sumber_tabel_id: number;

  @ApiProperty({ description: 'Deleted At' })
  @Column({ type: 'timestamp', nullable: true })
  deleted_at: Date;

  @ApiProperty({ description: 'Created At' })
  @Column({ type: 'timestamp', nullable: true })
  created_at: Date;

  @ApiProperty({ description: 'Updated At' })
  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date;
}
