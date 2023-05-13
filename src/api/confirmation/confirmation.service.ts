import { Injectable } from '@nestjs/common';
import { CreateConfirmationDto } from './dto/create-confirmation.dto';
import { UpdateConfirmationDto } from './dto/update-confirmation.dto';

@Injectable()
export class ConfirmationService {
  create(createConfirmationDto: CreateConfirmationDto) {
    return 'This action adds a new confirmation';
  }

  findAll() {
    return `This action returns all confirmation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} confirmation`;
  }

  update(id: number, updateConfirmationDto: UpdateConfirmationDto) {
    return `This action updates a #${id} confirmation`;
  }

  remove(id: number) {
    return `This action removes a #${id} confirmation`;
  }
}
