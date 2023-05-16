import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location) private location: Repository<Location>,
  ) {}
  create(createLocationDto: CreateLocationDto) {
    return this.location.save(createLocationDto);
  }

  findAll() {
    return this.location.find();
  }

  findOne(id: number) {
    return this.location.findOneBy({ id });
  }

  update(id: number, updateLocationDto: UpdateLocationDto) {
    return this.location.update({ id }, updateLocationDto);
  }

  remove(id: number) {
    return this.location.delete(id);
  }
}
