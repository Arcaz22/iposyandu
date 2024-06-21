import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Kabupaten } from './kabupaten.entity';

@Entity({ name: 'provinsis' })
export class Provinsi {
  @ApiProperty({ description: 'Id' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Kode Provinsi' })
  @Column({ length: 255, nullable: false })
  kode: string;

  @ApiProperty({ description: 'Nama Provinsi' })
  @Column({ length: 255, nullable: false })
  nama: string;

  @ApiProperty({ description: 'Sumber Tabel Id' })
  @Column('bigint', { nullable: true })
  sumberTabelId: number;

  @ManyToOne(() => Kabupaten, kabupaten => kabupaten.provinsi)
  kabupaten: Kabupaten;
}
