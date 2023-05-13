import { Role } from 'src/api/role/entities/role.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Module {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  icon: string;

  @Column({ default: true })
  active: boolean;

  @Column()
  url: string;

  @ManyToMany(() => Role, (role) => role.modules)
  @JoinTable()
  roles: Role[];
}
