import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Card } from "../card/card.entity";

@Entity()
export class Department {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ unique: true })
  name: string

  @OneToMany(type => Card, card => card.department)
  cards: Card[]

  @CreateDateColumn()
  createdAt: string

  @UpdateDateColumn()
  updatedAt: string
}