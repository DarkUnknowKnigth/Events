import { Confirmation } from 'src/api/confirmation/entities/confirmation.entity';
import { Event } from 'src/api/event/entities/event.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
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

  @ManyToMany(() => Event, (event) => event.clients)
  events: Event[];

  @OneToMany(() => Confirmation, (confirmation) => confirmation.client)
  confirmations: Confirmation[];
}
