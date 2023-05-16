import { Client } from 'src/api/client/entities/client.entity';
import { Event } from 'src/api/event/entities/event.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Confirmation {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'date' })
  date: Date;
  @Column({ default: false })
  confirmed: boolean;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @ManyToOne(() => Event, (event) => event.confirmations)
  event: Event;
  @ManyToOne(() => Client, (client) => client.confirmations)
  client: Client;
}
