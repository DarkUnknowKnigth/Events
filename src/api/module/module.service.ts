import { Injectable } from '@nestjs/common';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Module } from './entities/module.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ModuleService {
  constructor(@InjectRepository(Module) private module: Repository<Module>) {}
  create(createModuleDto: CreateModuleDto) {
    return this.module.save(createModuleDto);
  }

  findAll() {
    return this.module.find();
  }

  findOne(id: number) {
    return this.module.findOneBy({ id });
  }

  update(id: number, updateModuleDto: UpdateModuleDto) {
    return this.module.update({ id }, updateModuleDto);
  }

  remove(id: number) {
    return this.module.delete(id);
  }
}
