import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Event {
  @ApiProperty({ description: 'Id' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Tanggal Kegiatan' })
  @Column()
  tanggal: Date;

  @ApiProperty({ description: 'Jumlah Kader Laki-laki Yang Hadir' })
  @Column()
  jumlah_kader_l: number;

  @ApiProperty({ description: 'Jumlah Kader Perempuan Yang Hadir' })
  @Column()
  jumlah_kader_p: number;

  @ApiProperty({ description: 'Jumlah PLKB Laki-laki Yang Hadir' })
  @Column()
  jumlah_plkb_l: number;

  @ApiProperty({ description: 'Jumlah PLKB Perempuan Yang Hadir' })
  @Column()
  jumlah_plkb_p: number;

  @ApiProperty({ description: 'Jumlah Tenaga Medis Laki-laki Yang Hadir' })
  @Column()
  jumlah_tenaga_medis_l: number;

  @ApiProperty({ description: 'Jumlah Tenaga Medis Perempuan Yang Hadir' })
  @Column()
  jumlah_tenaga_medis_p: number;
}
