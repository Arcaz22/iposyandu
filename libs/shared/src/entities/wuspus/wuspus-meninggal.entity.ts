import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Wuspus } from "./wuspus.entity";

@Entity()
export class WuspusMeninggal {
    @ApiProperty({ description: 'Id' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ description: 'Kapan Wus Pus Meninggal' })
    @Column()
    tanggal: Date;

    @ApiProperty({ description: 'Tempat Wus Pus Meninggal' })
    @Column()
    tempat: string;

    @ManyToOne(() => Wuspus, wuspus => wuspus.wusPusMeninggal)
    @JoinColumn({ name: 'wusPusId' })
    wuspus: Wuspus;
}
