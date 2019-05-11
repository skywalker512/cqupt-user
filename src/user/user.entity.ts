import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm";
import { Card } from "../card/card.entity";

@Entity('user')
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({
    unique: true,
  })
  mobile: string

  @OneToOne(type => Card, card => card.userId)
  @JoinColumn()
  card: Card

  @CreateDateColumn()
  createdAt: string

  @UpdateDateColumn()
  updatedAt: string
}