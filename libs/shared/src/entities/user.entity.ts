import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseEntityRepository } from "./base.entity.repository";
import { ApiProperty } from "@nestjs/swagger";
import { Posyandu } from "./posyandu/posyandu.entity";
import { Bayi } from "./bayi/bayi.entity";

@Entity('user')
export class User extends BaseEntityRepository<User>{
  @ApiProperty({ description: 'name User' })
  @Column()
  name: string;

  @ApiProperty({ description: 'username User' })
  @Column()
  username: string;

  @ApiProperty({ description: 'phone User' })
  @Column()
  phone: string;

  @ApiProperty({ description: 'Email User' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ description: 'Password User' })
  @Column()
  password: string;

  @ManyToOne(() => Posyandu, posyandu => posyandu.users, { nullable: true })
  posyandu: Posyandu;

  @OneToMany(() => Bayi, bayi => bayi.user)
  bayi: Bayi[];
}
