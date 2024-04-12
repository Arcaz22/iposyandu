import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IbuHamil } from './ibuhamil.entity';

@Entity()
export class IbuHamilPengukuran {
  @ApiProperty({ description: 'Id' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Tanggal Pemeriksaan' })
  @Column()
  tanggal: Date;

  @ApiProperty({ description: 'Tinggi Badan(cm)' })
  @Column({ type: 'numeric' })
  tinggi_badan: number;

  @ApiProperty({ description: 'Berat Badan(kg)' })
  @Column({ type: 'numeric' })
  berat_badan: number;

  @ApiProperty({ description: 'Lingkar Lengan Atas(cm)' })
  @Column({ type: 'numeric' })
  lila: number;

  @ApiProperty({ description: 'Hemoglobin' })
  @Column({ type: 'numeric' })
  hb: string;

  @ApiProperty({ description: 'Kehamilan keberapa, Pernah melahirkan berapa kali, Keguguran keberapa' })
  @Column()
  gpa: string;

  @ManyToOne(() => IbuHamil, ibuHamil => ibuHamil.pengukuranIbuHamil)
  @JoinColumn({ name: 'ibuHamilId' })
  ibuHamil: IbuHamil;
}
