import { Module } from 'src/api/module/entities/module.entity';
import { User } from 'src/api/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ default: true })
  active: boolean;

  @OneToMany(() => User, (user) => user.role)
  users: User[];

  @ManyToMany(() => Module, (module) => module.roles)
  modules: Module[];
}
