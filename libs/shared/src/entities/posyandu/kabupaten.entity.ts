import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Provinsi } from "./provinsi.entity";
import { Kecamatan } from "./kecamatan.entity";

@Entity('kabupatens')
export class Kabupaten {
  @ApiProperty({ description: 'Id' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Provinsi Id' })
  @ManyToOne(() => Provinsi, provinsi => provinsi.kabupatens)
  provinsi: Provinsi;

  @ApiProperty({ description: 'Kode' })
  @Column({ length: 255 })
  kode: string;

  @ApiProperty({ description: 'Nama' })
  @Column({ length: 255 })
  nama: string;

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

  @OneToMany(() => Kecamatan, kecamatan => kecamatan.kabupaten)
  kecamatans: Kecamatan[];
}
