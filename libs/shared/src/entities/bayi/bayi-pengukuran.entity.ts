import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Bayi } from "./bayi.entity";
import { PengukuranBayiEnum } from "@app/shared/enums/bayi/pengukuran.enum";

@Entity()
export class PengukuranBayi {
  @ApiProperty({ description: 'Id' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: "Tanggal Pengukuran Bayi"})
  @Column()
  tanggal: Date;

  @ApiProperty({ description: "Berat Badan Bayi"})
  @Column({ type: 'numeric' })
  berat_badan: Number;

  @ApiProperty({ description: "Tinggi Badan Bayi"})
  @Column({ type: 'numeric' })
  tinggi_badan: Number;

  @ApiProperty({ description: "Cara Pengukuran" })
  @Column({ type: 'enum', enum: PengukuranBayiEnum })
  cara_pengukuran: PengukuranBayiEnum;

  @ManyToOne(() => Bayi, bayi => bayi.pengukuranBayi)
  @JoinColumn({ name: 'bayiId' })
  bayi: Bayi;
}
