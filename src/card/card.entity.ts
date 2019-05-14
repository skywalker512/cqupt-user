import { Entity, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, PrimaryColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Department } from "../department/department.entity";
import { User } from "../user/user.entity";

@Entity()
export class Card {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ unique: true })
  stuNum: string

  @OneToOne(type => User, user => user.card)
  user: User

  @Column()
  name: string

  @ManyToOne(type => Department, department=>department.cards)
  department: Department

  @Column()
  stuId: string

  @CreateDateColumn()
  createdAt: string

  @UpdateDateColumn()
  updatedAt: string
}