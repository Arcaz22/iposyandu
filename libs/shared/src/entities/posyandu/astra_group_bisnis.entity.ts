import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { AstraPerusahaan } from "./astra_perusahaan.entity";

@Entity('astra_grup_bisnis')
export class AstraGrupBisnis {
  @ApiProperty({ description: 'Id' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @OneToMany(() => AstraPerusahaan, perusahaan => perusahaan.astra_grup_bisnis)
  astra_perusahaans: AstraPerusahaan[];
}
