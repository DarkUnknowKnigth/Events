import { Client } from 'src/api/client/entities/client.entity';
import { Confirmation } from 'src/api/confirmation/entities/confirmation.entity';
import { Location } from 'src/api/location/entities/location.entity';
import { Message } from 'src/api/message/entities/message.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @ManyToMany(() => Client, (client) => client.events)
  clients: Client[];

  @ManyToMany(() => Location, (location) => location.events)
  location: Location[];

  @OneToMany(() => Message, (message) => message.event)
  messages: Message[];

  @OneToMany(() => Confirmation, (confirmation) => confirmation.event)
  confirmations: Confirmation[];
}
