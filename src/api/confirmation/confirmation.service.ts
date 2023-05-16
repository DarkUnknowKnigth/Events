import { Injectable } from '@nestjs/common';
import { CreateConfirmationDto } from './dto/create-confirmation.dto';
import { UpdateConfirmationDto } from './dto/update-confirmation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Confirmation } from './entities/confirmation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConfirmationService {
  constructor(
    @InjectRepository(Confirmation)
    private confirmation: Repository<Confirmation>,
  ) {}
  create(createConfirmationDto: CreateConfirmationDto) {
    return this.confirmation.save(createConfirmationDto);
  }

  findAll() {
    return this.confirmation.find();
  }

  findOne(id: number) {
    return this.confirmation.findOneBy({ id });
  }

  update(id: number, updateConfirmationDto: UpdateConfirmationDto) {
    return this.confirmation.update({ id }, updateConfirmationDto);
  }

  remove(id: number) {
    return this.confirmation.delete(id);
  }
}
