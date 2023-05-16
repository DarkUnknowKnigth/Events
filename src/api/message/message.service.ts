import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private message: Repository<Message>,
  ) {}
  create(createMessageDto: CreateMessageDto) {
    return this.message.save(createMessageDto);
  }

  findAll() {
    return this.message.find();
  }

  findOne(id: number) {
    return this.message.findOneBy({ id });
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return this.message.update({ id }, updateMessageDto);
  }

  remove(id: number) {
    return this.message.delete(id);
  }
}
