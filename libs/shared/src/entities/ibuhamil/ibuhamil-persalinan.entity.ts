import { PenolongPersalinanEnum } from '@app/shared/enums/ibuhamil/penolong-persalinan.enum';
import { TempatPersalinanEnum } from '@app/shared/enums/ibuhamil/tempat-persalinan.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IbuHamil } from './ibuhamil.entity';

@Entity()
export class IbuHamilPersalinan {
  @ApiProperty({ description: 'Id' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Penolong saat persalinan' })
  @Column({ type: 'enum', enum: PenolongPersalinanEnum })
  penolong_persalinan: PenolongPersalinanEnum;

  @ApiProperty({ description: 'Tempat persalinan' })
  @Column({ type: 'enum', enum: TempatPersalinanEnum })
  tempat_persalinan: TempatPersalinanEnum;

  @ApiProperty({ description: 'Tanggal persalinan' })
  @Column()
  tanggal_persalinan: Date;

  @ManyToOne(() => IbuHamil, ibuHamil => ibuHamil.persalinanIbuHamil)
  @JoinColumn({ name: 'ibuHamilId' })
  ibuHamil: IbuHamil;
}
