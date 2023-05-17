import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ErrorHandler, errors } from 'src/utils/errors';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      const idNumber = parseInt(id, 10);
      if (Number.isNaN(idNumber)) {
        const handler = new ErrorHandler(errors.NOT_FOUND);
        throw handler.exceptionResponse();
      }
      return this.userService.findOne(idNumber);
    } catch (error) {
      const handler = new ErrorHandler(errors.BAD_REQUEST);
      throw handler.exceptionResponse();
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
