import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { JenisBatchWuspusEnum } from "@app/shared/enums/wuspus/jenis-batch.enum";
import { Wuspus } from "./wuspus.entity";
import { KBEnum } from "@app/shared/enums/wuspus/kb.enum";

@Entity()
export class WuspusImunisasi {
  @ApiProperty({ description: 'Id' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Tanggal Imunisasi' })
  @Column()
  tanggal: Date;

  @ApiProperty({ description: 'Jenis Imunisasi' })
  @Column({ type: 'enum', enum: JenisBatchWuspusEnum })
  jenis_batch: JenisBatchWuspusEnum;

  @ApiProperty({ description: 'Jenis Batch kb' })
  @Column({ type: 'enum', enum: KBEnum, nullable: true })
  kb: KBEnum;

  @ManyToOne(() => Wuspus, wuspus => wuspus.wuspusImunisasi)
  @JoinColumn({ name: 'wuspusId' })
  wuspus: Wuspus;
}
