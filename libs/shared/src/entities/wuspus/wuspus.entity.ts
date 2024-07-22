import { ApiProperty } from "@nestjs/swagger";
import { BaseEntityRepository } from "../base.entity.repository";
import { Column, Entity, OneToMany } from "typeorm";
import { StatusPernikahanEnum } from "@app/shared/enums/wuspus/status-pernikahan.enum";
import { WuspusPemeriksaan } from "./wuspus-pemeriksaan.entity";
import { WuspusImunisasi } from "./wuspus-imunisasi.entity";
import { WuspusMeninggal } from "./wuspus-meninggal.entity";

@Entity()
export class Wuspus extends BaseEntityRepository<Wuspus> {
  @ApiProperty({ description: 'Nama WusPus' })
  @Column()
  nama: string;

  @ApiProperty({ description: 'Tanggal Lahir' })
  @Column()
  tanggal_lahir: Date;

  @ApiProperty({ description: 'Status WusPus' })
  @Column({
    type: 'enum',
    enum: StatusPernikahanEnum,
  })
  status_pernikahan: StatusPernikahanEnum

  @ApiProperty({ description: 'Nama Pasangan' })
  @Column({ nullable: true })
  nama_pasangan: string;

  @ApiProperty({ description: 'Tanggal Lahir Pasangan' })
  @Column({ nullable: true })
  tanggal_lahir_pasangan: Date;

  @OneToMany(() => WuspusPemeriksaan, pemeriksaan => pemeriksaan.wuspus, { cascade: true })
  wuspusPemeriksaan: WuspusPemeriksaan[];

  @OneToMany(() => WuspusImunisasi, imunisasi => imunisasi.wuspus)
  wuspusImunisasi: WuspusImunisasi[];

  @OneToMany(() => WuspusMeninggal, meninggal => meninggal.wuspus)
  wuspusMeninggal: WuspusMeninggal[];
}
