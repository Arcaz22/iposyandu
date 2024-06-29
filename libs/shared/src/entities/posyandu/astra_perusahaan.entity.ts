import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { AstraGrupBisnis } from "./astra_group_bisnis.entity";
import { Posyandu } from "./posyandu.entity";

@Entity('astra_perusahaans')
export class AstraPerusahaan {
  @ApiProperty({ description: 'Id' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Astra Grup Bisnis Id' })
  @ManyToOne(() => AstraGrupBisnis, grupBisnis => grupBisnis.astra_perusahaans)
  astra_grup_bisnis: AstraGrupBisnis;

  @ApiProperty({ description: 'Nama' })
  @Column({ length: 255 })
  nama: string;

  @ApiProperty({ description: 'Jumlah Binaan' })
  @Column({ default: 0 })
  jumlah_binaan: number;

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

  @OneToMany(() => Posyandu, posyandu => posyandu.astra_perusahaan)
  posyandus: Posyandu[];
}
