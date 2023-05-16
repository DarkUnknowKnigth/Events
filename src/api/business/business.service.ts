import { Injectable } from '@nestjs/common';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Business } from './entities/business.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(Business) private business: Repository<Business>,
  ) {}
  create(createBusinessDto: CreateBusinessDto) {
    return this.business.save(createBusinessDto);
  }

  findAll() {
    return this.business.find();
  }

  findOne(id: number) {
    return this.business.findOneBy({ id });
  }

  update(id: number, updateBusinessDto: UpdateBusinessDto) {
    return this.business.update({ id }, updateBusinessDto);
  }

  remove(id: number) {
    return this.business.delete(id);
  }
}
