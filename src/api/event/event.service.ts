import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EventService {
  constructor(@InjectRepository(Event) private event: Repository<Event>) {}
  create(createEventDto: CreateEventDto) {
    return this.event.save(createEventDto);
  }

  findAll() {
    return this.event.find();
  }

  findOne(id: number) {
    return this.event.findOneBy({ id });
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return this.event.update({ id }, updateEventDto);
  }

  remove(id: number) {
    return this.event.delete(id);
  }
}
