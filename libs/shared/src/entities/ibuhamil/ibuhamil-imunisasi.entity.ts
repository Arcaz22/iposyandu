import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IbuHamil } from './ibuhamil.entity';
import { JenisBatchIbuHamilEnum } from '@app/shared/enums/ibuhamil/imunisasi.enum';

@Entity()
export class IbuHamilImunisasi {
  @ApiProperty({ description: 'Id' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Kapan Imunisasi Diberikan' })
  @Column()
  tanggal: Date;

  @ApiProperty({ description: 'Nomor Jenis Batch' })
  @Column({ type: 'enum', enum: JenisBatchIbuHamilEnum })
  jenis_batch: JenisBatchIbuHamilEnum;

  @ManyToOne(() => IbuHamil, ibuHamil => ibuHamil.imunisasiIbuHamil)
  @JoinColumn({ name: 'ibuHamilId' })
  ibuHamil: IbuHamil;
}
