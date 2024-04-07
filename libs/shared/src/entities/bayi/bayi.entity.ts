import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseEntityRepository } from "../base.entity.repository";
import { ApiProperty } from "@nestjs/swagger";
import { GenderEnum } from "../../enums/user/gender.enum";
import { GolonganDarahEnum } from "../../enums/user/golongan-darah.enum";
import { PengukuranBayi } from "./bayi-pengukuran.entity";

@Entity()
export class Bayi extends BaseEntityRepository<Bayi> {
  @ApiProperty({ description: 'Nomor Induk Kependudukan' })
  @Column({})
  nik: string;

  @ApiProperty({ description: 'Nama Anak' })
  @Column()
  nama: string;

  @ApiProperty({ description: 'Tempat lahir' })
  @Column()
  tempat_lahir: string;

  @ApiProperty({ description: 'Tanggal lahir' })
  @Column()
  tanggal_lahir: Date;

  @ApiProperty({ description: 'Anak ke berapa' })
  @Column()
  anak_ke: number;

  @ApiProperty({ description: 'Jenis kelamin' })
  @Column({ type: 'enum', enum: GenderEnum })
  jenis_kelamin: GenderEnum;

  @ApiProperty({ description: 'Alamat' })
  @Column()
  alamat: string;

  @ApiProperty({ description: 'Golongan darah' })
  @Column({ type: 'enum', enum: GolonganDarahEnum })
  golongan_darah: GolonganDarahEnum;

  @ApiProperty({ description: 'Jumlah anak' })
  @Column()
  jumlah_anak: number;

  @ApiProperty({ description: 'Nomor akte kelahiran' })
  @Column()
  no_akte_kelahiran: string;

  @ApiProperty({ description: 'Nama ibu' })
  @Column()
  ibu_nama: string;

  @ApiProperty({ description: 'Nama ayah' })
  @Column()
  ayah_nama: string;

  @OneToMany(() => PengukuranBayi, pengukuran => pengukuran.bayi, { cascade: true })
  pengukuranBayi: PengukuranBayi[];
}
