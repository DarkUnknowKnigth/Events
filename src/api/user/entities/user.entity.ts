import { Exclude } from 'class-transformer';
import { Role } from 'src/api/role/entities/role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Exclude()
  @Column()
  password: string;
  @Column({ default: true })
  active: boolean;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @ManyToOne(() => Role, (role) => role.users)
  role: Role;
}
