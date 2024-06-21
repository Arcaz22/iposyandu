import { Entity, Column, OneToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Kecamatan } from './kecamatan.entity';
import { Posyandu } from './posyandu.entity';

@Entity({ name: 'desas' })
export class Desa {
  @ApiProperty({ description: 'Id' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Kode Desa' })
  @Column({ length: 255, nullable: false })
  kode: string;

  @ApiProperty({ description: 'Nama Desa' })
  @Column({ length: 255, nullable: false })
  nama: string;

  @ApiProperty({ description: 'Sumber Tabel Id' })
  @Column('bigint', { nullable: true })
  sumberTabelId: number;

  @OneToMany(() => Kecamatan, (kecamatan) => kecamatan.desa, { cascade: true })
  kecamatan: Kecamatan[];

  @ManyToOne(() => Posyandu, posyandu => posyandu.desa)
  posyandu: Posyandu;
}
