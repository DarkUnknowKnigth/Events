import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './api/user/dto/create-user.dto';
import { AuthDto } from './guards/auth/dto/auth.dto';
import { ErrorHandler } from './utils/errors';
import { ResetDto } from './guards/auth/dto/reset.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  version(): string {
    return this.appService.version();
  }
  @Post('login')
  async login(@Body() authDto: AuthDto) {
    const response = await this.appService.login(authDto);
    if (typeof response === 'number') {
      const handler = new ErrorHandler(response);
      throw handler.exceptionResponse();
    }
    return response;
  }
  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    const response = await this.appService.signUp(createUserDto);
    if (typeof response === 'number') {
      const handler = new ErrorHandler(response);
      throw handler.exceptionResponse();
    }
    return response;
  }
  @Post('reset')
  async reset(@Body() resetDto: ResetDto) {
    const response = await this.appService.reset(resetDto);
    if (typeof response === 'number') {
      const handler = new ErrorHandler(response);
      throw handler.exceptionResponse();
    }
    return response;
  }
}
