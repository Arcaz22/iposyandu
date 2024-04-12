import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IbuHamil } from './ibuhamil.entity';

@Entity()
export class IbuHamilMeninggal {
  @ApiProperty({ description: 'Id' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Kapan Ibu Hamil Meninggal' })
  @Column()
  tanggal: Date;

  @ApiProperty({ description: 'Tempat Ibu Hamil Meninggal' })
  @Column()
  tempat: string;

  @ManyToOne(() => IbuHamil, ibuHamil => ibuHamil.persalinanIbuHamil)
  @JoinColumn({ name: 'ibuHamilId' })
  ibuHamil: IbuHamil;
}
