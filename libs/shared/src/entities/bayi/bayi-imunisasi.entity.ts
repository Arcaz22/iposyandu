import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Bayi } from "./bayi.entity";
import { JenisBatchEnum } from "@app/shared/enums/bayi/imunisasi.enum";

@Entity()
export class ImunisasiBayi {
  @ApiProperty({ description: 'Id' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Kapan Imunisasi Diberikan' })
  @Column()
  tanggal: Date;

  @ApiProperty({ description: 'Nomor Jenis Batch' })
  @Column({ type: 'enum', enum: JenisBatchEnum })
  jenis_batch: JenisBatchEnum;

  @ManyToOne(() => Bayi, bayi => bayi.imunisasiBayi)
  bayi: Bayi;
}
