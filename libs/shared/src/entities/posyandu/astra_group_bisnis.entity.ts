import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { AstraPerusahaan } from './astra_perusahaan.entity';

@Entity({ name: 'astra_grup_bisnis' })
export class AstraGrupBisnis {
  @ApiProperty({ description: 'Id' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255, nullable: false })
  @ApiProperty({ description: 'Nama Grup Bisnis' })
  nama: string;

  @Column({ type: 'int', default: 0 })
  @ApiProperty({ description: 'Jumlah Binaan' })
  jumlahBinaan: number;

  @Column({ type: 'bigint', nullable: true })
  @ApiProperty({ description: 'Sumber Tabel ID' })
  sumberTabelId: number;

  @OneToMany(() => AstraPerusahaan, (perusahaan) => perusahaan.astraGrupBisnis)
  perusahaans: AstraPerusahaan[];
}
