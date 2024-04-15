import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntityRepository } from '../base.entity.repository';
import { GolonganDarahEnum } from '@app/shared/enums/golongan-darah.enum';
import { PendidikanEnum } from '@app/shared/enums/ibuhamil/pendidikan.enum';
import { IbuHamilPengukuran } from './ibuhamil-pengukuran.entity';
import { IbuHamilImunisasi } from './ibuhamil-imunisasi.entity';
import { IbuHamilMeninggal } from './ibuhamil-meninggal.entity';
import { IbuHamilPersalinan } from './ibuhamil-persalinan.entity';

@Entity()
export class IbuHamil extends BaseEntityRepository<IbuHamil> {
  @ApiProperty({ description: 'Nomor Induk Kependudukan' })
  @Column()
  nik: string;

  @ApiProperty({ description: 'Nama Ibu Hamil' })
  @Column()
  nama: string;

  @ApiProperty({ description: 'Hari Pertama Hari Terakhir' })
  @Column()
  hpht: Date;

  @ApiProperty({ description: 'Taksiran Peresalinan' })
  @Column()
  taksiran_persalinan: Date;

  @ApiProperty({ description: 'Tempat Lahir' })
  @Column()
  tempat_lahir: string;

  @ApiProperty({ description: 'Tanggal Lahir' })
  @Column()
  tanggal_lahir: Date;

  @ApiProperty({ description: 'Pendidikan Terakhir' })
  @Column({ type: 'enum', enum: PendidikanEnum })
  pendidikan_terakhir: PendidikanEnum;

  @ApiProperty({ description: 'Pekerjaan' })
  @Column()
  pekerjaan: string;

  @ApiProperty({ description: 'Alamat' })
  @Column()
  alamat: string;

  @ApiProperty({ description: 'Nomer Telepon' })
  @Column()
  phone: string;

  @ApiProperty({ description: 'Golongan Darah' })
  @Column({ type: 'enum', enum: GolonganDarahEnum })
  golongan_darah: GolonganDarahEnum;
  
  @ApiProperty({ description: 'Pembiayaan' })
  @Column()
  pembiayaan: number

  @ApiProperty({ description: 'No Jkn' })
  @Column()
  no_jkn: string

  @ApiProperty({ description: 'Faskes Tingkat 1' })
  @Column()
  faskes: string;

  @ApiProperty({ description: 'Faskes Rujukan' })
  @Column()
  faskes_rujukan: string;

  @OneToMany(() => IbuHamilPengukuran, pengukuran => pengukuran.ibuHamil, { cascade: true })
  pengukuranIbuHamil: IbuHamilPengukuran[];

  @OneToMany(() => IbuHamilImunisasi, imunisasi => imunisasi.ibuHamil)
  imunisasiIbuHamil: IbuHamilImunisasi[];

  @OneToMany(() => IbuHamilPersalinan, persalinan => persalinan.ibuHamil)
  persalinanIbuHamil: IbuHamilPersalinan[];

  @OneToMany(() => IbuHamilMeninggal, meninggal => meninggal.ibuHamil)
  ibuHamilMeninggal: IbuHamilMeninggal[];
}
