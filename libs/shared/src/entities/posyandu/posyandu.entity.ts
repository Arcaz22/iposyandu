import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Desa } from './desa.entity';
import { AstraPerusahaan } from './astra_perusahaan.entity';

@Entity({ name: 'posyandus' })
export class Posyandu {
  @ApiProperty({ description: 'Id' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Astra Perusahaan Id' })
  @Column('uuid', { nullable: true })
  astraPerusahaanId: string;

  @ApiProperty({ description: 'Nama Posyandu' })
  @Column({ length: 255, nullable: false })
  nama: string;

  @ApiProperty({ description: 'Binaan Astra' })
  @Column({ type: 'smallint', default: 0 })
  binaanAstra: number;

  @ApiProperty({ description: 'Status Verifikasi' })
  @Column({ length: 255, nullable: false, default: 'na' })
  statusVerifikasi: string;

  @ApiProperty({ description: 'Total Nilai Asesment' })
  @Column('double precision', { nullable: true })
  totalNilaiAsesment: number;

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
  @Column('bigint', { nullable: true })
  sumberTabelId: number;

  @OneToMany(() => Desa, (desa) => desa.posyandu, { cascade: true })
  desa: Desa[];

  @ManyToOne(() => AstraPerusahaan, (astraPerusahaan) => astraPerusahaan.posyandu)
  astraPerusahaan: AstraPerusahaan;
}
