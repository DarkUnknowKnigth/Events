import { Module } from '@nestjs/common';
import { ModuleService } from './module.service';
import { ModuleController } from './module.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module as Mod } from './entities/module.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mod])],
  controllers: [ModuleController],
  providers: [ModuleService],
})
export class ModuleModule {}
