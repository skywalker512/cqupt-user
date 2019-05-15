import { Entity, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, PrimaryColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Department } from "../department/department.entity";
import { User } from "../user/user.entity";

@Entity()
export class Card {
  @PrimaryColumn({ unique: true })
  stuNum: string

  @OneToOne(type => User, user => user.card, { nullable: true })
  user: User

  @Column()
  name: string

  @ManyToOne(type => Department, department=>department.cards)
  department: Department

  @Column({
    nullable: true
  })
  stuId: string

  @CreateDateColumn()
  createdAt: string

  @UpdateDateColumn()
  updatedAt: string
}