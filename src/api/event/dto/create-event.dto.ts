import { StatusFormat } from '../entities/event.entity';

export class CreateEventDto {
  name: string;
  date: Date;
  time: string;
  celebratedPerson: string;
  status: StatusFormat;
  created_at: Date;
  updated_at: Date;
}
