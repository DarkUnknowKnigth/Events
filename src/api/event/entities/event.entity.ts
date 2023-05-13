import { Client } from 'src/api/client/entities/client.entity';
import { Confirmation } from 'src/api/confirmation/entities/confirmation.entity';
import { Message } from 'src/api/message/entities/message.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export type StatusFormat = 'scheduled' | 'invited' | 'checked' | 'ended';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({
    type: 'date',
  })
  date: Date;

  @Column({
    type: 'time',
  })
  time: string;

  @Column()
  celebratedPerson: string;

  @Column({
    type: 'enum',
    enum: ['scheduled', 'invited', 'checked', 'ended'],
    default: 'scheduled',
  })
  status: StatusFormat;

  @ManyToMany(() => Client, (client) => client.events)
  clients: Client[];

  @OneToMany(() => Message, (message) => message.event)
  messages: Message[];

  @OneToMany(() => Confirmation, (confirmation) => confirmation.event)
  confirmations: Confirmation[];
}
