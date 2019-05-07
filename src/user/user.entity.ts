import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    unique: true,
  })
  mobile: string

  @Column({
    unique: true,
  })
  password: string

  @CreateDateColumn()
  createdAt: string

  @UpdateDateColumn()
  updatedAt: string
}