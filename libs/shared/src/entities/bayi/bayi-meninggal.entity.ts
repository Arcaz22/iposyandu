import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Bayi } from './bayi.entity';

@Entity()
export class BayiMeninggal {
  @ApiProperty({ description: 'Id' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Kapan Bayi Meninggal' })
  @Column()
  tanggal: Date;

  @ApiProperty({ description: 'Berapa Usia Bayi Meninggal' })
  @Column()
  usia: number;

  @ApiProperty({ description: 'Tempat Pelayanan' })
  @Column()
  tempat_pelayanan: string;

  @ManyToOne(() => Bayi, bayi => bayi.bayiMeninggal)
  @JoinColumn({ name: 'bayiId' })
  bayi: Bayi;
}
