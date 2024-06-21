import { Provinsi } from './provinsi.entity';
import { Entity, Column, OneToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Kecamatan } from './kecamatan.entity';

@Entity({ name: 'kabupatens' })
export class Kabupaten {
  @ApiProperty({ description: 'Id' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Kode Kabupaten' })
  @Column({ length: 255, nullable: false })
  kode: string;

  @ApiProperty({ description: 'Nama Kabupaten' })
  @Column({ length: 255, nullable: false })
  nama: string;

  @ApiProperty({ description: 'Sumber Tabel Id' })
  @Column('bigint', { nullable: true })
  sumberTabelId: number;

  @OneToMany(() => Provinsi, provinsi => provinsi.kabupaten)
  provinsi: Provinsi[];

  @ManyToOne(() => Kecamatan, kecamatan => kecamatan.kabupaten)
  kecamatan: Kecamatan;
}
