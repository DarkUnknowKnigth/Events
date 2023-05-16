import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(@InjectRepository(Role) private role: Repository<Role>) {}
  create(createRoleDto: CreateRoleDto) {
    return this.role.save(createRoleDto);
  }

  findAll() {
    return this.role.find();
  }

  findOne(id: number) {
    return this.role.findOneBy({ id });
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.role.update({ id }, updateRoleDto);
  }

  remove(id: number) {
    return this.role.delete(id);
  }
}
