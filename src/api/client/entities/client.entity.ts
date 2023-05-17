import { Confirmation } from 'src/api/confirmation/entities/confirmation.entity';
import { Event } from 'src/api/event/entities/event.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  phone: number;
  @Column()
  age: number;
  @Column({ default: 1, type: 'integer' })
  places: number;
  @Column()
  comments: number;
  @Column({ default: false })
  allergic: boolean;
  @Column({ default: null })
  allergies: string;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @ManyToMany(() => Event, (event) => event.clients)
  events: Event[];

  @OneToMany(() => Confirmation, (confirmation) => confirmation.client)
  confirmations: Confirmation[];
}
