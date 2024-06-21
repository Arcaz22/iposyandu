import { Entity, Column, OneToMany, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Posyandu } from './posyandu.entity';
import { AstraGrupBisnis } from './astra_group_bisnis.entity';

@Entity({ name: 'astra_perusahaans' })
export class AstraPerusahaan {
  @ApiProperty({ description: 'Id' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255, nullable: false })
  @ApiProperty({ description: 'Nama Perusahaan' })
  nama: string;

  @Column({ type: 'int', default: 0 })
  @ApiProperty({ description: 'Jumlah Binaan' })
  jumlahBinaan: number;

  @Column({ type: 'bigint', nullable: true })
  @ApiProperty({ description: 'Sumber Tabel ID' })
  sumberTabelId: number;

  @ManyToOne(() => AstraGrupBisnis, (grupBisnis) => grupBisnis.perusahaans)
  @ApiProperty({ description: 'Grup Bisnis' })
  astraGrupBisnis: AstraGrupBisnis;
  
  @OneToMany(() => Posyandu, (posyandu) => posyandu.astraPerusahaan)
  posyandu: Posyandu[];
}
