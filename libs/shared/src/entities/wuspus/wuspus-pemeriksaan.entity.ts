import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Wuspus } from "./wuspus.entity";

@Entity()
export class WuspusPemeriksaan {
  @ApiProperty({ description: 'Id' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Tanggal Pemeriksaan' })
  @Column()
  tanggal: Date;

  @ApiProperty({ description: 'Lingkar Lengan Atas(cm)' })
  @Column()
  lila: number;

  @ManyToOne(() => Wuspus, wuspus => wuspus.wusPusPemeriksaan)
  @JoinColumn({ name: 'wusPusId' })
  wuspus: Wuspus;
}
