import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientService {
  constructor(@InjectRepository(Client) private client: Repository<Client>) {}
  create(createClientDto: CreateClientDto) {
    return this.client.save(createClientDto);
  }

  findAll() {
    return this.client.find();
  }

  findOne(id: number) {
    return this.client.findOneBy({ id });
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return this.client.update({ id }, updateClientDto);
  }

  remove(id: number) {
    return this.client.delete(id);
  }
}
