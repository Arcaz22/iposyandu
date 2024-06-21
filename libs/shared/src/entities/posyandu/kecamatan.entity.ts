import { Entity, Column, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Desa } from './desa.entity';
import { Kabupaten } from './kabupaten.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'kecamatans' })
export class Kecamatan {
  @ApiProperty({ description: 'Id' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Kode Kecamatan' })
  @Column({ length: 255, nullable: false })
  kode: string;

  @ApiProperty({ description: 'Nama Kecamatan' })
  @Column({ length: 255, nullable: false })
  nama: string;

  @ApiProperty({ description: 'Sumber Tabel Id' })
  @Column('bigint', { nullable: true })
  sumberTabelId: number;

  @ManyToOne(() => Desa, desa => desa.kecamatan)
  desa: Desa;

  @OneToMany(() => Kabupaten, kabupaten => kabupaten.kecamatan)
  kabupaten: Kabupaten[];

}
