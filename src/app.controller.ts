import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './api/user/dto/create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  version(): string {
    return this.appService.version();
  }
  @Post()
  login(@Body('email') email: string, @Body('password') password: string) {
    this.appService.login(email, password);
  }
  @Post()
  signUp(@Body() createUserDto: CreateUserDto) {
    this.appService.signUp(createUserDto);
  }
}
