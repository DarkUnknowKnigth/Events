import { Client } from 'src/api/client/entities/client.entity';
import { Event } from 'src/api/event/entities/event.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Confirmation {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'date' })
  date: Date;
  @Column({ default: false })
  confirmed: boolean;
  @ManyToOne(() => Event, (event) => event.confirmations)
  event: Event;
  @ManyToOne(() => Client, (client) => client.confirmations)
  client: Client;
}
