import { Event } from 'src/api/event/entities/event.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  body: string;
  @Column({ type: 'date' })
  date: Date;

  @ManyToOne(() => Event, (event) => event.messages)
  event: Event;
}
